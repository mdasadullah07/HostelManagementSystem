import React, { useState, useEffect } from "react";
import axios from "axios";

const HostelTable = () => {
  const [hostels, setHostels] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    type: "Boys",
    totalRooms: "",
    floors: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch hostels on load
  useEffect(() => {
    fetchHostels();
  }, []);

  const fetchHostels = async () => {
    try {
      const res = await axios.get("/api/hostels");
      setHostels(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/hostels/${editingId}`, formData);
      } else {
        await axios.post("/api/hostels", formData);
      }
      fetchHostels();
      setFormData({ name: "", type: "Boys", totalRooms: "", floors: "", description: "" });
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (hostel) => {
    setFormData(hostel);
    setEditingId(hostel._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this hostel?")) {
      try {
        await axios.delete(`/api/hostels/${id}`);
        fetchHostels();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4">🏢 Hostel Management</h2>

      <form className="row g-3 mt-3" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <input
            className="form-control"
            name="name"
            placeholder="Hostel Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            name="totalRooms"
            placeholder="Rooms"
            value={formData.totalRooms}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            name="floors"
            placeholder="Floors"
            value={formData.floors}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-12">
          <textarea
            className="form-control"
            name="description"
            placeholder="Description"
            rows="2"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            {editingId ? "Update" : "Add"} Hostel
          </button>
        </div>
      </form>

      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Rooms</th>
            <th>Floors</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hostels.map((h) => (
            <tr key={h._id}>
              <td>{h.name}</td>
              <td>{h.type}</td>
              <td>{h.totalRooms}</td>
              <td>{h.floors}</td>
              <td>{h.description}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(h)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(h._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HostelTable;
