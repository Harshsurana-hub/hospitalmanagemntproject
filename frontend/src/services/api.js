const baseUrl = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");

const request = async (path, options = {}) => {
    const response = await fetch(`${baseUrl}${path}`, options);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error?.message || "Request failed");
    }

    return data;
};

export { request };
