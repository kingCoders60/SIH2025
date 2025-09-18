import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ReportCasePage = () => {
  const { user } = useAuth();

  const [form, setForm] = useState({
    disasterType: "",
    location: "",
    severity: "",
    notes: "",
  });

  if (!user) return <Navigate to="/" />;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAutoLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    toast.loading("Fetching your location...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setForm((prev) => ({
          ...prev,
          location: `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
        }));
        toast.dismiss();
        toast.success("Location added!");
      },
      (error) => {
        toast.dismiss();
        toast.error("Failed to get location.");
        console.error("Geolocation error:", error);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.success("Report submitted successfully!");
      setForm({ disasterType: "", location: "", severity: "", notes: "" });
    } catch (err) {
      console.error("Report error:", err.response?.data || err.message);
      toast.error("Failed to submit report.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Report a Disaster Case
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="disasterType"
          value={form.disasterType}
          onChange={handleChange}
          placeholder="Disaster Type (e.g. Flood, Fire)"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="space-y-2">
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="button"
            onClick={handleAutoLocation}
            className="text-sm text-blue-600 underline hover:text-blue-800">
            Use my current location
          </button>
        </div>
        <select
          name="severity"
          value={form.severity}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required>
          <option value="">Select Severity</option>
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Additional Notes"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportCasePage;
