import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "../App.css";
import "./ProfileForm.css";

// Add this missing constant
const skillOptions = [
  { value: "React", label: "React" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "UI/UX Design", label: "UI/UX Design" },
  { value: "Content Writing", label: "Content Writing" },
  { value: "Digital Marketing", label: "Digital Marketing" }
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

  const autoFillDemo = () => {
    setFormData({
      name: "Demo User",
      background: "B.Tech in Computer Science",
      interest: "Frontend Development",
      skills: ["React", "UI/UX Design"],
      availability: "Full-time"
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add basic validation
    if (!formData.name || !formData.availability) {
      alert("Please fill all required fields");
      return;
    }

    navigate("/results", {
      state: {
        matchedJobs: [{
          jobTitle: formData.interest ? `${formData.interest} Role` : "Tech Role",
          company: "Sample Company",
          matchScore: 85,
          skills: formData.skills.join(", "),
          type: formData.availability
        }],
        userName: formData.name
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
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Your Name *"
                required
              />
            </div>
            
            <div className="form-group">
              <input
                name="background"
                value={formData.background}
                onChange={(e) => setFormData({...formData, background: e.target.value})}
                placeholder="Education/Work Background *"
                required
              />
            </div>
            
            <div className="form-group">
              <input
                name="interest"
                value={formData.interest}
                onChange={(e) => setFormData({...formData, interest: e.target.value})}
                placeholder="Career Interests *"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Skills *</label>
              <Select
                isMulti
                options={skillOptions}
                value={skillOptions.filter(opt => formData.skills.includes(opt.value))}
                onChange={(selected) => 
                  setFormData({...formData, skills: selected.map(opt => opt.value)})
                }
                className="skill-select"
                placeholder="Select your skills..."
              />
            </div>
            
            <div className="form-group">
              <label>Availability *</label>
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
            </div>
            
            <button type="submit" className="submit-btn">
              Show My Opportunities
            </button>
          </form>
          
          <button onClick={autoFillDemo} className="demo-btn">
            Auto-fill Demo Profile
          </button>
          
          <button 
            onClick={() => navigate("/dashboard")} 
            className="dashboard-btn"
          >
            View Progress Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
