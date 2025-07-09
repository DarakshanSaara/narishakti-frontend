import axios from "axios";

const saveProgress = async (userName, type, reference, status, link = "") => {
  try {
    const res = await axios.post("http://localhost:5000/save-progress", {
      userName,
      type,
      reference,
      status,
      link
    });
    console.log("Progress saved:", res.data.message);
  } catch (err) {
    console.error("Error saving progress:", err.message);
  }
};

export default saveProgress;
