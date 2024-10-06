import axios from "axios";

const API_URL = "http://localhost:5000"; // Change this to your backend URL if hosted remotely

// Add a new recap to MongoDB
export const addRecap = async (recapData) => {
  try {
    const response = await axios.post(`${API_URL}/recap/add`, recapData);
    return response.data;
  } catch (error) {
    console.error("Error adding recap:", error);
    throw error;
  }
};

// Fetch all recaps from MongoDB
export const getAllRecaps = async () => {
  try {
    const response = await axios.get(`${API_URL}/recap/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recaps:", error);
    throw error;
  }
};
