import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const [progress, setProgress] = useState({
    jobs: [],
    learning: {}
  });
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [loading, setLoading] = useState(false); // Set to false since we're using mock data
  const navigate = useNavigate();
  
  // Mock user data
  const userName = "Demo User";
  const mockSkills = "React, JavaScript, UX Design";
  
  // Comprehensive mock data
  const MOCK_PROGRESS = {
    jobs: [
      {
        reference: "1",
        title: "Frontend Developer at Tech Corp",
        status: "applied",
        link: "https://example.com/jobs/1"
      },
      {
        reference: "2",
        title: "UX Designer at Creative Labs",
        status: "interview",
        link: "https://example.com/jobs/2"
      }
    ],
    learning: {
      "Advanced React": "in-progress",
      "TypeScript": "started",
      "User Research": "completed"
    }
  };

  const MOCK_JOBS = [
    {
      id: "3",
      jobTitle: "React Developer",
      company: "Digital Solutions",
      location: "Remote",
      matchScore: 92
    },
    {
      id: "4",
      jobTitle: "UI/UX Designer",
      company: "Design Innovators",
      location: "New York, NY",
      matchScore: 88
    }
  ];

  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      setProgress(MOCK_PROGRESS);
      setMatchedJobs(MOCK_JOBS);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleUpdateStatus = async (type, reference, status) => {
    // Mock API call - just update local state
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
    
    // Show mock success message
    console.log(`Mock: Updated ${type} ${reference} to ${status}`);
    alert(`Demo: ${type === "job" ? "Job" : "Learning"} status updated to ${status}`);
  };

  return (
    <div className="dashboard-container">
      <h2>{userName}'s Progress Dashboard</h2>
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
              <h4>{job.title}</h4>
              <p>Status: {job.status}</p>
              {job.link && (
                <a href={job.link} target="_blank" rel="noreferrer">
                  View Job
                </a>
              )}
              <div className="status-buttons">
                <button onClick={() => handleUpdateStatus("job", job.reference, "applied")}>
                  Applied
                </button>
                <button onClick={() => handleUpdateStatus("job", job.reference, "interview")}>
                  Interview
                </button>
                <button onClick={() => handleUpdateStatus("job", job.reference, "offer")}>
                  Offer
                </button>
              </div>
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
              <h4>{job.jobTitle} ({job.matchScore}% match)</h4>
              <p>{job.company} • {job.location}</p>
              <p>Skills: {mockSkills}</p>
              <button 
                onClick={() => handleUpdateStatus("job", job.id, "applied")}
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
              <p>Status: {status}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
