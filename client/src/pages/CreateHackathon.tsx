import { SidebarLayout } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Save, Target, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

// Mock Problem Statements Database
const MOCK_PROBLEMS: Record<string, Record<string, any[]>> = {
  "Healthcare": {
    "Advanced": [
      {
        title: "Predictive Analytics for Early Disease Detection",
        description: "Develop an AI-driven platform that aggregates patient vitals, genetic history, and lifestyle data to predict the onset of chronic diseases with high accuracy.",
        background: "Early detection of diseases like diabetes or cardiovascular issues can significantly reduce mortality rates. Current systems are fragmented and lack predictive capabilities.",
        approach: "Build a machine learning model using random forests or neural networks, integrated into a dashboard for medical professionals.",
        constraints: "Strict adherence to HIPAA compliance for data privacy. Model must achieve >90% precision with low false positive rate.",
        techStack: "Python, TensorFlow, React, Node.js, PostgreSQL",
        futureScope: "Integration with wearable IoT devices for real-time monitoring."
      }
    ],
    "Intermediate": [
      {
        title: "Smart Appointment Triage System",
        description: "Create a system that intelligently categorizes and schedules patient appointments based on urgency, symptoms described, and doctor availability.",
        background: "Wait times in clinics are often mismanaged because all appointments are treated with equal urgency, leading to delays for critical cases.",
        approach: "Use NLP to analyze patient symptom descriptions and an algorithm to optimize calendar slots dynamically.",
        constraints: "Must handle multi-clinic scheduling. Response time for triage under 2 seconds.",
        techStack: "Node.js, Express, NLP Library (e.g., SpaCy), MongoDB",
        futureScope: "Telemedicine integration for immediate low-level consults."
      }
    ]
  },
  "Artificial Intelligence": {
    "Beginner": [
      {
        title: "Campus Chatbot for Student Queries",
        description: "Build an intelligent chatbot that helps students find information about courses, schedules, campus facilities, and events.",
        background: "Students often spend too much time navigating college portals to find basic information.",
        approach: "Develop a rule-based or basic NLP chatbot integrated into the college website or messaging apps.",
        constraints: "Must provide accurate responses 95% of the time. Simple UI.",
        techStack: "Dialogflow/Rasa, React, Firebase",
        futureScope: "Voice interface integration."
      }
    ]
  }
};

