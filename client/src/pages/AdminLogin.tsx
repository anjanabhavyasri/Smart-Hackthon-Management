import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TerminalSquare, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login delay
    setTimeout(() => {
      setLocation("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      
      <div className="mb-8 flex items-center gap-2 z-10">
        <div className="bg-primary p-2 rounded-xl text-white shadow-sm">
          <TerminalSquare className="h-6 w-6" />
        </div>
        <span className="font-display font-bold text-2xl tracking-tight text-slate-900">
          Smart<span className="text-primary">Hack</span>
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md z-10"
      >
        <Card className="border-0 shadow-xl shadow-slate-200/50">
          <CardHeader className="space-y-1 pb-6 text-center">
            <CardTitle className="text-2xl font-display font-bold text-slate-900">Admin Portal</CardTitle>
            <CardDescription className="text-base">
              Sign in to manage hackathon events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-700 font-medium">Username</Label>
                <Input 
                  id="username" 
                  placeholder="admin@college.edu" 
                  className="h-12 bg-slate-50/50"
                  defaultValue="admin"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
                  <a href="#" className="text-sm font-medium text-primary hover:underline">Forgot password?</a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  className="h-12 bg-slate-50/50"
                  defaultValue="password"
                  required
                />
              </div>
              <div className="pt-2">
                <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
                  {isLoading ? "Authenticating..." : "Login to Dashboard"}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col border-t border-slate-100 bg-slate-50/50 py-4 mt-6">
            <p className="text-sm text-center text-slate-500">
              Demo Environment: Any credentials will work.
            </p>
            <div className="mt-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-slate-500">
                  Return to Home
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
