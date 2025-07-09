import { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./ProfileForm.css";

const skillOptions = [
  { value: "React", label: "React" },
  { value: "Content Writing", label: "Content Writing" },
  { value: "Digital Marketing", label: "Digital Marketing" },
  { value: "Python", label: "Python" },
  { value: "SEO", label: "SEO" },
  { value: "Teaching", label: "Teaching" },
  { value: "HR Management", label: "HR Management" },
  { value: "Excel", label: "Excel" },
  { value: "Social Media", label: "Social Media" },
  { value: "Graphic Design", label: "Graphic Design" },
];

// Mock data generator
const generateMockResponse = (skills) => {
  const mockJobs = [
    {
      id: 1,
      jobTitle: "Frontend Developer",
      company: "Tech Solutions Inc.",
      location: "Remote",
      skillsRequired: "React, JavaScript",
      workType: "Full-time",
      applyLink: "#",
      matchScore: Math.floor(Math.random() * 30) + 70
    },
    {
      id: 2,
      jobTitle: `${skills[0] || "Digital"} Specialist`,
      company: "Creative Minds Co.",
      location: "Hybrid",
      skillsRequired: skills.join(", ") || "General Skills",
      workType: "Part-time",
      applyLink: "#",
      matchScore: Math.floor(Math.random() * 30) + 60
    }
  ];

  const mockLearningPath = [
    {
      skill: skills[0] ? `Advanced ${skills[0]}` : "Career Development",
      reason: "Required for 80% of matching jobs",
      resource: "#"
    }
  ];

  return {
    matchedJobs: mockJobs,
    learningPath: mockLearningPath
  };
};

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save to localStorage
    localStorage.setItem("userName", formData.name);
    localStorage.setItem("skills", formData.skills.join(","));
    localStorage.setItem("interests", formData.interest);
    localStorage.setItem("education", formData.background);
    localStorage.setItem("availability", formData.availability);

    // Generate mock response based on user input
    const mockResponse = generateMockResponse(formData.skills);
    
    // Navigate with mock data
    navigate("/results", {
      state: {
        matchedJobs: mockResponse.matchedJobs,
        learningPath: mockResponse.learningPath,
        userName: formData.name,
      },
    });
  };

  return (
    <div className="profile-page">
      <div className="profile-section">
        <div className="image-side">
          <img src="/assets/woman.svg" alt="Working Woman" className="profile-image" />
        </div>
        <div className="form-side">
          <h2>Build Your Profile</h2>
          <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Your Name" onChange={handleChange} required />
            <input name="background" placeholder="Education or Work Background" onChange={handleChange} required />
            <input name="interest" placeholder="Career Interest (e.g., Design)" onChange={handleChange} required />
            <label>Skills:</label>
            <Select 
              isMulti 
              options={skillOptions} 
              onChange={handleSkillChange} 
              required
            />
            <label>Time Availability:</label>
            <select name="availability" onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Part-time">Part-time</option>
              <option value="Full-time">Full-time</option>
              <option value="Freelance">Freelance</option>
            </select>
            <button type="submit" className="submit-btn">Show My Opportunities</button>
            <button 
              type="button" 
              onClick={() => navigate("/dashboard")} 
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
