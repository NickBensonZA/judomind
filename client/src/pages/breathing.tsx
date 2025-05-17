import { Card, CardContent } from "@/components/ui/card";
import BreathingCircle from "@/components/breathing-circle";
import { Stethoscope, PauseCircle, Wind } from "lucide-react";

export default function Breathing() {
  return (
    <section className="py-8">
      <h2 className="text-3xl font-noto font-bold mb-6 text-center">Breathing Exercises for Judokas</h2>
      <p className="text-lg text-center max-w-3xl mx-auto mb-8">Control your breath to manage stress, improve focus, and enhance your performance on the tatami.</p>
      
      {/* Breathing exercise module */}
      <Card className="mb-12">
        <CardContent className="p-8">
          <BreathingCircle />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-secondary p-4 rounded-lg">
              <div className="text-success text-2xl mb-2 flex justify-center">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h4 className="font-medium mb-1">Inhale</h4>
              <p>4 seconds - breathe in slowly through your nose</p>
            </div>
            
            <div className="bg-secondary p-4 rounded-lg">
              <div className="text-primary text-2xl mb-2 flex justify-center">
                <PauseCircle className="w-6 h-6" />
              </div>
              <h4 className="font-medium mb-1">Hold</h4>
              <p>4 seconds - retain the breath</p>
            </div>
            
            <div className="bg-secondary p-4 rounded-lg">
              <div className="text-progress text-2xl mb-2 flex justify-center">
                <Wind className="w-6 h-6" />
              </div>
              <h4 className="font-medium mb-1">Exhale</h4>
              <p>6 seconds - release slowly through your mouth</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Breathing techniques for different scenarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Pre-training breathing */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-noto font-medium mb-4 text-primary">Before Training</h3>
            <p className="mb-4">Use this technique to prepare your mind and body for practice:</p>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
              <li>Sit in seiza position at the edge of the tatami</li>
              <li>Close your eyes and place hands on your thighs</li>
              <li>Breathe deeply into your hara (lower abdomen)</li>
              <li>Focus on your intention for today's practice</li>
              <li>Continue for 2-3 minutes before bowing onto the mat</li>
            </ol>
            <p className="italic text-gray-600">This helps transition from your daily life to focused training mode.</p>
          </CardContent>
        </Card>
        
        {/* Pre-competition breathing */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-noto font-medium mb-4 text-primary">Before Competition</h3>
            <p className="mb-4">Use this technique to manage competition nerves:</p>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
              <li>Find a quiet spot to stand or sit before your match</li>
              <li>Place one hand on your chest, the other on your abdomen</li>
              <li>Take quick inhales (2 sec) followed by longer exhales (4 sec)</li>
              <li>Focus on feeling grounded and balanced</li>
              <li>Repeat for 1-2 minutes until called for your match</li>
            </ol>
            <p className="italic text-gray-600">This helps convert nervous energy into focused readiness.</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Recovery breathing */}
      <div className="bg-secondary rounded-xl p-8">
        <h3 className="text-xl font-noto font-medium mb-4">Recovery Breathing</h3>
        <p className="mb-4">After intense training or between tournament matches:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ol className="list-decimal pl-6 space-y-3">
              <li><span className="font-medium">Stand with feet shoulder-width apart</span> or sit comfortably.</li>
              <li><span className="font-medium">Inhale through your nose for 3 seconds</span>, allowing your abdomen to expand.</li>
              <li><span className="font-medium">Hold briefly</span> at the top of the inhalation.</li>
              <li><span className="font-medium">Exhale forcefully through your mouth</span> for 3 seconds, contracting your abdomen.</li>
              <li><span className="font-medium">Repeat 10-15 times</span> to help recover your breathing and heart rate.</li>
            </ol>
            <p className="mt-4 italic">This technique helps clear lactate buildup and prepares you for your next effort.</p>
          </div>
          {/* A judoka in gi practicing breathing exercises */}
          <div className="rounded-xl overflow-hidden h-64 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="600" height="400" fill="#f5f5f5"/>
              <rect x="200" y="100" width="200" height="250" rx="10" fill="#ffffff"/>
              <path d="M300 175C344.183 175 380 155.076 380 130C380 104.924 344.183 85 300 85C255.817 85 220 104.924 220 130C220 155.076 255.817 175 300 175Z" fill="#e74c3c"/>
              <path d="M300 175C344.183 175 380 155.076 380 130C380 104.924 344.183 85 300 85C255.817 85 220 104.924 220 130C220 155.076 255.817 175 300 175Z" stroke="#2c3e50" strokeWidth="3"/>
              <path d="M300 160C333.137 160 360 146.569 360 130C360 113.431 333.137 100 300 100C266.863 100 240 113.431 240 130C240 146.569 266.863 160 300 160Z" fill="#ecf0f1"/>
              <path d="M300 145C322.091 145 340 138.284 340 130C340 121.716 322.091 115 300 115C277.909 115 260 121.716 260 130C260 138.284 277.909 145 300 145Z" fill="#2c3e50"/>
              <path d="M220 175H380V350H220V175Z" fill="#ffffff"/>
              <path d="M220 175H380V350H220V175Z" stroke="#2c3e50" strokeWidth="3"/>
              <path d="M300 175V350" stroke="#2c3e50" strokeWidth="3"/>
              <circle cx="260" cy="290" r="15" fill="#e74c3c"/>
              <circle cx="340" cy="290" r="15" fill="#e74c3c"/>
              <path d="M290 320H310" stroke="#2c3e50" strokeWidth="3" strokeLinecap="round"/>
              <path d="M220 220H380" stroke="#2c3e50" strokeWidth="3"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
