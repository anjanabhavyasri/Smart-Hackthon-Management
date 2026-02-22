import { SidebarLayout } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Users, FileCode2, Target, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const stats = [
    { 
      title: "Total Hackathons", 
      value: "12", 
      trend: "+2 this semester",
      icon: CalendarDays,
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    { 
      title: "Registered Teams", 
      value: "348", 
      trend: "+12% from last event",
      icon: Users,
      color: "text-indigo-600",
      bg: "bg-indigo-100"
    },
    { 
      title: "Total Submissions", 
      value: "294", 
      trend: "84% submission rate",
      icon: FileCode2,
      color: "text-purple-600",
      bg: "bg-purple-100"
    },
    { 
      title: "Active Events", 
      value: "2", 
      trend: "Ongoing currently",
      icon: Target,
      color: "text-emerald-600",
      bg: "bg-emerald-100"
    },
  ];

  const activeEvents = [
    {
      id: 1,
      name: "FinTech Innovation Challenge 2026",
      domain: "FinTech",
      teams: 45,
      deadline: "Oct 24, 2026",
      status: "In Progress"
    },
    {
      id: 2,
      name: "AI for Sustainability",
      domain: "Artificial Intelligence",
      teams: 32,
      deadline: "Nov 02, 2026",
      status: "Registration Open"
    }
  ];

  return (
    <SidebarLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500 mt-2">Welcome back, Admin. Here's what's happening with your hackathons.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                    <stat.icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-display font-bold text-slate-900">{stat.value}</div>
                  <p className="text-xs text-slate-500 mt-1">
                    {stat.trend}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Active Events & Recent Activity */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-display">Active Events</CardTitle>
                <p className="text-sm text-slate-500 mt-1">Manage currently running hackathons</p>
              </div>
              <button className="text-sm font-medium text-primary hover:underline flex items-center">
                View All <ArrowUpRight className="h-4 w-4 ml-1" />
              </button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeEvents.map(event => (
                  <div key={event.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <div>
                      <h4 className="font-semibold text-slate-900">{event.name}</h4>
                      <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-200 text-slate-700">
                          {event.domain}
                        </span>
                        <span>{event.teams} Teams</span>
                        <span>Due: {event.deadline}</span>
                      </div>
                    </div>
                    <div>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        event.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <CardHeader>
              <CardTitle className="font-display text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <a href="/create" className="flex items-center p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors group">
                <div className="bg-primary/20 p-2 rounded-lg mr-3">
                  <Target className="h-4 w-4 text-blue-300" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">Generate Problem</h4>
                  <p className="text-xs text-slate-400">AI Ideation Engine</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors" />
              </a>
              <a href="/evaluation" className="flex items-center p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors group">
                <div className="bg-emerald-500/20 p-2 rounded-lg mr-3">
                  <FileCode2 className="h-4 w-4 text-emerald-300" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">Evaluate Submissions</h4>
                  <p className="text-xs text-slate-400">Pending reviews: 24</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors" />
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  );
}
