// src/components/StudentManagement/AddEditStudentDialog.js
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Alert,
} from '@mui/material';

const AddEditStudentDialog = ({ open, onClose, currentStudent, onSaveStudent }) => {
  const [studentForm, setStudentForm] = useState({
    name: '',
    course: '',
  });

  useEffect(() => {
    if (currentStudent) {
      setStudentForm({
        name: currentStudent.name,
        course: currentStudent.course,
      });
    } else {
      setStudentForm({ name: '', course: '' });
    }
  }, [currentStudent, open]);

  const handleSave = () => {
    onSaveStudent(studentForm);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{currentStudent ? 'Edit Student' : 'Add New Student'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Student Name"
          type="text"
          fullWidth
          variant="outlined"
          className="mb-3"
          value={studentForm.name}
          onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Course"
          type="text"
          fullWidth
          variant="outlined"
          className="mb-3"
          value={studentForm.course}
          onChange={(e) => setStudentForm({ ...studentForm, course: e.target.value })}
        />
        {currentStudent?.roomNumber && currentStudent?.bedNumber && (
          <Alert severity="info" className="mt-3">
            Currently assigned to Room {currentStudent.roomNumber}, Bed {currentStudent.bedNumber}.
            Unassign from Hostel Structure or Student List to reassign.
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" className="rounded-pill">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained" className="rounded-pill">
          {currentStudent ? 'Save Changes' : 'Add Student'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditStudentDialog;