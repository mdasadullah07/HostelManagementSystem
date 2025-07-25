// src/components/HostelStructure/AddEditRoomDialog.js
import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from '@mui/material';

const AddEditRoomDialog = ({ open, onClose, currentRoom, roomForm, setRoomForm, onSaveRoom }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{currentRoom ? 'Edit Room' : 'Add New Room'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Room Number"
          type="text"
          fullWidth
          variant="outlined"
          className="mb-3"
          value={roomForm.roomNumber}
          onChange={(e) => setRoomForm({ ...roomForm, roomNumber: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Number of Beds"
          type="number"
          fullWidth
          variant="outlined"
          className="mb-3"
          value={roomForm.numberOfBeds}
          onChange={(e) => setRoomForm({ ...roomForm, numberOfBeds: parseInt(e.target.value) || 1 })}
          inputProps={{ min: 1 }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={roomForm.isAC}
              onChange={(e) => setRoomForm({ ...roomForm, isAC: e.target.checked })}
              color="primary"
            />
          }
          label="AC Room"
          className="mb-2"
        />
        <FormControlLabel
          control={
            <Switch
              checked={roomForm.hasTable} // This was hasChair in your snippet, now corrected
              onChange={(e) => setRoomForm({ ...roomForm, hasTable: e.target.checked })} // Corrected
              color="primary"
            />
          }
          label="Has Table" // Corrected
          className="mb-2"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" className="rounded-pill">
          Cancel
        </Button>
        <Button onClick={onSaveRoom} color="primary" variant="contained" className="rounded-pill">
          {currentRoom ? 'Save Changes' : 'Add Room'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditRoomDialog;