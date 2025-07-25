// src/App.js
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Snackbar, Alert } from '@mui/material';
import Dashboard from './components/Dashboard';
import HostelStructure from './components/HostelStructure/HostelStructure';
import StudentManagement from './components/StudentManagement/StudentManagement';
import GlobalStyles from './components/common/GlobalStyles';

// --- Mock Data (Will be replaced by API calls) ---
const initialHostelData = [
  {
    id: 'H001',
    name: 'Main Campus Hostel',
    floors: [
      {
        id: 'F001',
        floorNumber: 1,
        rooms: [
          {
            id: 'R101',
            roomNumber: '101',
            isAC: true,
            hasTable: true, // Consistent with hasTable
            beds: [
              { id: 'B101-1', bedNumber: 1, isOccupied: true, studentId: 'S001' },
              { id: 'B101-2', bedNumber: 2, isOccupied: true, studentId: 'S002' },
              { id: 'B101-3', bedNumber: 3, isOccupied: false, studentId: null },
              { id: 'B101-4', bedNumber: 4, isOccupied: false, studentId: null },
            ],
          },
          {
            id: 'R102',
            roomNumber: '102',
            isAC: false,
            hasTable: true,
            beds: [
              { id: 'B102-1', bedNumber: 1, isOccupied: true, studentId: 'S003' },
              { id: 'B102-2', bedNumber: 2, isOccupied: false, studentId: null },
            ],
          },
          {
            id: 'R103',
            roomNumber: '103',
            isAC: true,
            hasTable: false,
            beds: [
              { id: 'B103-1', bedNumber: 1, isOccupied: false, studentId: null },
              { id: 'B103-2', bedNumber: 2, isOccupied: false, studentId: null },
              { id: 'B103-3', bedNumber: 3, isOccupied: false, studentId: null },
            ],
          },
        ],
      },
      {
        id: 'F002',
        floorNumber: 2,
        rooms: [
          {
            id: 'R201',
            roomNumber: '201',
            isAC: false,
            hasTable: false,
            beds: [
              { id: 'B201-1', bedNumber: 1, isOccupied: false, studentId: null },
              { id: 'B201-2', bedNumber: 2, isOccupied: false, studentId: null },
              { id: 'B201-3', bedNumber: 3, isOccupied: false, studentId: null },
            ],
          },
          {
            id: 'R202',
            roomNumber: '202',
            isAC: true,
            hasTable: true,
            beds: [
              { id: 'B202-1', bedNumber: 1, isOccupied: true, studentId: 'S004' },
              { id: 'B202-2', bedNumber: 2, isOccupied: false, studentId: null },
              { id: 'B202-3', bedNumber: 3, isOccupied: false, studentId: null },
              { id: 'B202-4', bedNumber: 4, isOccupied: false, studentId: null },
            ],
          },
        ],
      },
    ],
  },
];

const initialStudents = [
  { id: 'S001', name: 'Alice Smith', course: 'Computer Science', roomNumber: '101', bedNumber: 1 },
  { id: 'S002', name: 'Bob Johnson', course: 'Electrical Engineering', roomNumber: '101', bedNumber: 2 },
  { id: 'S003', name: 'Charlie Brown', course: 'Mechanical Engineering', roomNumber: '102', bedNumber: 1 },
  { id: 'S004', name: 'David Lee', course: 'Civil Engineering', roomNumber: '202', bedNumber: 1 },
  { id: 'S005', name: 'Eve Davis', course: 'Architecture', roomNumber: null, bedNumber: null }, // Unassigned student
];

// --- Main App Component ---
const App = () => {
  const [activeTab, setActiveTab] = useState('hostel-structure');
  const [hostels, setHostels] = useState(initialHostelData);
  const [students, setStudents] = useState(initialStudents);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Snackbar utility function
  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // Function to get student details by ID (passed to children)
  const getStudentById = (studentId) => {
    return students.find(s => s.id === studentId);
  };

  // Function to get available students (not assigned to a bed) (passed to children)
  const getAvailableStudents = () => {
    return students.filter(s => !s.roomNumber && !s.bedNumber);
  };

  // Robust unassignment function (passed to children)
  const unassignStudentFromBed = (studentIdToUnassign) => {
    let found = false;
    const updatedHostels = hostels.map(hostel => ({
      ...hostel,
      floors: hostel.floors.map(floor => ({
        ...floor,
        rooms: floor.rooms.map(room => ({
          ...room,
          beds: room.beds.map(bed => {
            if (bed.studentId === studentIdToUnassign) {
              found = true;
              return { ...bed, isOccupied: false, studentId: null };
            }
            return bed;
          }),
        })),
      })),
    }));

    if (found) {
      setHostels(updatedHostels);
      const updatedStudents = students.map(student => {
        if (student.id === studentIdToUnassign) {
          return { ...student, roomNumber: null, bedNumber: null };
        }
        return student;
      });
      setStudents(updatedStudents);
      showSnackbar(`Student unassigned successfully!`, 'info');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Global CSS styles */}
      <GlobalStyles />

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hostel Management System
          </Typography>
          <Button color="inherit" onClick={() => setActiveTab('dashboard')}>Dashboard</Button>
          <Button color="inherit" onClick={() => setActiveTab('hostel-structure')}>Hostel Structure</Button>
          <Button color="inherit" onClick={() => setActiveTab('students')}>Students</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className="py-4">
        {activeTab === 'dashboard' && <Dashboard hostels={hostels} students={students} />}
        {activeTab === 'hostel-structure' && (
          <HostelStructure
            hostels={hostels}
            setHostels={setHostels}
            students={students}
            setStudents={setStudents}
            showSnackbar={showSnackbar}
            getStudentById={getStudentById}
            getAvailableStudents={getAvailableStudents}
            unassignStudentFromBed={unassignStudentFromBed}
          />
        )}
        {activeTab === 'students' && (
          <StudentManagement
            students={students}
            setStudents={setStudents}
            showSnackbar={showSnackbar}
            unassignStudentFromBed={unassignStudentFromBed}
          />
        )}
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default App;