import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Wind, Calendar, MessageSquareQuote } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <section className="py-8">
      {/* Hero section */}
      <div className="bg-secondary rounded-xl p-8 mb-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-noto font-bold mb-4">Mental Preparation for Judokas</h2>
          <p className="text-lg mb-8">Strengthen your mind as you strengthen your body. Develop mental resilience for training, grading, and competitions.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/affirmations">
              <Button className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300 shadow-md">
                Start with Affirmations
              </Button>
            </Link>
            <Link href="/breathing">
              <Button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300 shadow-md">
                Try Breathing Exercises
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Card 1 */}
        <Card className="hover:shadow-lg transition duration-300">
          <CardContent className="p-6">
            <div className="text-accent text-3xl mb-4">
              <Brain />
            </div>
            <h3 className="font-noto font-medium text-xl mb-3">Self-Affirmations</h3>
            <p className="text-gray-600 mb-4">Positive statements to build confidence and focus before judo practice or competition.</p>
            <Link href="/affirmations">
              <a className="text-accent font-semibold hover:underline">Explore Affirmations →</a>
            </Link>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="hover:shadow-lg transition duration-300">
          <CardContent className="p-6">
            <div className="text-accent text-3xl mb-4">
              <Wind />
            </div>
            <h3 className="font-noto font-medium text-xl mb-3">Breathing Techniques</h3>
            <p className="text-gray-600 mb-4">Guided breathing exercises to calm nerves, improve focus, and prepare mentally.</p>
            <Link href="/breathing">
              <a className="text-accent font-semibold hover:underline">Start Breathing →</a>
            </Link>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="hover:shadow-lg transition duration-300">
          <CardContent className="p-6">
            <div className="text-accent text-3xl mb-4">
              <Calendar />
            </div>
            <h3 className="font-noto font-medium text-xl mb-3">Session Tracking</h3>
            <p className="text-gray-600 mb-4">Track your mental preparation sessions to build consistency in your judo practice.</p>
            <Link href="/sessions">
              <a className="text-accent font-semibold hover:underline">Track Progress →</a>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Why mental preparation */}
      <Card className="mb-12">
        <CardContent className="p-8">
          <h2 className="text-2xl font-noto font-medium mb-6 text-center">Why Mental Preparation Matters in Judo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="mb-4">The mental aspect of judo is as important as physical technique. The founder of judo, Jigoro Kano, emphasized that judo is not just about physical strength but also mental discipline.</p>
              <p className="mb-4">Through regular mental preparation:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Reduce pre-competition anxiety</li>
                <li>Improve focus during randori (sparring)</li>
                <li>Develop resilience when facing challenges</li>
                <li>Build confidence before gradings</li>
                <li>Transform nerves into positive energy</li>
              </ul>
            </div>
            {/* A judoka in meditation pose */}
            <div className="rounded-xl overflow-hidden h-64 md:h-auto">
              <svg className="w-full h-full" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="600" height="400" fill="#f5f5f5"/>
                <circle cx="300" cy="150" r="60" fill="#2c3e50"/>
                <rect x="290" y="200" width="20" height="120" fill="#2c3e50"/>
                <path d="M220 320C220 320 250 260 300 260C350 260 380 320 380 320" stroke="#2c3e50" strokeWidth="20" strokeLinecap="round"/>
                <circle cx="300" cy="150" r="30" fill="#ecf0f1"/>
                <path d="M280 150C280 150 290 160 300 160C310 160 320 150 320 150" stroke="#2c3e50" strokeWidth="5" strokeLinecap="round"/>
                <rect x="200" y="320" width="200" height="20" fill="#e74c3c"/>
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials */}
      <div className="mb-12">
        <h2 className="text-2xl font-noto font-medium mb-6 text-center">What Judokas Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-accent mb-4">
                <MessageSquareQuote className="w-6 h-6" />
              </div>
              <p className="italic mb-4">"The breathing exercises helped me stay calm during my black belt examination. I felt centered and focused on my techniques rather than my nerves."</p>
              <p className="font-semibold">- Keiko T., Shodan</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-accent mb-4">
                <MessageSquareQuote className="w-6 h-6" />
              </div>
              <p className="italic mb-4">"I use the affirmations before every competition. They've become part of my pre-competition ritual and help me get into the right mindset."</p>
              <p className="font-semibold">- Marcus L., Nidan</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
