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

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileForm from "./components/ProfileForm";
import ResultsPage from "./components/ResultsPage";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProfileForm />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
