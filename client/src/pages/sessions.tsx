import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Session } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Loader2, Trophy, Award, Dumbbell, CalendarPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

// Trophy icon component
function TrophySvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

export default function Sessions() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading: isLoadingAuth } = useAuth();
  const [sessionName, setSessionName] = useState("");
  const [sessionType, setSessionType] = useState("training");
  const [sessionDuration, setSessionDuration] = useState("15");
  const [sessionNotes, setSessionNotes] = useState("");

  // Get sessions for the current authenticated user
  const { data: userSessions, isLoading: isLoadingSessions } = useQuery<Session[]>({
    queryKey: ['/api/user/sessions'],
    enabled: isAuthenticated,
  });

  // Get example sessions if not authenticated
  const { data: exampleSessions, isLoading: isLoadingExamples } = useQuery<Session[]>({
    queryKey: ['/api/sessions'],
    enabled: !isAuthenticated,
  });

  const sessions = isAuthenticated ? userSessions : exampleSessions;
  const isLoading = isLoadingAuth || isLoadingSessions || isLoadingExamples;

  const sessionStats = {
    totalSessions: sessions?.length || 0,
    completedSessions: sessions?.filter(s => s.completed).length || 0,
    totalMinutes: sessions?.reduce((acc, session) => acc + session.duration, 0) || 0
  };

  const completeSession = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest('PATCH', `/api/sessions/${id}/complete`, undefined);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/sessions'] });
      toast({
        title: "Session completed!",
        description: "Your mental training session has been logged.",
      });
    },
    onError: (error) => {
      if (!isAuthenticated) {
        toast({
          title: "Authentication required",
          description: "Please sign in to track your sessions.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error completing session",
          description: "There was a problem logging your session.",
          variant: "destructive",
        });
      }
    }
  });

  const createSession = useMutation({
    mutationFn: async (sessionData: any) => {
      const response = await apiRequest('POST', '/api/sessions', sessionData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/sessions'] });
      setSessionName("");
      setSessionType("training");
      setSessionDuration("15");
      setSessionNotes("");
      toast({
        title: "Session created",
        description: "Your new mental training session has been created.",
      });
    },
    onError: (error) => {
      if (!isAuthenticated) {
        toast({
          title: "Authentication required",
          description: "Please sign in to create and track sessions.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error creating session",
          description: "There was a problem creating your session.",
          variant: "destructive",
        });
      }
    }
  });

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create and track sessions.",
        variant: "destructive",
      });
      return;
    }
    
    const sessionData = {
      name: sessionName,
      type: sessionType,
      duration: parseInt(sessionDuration),
      notes: sessionNotes,
      completed: false
    };
    
    createSession.mutate(sessionData);
  };

  const handleCompleteSession = (id: number) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to track your sessions.",
        variant: "destructive",
      });
      return;
    }
    completeSession.mutate(id);
  };

  // Not authenticated view
  if (!isAuthenticated && !isLoadingAuth) {
    return (
      <section className="py-8">
        <h2 className="text-3xl font-noto font-bold mb-6 text-center">Track Your Mental Training</h2>
        <p className="text-lg text-center max-w-3xl mx-auto mb-8">Sign in to track and create personalized mental training sessions.</p>
        
        <Card className="max-w-xl mx-auto">
          <CardContent className="p-8 text-center">
            <CalendarPlus className="w-16 h-16 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-noto font-medium mb-4">Track Your Progress</h3>
            <p className="mb-6 text-gray-600">Sign in to create and track your mental training sessions. Keep a log of your practice, set goals, and build consistent habits.</p>
            <a href="/api/login">
              <Button className="bg-accent text-white font-medium hover:bg-opacity-90">
                Sign In to Get Started
              </Button>
            </a>
          </CardContent>
        </Card>
        
        <div className="mt-12">
          <h3 className="text-xl font-noto font-medium mb-6 text-center">Example Session Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Training session */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="text-primary text-2xl mb-4">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <h4 className="font-noto font-medium text-lg mb-2">Training Preparation</h4>
                <p className="text-gray-600 mb-4">Session focusing on affirmations and breathing before dojo practice.</p>
                <a href="/api/login">
                  <Button 
                    className="w-full bg-primary text-white py-2 rounded font-medium hover:bg-opacity-90 transition duration-300"
                  >
                    Sign In to Use
                  </Button>
                </a>
              </CardContent>
            </Card>
            
            {/* Competition session */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="text-accent text-2xl mb-4">
                  <TrophySvg className="w-6 h-6" />
                </div>
                <h4 className="font-noto font-medium text-lg mb-2">Competition Prep</h4>
                <p className="text-gray-600 mb-4">Intensive mental preparation for upcoming competition or shiai.</p>
                <a href="/api/login">
                  <Button 
                    className="w-full bg-primary text-white py-2 rounded font-medium hover:bg-opacity-90 transition duration-300"
                  >
                    Sign In to Use
                  </Button>
                </a>
              </CardContent>
            </Card>
            
            {/* Grading session */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="text-success text-2xl mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="font-noto font-medium text-lg mb-2">Grading Preparation</h4>
                <p className="text-gray-600 mb-4">Focus and confidence building before a belt examination.</p>
                <a href="/api/login">
                  <Button 
                    className="w-full bg-primary text-white py-2 rounded font-medium hover:bg-opacity-90 transition duration-300"
                  >
                    Sign In to Use
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <h2 className="text-3xl font-noto font-bold mb-6 text-center">Track Your Mental Training</h2>
      <p className="text-lg text-center max-w-3xl mx-auto mb-8">Build consistency in your mental preparation just as you do with physical training.</p>
      
      {/* Session stats */}
      <Card className="mb-12">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4">
              <h3 className="text-4xl font-noto font-bold text-primary mb-2">{sessionStats.totalSessions}</h3>
              <p className="text-gray-600">Total Sessions</p>
            </div>
            
            <div className="p-4">
              <h3 className="text-4xl font-noto font-bold text-accent mb-2">{sessionStats.completedSessions}</h3>
              <p className="text-gray-600">Completed Sessions</p>
            </div>
            
            <div className="p-4">
              <h3 className="text-4xl font-noto font-bold text-success mb-2">{Math.floor(sessionStats.totalMinutes / 60)}</h3>
              <p className="text-gray-600">Hours Practiced</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Create new session */}
      <div className="bg-secondary rounded-xl p-8 mb-12">
        <h3 className="text-xl font-noto font-medium mb-6 text-center">Log Today's Session</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Training session */}
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="text-primary text-2xl mb-4">
                <Dumbbell className="w-6 h-6" />
              </div>
              <h4 className="font-noto font-medium text-lg mb-2">Training Preparation</h4>
              <p className="text-gray-600 mb-4">Session focusing on affirmations and breathing before dojo practice.</p>
              <Button 
                onClick={() => {
                  const trainingSession = {
                    name: "Pre-Training Mental Focus",
                    type: "training",
                    duration: 15,
                    notes: "Focus on calming techniques before tonight's randori",
                    completed: true
                  };
                  createSession.mutate(trainingSession);
                }}
                className="w-full bg-primary text-white py-2 rounded font-medium hover:bg-opacity-90 transition duration-300"
                disabled={createSession.isPending}
              >
                {createSession.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging...
                  </>
                ) : "Log Training Session"}
              </Button>
            </CardContent>
          </Card>
          
          {/* Competition session */}
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="text-accent text-2xl mb-4">
                <TrophySvg className="w-6 h-6" />
              </div>
              <h4 className="font-noto font-medium text-lg mb-2">Competition Prep</h4>
              <p className="text-gray-600 mb-4">Intensive mental preparation for upcoming competition or shiai.</p>
              <Button 
                onClick={() => {
                  const competitionSession = {
                    name: "Competition Mental Warmup",
                    type: "competition",
                    duration: 20,
                    notes: "Visualizing successful techniques and match scenarios",
                    completed: true
                  };
                  createSession.mutate(competitionSession);
                }}
                className="w-full bg-primary text-white py-2 rounded font-medium hover:bg-opacity-90 transition duration-300"
                disabled={createSession.isPending}
              >
                {createSession.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging...
                  </>
                ) : "Log Competition Prep"}
              </Button>
            </CardContent>
          </Card>
          
          {/* Grading session */}
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="text-success text-2xl mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-noto font-medium text-lg mb-2">Grading Preparation</h4>
              <p className="text-gray-600 mb-4">Focus and confidence building before a belt examination.</p>
              <Button 
                onClick={() => {
                  const gradingSession = {
                    name: "Grading Mental Prep",
                    type: "grading",
                    duration: 25,
                    notes: "Confidence building before belt examination",
                    completed: true
                  };
                  createSession.mutate(gradingSession);
                }}
                className="w-full bg-primary text-white py-2 rounded font-medium hover:bg-opacity-90 transition duration-300"
                disabled={createSession.isPending}
              >
                {createSession.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging...
                  </>
                ) : "Log Grading Session"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Custom session creation */}
      <Card>
        <CardContent className="p-8">
          <h3 className="text-xl font-noto font-medium mb-4 text-center">Create Custom Session</h3>
          
          <form className="max-w-xl mx-auto" onSubmit={handleCreateSession}>
            <div className="mb-4">
              <Label htmlFor="session-name" className="block text-gray-700 mb-2">Session Name</Label>
              <Input 
                id="session-name" 
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                placeholder="e.g., Pre-Tournament Visualization"
                required
              />
            </div>
            
            <div className="mb-4">
              <Label htmlFor="session-type" className="block text-gray-700 mb-2">Session Type</Label>
              <Select 
                value={sessionType} 
                onValueChange={setSessionType}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select session type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="training">Training</SelectItem>
                  <SelectItem value="competition">Competition</SelectItem>
                  <SelectItem value="grading">Grading</SelectItem>
                  <SelectItem value="recovery">Recovery</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="mb-4">
              <Label htmlFor="session-duration" className="block text-gray-700 mb-2">Duration (minutes)</Label>
              <Input 
                id="session-duration" 
                type="number"
                value={sessionDuration}
                onChange={(e) => setSessionDuration(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                min="1"
                required
              />
            </div>
            
            <div className="mb-6">
              <Label htmlFor="session-notes" className="block text-gray-700 mb-2">Session Notes</Label>
              <Textarea 
                id="session-notes" 
                value={sessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                rows={3} 
                placeholder="Focus areas, goals for this session..."
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-accent text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition duration-300"
              disabled={createSession.isPending}
            >
              {createSession.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : "Create & Start Session"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
