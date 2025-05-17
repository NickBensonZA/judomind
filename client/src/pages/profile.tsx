import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Calendar, Medal, Clock, Award, CheckCircle, BookOpen, Brain } from "lucide-react";
import { Session } from "@shared/schema";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

// Trophy icon component
function Trophy(props: React.SVGProps<SVGSVGElement>) {
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

export default function Profile() {
  const { user, isLoading: isLoadingUser } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch user's sessions
  const { data: sessions, isLoading: isLoadingSessions } = useQuery<Session[]>({
    queryKey: ["/api/my/sessions"],
    enabled: !!user,
  });

  const isLoading = isLoadingUser || isLoadingSessions;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading profile...</span>
      </div>
    );
  }

  // Calculate stats
  const totalSessions = sessions?.length || 0;
  const completedSessions = sessions?.filter(s => s.completed).length || 0;
  const completionRate = totalSessions ? Math.round((completedSessions / totalSessions) * 100) : 0;
  
  // Get total minutes spent on mental training
  const totalMinutes = sessions?.reduce((total, session) => total + session.duration, 0) || 0;
  
  // Count session types
  const sessionTypes = {
    training: sessions?.filter(s => s.type === 'training').length || 0,
    competition: sessions?.filter(s => s.type === 'competition').length || 0,
    grading: sessions?.filter(s => s.type === 'grading').length || 0,
  };

  // Get user initials for avatar
  const getInitials = () => {
    if (!user) return "JM";
    if (user.displayName) {
      const nameParts = user.displayName.split(' ');
      if (nameParts.length > 1) {
        return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
      }
      return user.displayName.slice(0, 2).toUpperCase();
    }
    return user.username.slice(0, 2).toUpperCase();
  };

  // Sort sessions by date
  const sortedSessions = [...(sessions || [])].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Get the most recent sessions (last 5)
  const recentSessions = sortedSessions.slice(0, 5);

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile sidebar */}
        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader className="flex flex-col items-center text-center pb-2">
              <Avatar className="h-24 w-24 mb-2">
                <AvatarFallback className="bg-primary text-white text-2xl">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">
                {user?.displayName || user?.username || "Judo Practitioner"}
              </CardTitle>
              <CardDescription>{user?.email}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex justify-center gap-2 mb-4">
                <Badge variant="outline" className="px-3 py-1">
                  <Trophy className="h-4 w-4 mr-1" />
                  <span>{totalSessions} Sessions</span>
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{totalMinutes} Minutes</span>
                </Badge>
              </div>
              <Separator className="my-4" />
              <div className="text-sm text-muted-foreground">
                <p>Member since {format(new Date(user?.createdAt || new Date()), 'MMM yyyy')}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="w-full md:w-2/3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
              <TabsTrigger value="sessions" className="flex-1">Sessions</TabsTrigger>
              <TabsTrigger value="achievements" className="flex-1">Achievements</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Training Overview</CardTitle>
                  <CardDescription>Your mental training statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col gap-1 p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">Total Sessions</span>
                      </div>
                      <span className="text-3xl font-bold">{totalSessions}</span>
                    </div>
                    <div className="flex flex-col gap-1 p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span className="text-sm">Completion Rate</span>
                      </div>
                      <div className="text-3xl font-bold">{completionRate}%</div>
                    </div>
                    <div className="flex flex-col gap-1 p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="text-sm">Total Time</span>
                      </div>
                      <span className="text-3xl font-bold">{totalMinutes} mins</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2">Session Types</h3>
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Training</span>
                        <span className="text-sm font-medium">{sessionTypes.training}</span>
                      </div>
                      <Progress value={sessionTypes.training / totalSessions * 100 || 0} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Grading</span>
                        <span className="text-sm font-medium">{sessionTypes.grading}</span>
                      </div>
                      <Progress value={sessionTypes.grading / totalSessions * 100 || 0} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Competition</span>
                        <span className="text-sm font-medium">{sessionTypes.competition}</span>
                      </div>
                      <Progress value={sessionTypes.competition / totalSessions * 100 || 0} className="h-2" />
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2">Recent Activity</h3>
                  {recentSessions.length > 0 ? (
                    <div className="space-y-3">
                      {recentSessions.map((session) => (
                        <div key={session.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                          <div>
                            <h4 className="font-medium">{session.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(session.createdAt), 'PPP')} • {session.duration} mins
                            </p>
                          </div>
                          <Badge variant={session.completed ? "success" : "secondary"}>
                            {session.completed ? "Completed" : "In Progress"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground italic">No sessions yet. Start your mental training journey!</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Sessions Tab */}
            <TabsContent value="sessions">
              <Card>
                <CardHeader>
                  <CardTitle>Training Sessions</CardTitle>
                  <CardDescription>Your mental preparation sessions history</CardDescription>
                </CardHeader>
                <CardContent>
                  {sortedSessions.length > 0 ? (
                    <div className="space-y-4">
                      {sortedSessions.map((session) => (
                        <div key={session.id} className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">{session.name}</h3>
                              <Badge className="ml-2" variant={
                                session.type === 'training' ? 'default' : 
                                session.type === 'competition' ? 'destructive' : 
                                'outline'
                              }>
                                {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {format(new Date(session.createdAt), 'PPP')} • {session.duration} mins
                            </p>
                            {session.notes && (
                              <p className="text-sm mt-2">{session.notes}</p>
                            )}
                          </div>
                          <div className="flex items-center mt-2 md:mt-0">
                            <Badge variant={session.completed ? "success" : "secondary"} className="mr-2">
                              {session.completed ? "Completed" : "In Progress"}
                            </Badge>
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                      <h3 className="text-lg font-medium mb-1">No sessions yet</h3>
                      <p className="text-muted-foreground mb-4">Start your mental training journey today</p>
                      <Button>Create Your First Session</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle>Your Achievements</CardTitle>
                  <CardDescription>Track your mental training progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Consistent Breather */}
                    <div className="flex items-start gap-4">
                      <div className={`rounded-full p-3 ${totalSessions >= 5 ? 'bg-primary/20' : 'bg-muted'}`}>
                        <Trophy className={`h-6 w-6 ${totalSessions >= 5 ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <div>
                        <h3 className="font-medium">Consistent Breather</h3>
                        <p className="text-sm text-muted-foreground mb-1">Complete 5 or more sessions</p>
                        <Progress value={Math.min(totalSessions / 5 * 100, 100)} className="h-2 w-full max-w-xs" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {totalSessions >= 5 ? 'Achievement unlocked!' : `${totalSessions}/5 sessions completed`}
                        </p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Mental Master */}
                    <div className="flex items-start gap-4">
                      <div className={`rounded-full p-3 ${totalMinutes >= 60 ? 'bg-primary/20' : 'bg-muted'}`}>
                        <Brain className={`h-6 w-6 ${totalMinutes >= 60 ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <div>
                        <h3 className="font-medium">Mental Master</h3>
                        <p className="text-sm text-muted-foreground mb-1">Practice for at least 60 minutes</p>
                        <Progress value={Math.min(totalMinutes / 60 * 100, 100)} className="h-2 w-full max-w-xs" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {totalMinutes >= 60 ? 'Achievement unlocked!' : `${totalMinutes}/60 minutes completed`}
                        </p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Competition Ready */}
                    <div className="flex items-start gap-4">
                      <div className={`rounded-full p-3 ${sessionTypes.competition >= 1 ? 'bg-primary/20' : 'bg-muted'}`}>
                        <Medal className={`h-6 w-6 ${sessionTypes.competition >= 1 ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <div>
                        <h3 className="font-medium">Competition Ready</h3>
                        <p className="text-sm text-muted-foreground mb-1">Complete a competition preparation session</p>
                        <Progress value={sessionTypes.competition >= 1 ? 100 : 0} className="h-2 w-full max-w-xs" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {sessionTypes.competition >= 1 ? 'Achievement unlocked!' : 'Not started yet'}
                        </p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Grading Champion */}
                    <div className="flex items-start gap-4">
                      <div className={`rounded-full p-3 ${sessionTypes.grading >= 3 ? 'bg-primary/20' : 'bg-muted'}`}>
                        <Award className={`h-6 w-6 ${sessionTypes.grading >= 3 ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <div>
                        <h3 className="font-medium">Grading Champion</h3>
                        <p className="text-sm text-muted-foreground mb-1">Complete 3 grading preparation sessions</p>
                        <Progress value={Math.min(sessionTypes.grading / 3 * 100, 100)} className="h-2 w-full max-w-xs" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {sessionTypes.grading >= 3 ? 'Achievement unlocked!' : `${sessionTypes.grading}/3 sessions completed`}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}