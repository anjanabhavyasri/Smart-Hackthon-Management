import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { TerminalSquare, Zap, Target, Layout, ShieldCheck, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="container mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-xl text-white shadow-sm shadow-primary/20">
            <TerminalSquare className="h-6 w-6" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-foreground">
            Smart<span className="text-primary">Hack</span>
          </span>
        </div>
        <Link href="/login">
          <Button variant="outline" className="font-medium rounded-full px-6 border-slate-200">Admin Login</Button>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden -z-10">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 -left-20 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-1/3 w-80 h-80 bg-slate-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-medium text-sm mb-4"
            >
              <Zap className="h-4 w-4" />
              <span>Next-Gen Hackathon Infrastructure</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-extrabold text-slate-900 leading-[1.1] tracking-tight"
            >
              Automating <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Hackathon</span> <br className="hidden md:block" />Management for Colleges
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
            >
              A centralized platform to generate unique problem statements, manage team registrations, and execute structured evaluations effortlessly.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/login">
                <Button size="lg" className="rounded-full px-8 h-14 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                  Go to Admin Dashboard
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">Centralized Hackathon Lifecycle Management</h2>
            <p className="text-slate-600 text-lg">Digitize event execution and improve transparency with our AI-driven ideation engine and structured evaluation framework.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
            >
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-slate-900 mb-3">AI-Driven Ideation Engine</h3>
              <p className="text-slate-600 leading-relaxed">Instantly generate structured problem statements categorized by domain and difficulty to ensure innovation diversity.</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
            >
              <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <Layout className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-slate-900 mb-3">Team Management</h3>
              <p className="text-slate-600 leading-relaxed">Centralized dashboard to track team registrations, monitor project submissions, and manage participant details seamlessly.</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
            >
              <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-slate-900 mb-3">Structured Evaluation</h3>
              <p className="text-slate-600 leading-relaxed">Multi-parameter scoring system covering innovation, technical feasibility, impact, and presentation with automated leaderboards.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
