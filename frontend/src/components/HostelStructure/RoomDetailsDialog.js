// src/components/HostelStructure/RoomDetailsDialog.js
import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Card,
  Button,
} from '@mui/material';
import { Bed as BedIcon } from '@mui/icons-material';

const RoomDetailsDialog = ({ open, onClose, currentRoomForDetails, getStudentById, handleBedClick }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Room {currentRoomForDetails?.roomNumber} - Bed Status
        <Typography variant="body2" color="text.secondary">
          {currentRoomForDetails?.isAC ? 'AC Room' : 'Non-AC Room'} | {currentRoomForDetails?.hasTable ? 'Has Table' : 'No Table'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Click on a bed to assign a student or view details.
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Box className="d-flex flex-wrap justify-content-center gap-3 p-3">
          {currentRoomForDetails?.beds.map(bed => {
            const student = bed.isOccupied ? getStudentById(bed.studentId) : null;
            return (
              <Card
                key={bed.id}
                className={`bed-card shadow-sm rounded-3 d-flex flex-column align-items-center justify-content-center p-3 text-center ${
                  bed.isOccupied ? 'bg-danger text-white' : 'bg-success text-white cursor-pointer'
                }`}
                sx={{
                  width: 120,
                  height: 120,
                  transition: 'background-color 0.3s, transform 0.2s',
                  '&:hover': bed.isOccupied ? {} : { transform: 'scale(1.05)', backgroundColor: '#4CAF50' },
                }}
                onClick={() => handleBedClick(bed, currentRoomForDetails)} // Pass currentRoomForDetails here
              >
                <BedIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6">Bed {bed.bedNumber}</Typography>
                <Typography variant="caption">
                  {bed.isOccupied ? (student ? student.name.split(' ')[0] : 'Occupied') : 'Vacant'}
                </Typography>
              </Card>
            );
          })}
        </Box>
        <Box className="d-flex justify-content-center mt-4 gap-3">
          <div className="d-flex align-items-center">
            <Box sx={{ width: 20, height: 20, backgroundColor: '#28a745', borderRadius: '4px', mr: 1 }}></Box>
            <Typography variant="body2">Vacant</Typography>
          </div>
          <div className="d-flex align-items-center">
            <Box sx={{ width: 20, height: 20, backgroundColor: '#dc3545', borderRadius: '4px', mr: 1 }}></Box>
            <Typography variant="body2">Occupied</Typography>
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" className="rounded-pill">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoomDetailsDialog;