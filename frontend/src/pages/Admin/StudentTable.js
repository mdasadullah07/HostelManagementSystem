import React, { useEffect, useState } from "react";
import axios from "axios";

const initialFormData = {
  name: "",
  className: "",
  section: "",
  dob: "",
  gender: "",
  category: "",
  mobile: "",
  email: "",
  aadhaar: "",
  state: "",
  district: "",
  admissionNo: "",
  srNo: "",
  panNo: "",
  uniqueIdType: "",
  uniqueId: "",
  stream: "",
  feeCategory: "",
  rollNumber: "",
  fatherName: "",
  motherName: "",
  parentEmail: "",
  parentMobile: "",
  localGuardian: "",
  relation: "",
  fatherOccupation: "",
};

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios
      .get("/api/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.log("Error fetching students:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/api/students/${editId}`, formData);
      } else {
        await axios.post("/api/students", formData);
      }

      const res = await axios.get("/api/students");
      setStudents(res.data);
      setFormData(initialFormData);
      setEditId(null);
    } catch (err) {
      console.error("❌ Error submitting form:", err);
    }
  };

  const handleEdit = (student) => {
    setFormData(student);
    setEditId(student._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/students/${id}`);
      const res = await axios.get("/api/students");
      setStudents(res.data);
    } catch (err) {
      console.error("❌ Error deleting student:", err);
    }
  };

  return (
    <div className="container py-4">
      <h3>👨‍🎓 Student Management</h3>
      <form onSubmit={handleSubmit}>
        <div className="row g-2">
          {/* Basic Info */}
          <div className="col-md-4">
            <input
              placeholder="Student Name"
              className="form-control"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="col-md-4">
            <input
              placeholder="Class"
              className="form-control"
              value={formData.className}
              onChange={(e) =>
                setFormData({ ...formData, className: e.target.value })
              }
            />
          </div>
          <div className="col-md-4">
            <input
              placeholder="Section"
              className="form-control"
              value={formData.section}
              onChange={(e) =>
                setFormData({ ...formData, section: e.target.value })
              }
            />
          </div>
          <div className="col-md-4">
            <input
              type="date"
              className="form-control"
              value={formData.dob}
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-control"
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>others</option>
            </select>
          </div>
          <div className="col-md-4">
            <input
              placeholder="Category"
              className="form-control"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
          </div>
          <div className="col-md-4">
            <input
              placeholder="Mobile No"
              className="form-control"
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
            />
          </div>
          <div className="col-md-4">
            <input
              placeholder="Email"
              className="form-control"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="col-md-4">
            <input
              placeholder="Aadhaar No"
              className="form-control"
              value={formData.aadhaar}
              onChange={(e) =>
                setFormData({ ...formData, aadhaar: e.target.value })
              }
            />
          </div>
          <div className="col-md-4">
            <input
              placeholder="Roll no."
              className="form-control"
              value={formData.rollNumber}
              onChange={(e) =>
                setFormData({ ...formData, rollNumber: e.target.value })
              }
            />
          </div>
          <div className="col-md-4">
            <input
              placeholder="State"
              className="form-control"
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
            />
          </div>
          <div className="col-md-4">
            <input
              placeholder="District"
              className="form-control"
              value={formData.district}
              onChange={(e) =>
                setFormData({ ...formData, district: e.target.value })
              }
            />
          </div>

          {/* Guardian */}
          <div className="col-md-4">
            <input
              placeholder="Father's Name"
              className="form-control"
              value={formData.fatherName}
              onChange={(e) =>
                setFormData({ ...formData, fatherName: e.target.value })
              }
            />
          </div>
          <div className="col-md-4">
            <input
              placeholder="Mother's Name"
              className="form-control"
              value={formData.motherName}
              onChange={(e) =>
                setFormData({ ...formData, motherName: e.target.value })
              }
            />
          </div>
          <div className="col-md-4">
            <input
              placeholder="Parent Email"
              className="form-control"
              value={formData.parentEmail}
              onChange={(e) =>
                setFormData({ ...formData, parentEmail: e.target.value })
              }
            />
          </div>
          <div className="col-md-4">
            <input
              placeholder="Parent Mobile"
              className="form-control"
              value={formData.parentMobile}
              onChange={(e) =>
                setFormData({ ...formData, parentMobile: e.target.value })
              }
            />
          </div>
          <div className="col-md-4">
            <input
              placeholder="Local Guardian Name"
              className="form-control"
              value={formData.localGuardian}
              onChange={(e) =>
                setFormData({ ...formData, localGuardian: e.target.value })
              }
            />
          </div>
          <div className="col-md-4">
            <input
              placeholder="Relation With Student"
              className="form-control"
              value={formData.relation}
              onChange={(e) =>
                setFormData({ ...formData, relation: e.target.value })
              }
            />
          </div>
          <div className="col-md-4">
            <input
              placeholder="Father's Occupation"
              className="form-control"
              value={formData.fatherOccupation}
              onChange={(e) =>
                setFormData({ ...formData, fatherOccupation: e.target.value })
              }
            />
          </div>

          <div className="col-12 mt-3">
            <button className="btn btn-success" type="submit">
              {editId ? "Update Student" : "Add Student"}
            </button>
          </div>
        </div>
      </form>

      {/* Table - You can add more columns here too */}
      <table className="table table-striped table-bordered mt-4">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Class</th>
            <th>Roll No</th>
            <th>Gender</th>
            <th>Mobile</th>
            <th>Father</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={s._id}>
              <td>{i + 1}</td>
              <td>{s.name}</td>
              <td>{s.className}</td>
              <td>{s.rollNumber}</td>
              <td>{s.gender}</td>
              <td>{s.mobile}</td>
              <td>{s.fatherName}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(s)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(s._id)}
                >
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

export default StudentTable;
