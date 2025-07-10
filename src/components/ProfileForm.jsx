import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "../App.css";
import "./ProfileForm.css";

export default function ProfileForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    background: "",
    interest: "",
    availability: "",
    skills: [],
  });

  // Auto-fill demo (keep your existing implementation)
  const autoFillDemo = () => {
    setFormData({
      name: "Demo User",
    background: "B.tech in Computer Science",
    interest: "Frontend Development",
    skills: ["React", "UI/UX Design"],
    availability: "Full-time"
    });
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/results", {
      state: {
        matchedJobs: [{
          jobTitle: "Sample Job",
          company: "Sample Company",
          matchScore: 85
        }],
        userName: formData.name || "Demo User"
      }
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
          
          {/* FORM INPUTS - THESE WERE MISSING */}
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Your Name"
              required
            />
            
            <input
              name="background"
              value={formData.background}
              onChange={(e) => setFormData({...formData, background: e.target.value})}
              placeholder="Education/Work Background"
              required
            />
            
            <input
              name="interest"
              value={formData.interest}
              onChange={(e) => setFormData({...formData, interest: e.target.value})}
              placeholder="Career Interests"
              required
            />
            
            <Select
              isMulti
              options={skillOptions}
              onChange={(selected) => 
                setFormData({...formData, skills: selected.map(opt => opt.value)})
              }
              placeholder="Select Skills"
              className="skill-select"
            />
            
            <select
              name="availability"
              value={formData.availability}
              onChange={(e) => setFormData({...formData, availability: e.target.value})}
              required
            >
              <option value="">Select Availability</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Freelance">Freelance</option>
            </select>
            
            <button type="submit" className="submit-btn">
              Show My Opportunities
            </button>
          </form>
          
          <button onClick={autoFillDemo} className="demo-btn">
            Auto-fill Demo Profile
          </button>
          
          <button 
            onClick={() => navigate("/dashboard")} 
            className="submit-btn"
          >
            View Progress Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
