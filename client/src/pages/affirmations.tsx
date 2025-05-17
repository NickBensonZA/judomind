import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import AffirmationCard from "@/components/affirmation-card";
import { Affirmation } from "@shared/schema";
import { Loader2 } from "lucide-react";

export default function Affirmations() {
  const { data: trainingAffirmations, isLoading: isLoadingTraining } = useQuery<Affirmation[]>({
    queryKey: ['/api/affirmations/training']
  });
  
  const { data: gradingAffirmations, isLoading: isLoadingGrading } = useQuery<Affirmation[]>({
    queryKey: ['/api/affirmations/grading']
  });
  
  const { data: competitionAffirmations, isLoading: isLoadingCompetition } = useQuery<Affirmation[]>({
    queryKey: ['/api/affirmations/competition']
  });
  
  const isLoading = isLoadingTraining || isLoadingGrading || isLoadingCompetition;

  return (
    <section className="py-8">
      <h2 className="text-3xl font-noto font-bold mb-6 text-center">Self-Affirmations for Judokas</h2>
      <p className="text-lg text-center max-w-3xl mx-auto mb-8">Select affirmations that resonate with you. Practice saying them with conviction before training, grading, or competition.</p>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary" />
          <span>Loading affirmations...</span>
        </div>
      ) : (
        <>
          {/* Affirmation Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Training Affirmations */}
            <div>
              <h3 className="text-xl font-noto font-medium mb-4 text-primary border-b-2 border-primary pb-2">For Training</h3>
              <div className="space-y-3">
                {trainingAffirmations?.map((affirmation) => (
                  <AffirmationCard key={affirmation.id} text={affirmation.text} />
                ))}
              </div>
            </div>

            {/* Grading Affirmations */}
            <div>
              <h3 className="text-xl font-noto font-medium mb-4 text-primary border-b-2 border-primary pb-2">For Grading</h3>
              <div className="space-y-3">
                {gradingAffirmations?.map((affirmation) => (
                  <AffirmationCard key={affirmation.id} text={affirmation.text} />
                ))}
              </div>
            </div>

            {/* Competition Affirmations */}
            <div>
              <h3 className="text-xl font-noto font-medium mb-4 text-primary border-b-2 border-primary pb-2">For Competition</h3>
              <div className="space-y-3">
                {competitionAffirmations?.map((affirmation) => (
                  <AffirmationCard key={affirmation.id} text={affirmation.text} />
                ))}
              </div>
            </div>
          </div>

          {/* How to use affirmations */}
          <div className="bg-secondary rounded-xl p-8">
            <h3 className="text-xl font-noto font-medium mb-4">How to Use Affirmations Effectively</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <ol className="list-decimal pl-6 space-y-3">
                  <li><span className="font-medium">Select 3-5 affirmations</span> that resonate most with your current goals.</li>
                  <li><span className="font-medium">Practice daily</span>, ideally in the morning or before practice.</li>
                  <li><span className="font-medium">Say them aloud</span> with conviction while maintaining good posture.</li>
                  <li><span className="font-medium">Visualize success</span> as you repeat each affirmation.</li>
                  <li><span className="font-medium">Be consistent</span> - mental training requires regular practice just like physical techniques.</li>
                </ol>
              </div>
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <h4 className="font-medium mb-2">Example Affirmation Routine:</h4>
                  <p className="mb-4">Before a competition:</p>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                    <li>Find a quiet place to sit in seiza (formal kneeling position).</li>
                    <li>Take 5 deep breaths to center yourself.</li>
                    <li>Repeat each chosen affirmation 3 times.</li>
                    <li>As you say each one, visualize yourself embodying that quality.</li>
                    <li>Finish with one more deep breath, and bow (rei) to acknowledge your commitment.</li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
