// src/components/HostelStructure/AssignStudentDialog.js
import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const AssignStudentDialog = ({
  open,
  onClose,
  selectedBedForAssignment,
  currentRoomForDetails,
  studentToAssign,
  setStudentToAssign,
  getAvailableStudents,
  onAssignStudent,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Assign Student to Bed {selectedBedForAssignment?.bedNumber} in Room {currentRoomForDetails?.roomNumber}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="dense" variant="outlined">
          <InputLabel id="assign-student-label">Select Student</InputLabel>
          <Select
            labelId="assign-student-label"
            value={studentToAssign}
            onChange={(e) => setStudentToAssign(e.target.value)}
            label="Select Student"
            className="rounded-pill"
          >
            {getAvailableStudents().length === 0 && (
              <MenuItem disabled>No unassigned students available</MenuItem>
            )}
            {getAvailableStudents().map((student) => (
              <MenuItem key={student.id} value={student.id}>
                {student.name} ({student.course})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" className="rounded-pill">
          Cancel
        </Button>
        <Button onClick={onAssignStudent} color="primary" variant="contained" className="rounded-pill" disabled={!studentToAssign}>
          Assign Student
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignStudentDialog;