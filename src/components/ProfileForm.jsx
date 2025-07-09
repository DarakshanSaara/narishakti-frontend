// import axios from "axios";
// import { useState } from "react";
// import Select from "react-select";
// import { loadFull } from "tsparticles";
// import "../App.css";
// import "./ProfileForm.css";

// const skillOptions = [
//   { value: "React", label: "React" },
//   { value: "Content Writing", label: "Content Writing" },
//   { value: "Digital Marketing", label: "Digital Marketing" },
//   { value: "Python", label: "Python" },
//   { value: "SEO", label: "SEO" },
//   { value: "Teaching", label: "Teaching" },
//   { value: "HR Management", label: "HR Management" },
//   { value: "Excel", label: "Excel" },
//   { value: "Social Media", label: "Social Media" },
//   { value: "Graphic Design", label: "Graphic Design" },
// ];

// export default function ProfileForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     background: "",
//     interest: "",
//     availability: "",
//     skills: [],
//   });

//   const [matchedJobs, setMatchedJobs] = useState([]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSkillChange = (selected) => {
//     const values = selected.map((opt) => opt.value);
//     setFormData({ ...formData, skills: values });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.skills.length || !formData.availability) {
//       alert("Please fill all required fields.");
//       return;
//     }

//     const payload = {
//       name: formData.name,
//       education: formData.background,
//       interests: formData.interest,
//       skills: formData.skills.join(" "),
//       availability: formData.availability,
//     };

//     try {
//       // const response = await axios.post("http://127.0.0.1:5000/match-jobs", payload);
//       const response = await axios.post("http://localhost:5000/match-jobs", payload);
//       setMatchedJobs(response.data);
//     } catch (error) {
//       console.error("Error fetching matched jobs:", error);
//       alert("Something went wrong while fetching job matches.");
//     }
//   };

//   const particlesInit = async (main) => {
//     await loadFull(main);
//   };

//   return (
//     <div className="profile-page">
//       <div className="profile-section">
//         <div className="image-side">
//           <img src="/assets/woman.svg" alt="Working Woman" className="profile-image" />
//         </div>

//         <div className="form-side">
//           <h2>Build Your Profile</h2>
//           <form onSubmit={handleSubmit}>
//             <input
//               name="name"
//               placeholder="Your Name"
//               onChange={handleChange}
//               required
//             />
//             <input
//               name="background"
//               placeholder="Education or Work Background"
//               onChange={handleChange}
//             />
//             <input
//               name="interest"
//               placeholder="Career Interest (e.g., Design)"
//               onChange={handleChange}
//             />

//             <label>Skills:</label>
//             <Select isMulti options={skillOptions} onChange={handleSkillChange} />

//             <label>Time Availability:</label>
//             <select name="availability" onChange={handleChange} required>
//               <option value="">Select</option>
//               <option value="Part-time">Part-time</option>
//               <option value="Full-time">Full-time</option>
//               <option value="Freelance">Freelance</option>
//             </select>

//             <button type="submit" className="submit-btn">
//               Show My Opportunities
//             </button>
//           </form>

//           {/* Show Results */}
//           {matchedJobs.length > 0 && (
//             <div className="results-section">
//               <h3>Top Job Matches</h3>
//               {matchedJobs.map((job, idx) => (
//                 <div key={idx} className="job-card">
//                   <h4>{job.jobTitle} @ {job.company}</h4>
//                   <p><strong>Location:</strong> {job.location}</p>
//                   <p><strong>Skills Required:</strong> {job.skillsRequired}</p>
//                   <p><strong>Description:</strong> {job.description}</p>
//                   <p><strong>Work Type:</strong> {job.workType}</p>
//                   <p><strong>Salary:</strong> {job.salary}</p>
//                   <p><strong>Experience:</strong> {job.experienceLevel}</p>
//                   <a href={job.applyLink} target="_blank" rel="noreferrer">Apply Now</a>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import axios from "axios";
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (selected) => {
    const values = selected ? selected.map((opt) => opt.value) : [];
    setFormData({ ...formData, skills: values });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      education: formData.background,
      interests: formData.interest,
      skills: formData.skills.join(" "),
      availability: formData.availability,
    };

    try {
      // Save user data to localStorage
      localStorage.setItem("userName", formData.name);
      localStorage.setItem("skills", formData.skills.join(","));
      localStorage.setItem("interests", formData.interest);
      localStorage.setItem("education", formData.background);
      localStorage.setItem("availability", formData.availability);

      const response = await axios.post("http://localhost:5000/match-jobs", payload);
      navigate("/results", {
        state: {
          matchedJobs: response.data.matchedJobs || [],
          learningPath: response.data.learningPath || [],
          userName: formData.name,
        },
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to get matches. Please try again.");
    }
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
            <button type="button" onClick={() => navigate("/dashboard")} className="submit-btn">View Progress Dashboard</button>
          </form>
        </div>
      </div>
    </div>
  );
}