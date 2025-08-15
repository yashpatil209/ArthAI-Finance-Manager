import axios from "axios";

// GET request function
export const getData = async (endpoint, token = null) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.get(`${process.env.API_URL}${endpoint}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// POST request function
export const postData = async (endpoint, data, token = null) => {
  console.log("data" + token);
  try {
    const headers = token
      ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      : { "Content-Type": "application/json" }; // If no token, only set the content type

    const response = await axios.post(
      `${process.env.API_URL}${endpoint}`,
      data,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export const postDataWithFile = async (
  endpoint,
  file = null,
  token = null,
  data = null
) => {
  try {
    // Prepare the headers for multipart/form-data (Authorization if token is provided)
    const headers = token
      ? {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      : {};

    // Create a new FormData object
    const formData = new FormData();

    // Append the data (Ensure data is in the correct format, i.e., stringified if necessary)
    if (data) {
      if (typeof data === "object") {
        formData.append("data", JSON.stringify(data)); // If it's an object, stringifying it
      } else {
        formData.append("data", data); // Append as is if it's already a string or simple value
      }
    }

    // Append the file (if provided)
    if (file) {
      formData.append("file", file);
    }

    // Make the API request
    const response = await axios.post(
      `${process.env.API_URL}${endpoint}`,
      formData,
      { headers }
    );

    // Return the response data
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
