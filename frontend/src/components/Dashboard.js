// Dashboard.js
import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const Dashboard = ({ hostels = [], students = [] }) => {
  const totalRooms = hostels.reduce((acc, h) => acc + h.floors.reduce((fAcc, f) => fAcc + f.rooms.length, 0), 0);
  const totalBeds = hostels.reduce((acc, h) =>
    acc + h.floors.reduce((fAcc, f) =>
      fAcc + f.rooms.reduce((rAcc, r) => rAcc + r.beds.length, 0), 0), 0);
  const occupiedBeds = hostels.reduce((acc, h) =>
    acc + h.floors.reduce((fAcc, f) =>
      fAcc + f.rooms.reduce((rAcc, r) =>
        rAcc + r.beds.filter(bed => bed.isOccupied).length, 0), 0), 0);
  const vacantBeds = totalBeds - occupiedBeds;
  const totalStudents = students.length;
  const assignedStudents = students.filter(s => s.roomNumber && s.bedNumber).length;
  const unassignedStudents = totalStudents - assignedStudents;

  return (
    <Grid container spacing={3} className="mt-4">
      <Grid item xs={12} md={4}>
        <Card><CardContent><Typography variant="h6">Total Hostels</Typography><Typography variant="h4">{hostels.length}</Typography></CardContent></Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card><CardContent><Typography variant="h6">Total Rooms</Typography><Typography variant="h4">{totalRooms}</Typography></CardContent></Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card><CardContent><Typography variant="h6">Total Beds</Typography><Typography variant="h4">{totalBeds}</Typography></CardContent></Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card><CardContent><Typography variant="h6">Occupied Beds</Typography><Typography variant="h4">{occupiedBeds}</Typography></CardContent></Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card><CardContent><Typography variant="h6">Vacant Beds</Typography><Typography variant="h4">{vacantBeds}</Typography></CardContent></Card>
      </Grid>
      <Grid item xs={12}>
        <Card><CardContent>
          <Typography variant="h5">Student Overview</Typography>
          <Typography>Total Students: {totalStudents}</Typography>
          <Typography>Assigned: {assignedStudents}</Typography>
          <Typography>Unassigned: {unassignedStudents}</Typography>
        </CardContent></Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
