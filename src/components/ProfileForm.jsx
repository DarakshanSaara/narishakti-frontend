import { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./ProfileForm.css";

const skillOptions = [
  { value: "React", label: "React" },
  { value: "Content Writing", label: "Content Writing" },
  // ... keep all your skill options
];

// Pre-defined mock data
const MOCK_JOBS = [
  {
    id: 1,
    jobTitle: "Frontend Developer",
    company: "Tech Solutions Inc.",
    location: "Remote",
    skillsRequired: "React, JavaScript, CSS",
    workType: "Full-time",
    applyLink: "#",
    matchScore: 92
  },
  {
    id: 2,
    jobTitle: "UX Designer",
    company: "Creative Minds",
    location: "Hybrid",
    skillsRequired: "Figma, User Research",
    workType: "Part-time",
    applyLink: "#",
    matchScore: 85
  }
];

const MOCK_LEARNING = [
  {
    skill: "Advanced React",
    reason: "Required for 80% of matched jobs",
    resource: "#"
  },
  {
    skill: "Career Networking",
    reason: "Expand your professional connections",
    resource: "#"
  }
];

export default function ProfileForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    background: "",
    interest: "",
    availability: "",
    skills: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (selected) => {
    const values = selected ? selected.map((opt) => opt.value) : [];
    setFormData({ ...formData, skills: values });
  };

  const handleShowOpportunities = (e) => {
    e.preventDefault();
    // Save to localStorage
    localStorage.setItem("userName", formData.name || "Demo User");
    localStorage.setItem("skills", formData.skills.join(",") || "React,Design");
    localStorage.setItem("interests", formData.interest || "Technology");
    localStorage.setItem("education", formData.background || "Computer Science");
    localStorage.setItem("availability", formData.availability || "Full-time");
    
    // Use pre-defined mock data
    navigate("/results", {
      state: {
        matchedJobs: MOCK_JOBS,
        learningPath: MOCK_LEARNING,
        userName: formData.name || "Demo User",
      },
    });
  };

  const handleViewDashboard = () => {
    // Ensure default values exist
    localStorage.setItem("userName", formData.name || "Demo User");
    navigate("/dashboard");
  };

  return (
    <div className="profile-page">
      <div className="profile-section">
        <div className="image-side">
          <img src="/assets/woman.svg" alt="Working Woman" className="profile-image" />
        </div>
        <div className="form-side">
          <h2>Build Your Profile</h2>
          <form onSubmit={handleShowOpportunities}>
            {/* Keep all your existing form fields */}
            <button 
              type="submit" 
              className="submit-btn"
            >
              Show My Opportunities
            </button>
            <button 
              type="button" 
              onClick={handleViewDashboard}
              className="submit-btn"
            >
              View Progress Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
