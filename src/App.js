// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
// import ProfileForm from "./components/ProfileForm";
// import OpportunitiesPage from "./components/OpportunitiesPage"; // <-- Make sure this file exists

// function App() {
//   return (
//     <div className="app-background">
//       <Router>
//         <Routes>
//           <Route path="/" element={<ProfileForm />} />
//           <Route path="/opportunities" element={<OpportunitiesPage />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileForm from "./components/ProfileForm";
import ResultsPage from "./components/ResultsPage";
import Dashboard from "./components/Dashboard";
import Health from "./pages/api/Health";
import "./App.css";

const MOCK_JOBS = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions Inc.",
    match_score: 92,
    skills: ["React", "JavaScript", "CSS"],
    progress: 70,
    status: "Applied"
  },
  {
    id: 2, 
    title: "UX Designer",
    company: "Creative Minds LLC",
    match_score: 85,
    skills: ["Figma", "User Research", "Prototyping"],
    progress: 45,
    status: "Interview Scheduled"
  }
];

const MOCK_PROGRESS = {
  completed: 5,
  total: 10,
  last_updated: new Date().toISOString(),
  upcoming_deadlines: [
    { id: 1, name: "Complete React Course", date: "2023-12-01" },
    { id: 2, name: "Portfolio Submission", date: "2023-12-15" }
  ]
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProfileForm />} />
        <Route 
          path="/results" 
          element={<ResultsPage jobs={MOCK_JOBS} />} 
        />
        <Route 
          path="/dashboard" 
          element={<Dashboard progress={MOCK_PROGRESS} />} 
        />
        <Route path="/health" element={<Health />} />
      </Routes>
    </Router>
  );
}

export default App;
