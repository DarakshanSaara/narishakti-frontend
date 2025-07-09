import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OpportunitiesPage.css";

export default function OpportunitiesPage() {
  const { state } = useLocation();
  const jobs = state?.matchedJobs || [];
  const navigate = useNavigate();

  return (
    <div className="opportunities-container">
      <button className="back-btn" onClick={() => navigate("/")}>← Back</button>
      <h2>Top Job Matches</h2>

      {jobs.length === 0 ? (
        <p>No job matches found.</p>
      ) : (
        jobs.map((job, index) => (
          <div className="job-card" key={index}>
            <h3>@ {job.company || "Unknown Company"}</h3>
            <p><strong>Location:</strong> {job.location || "Not specified"}</p>
            <p><strong>Skills Required:</strong> {job.skillsRequired || "Not specified"}</p>
            <p><strong>Description:</strong> {job.description || "No description available."}</p>
            <p><strong>Work Type:</strong> {job.workType || "Not specified"}</p>
            <p><strong>Salary:</strong> {job.salary || "Not disclosed"}</p>
            <p><strong>Experience:</strong> {job.experienceLevel || "Not mentioned"}</p>
          </div>
        ))
      )}
    </div>
  );
}
