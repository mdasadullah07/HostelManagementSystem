// src/components/HostelStructure/AddHostelDialog.js
import React from 'react'; // Removed useState as it's now managed by parent
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';

const AddHostelDialog = ({ open, onClose, onAddHostel, newHostelName, setNewHostelName, newHostelFloors, setNewHostelFloors }) => {
  const handleAdd = () => {
    onAddHostel(); // Call the parent's handler
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Hostel</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Hostel Name"
          type="text"
          fullWidth
          variant="outlined"
          className="mb-3"
          value={newHostelName}
          onChange={(e) => setNewHostelName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Number of Floors"
          type="number"
          fullWidth
          variant="outlined"
          className="mb-3"
          value={newHostelFloors}
          onChange={(e) => setNewHostelFloors(parseInt(e.target.value) || 1)}
          inputProps={{ min: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" className="rounded-pill">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary" variant="contained" className="rounded-pill">
          Add Hostel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddHostelDialog;