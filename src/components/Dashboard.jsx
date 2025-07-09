import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const [progress, setProgress] = useState({
    jobs: [],
    learning: {}
  });
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Get userName from localStorage or use empty string
  const userName = localStorage.getItem("userName") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 1. Fetch user's progress
        const progressRes = await axios.get(
          `http://localhost:5000/get-progress?userName=${userName}`
        );
        
        // 2. Fetch matched job recommendations
        const skills = localStorage.getItem("skills") || "";
        const jobsRes = await axios.post("http://localhost:5000/match-jobs", {
          skills,
          interests: localStorage.getItem("interests") || "",
          education: localStorage.getItem("education") || "",
          availability: localStorage.getItem("availability") || ""
        });

        setProgress(progressRes.data);
        setMatchedJobs(jobsRes.data.matchedJobs || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userName) {
      fetchData();
    }
  }, [userName]);

  const handleUpdateStatus = async (type, reference, status) => {
    try {
      await axios.post("http://localhost:5000/save-progress", {
        userName,
        type,
        reference,
        status
      });
      
      // Update local state
      setProgress(prev => {
        if (type === "job") {
          const updatedJobs = prev.jobs.map(job => 
            job.reference === reference ? { ...job, status } : job
          );
          return { ...prev, jobs: updatedJobs };
        } else {
          return { 
            ...prev, 
            learning: { ...prev.learning, [reference]: status } 
          };
        }
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) {
    return <div className="dashboard-container">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <h2>{userName ? `${userName}'s` : "My"} Progress Dashboard</h2>
      <button onClick={() => navigate("/")} className="submit-btn">
        Back to Profile
      </button>

      {/* Applied Jobs Section */}
      <section className="dashboard-section">
        <h3>Applied Jobs</h3>
        {progress.jobs.length === 0 ? (
          <p>No jobs applied yet.</p>
        ) : (
          progress.jobs.map((job, i) => (
            <div key={i} className="progress-card">
              <h4>{job.title || job.reference}</h4>
              <p>Status: {job.status}</p>
              {job.link && (
                <a href={job.link} target="_blank" rel="noreferrer">
                  View Job
                </a>
              )}
            </div>
          ))
        )}
      </section>

      {/* Recommended Jobs Section */}
      <section className="dashboard-section">
        <h3>Recommended Jobs</h3>
        {matchedJobs.length === 0 ? (
          <p>No job recommendations.</p>
        ) : (
          matchedJobs.map((job, i) => (
            <div key={i} className="job-card">
              <h4>{job.jobTitle}</h4>
              <p>{job.company} • {job.location}</p>
              <button 
                onClick={() => 
                  handleUpdateStatus("job", job.id, "applied")
                }
                className="apply-btn"
              >
                Mark as Applied
              </button>
            </div>
          ))
        )}
      </section>

      {/* Learning Progress Section */}
      <section className="dashboard-section">
        <h3>Learning Progress</h3>
        {Object.keys(progress.learning).length === 0 ? (
          <p>No learning progress yet.</p>
        ) : (
          Object.entries(progress.learning).map(([skill, status]) => (
            <div key={skill} className="learn-card">
              <h4>{skill}</h4>
              <select
                value={status}
                onChange={(e) => 
                  handleUpdateStatus("learning", skill, e.target.value)
                }
              >
                <option value="started">Started</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          ))
        )}
      </section>
    </div>
  );
}