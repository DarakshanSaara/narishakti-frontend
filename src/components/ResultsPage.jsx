import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResultsPage.css";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    matchedJobs = [],
    learningPath = [],
    userName = "Guest",
  } = location.state || {};

  const handleSaveProgress = async (type, reference, status, link = "") => {
    try {
      await axios.post("http://localhost:5000/save-progress", {
        userName,
        type,
        reference,
        status,
        link
      });
    } catch (error) {
      console.error("Error saving progress:", error);
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
            <h3>{job.jobTitle}</h3>
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