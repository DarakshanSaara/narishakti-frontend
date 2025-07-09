import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResultsPage.css";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Mock data state - will replace API calls
  const [mockData] = useState({
    matchedJobs: [
      {
        id: 1,
        jobTitle: "Frontend Developer",
        company: "Tech Solutions Inc.",
        location: "Remote",
        skillsRequired: "React, JavaScript, CSS",
        workType: "Full-time",
        applyLink: "https://example.com/job/1",
        matchScore: 92
      },
      {
        id: 2,
        jobTitle: "UX Designer",
        company: "Creative Minds LLC",
        location: "New York, NY",
        skillsRequired: "Figma, User Research, Prototyping",
        workType: "Contract",
        applyLink: "https://example.com/job/2",
        matchScore: 85
      }
    ],
    learningPath: [
      {
        skill: "Advanced React",
        reason: "Required for 80% of your matched jobs",
        resource: "https://reactjs.org/docs/getting-started.html"
      },
      {
        skill: "TypeScript",
        reason: "Increasing demand in job market",
        resource: "https://www.typescriptlang.org/docs/"
      }
    ],
    userName: "Demo User"
  });

  // Use mock data instead of location.state
  const { matchedJobs, learningPath, userName } = mockData;

  const handleSaveProgress = async (type, reference, status, link = "") => {
    try {
      // Mock API call - just log to console instead of real POST
      console.log("Mock save progress:", {
        userName,
        type,
        reference,
        status,
        link
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      alert(`Progress saved: ${type} ${reference} marked as ${status}`);
    } catch (error) {
      console.error("Mock error handling:", error);
      alert("Demo: Progress would be saved in production");
    }
  };

  return (
    <div className="results-container">
      <button onClick={() => navigate("/dashboard")} className="submit-btn">
        View Dashboard
      </button>
      
      <h2>Your Job Matches</h2>
      {matchedJobs.length === 0 ? (
        <p>No matching jobs found.</p>
      ) : (
        matchedJobs.map((job, index) => (
          <div key={index} className="job-card">
            <h3>{job.jobTitle} ({job.matchScore}% match)</h3>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Skills:</strong> {job.skillsRequired}</p>
            <p><strong>Work Type:</strong> {job.workType}</p>
            <a
              href={job.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSaveProgress("job", job.id, "applied", job.applyLink)}
              className="apply-btn"
            >
              Apply Here
            </a>
          </div>
        ))
      )}

      <h2>Recommended Learning Path</h2>
      {learningPath.length === 0 ? (
        <p>No recommendations needed!</p>
      ) : (
        learningPath.map((item, index) => (
          <div key={index} className="learn-card">
            <p><strong>{item.skill}</strong> - {item.reason}</p>
            <a
              href={item.resource}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSaveProgress("learning", item.skill, "started", item.resource)}
              className="learn-btn"
            >
              Learn {item.skill}
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default ResultsPage;