export default function CreateHackathon() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProblem, setGeneratedProblem] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    difficulty: "",
    deadline: ""
  });

  const handleGenerate = () => {
    if (!formData.name || !formData.domain || !formData.difficulty || !formData.deadline) {
      toast({
        title: "Missing Fields",
        description: "Please fill all hackathon details before generating.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedProblem(null);

    // Simulate AI generation delay
    setTimeout(() => {
      // Find a matching problem or use a generic one
      const domainProblems = MOCK_PROBLEMS[formData.domain] || {};
      const problemsList = domainProblems[formData.difficulty] || [
        {
          title: `Optimized Solution for ${formData.domain} Challenges`,
          description: `Develop a comprehensive solution to address key bottlenecks in the ${formData.domain} sector using modern technologies.`,
          background: `The ${formData.domain} industry currently faces significant efficiency challenges that can be solved through digital transformation.`,
          approach: `Create a scalable web/mobile application that digitizes current manual workflows and provides actionable insights.`,
          constraints: `Solution must be deployable on standard cloud infrastructure and handle at least 1000 concurrent users.`,
          techStack: "React/Next.js, Node.js/Python, Cloud Database",
          futureScope: "AI integration for predictive modeling."
        }
      ];

      // Pick random from list (mock random)
      const selected = problemsList[Math.floor(Math.random() * problemsList.length)];
      setGeneratedProblem(selected);
      setIsGenerating(false);
      
      toast({
        title: "Generation Complete",
        description: "AI-Driven Ideation Engine successfully created a problem statement.",
      });
    }, 1500);
  };

  const handlePublish = () => {
    toast({
      title: "Hackathon Published!",
      description: `${formData.name} is now live and accepting registrations.`,
      className: "bg-emerald-600 text-white border-none",
    });
  };

  return (
    <SidebarLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-slate-900">Create Hackathon</h1>
          <p className="text-slate-500 mt-2">Set up event details and utilize the AI Ideation Engine for problem statements.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Event Details Form */}
          <Card className="lg:col-span-5 border-0 shadow-sm h-fit">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Event Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-medium">Hackathon Name</Label>
                <Input 
                  id="name" 
                  placeholder="e.g. Winter Tech Fest 2026" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label className="font-medium">Domain Category</Label>
                <Select onValueChange={(val) => setFormData({...formData, domain: val})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="FinTech">FinTech</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Sustainability">Sustainability</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="font-medium">Difficulty Level</Label>
                <Select onValueChange={(val) => setFormData({...formData, difficulty: val})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target audience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner (1st/2nd Year)</SelectItem>
                    <SelectItem value="Intermediate">Intermediate (3rd/4th Year)</SelectItem>
                    <SelectItem value="Advanced">Advanced (Postgrad/Pros)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline" className="font-medium">Submission Deadline</Label>
                <Input 
                  id="deadline" 
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                />
              </div>
            </CardContent>
            <CardFooter className="pt-2 pb-6 px-6">
              <Button 
                className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white" 
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <span className="flex items-center">
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" /> 
                    Generating via AI Engine...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Sparkles className="mr-2 h-4 w-4" /> 
                    Generate Problem Statement
                  </span>
                )}
              </Button>
            </CardFooter>
          </Card>

          {/* Generated Output Area */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!generatedProblem && !isGenerating ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-center p-8 bg-slate-50/50"
                >
                  <div className="bg-slate-100 p-4 rounded-full mb-4">
                    <Sparkles className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="font-display font-medium text-slate-900 text-lg">AI Ideation Engine Ready</h3>
                  <p className="text-slate-500 max-w-sm mt-2">Fill out the event configuration and click generate to create a unique, structured problem statement.</p>
                </motion.div>
              ) : isGenerating ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[400px] border border-slate-200 rounded-xl flex flex-col items-center justify-center p-8 bg-white shadow-sm"
                >
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
                    <div className="w-16 h-16 border-4 border-primary rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                    <Sparkles className="h-6 w-6 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <h3 className="font-display font-medium text-slate-900 mt-6 text-lg">Synthesizing Context...</h3>
                  <p className="text-slate-500 mt-2 text-sm">Applying Innovation Diversity Control System</p>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col h-full gap-4"
                >
                  <Card className="border-0 shadow-sm overflow-hidden flex-1">
                    <div className="bg-primary/5 px-6 py-4 border-b border-primary/10 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        <span className="font-medium text-primary text-sm uppercase tracking-wider">Statement Generated</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="bg-white px-2 py-1 rounded-md text-xs font-semibold shadow-sm text-slate-700 border border-slate-100">{formData.domain}</span>
                        <span className="bg-white px-2 py-1 rounded-md text-xs font-semibold shadow-sm text-slate-700 border border-slate-100">{formData.difficulty}</span>
                      </div>
                    </div>
                    
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h2 className="text-2xl font-display font-bold text-slate-900 leading-tight">
                          {generatedProblem.title}
                        </h2>
                      </div>

                      <div className="space-y-4">
                        <section>
                          <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Problem Description
                          </h4>
                          <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
                            {generatedProblem.description}
                          </p>
                        </section>

                        <div className="grid grid-cols-2 gap-4">
                          <section>
                            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span> Background Context
                            </h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                              {generatedProblem.background}
                            </p>
                          </section>
                          
                          <section>
                            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Expected Approach
                            </h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                              {generatedProblem.approach}
                            </p>
                          </section>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <section>
                            <h4 className="text-sm font-semibold text-slate-900 mb-1">Constraints</h4>
                            <p className="text-slate-600 text-sm">{generatedProblem.constraints}</p>
                          </section>
                          <section>
                            <h4 className="text-sm font-semibold text-slate-900 mb-1">Suggested Tech Stack</h4>
                            <p className="text-slate-600 text-sm">{generatedProblem.techStack}</p>
                          </section>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={handleGenerate} className="bg-white">
                      Regenerate
                    </Button>
                    <Button onClick={handlePublish} className="shadow-md shadow-primary/20 h-10">
                      <Save className="mr-2 h-4 w-4" /> Publish Hackathon
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
