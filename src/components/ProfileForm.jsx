import { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./ProfileForm.css";

const skillOptions = [
  { value: "React", label: "React" },
  // ... (keep your existing skill options)
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save to localStorage
    localStorage.setItem("userName", formData.name);
    localStorage.setItem("skills", formData.skills.join(","));
    localStorage.setItem("interests", formData.interest);
    localStorage.setItem("education", formData.background);
    localStorage.setItem("availability", formData.availability);

    // Generate realistic mock response
    const mockJobs = generateMockJobs(formData.skills, formData.interest);
    const mockLearningPath = generateLearningPath(formData.skills);

    // Navigate with mock data
    navigate("/results", {
      state: {
        matchedJobs: mockJobs,
        learningPath: mockLearningPath,
        userName: formData.name,
      },
    });
  };

  // Mock data generators
  const generateMockJobs = (skills, interest) => {
    const baseJobs = [
      {
        id: 1,
        jobTitle: `${skills[0] || interest || "Frontend"} Developer`,
        company: "Tech Solutions Inc.",
        location: "Remote",
        skillsRequired: skills.join(", ") || "General skills",
        workType: formData.availability || "Flexible",
        applyLink: "#",
        matchScore: Math.floor(Math.random() * 20) + 80, // 80-100% match
      },
      {
        id: 2,
        jobTitle: `${interest || "Digital"} Specialist`,
        company: "Creative Minds Co.",
        location: "Hybrid",
        skillsRequired: skills.join(", ") || "Various skills",
        workType: formData.availability || "Part-time",
        applyLink: "#",
        matchScore: Math.floor(Math.random() * 25) + 70, // 70-95% match
      }
    ];
    return baseJobs;
  };

  const generateLearningPath = (skills) => {
    if (skills.length === 0) return [];
    return [
      {
        skill: `Advanced ${skills[0]}`,
        reason: "Required for high-paying roles in this field",
        resource: "#"
      },
      {
        skill: "Career Networking",
        reason: "Expand your professional connections",
        resource: "#"
      }
    ];
  };

  return (
    <div className="profile-page">
      {/* ... (keep your existing JSX structure) */}
      <button 
        type="submit" 
        className="submit-btn"
        onClick={handleSubmit}
      >
        Show My Opportunities
      </button>
      <button 
        type="button" 
        onClick={() => navigate("/dashboard")} 
        className="submit-btn"
      >
        View Progress Dashboard
      </button>
    </div>
  );
}
