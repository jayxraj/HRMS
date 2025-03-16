import React, { useState } from "react";
import { Bar, Pie } from "recharts";
import { Users, Briefcase, Calendar, Activity } from "lucide-react";

const data = [
  { name: "Employees", value: 120 },
  { name: "On Leave", value: 10 },
  { name: "New Hires", value: 5 },
];

const payrollData = [
  { month: "Jan", salary: 50000 },
  { month: "Feb", salary: 52000 },
  { month: "Mar", salary: 53000 },
];

export default function HRDashboard() {
  const [selectedView, setSelectedView] = useState("employees");

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-72 h-full bg-gradient-to-b from-indigo-600 to-blue-800 text-white p-6 flex flex-col gap-6 shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">HR Dashboard</h2>
        <div className="flex flex-col gap-4 mt-6">
          <button
            className="flex items-center gap-4 text-lg hover:bg-indigo-500 p-3 rounded-xl transition-all duration-300"
            onClick={() => setSelectedView("employees")}
          >
            <Users size={24} />
            <span>Employees</span>
          </button>
          <button
            className="flex items-center gap-4 text-lg hover:bg-green-500 p-3 rounded-xl transition-all duration-300"
            onClick={() => setSelectedView("recruitment")}
          >
            <Briefcase size={24} />
            <span>Recruitment</span>
          </button>
          <button
            className="flex items-center gap-4 text-lg hover:bg-yellow-500 p-3 rounded-xl transition-all duration-300"
            onClick={() => setSelectedView("leave")}
          >
            <Calendar size={24} />
            <span>Leave Management</span>
          </button>
          <button
            className="flex items-center gap-4 text-lg hover:bg-red-500 p-3 rounded-xl transition-all duration-300"
            onClick={() => setSelectedView("payroll")}
          >
            <Activity size={24} />
            <span>Payroll</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {selectedView === "employees" && (
            <>
              <div className="shadow-lg rounded-xl bg-white p-6 flex items-center justify-between space-x-4 transition-all duration-300 hover:shadow-2xl">
                <Users className="text-indigo-600" size={36} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Total Employees
                  </h3>
                  <p className="text-3xl font-bold text-gray-800">120</p>
                </div>
              </div>
              <div className="shadow-lg rounded-xl bg-white p-6 flex items-center justify-between space-x-4 transition-all duration-300 hover:shadow-2xl">
                <Briefcase className="text-green-600" size={36} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Recruitments
                  </h3>
                  <p className="text-3xl font-bold text-gray-800">5</p>
                </div>
              </div>
              <div className="shadow-lg rounded-xl bg-white p-6 flex items-center justify-between space-x-4 transition-all duration-300 hover:shadow-2xl">
                <Calendar className="text-yellow-600" size={36} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    On Leave
                  </h3>
                  <p className="text-3xl font-bold text-gray-800">10</p>
                </div>
              </div>
              <div className="shadow-lg rounded-xl bg-white p-6 flex items-center justify-between space-x-4 transition-all duration-300 hover:shadow-2xl">
                <Activity className="text-red-600" size={36} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Payroll Processed
                  </h3>
                  <p className="text-3xl font-bold text-gray-800">$53,000</p>
                </div>
              </div>
            </>
          )}

          {selectedView === "recruitment" && (
            <div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 p-6 shadow-lg rounded-xl bg-white transition-all duration-300 hover:shadow-2xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Recruitment Data
              </h3>
              <p>Recruitment details and stats will be displayed here.</p>
            </div>
          )}

          {selectedView === "leave" && (
            <div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 p-6 shadow-lg rounded-xl bg-white transition-all duration-300 hover:shadow-2xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Leave Management
              </h3>
              <p>Leave statistics and management tools will be here.</p>
            </div>
          )}

          {selectedView === "payroll" && (
            <>
              <div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 p-6 shadow-lg rounded-xl bg-white transition-all duration-300 hover:shadow-2xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Employee Distribution
                </h3>
                <Pie data={data} dataKey="value" nameKey="name" />
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 p-6 shadow-lg rounded-xl bg-white transition-all duration-300 hover:shadow-2xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Payroll Trends
                </h3>
                <Bar data={payrollData} dataKey="salary" nameKey="month" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
