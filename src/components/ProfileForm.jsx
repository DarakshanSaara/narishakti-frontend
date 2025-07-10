// import { useState } from "react";
// import Select from "react-select";
// import { useNavigate } from "react-router-dom";
// import "../App.css";
// import "./ProfileForm.css";

// const skillOptions = [
//   { value: "React", label: "React" },
//   { value: "Content Writing", label: "Content Writing" },
//   // ... keep all your skill options
// ];

// // Pre-defined mock data
// const MOCK_JOBS = [
//   {
//     id: 1,
//     jobTitle: "Frontend Developer",
//     company: "Tech Solutions Inc.",
//     location: "Remote",
//     skillsRequired: "React, JavaScript, CSS",
//     workType: "Full-time",
//     applyLink: "#",
//     matchScore: 92
//   },
//   {
//     id: 2,
//     jobTitle: "UX Designer",
//     company: "Creative Minds",
//     location: "Hybrid",
//     skillsRequired: "Figma, User Research",
//     workType: "Part-time",
//     applyLink: "#",
//     matchScore: 85
//   }
// ];

// const MOCK_LEARNING = [
//   {
//     skill: "Advanced React",
//     reason: "Required for 80% of matched jobs",
//     resource: "#"
//   },
//   {
//     skill: "Career Networking",
//     reason: "Expand your professional connections",
//     resource: "#"
//   }
// ];

// export default function ProfileForm() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     background: "",
//     interest: "",
//     availability: "",
//     skills: [],
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSkillChange = (selected) => {
//     const values = selected ? selected.map((opt) => opt.value) : [];
//     setFormData({ ...formData, skills: values });
//   };

//   const handleShowOpportunities = (e) => {
//     e.preventDefault();
//     // Save to localStorage
//     localStorage.setItem("userName", formData.name || "Demo User");
//     localStorage.setItem("skills", formData.skills.join(",") || "React,Design");
//     localStorage.setItem("interests", formData.interest || "Technology");
//     localStorage.setItem("education", formData.background || "Computer Science");
//     localStorage.setItem("availability", formData.availability || "Full-time");
    
//     // Use pre-defined mock data
//     navigate("/results", {
//       state: {
//         matchedJobs: MOCK_JOBS,
//         learningPath: MOCK_LEARNING,
//         userName: formData.name || "Demo User",
//       },
//     });
//   };

//   const handleViewDashboard = () => {
//     // Ensure default values exist
//     localStorage.setItem("userName", formData.name || "Demo User");
//     navigate("/dashboard");
//   };

//   return (
//     <div className="profile-page">
//       <div className="profile-section">
//         <div className="image-side">
//           <img src="/assets/woman.svg" alt="Working Woman" className="profile-image" />
//         </div>
//         <div className="form-side">
//           <h2>Build Your Profile</h2>
//           <form onSubmit={handleShowOpportunities}>
//             {/* Keep all your existing form fields */}
//             <button 
//               type="submit" 
//               className="submit-btn"
//             >
//               Show My Opportunities
//             </button>
//             <button 
//               type="button" 
//               onClick={handleViewDashboard}
//               className="submit-btn"
//             >
//               View Progress Dashboard
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

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

export default function ProfileForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    background: "",
    interest: "",
    availability: "",
    skills: [],
  });

  const [showDemoHint, setShowDemoHint] = useState(false);

  // Mock data suggestions
  const DEMO_VALUES = {
    name: "Demo User",
    background: "B.Tech in Computer Science",
    interest: "Frontend Development",
    skills: ["React", "UI/UX Design"],
    availability: "Full-time"
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (selected) => {
    const values = selected ? selected.map((opt) => opt.value) : [];
    setFormData({ ...formData, skills: values });
  };

  const handleDemoHint = () => {
    setShowDemoHint(!showDemoHint);
  };

  const autoFillDemo = () => {
    setFormData({
      name: DEMO_VALUES.name,
      background: DEMO_VALUES.background,
      interest: DEMO_VALUES.interest,
      availability: DEMO_VALUES.availability,
      skills: DEMO_VALUES.skills
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ... (your existing mock data submission logic)
  };

  return (
    <div className="profile-page">
      <div className="profile-section">
        <div className="image-side">
          <img src="/assets/woman.svg" alt="Working Woman" className="profile-image" />
        </div>
        <div className="form-side">
          <h2>Build Your Profile</h2>
          
          <button 
            onClick={handleDemoHint}
            className="demo-hint-btn"
          >
            {showDemoHint ? "Hide Demo Values" : "Show Demo Suggestions"}
          </button>

          {showDemoHint && (
            <div className="demo-note">
              <p>Try these values for demo results:</p>
              <ul>
                <li>Name: {DEMO_VALUES.name}</li>
                <li>Background: {DEMO_VALUES.background}</li>
                <li>Interest: {DEMO_VALUES.interest}</li>
                <li>Skills: {DEMO_VALUES.skills.join(", ")}</li>
                <li>Availability: {DEMO_VALUES.availability}</li>
              </ul>
              <button onClick={autoFillDemo} className="autofill-btn">
                Auto-fill Demo Values
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input 
              name="name" 
              placeholder="Your Name" 
              value={formData.name}
              onChange={handleChange} 
              required 
            />
            
            <input 
              name="background" 
              placeholder="Education or Work Background" 
              value={formData.background}
              onChange={handleChange} 
              required 
            />
            
            <input 
              name="interest" 
              placeholder="Career Interest (e.g., Design)" 
              value={formData.interest}
              onChange={handleChange} 
              required 
            />
            
            <label>Skills:</label>
            <Select 
              isMulti 
              options={skillOptions} 
              value={skillOptions.filter(opt => formData.skills.includes(opt.value))}
              onChange={handleSkillChange} 
              required
            />
            
            <label>Time Availability:</label>
            <select 
              name="availability" 
              value={formData.availability}
              onChange={handleChange} 
              required
            >
              <option value="">Select</option>
              <option value="Part-time">Part-time</option>
              <option value="Full-time">Full-time</option>
              <option value="Freelance">Freelance</option>
            </select>
            
            <button type="submit" className="submit-btn">
              Show My Opportunities
            </button>
            
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
