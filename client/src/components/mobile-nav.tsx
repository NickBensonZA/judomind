import { Link, useLocation } from "wouter";
import { Home, Brain, Wind, Calendar } from "lucide-react";

export default function MobileNav() {
  const [location] = useLocation();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-primary text-white shadow-lg z-50">
      <div className="flex justify-around">
        <Link href="/">
          <a className={`flex flex-col items-center py-3 ${location === "/" ? "text-accent border-t-2 border-accent" : "text-gray-300"}`}>
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">Home</span>
          </a>
        </Link>
        <Link href="/affirmations">
          <a className={`flex flex-col items-center py-3 ${location === "/affirmations" ? "text-accent border-t-2 border-accent" : "text-gray-300"}`}>
            <Brain className="w-5 h-5" />
            <span className="text-xs mt-1">Affirmations</span>
          </a>
        </Link>
        <Link href="/breathing">
          <a className={`flex flex-col items-center py-3 ${location === "/breathing" ? "text-accent border-t-2 border-accent" : "text-gray-300"}`}>
            <Wind className="w-5 h-5" />
            <span className="text-xs mt-1">Breathing</span>
          </a>
        </Link>
        <Link href="/sessions">
          <a className={`flex flex-col items-center py-3 ${location === "/sessions" ? "text-accent border-t-2 border-accent" : "text-gray-300"}`}>
            <Calendar className="w-5 h-5" />
            <span className="text-xs mt-1">Sessions</span>
          </a>
        </Link>
      </div>
    </div>
  );
}
