import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

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

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
  };

  return (
    <header className="bg-primary text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-noto font-bold">JudoMind</a>
        </Link>
        <div className="hidden md:block">
          <nav className="flex space-x-6 items-center">
            <Link href="/">
              <a className={`hover:text-accent transition duration-300 ${location === "/" ? "text-accent border-accent border-b-2" : ""}`}>Home</a>
            </Link>
            <Link href="/affirmations">
              <a className={`hover:text-accent transition duration-300 ${location === "/affirmations" ? "text-accent border-accent border-b-2" : ""}`}>Affirmations</a>
            </Link>
            <Link href="/breathing">
              <a className={`hover:text-accent transition duration-300 ${location === "/breathing" ? "text-accent border-accent border-b-2" : ""}`}>Breathing</a>
            </Link>
            {isAuthenticated && (
              <Link href="/sessions">
                <a className={`hover:text-accent transition duration-300 ${location === "/sessions" ? "text-accent border-accent border-b-2" : ""}`}>Sessions</a>
              </Link>
            )}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-white/10">
                      <AvatarFallback className="bg-accent text-white">{getInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <Link href="/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className="cursor-pointer text-red-500" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                  Sign In
                </Button>
              </Link>
            )}
          </nav>
        </div>
        
        {/* Mobile: Only show auth button, nav is in mobile-nav component */}
        <div className="md:hidden">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-white/10">
                    <AvatarFallback className="bg-accent text-white">{getInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <Link href="/profile">
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="cursor-pointer text-red-500" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-primary" size="sm">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
