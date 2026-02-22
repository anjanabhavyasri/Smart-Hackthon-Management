import { SidebarLayout } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Trophy, Code2, Lightbulb, Presentation, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Mock Evaluation Data
const MOCK_SUBMISSIONS = [
  {
    id: "T-1042",
    name: "CyberKnights",
    problem: "Predictive Analytics for Early Disease Detection",
    repoLink: "github.com/cyberknights/pred-med",
    demoLink: "predmed.vercel.app",
    evaluated: false
  },
  {
    id: "T-1044",
    name: "CodeCrafters",
    problem: "Campus Chatbot for Student Queries",
    repoLink: "github.com/cc/campus-bot",
    demoLink: "campusbot.edu",
    evaluated: true,
    score: 34
  }
];

export default function Evaluation() {
  const { toast } = useToast();
  const [activeSubmission, setActiveSubmission] = useState(MOCK_SUBMISSIONS[0]);
  
  // Scoring parameters (0-10)
  const [scores, setScores] = useState({
    innovation: 5,
    technical: 5,
    impact: 5,
    presentation: 5
  });

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  const handleSubmitScore = () => {
    toast({
      title: "Evaluation Submitted",
      description: `${activeSubmission.name} scored ${totalScore}/40 points.`,
      className: "bg-slate-900 text-white border-none",
    });
    
    // Move to next un-evaluated submission
    const next = MOCK_SUBMISSIONS.find(s => !s.evaluated && s.id !== activeSubmission.id);
    if(next) setActiveSubmission(next);
  };

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-slate-900">Structured Evaluation</h1>
          <p className="text-slate-500 mt-1">Review projects based on standard parameters to maintain transparency.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Submission List Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-semibold text-slate-900 px-1">Pending Reviews</h3>
            {MOCK_SUBMISSIONS.map((sub) => (
              <Card 
                key={sub.id} 
                className={`border-0 shadow-sm cursor-pointer transition-all ${
                  activeSubmission.id === sub.id 
                    ? 'ring-2 ring-primary bg-blue-50/50' 
                    : 'hover:bg-slate-50'
                }`}
                onClick={() => setActiveSubmission(sub)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-slate-900 leading-tight">{sub.name}</h4>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">{sub.id}</p>
                    </div>
                    {sub.evaluated ? (
                      <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-md">
                        {sub.score}/40
                      </span>
                    ) : (
                      <span className="bg-amber-100 text-amber-700 text-xs font-medium px-2 py-1 rounded-md">
                        Pending
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-1">{sub.problem}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Evaluation Panel */}
          <div className="lg:col-span-8">
            {activeSubmission ? (
              <Card className="border-0 shadow-md h-full flex flex-col">
                <CardHeader className="bg-slate-50/80 border-b border-slate-100 pb-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0 rounded shadow-none">{activeSubmission.id}</Badge>
                        {activeSubmission.evaluated && (
                          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 rounded shadow-none flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" /> Evaluated
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-2xl font-display font-bold text-slate-900">{activeSubmission.name}</CardTitle>
                      <CardDescription className="text-slate-600 mt-1">{activeSubmission.problem}</CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-4 pt-4 border-t border-slate-200/60">
                    <a href={`https://${activeSubmission.repoLink}`} target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-600 hover:text-primary flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-sm">
                      <Code2 className="h-4 w-4 text-slate-400" /> Source Code
                    </a>
                    <a href={`https://${activeSubmission.demoLink}`} target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-600 hover:text-primary flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-sm">
                      <ArrowRight className="h-4 w-4 text-slate-400" /> Live Demo
                    </a>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 p-6 lg:p-8">
                  <h3 className="font-display font-semibold text-lg mb-6">Evaluation Rubric</h3>
                  
                  <div className="space-y-8 max-w-2xl">
                    {/* Innovation */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label className="flex items-center gap-2 text-base font-medium text-slate-800">
                          <div className="bg-amber-100 p-1.5 rounded text-amber-600"><Lightbulb className="h-4 w-4" /></div>
                          Innovation & Creativity
                        </Label>
                        <span className="font-display font-bold text-xl text-slate-900">{scores.innovation}<span className="text-sm text-slate-400 font-normal">/10</span></span>
                      </div>
                      <Slider 
                        defaultValue={[5]} max={10} step={1} 
                        value={[scores.innovation]}
                        onValueChange={(val) => setScores({...scores, innovation: val[0]})}
                        className="py-2"
                        disabled={activeSubmission.evaluated}
                      />
                    </div>

                    {/* Technical Feasibility */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label className="flex items-center gap-2 text-base font-medium text-slate-800">
                          <div className="bg-blue-100 p-1.5 rounded text-blue-600"><Code2 className="h-4 w-4" /></div>
                          Technical Feasibility & Execution
                        </Label>
                        <span className="font-display font-bold text-xl text-slate-900">{scores.technical}<span className="text-sm text-slate-400 font-normal">/10</span></span>
                      </div>
                      <Slider 
                        defaultValue={[5]} max={10} step={1}
                        value={[scores.technical]}
                        onValueChange={(val) => setScores({...scores, technical: val[0]})}
                        className="py-2"
                        disabled={activeSubmission.evaluated}
                      />
                    </div>

                    {/* Impact */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label className="flex items-center gap-2 text-base font-medium text-slate-800">
                          <div className="bg-emerald-100 p-1.5 rounded text-emerald-600"><Trophy className="h-4 w-4" /></div>
                          Real-World Impact
                        </Label>
                        <span className="font-display font-bold text-xl text-slate-900">{scores.impact}<span className="text-sm text-slate-400 font-normal">/10</span></span>
                      </div>
                      <Slider 
                        defaultValue={[5]} max={10} step={1}
                        value={[scores.impact]}
                        onValueChange={(val) => setScores({...scores, impact: val[0]})}
                        className="py-2"
                        disabled={activeSubmission.evaluated}
                      />
                    </div>

                    {/* Presentation */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label className="flex items-center gap-2 text-base font-medium text-slate-800">
                          <div className="bg-purple-100 p-1.5 rounded text-purple-600"><Presentation className="h-4 w-4" /></div>
                          Presentation & UI/UX
                        </Label>
                        <span className="font-display font-bold text-xl text-slate-900">{scores.presentation}<span className="text-sm text-slate-400 font-normal">/10</span></span>
                      </div>
                      <Slider 
                        defaultValue={[5]} max={10} step={1}
                        value={[scores.presentation]}
                        onValueChange={(val) => setScores({...scores, presentation: val[0]})}
                        className="py-2"
                        disabled={activeSubmission.evaluated}
                      />
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="bg-slate-50 border-t border-slate-100 p-6 flex justify-between items-center rounded-b-xl">
                  <div>
                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Total Score</p>
                    <div className="text-4xl font-display font-extrabold text-slate-900">
                      {activeSubmission.evaluated ? activeSubmission.score : totalScore}
                      <span className="text-lg text-slate-400 font-normal">/40</span>
                    </div>
                  </div>
                  {!activeSubmission.evaluated && (
                    <Button onClick={handleSubmitScore} size="lg" className="h-12 px-8 shadow-lg shadow-primary/20">
                      Submit Score
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ) : (
              <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-slate-500">
                Select a team from the list to begin evaluation
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}

// Temporary Badge component inline to avoid extra file creation just for evaluation page
function Badge({ children, className, variant = "default" }: any) {
  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </div>
  )
}
