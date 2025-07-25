// src/components/StudentManagement/StudentManagement.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Alert,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import AddEditStudentDialog from './AddEditStudentDialog';

const StudentManagement = ({ students, setStudents, showSnackbar, unassignStudentFromBed }) => {
  const [openAddEditStudentDialog, setOpenAddEditStudentDialog] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  const handleAddStudentClick = () => {
    setCurrentStudent(null);
    setOpenAddEditStudentDialog(true);
  };

  const handleEditStudentClick = (student) => {
    setCurrentStudent(student);
    setOpenAddEditStudentDialog(true);
  };

const handleDeleteStudent = async (studentId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this student? If assigned to a bed, they will be unassigned.");
  if (!confirmDelete) return;

  try {
    await fetch(`/api/students/${studentId}`, {
      method: 'DELETE',
    });

    // Optional: unassign if needed
    unassignStudentFromBed(studentId);

    setStudents(prev => prev.filter(s => s._id !== studentId));
    showSnackbar('Student deleted successfully!', 'info');
  } catch (err) {
    console.error('Delete student error:', err);
    showSnackbar('Failed to delete student', 'error');
  }
};


const handleSaveStudent = async (studentForm) => {
  try {
    if (currentStudent && currentStudent._id) {
      // ✅ UPDATE student (PUT)
      const response = await fetch(`/api/students/${currentStudent._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentForm),
      });
      const updatedStudent = await response.json();
      setStudents(prev => prev.map(s => s._id === updatedStudent._id ? updatedStudent : s));
      showSnackbar('Student updated successfully!');
    } else {
      // ✅ CREATE student (POST)
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...studentForm, roomNumber: null, bedNumber: null }),
      });
      const savedStudent = await response.json();
      setStudents(prev => [...prev, savedStudent]);
      showSnackbar('Student added successfully!');
    }
  } catch (err) {
    console.error('Save student error:', err);
    showSnackbar('Error saving student', 'error');
  }

  setOpenAddEditStudentDialog(false);
  setCurrentStudent(null);
};

  return (
    <Box className="mt-4">
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddStudentClick}
        className="mb-3 rounded-pill"
      >
        Add New Student
      </Button>
      <Card className="shadow-sm rounded-3">
        <CardContent>
          <Typography variant="h5" component="div" className="mb-3">
            Student List
          </Typography>
          <List>
            {students.length === 0 ? (
              <Typography variant="body1" className="text-center text-muted">No students added yet.</Typography>
            ) : (
              students.map(student => (
                <ListItem
                  key={student.id}
                  secondaryAction={
                    <Box>
                      <IconButton edge="end" aria-label="edit" onClick={() => handleEditStudentClick(student)}>
                        <EditIcon />
                      </IconButton>
                      {student.roomNumber && student.bedNumber && (
                         <Button
                            size="small"
                            color="warning"
                            onClick={() => unassignStudentFromBed(student.id)}
                            className="ms-2 rounded-pill"
                         >
                            Unassign
                         </Button>
                      )}
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteStudent(student.id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Box>
                  }
                  divider
                >
                  <ListItemText
                    primary={`${student.name} (${student.course})`}
                    secondary={student.roomNumber ? `Assigned to Room ${student.roomNumber}, Bed ${student.bedNumber}` : 'Unassigned'}
                  />
                </ListItem>
              ))
            )}
          </List>
        </CardContent>
      </Card>

      <AddEditStudentDialog
        open={openAddEditStudentDialog}
        onClose={() => setOpenAddEditStudentDialog(false)}
        currentStudent={currentStudent}
        onSaveStudent={handleSaveStudent}
      />
    </Box>
  );
};

export default StudentManagement;