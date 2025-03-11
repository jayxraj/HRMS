import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Menu, Users, LineChart } from "lucide-react";

const employees = [
  { id: 1, name: "John Doe", role: "Software Engineer" },
  { id: 2, name: "Jane Smith", role: "HR Manager" },
  { id: 3, name: "Emily Johnson", role: "Designer" },
];

const analyticsData = [
  { name: "Jan", employees: 50 },
  { name: "Feb", employees: 55 },
  { name: "Mar", employees: 60 },
];

export default function HRDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white w-64 p-5 ${
          menuOpen ? "block" : "hidden"
        } md:block`}
      >
        <h2 className="text-xl font-bold">HR Dashboard</h2>
        <nav className="mt-5 space-y-2">
          <button className="flex items-center gap-2 w-full p-2 rounded bg-gray-700">
            <Users size={20} /> Employees
          </button>
          <button className="flex items-center gap-2 w-full p-2 rounded bg-gray-700">
            <LineChart size={20} /> Analytics
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 bg-gray-100">
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          <Menu size={24} />
        </button>
        <h1 className="text-2xl font-bold">Welcome to HR Dashboard</h1>

        {/* Employee List */}
        <Card className="mt-5">
          <CardContent>
            <h2 className="text-lg font-semibold mb-3">Employee List</h2>
            <ul>
              {employees.map((emp) => (
                <li key={emp.id} className="p-2 border-b">
                  {emp.name} - {emp.role}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Analytics */}
        <Card className="mt-5">
          <CardContent>
            <h2 className="text-lg font-semibold mb-3">Employee Growth</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="employees" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
