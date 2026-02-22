import { SidebarLayout } from "@/components/layout/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, CheckCircle, XCircle, FileText, Eye } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Mock Data
const MOCK_TEAMS = [
  { id: "T-1042", name: "CyberKnights", members: 4, problem: "Predictive Analytics for Early Disease", status: "Submitted", time: "2 hours ago" },
  { id: "T-1043", name: "DataDemons", members: 3, problem: "Smart Appointment Triage System", status: "Working", time: "-" },
  { id: "T-1044", name: "CodeCrafters", members: 4, problem: "Campus Chatbot for Student Queries", status: "Submitted", time: "5 hours ago" },
  { id: "T-1045", name: "InnovateX", members: 2, problem: "Smart Appointment Triage System", status: "Under Review", time: "1 day ago" },
  { id: "T-1046", name: "NeuralNets", members: 4, problem: "Predictive Analytics for Early Disease", status: "Working", time: "-" },
  { id: "T-1047", name: "TechTitans", members: 3, problem: "Campus Chatbot for Student Queries", status: "Approved", time: "2 days ago" },
];

export default function TeamManagement() {
  const { toast } = useToast();
  const [teams, setTeams] = useState(MOCK_TEAMS);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    team.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.problem.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Submitted":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0 rounded-md shadow-none">Submitted</Badge>;
      case "Working":
        return <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-0 rounded-md shadow-none">Working</Badge>;
      case "Under Review":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0 rounded-md shadow-none">Under Review</Badge>;
      case "Approved":
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 rounded-md shadow-none">Approved</Badge>;
      case "Rejected":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-0 rounded-md shadow-none">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleAction = (id: string, action: string) => {
    const newStatus = action === 'approve' ? 'Approved' : 'Rejected';
    
    setTeams(teams.map(t => 
      t.id === id ? { ...t, status: newStatus } : t
    ));

    toast({
      title: `Submission ${newStatus}`,
      description: `Team ${id} status updated successfully.`,
    });
  };

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold tracking-tight text-slate-900">Team Management</h1>
            <p className="text-slate-500 mt-1">Monitor registrations and manage project submissions.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white">
              <FileText className="mr-2 h-4 w-4" /> Export CSV
            </Button>
          </div>
        </div>

        <Card className="border-0 shadow-sm">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center rounded-t-xl">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search teams, IDs, or problems..." 
                className="pl-9 bg-white border-slate-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="bg-white border-slate-200 w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" /> Filter Status
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/30 hover:bg-slate-50/30">
                  <TableHead className="font-semibold text-slate-600">Team Details</TableHead>
                  <TableHead className="font-semibold text-slate-600 hidden md:table-cell">Members</TableHead>
                  <TableHead className="font-semibold text-slate-600 hidden lg:table-cell">Selected Problem</TableHead>
                  <TableHead className="font-semibold text-slate-600">Status</TableHead>
                  <TableHead className="font-semibold text-slate-600 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeams.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                      No teams found matching your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTeams.map((team) => (
                    <TableRow key={team.id} className="hover:bg-slate-50/50 transition-colors">
                      <TableCell>
                        <div className="font-medium text-slate-900">{team.name}</div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">{team.id}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-slate-600">
                        {team.members} Students
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="text-sm text-slate-600 truncate max-w-xs" title={team.problem}>
                          {team.problem}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(team.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-primary hover:bg-blue-50">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {(team.status === "Submitted" || team.status === "Under Review") && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                                onClick={() => handleAction(team.id, 'approve')}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleAction(team.id, 'reject')}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </SidebarLayout>
  );
}
