import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Users, 
  Award, 
  LogOut,
  Menu,
  TerminalSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/create", label: "Create Hackathon", icon: PlusCircle },
    { href: "/teams", label: "Team Management", icon: Users },
    { href: "/evaluation", label: "Evaluation", icon: Award },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-card shadow-sm"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Sidebar */}
      <aside 
        className={`
          fixed md:static inset-y-0 left-0 z-40 
          w-64 bg-sidebar text-sidebar-foreground 
          transform transition-transform duration-300 ease-in-out
          flex flex-col border-r border-sidebar-border
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-6 flex items-center gap-3 border-b border-sidebar-border/50">
          <div className="bg-primary/20 p-2 rounded-lg text-primary-foreground">
            <TerminalSquare className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg leading-tight tracking-tight">Smart<span className="text-blue-400">Hack</span></h1>
            <p className="text-xs text-sidebar-foreground/60 font-medium tracking-wider uppercase">Admin Portal</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            
            return (
              <Link key={item.href} href={item.href}>
                <a 
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group
                    ${isActive 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'}
                  `}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-blue-400' : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground/80'}`} />
                  {item.label}
                </a>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border/50">
          <Link href="/">
            <a className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-all duration-200 w-full group">
              <LogOut className="h-5 w-5 group-hover:text-destructive" />
              Logout
            </a>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto pb-12">
            {children}
          </div>
        </div>
      </main>
      
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </div>
  );
}
