import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import UniversityDashboard from "./components/UniversityDashboard";
import Students from "./pages/Students"; 
import Grades from "./pages/Grades";       
import ReportCard from "./pages/ReportCard"; 
import Attendance from "./pages/Attendance"; 
import Courses from "./pages/Courses"; 

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [open, setOpen] = useState(true);

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <UniversityDashboard />;
      case "students":
        return <Students />;
      case "grades":
        return <Grades />;
      case "report": 
        return <ReportCard />;
      case "attendance": 
        return <Attendance />;
      case "courses": 
        return <Courses />;
      default:
        return <UniversityDashboard />;
    }
  };

  return (
    <div style={{ display: "flex", background: "#F8FAFC", minHeight: "100vh" }}>
      <Sidebar page={page} setPage={setPage} open={open} setOpen={setOpen} />
      <div style={{ flex: 1, overflowX: "hidden" }}>
        {renderPage()}
      </div>
    </div>
  );
}