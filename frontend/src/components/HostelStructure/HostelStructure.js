// src/components/HostelStructure/HostelStructure.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  AcUnit as AcUnitIcon,
  TableChart as TableChartIcon,
} from "@mui/icons-material";

// Import the dialog components
import AddHostelDialog from "./AddHostelDialog";
import AddEditRoomDialog from "./AddEditRoomDialog";
import RoomDetailsDialog from "./RoomDetailsDialog";
import AssignStudentDialog from "./AssignStudentDialog";
import axios from "axios";

const HostelStructure = ({
  hostels,
  setHostels,
  students,
  setStudents,
  showSnackbar,
  getStudentById, // Passed from App.js
  getAvailableStudents, // Passed from App.js
  unassignStudentFromBed, // Passed from App.js
}) => {
  const [selectedHostelId, setSelectedHostelId] = useState(
    hostels[0]?.id || null
  );
  const [selectedFloorNumber, setSelectedFloorNumber] = useState(
    hostels[0]?.floors[0]?.floorNumber || null
  );

  // Dialog states
  const [openAddHostelDialog, setOpenAddHostelDialog] = useState(false);
  const [newHostelName, setNewHostelName] = useState("");
  const [newHostelFloors, setNewHostelFloors] = useState(1);

  const [openAddEditRoomDialog, setOpenAddEditRoomDialog] = useState(false);
  const [roomForm, setRoomForm] = useState({
    roomNumber: "",
    numberOfBeds: 1,
    isAC: false,
    hasTable: false,
  }); // Changed hasChair to hasTable
  const [currentRoom, setCurrentRoom] = useState(null); // Room being added/edited

  const [openRoomDetailsDialog, setOpenRoomDetailsDialog] = useState(false);
  const [currentRoomForDetails, setCurrentRoomForDetails] = useState(null);
  const [openAssignStudentDialog, setOpenAssignStudentDialog] = useState(false);
  const [selectedBedForAssignment, setSelectedBedForAssignment] =
    useState(null);
  const [studentToAssign, setStudentToAssign] = useState("");

  // Effect to set default selected hostel/floor when hostels data changes
  useEffect(() => {
    if (hostels.length > 0 && !selectedHostelId) {
      setSelectedHostelId(hostels[0].id);
      if (hostels[0].floors.length > 0 && !selectedFloorNumber) {
        setSelectedFloorNumber(hostels[0].floors[0].floorNumber);
      }
    } else if (hostels.length === 0) {
      setSelectedHostelId(null);
      setSelectedFloorNumber(null);
    }
  }, [hostels, selectedHostelId, selectedFloorNumber]);

  const selectedHostel = hostels.find((h) => h.id === selectedHostelId);
  const selectedFloor = selectedHostel?.floors.find(
    (f) => f.floorNumber === selectedFloorNumber
  );

  // --- Hostel Management Functions (passed to AddHostelDialog) ---
  const handleAddHostel = async () => {
    if (!newHostelName.trim() || newHostelFloors <= 0) {
      showSnackbar(
        "Please enter a valid hostel name and number of floors.",
        "error"
      );
      return;
    }

    try {
      const response = await axios.post("/api/hostels", {
        name: newHostelName,
        numberOfFloors: newHostelFloors,
      });

      const newHostel = response.data;

      setHostels((prev) => [...prev, newHostel]);
      setSelectedHostelId(newHostel.id);
      setSelectedFloorNumber(newHostel.floors[0]?.floorNumber || null);

      showSnackbar(`Hostel "${newHostel.name}" added successfully!`, "success");
      setOpenAddHostelDialog(false);
      setNewHostelName("");
      setNewHostelFloors(1);
    } catch (error) {
      console.error("Failed to save hostel to DB:", error);
      showSnackbar("Failed to add hostel. Check server/API.", "error");
    }
  };

  const handleDeleteHostel = () => {
    if (!selectedHostelId) {
      showSnackbar("No hostel selected to delete.", "error");
      return;
    }
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this hostel? All rooms, beds, and assigned students within it will be removed/unassigned."
    );
    if (!confirmDelete) return;

    // Unassign all students from this hostel
    selectedHostel.floors.forEach((floor) => {
      floor.rooms.forEach((room) => {
        room.beds.forEach((bed) => {
          if (bed.isOccupied && bed.studentId) {
            unassignStudentFromBed(bed.studentId);
          }
        });
      });
    });

    setHostels((prevHostels) =>
      prevHostels.filter((h) => h.id !== selectedHostelId)
    );
    setSelectedHostelId(null);
    setSelectedFloorNumber(null);
    showSnackbar("Hostel deleted!", "warning");
  };

  // --- Room Management Functions (passed to AddEditRoomDialog) ---
  const handleAddRoomClick = () => {
    setCurrentRoom(null); // Clear for new room
    setRoomForm({
      roomNumber: "",
      numberOfBeds: 1,
      isAC: false,
      hasTable: false,
    }); // Changed hasChair to hasTable
    setOpenAddEditRoomDialog(true);
  };

  const handleEditRoomClick = (room) => {
    setCurrentRoom(room); // Set room for editing
    setRoomForm({
      roomNumber: room.roomNumber,
      numberOfBeds: room.beds.length,
      isAC: room.isAC,
      hasTable: room.hasTable, // Changed hasChair to hasTable
    });
    setOpenAddEditRoomDialog(true);
  };

  const handleDeleteRoom = (roomId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room? All assigned students will be unassigned."
    );
    if (!confirmDelete) return;

    // First, unassign all students from beds in this room
    const roomToDelete = selectedFloor?.rooms.find((r) => r.id === roomId);
    if (roomToDelete) {
      roomToDelete.beds.forEach((bed) => {
        if (bed.isOccupied && bed.studentId) {
          unassignStudentFromBed(bed.studentId);
        }
      });
    }

    // Then, remove the room
    const updatedHostels = hostels.map((hostel) => {
      if (hostel.id === selectedHostelId) {
        return {
          ...hostel,
          floors: hostel.floors.map((floor) => {
            if (floor.floorNumber === selectedFloorNumber) {
              return {
                ...floor,
                rooms: floor.rooms.filter((room) => room.id !== roomId),
              };
            }
            return floor;
          }),
        };
      }
      return hostel;
    });
    setHostels(updatedHostels);
    showSnackbar("Room deleted successfully!", "info");
  };

  const handleSaveRoom = () => {
    if (!roomForm.roomNumber.trim() || roomForm.numberOfBeds <= 0) {
      showSnackbar(
        "Please enter a valid room number and number of beds.",
        "error"
      );
      return;
    }

    const updatedHostels = hostels.map((hostel) => {
      if (hostel.id === selectedHostelId) {
        return {
          ...hostel,
          floors: hostel.floors.map((floor) => {
            if (floor.floorNumber === selectedFloorNumber) {
              const isDuplicate = floor.rooms.some(
                (r) =>
                  r.roomNumber === roomForm.roomNumber &&
                  r.id !== currentRoom?.id
              );
              if (isDuplicate) {
                showSnackbar(
                  `Room number "${roomForm.roomNumber}" already exists on this floor.`,
                  "error"
                );
                return floor;
              }

              if (currentRoom) {
                // Editing existing room
                return {
                  ...floor,
                  rooms: floor.rooms.map((room) => {
                    if (room.id === currentRoom.id) {
                      // If number of beds changed, re-initialize beds
                      const newBeds = Array.from(
                        { length: roomForm.numberOfBeds },
                        (_, i) => {
                          const existingBed = room.beds.find(
                            (b) => b.bedNumber === i + 1
                          );
                          return (
                            existingBed || {
                              id: `B${room.id}-${i + 1}`,
                              bedNumber: i + 1,
                              isOccupied: false,
                              studentId: null,
                            }
                          );
                        }
                      );

                      // If beds are removed, unassign students
                      if (roomForm.numberOfBeds < room.beds.length) {
                        room.beds
                          .slice(roomForm.numberOfBeds)
                          .forEach((removedBed) => {
                            if (removedBed.isOccupied && removedBed.studentId) {
                              unassignStudentFromBed(removedBed.studentId);
                            }
                          });
                      }

                      return {
                        ...room,
                        roomNumber: roomForm.roomNumber,
                        isAC: roomForm.isAC,
                        hasTable: roomForm.hasTable, // Changed hasChair to hasTable
                        beds: newBeds,
                      };
                    }
                    return room;
                  }),
                };
              } else {
                // Adding new room
                const newRoomId = `R${Date.now()}`;
                const newBeds = Array.from(
                  { length: roomForm.numberOfBeds },
                  (_, i) => ({
                    id: `B${Date.now()}-${i + 1}`,
                    bedNumber: i + 1,
                    isOccupied: false,
                    studentId: null,
                  })
                );

                const newRoom = {
                  id: newRoomId,
                  roomNumber: roomForm.roomNumber,
                  isAC: roomForm.isAC,
                  hasTable: roomForm.hasTable, // Changed hasChair to hasTable
                  beds: newBeds,
                };
                return {
                  ...floor,
                  rooms: [...floor.rooms, newRoom],
                };
              }
            }
            return floor;
          }),
        };
      }
      return hostel;
    });

    setHostels(updatedHostels);
    showSnackbar(
      currentRoom ? "Room updated successfully!" : "Room added successfully!"
    );
    setOpenAddEditRoomDialog(false);
    setCurrentRoom(null);
    setRoomForm({
      roomNumber: "",
      numberOfBeds: 1,
      isAC: false,
      hasTable: false,
    }); // Changed hasChair to hasTable
  };

  // --- Bed Assignment Functions (passed to RoomDetailsDialog and AssignStudentDialog) ---
  const handleRoomCardClick = (room) => {
    setCurrentRoomForDetails(room);
    setOpenRoomDetailsDialog(true);
  };

  const handleBedClick = (bed) => {
    // Removed 'room' from here, it's passed via currentRoomForDetails
    if (bed.isOccupied) {
      const student = getStudentById(bed.studentId);
      showSnackbar(
        `Bed ${bed.bedNumber} is occupied by ${
          student?.name || "Unknown Student"
        }`,
        "info"
      );
    } else {
      setSelectedBedForAssignment(bed);
      setOpenAssignStudentDialog(true);
    }
  };

  const handleAssignStudent = () => {
    if (
      !selectedBedForAssignment ||
      !studentToAssign ||
      !currentRoomForDetails
    ) {
      showSnackbar("Please select a student to assign.", "error");
      return;
    }

    const studentToAssignObj = students.find((s) => s.id === studentToAssign);
    if (!studentToAssignObj) {
      showSnackbar("Selected student not found.", "error");
      return;
    }

    // Unassign student from previous bed if they were assigned
    if (studentToAssignObj.roomNumber || studentToAssignObj.bedNumber) {
      unassignStudentFromBed(studentToAssign);
    }

    const updatedHostels = hostels.map((hostel) => {
      if (hostel.id === selectedHostelId) {
        return {
          ...hostel,
          floors: hostel.floors.map((floor) => {
            if (floor.floorNumber === selectedFloorNumber) {
              return {
                ...floor,
                rooms: floor.rooms.map((room) => {
                  if (room.id === currentRoomForDetails.id) {
                    return {
                      ...room,
                      beds: room.beds.map((b) =>
                        b.id === selectedBedForAssignment.id
                          ? {
                              ...b,
                              isOccupied: true,
                              studentId: studentToAssign,
                            }
                          : b
                      ),
                    };
                  }
                  return room;
                }),
              };
            }
            return floor;
          }),
        };
      }
      return hostel;
    });

    const updatedStudents = students.map((s) =>
      s.id === studentToAssign
        ? {
            ...s,
            roomNumber: currentRoomForDetails.roomNumber,
            bedNumber: selectedBedForAssignment.bedNumber,
          }
        : s
    );

    setHostels(updatedHostels);
    setStudents(updatedStudents);
    setOpenAssignStudentDialog(false);
    setOpenRoomDetailsDialog(false); // Close room details after assignment
    showSnackbar("Student assigned!", "success");
  };

  return (
    <Box className="mt-4">
      <Box className="d-flex justify-content-between align-items-center mb-4">
        <Typography variant="h4" component="h2">
          Hostel Structure Overview
        </Typography>
        <Box>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteHostel}
            className="rounded-pill me-2" // Added me-2 for margin-right
            disabled={!selectedHostelId} // Disable if no hostel is selected
          >
            Delete Hostel
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpenAddHostelDialog(true)}
            className="rounded-pill"
          >
            Add New Hostel
          </Button>
        </Box>
      </Box>

      {/* Hostel Selector */}
      <FormControl fullWidth variant="outlined" className="mb-4">
        <InputLabel id="hostel-select-label">Select Hostel</InputLabel>
        <Select
          labelId="hostel-select-label"
          value={selectedHostelId || ""}
          onChange={(e) => {
            const newHostelId = e.target.value;
            setSelectedHostelId(newHostelId);
            const hostel = hostels.find((h) => h.id === newHostelId);
            setSelectedFloorNumber(hostel?.floors[0]?.floorNumber || null);
          }}
          label="Select Hostel"
          className="rounded-pill"
        >
          {hostels.length === 0 && (
            <MenuItem disabled>No hostels available</MenuItem>
          )}
          {hostels.map((h) => (
            <MenuItem key={h.id} value={h.id}>
              {h.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedHostel ? (
        <Grid container spacing={3}>
          {/* Floor Navigation */}
          <Grid item xs={12} md={3}>
            <Card className="shadow-sm rounded-3 h-100">
              <CardContent>
                <Typography variant="h6" className="mb-3">
                  Floors
                </Typography>
                <List>
                  {selectedHostel.floors.length === 0 ? (
                    <Typography
                      variant="body2"
                      className="text-center text-muted"
                    >
                      No floors defined for this hostel.
                    </Typography>
                  ) : (
                    selectedHostel.floors.map((floor) => (
                      <ListItem
                        key={floor.id}
                        button
                        selected={floor.floorNumber === selectedFloorNumber}
                        onClick={() =>
                          setSelectedFloorNumber(floor.floorNumber)
                        }
                        className="rounded-3 mb-2"
                        sx={{
                          "&.Mui-selected": {
                            backgroundColor: "#e3f2fd",
                            fontWeight: "bold",
                          },
                          "&.Mui-selected:hover": {
                            backgroundColor: "#bbdefb",
                          },
                        }}
                      >
                        <ListItemText primary={`Floor ${floor.floorNumber}`} />
                      </ListItem>
                    ))
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Rooms Grid */}
          <Grid item xs={12} md={9}>
            <Card className="shadow-sm rounded-3 h-100">
              <CardContent>
                <Box className="d-flex justify-content-between align-items-center mb-3">
                  <Typography variant="h5">
                    Rooms on Floor {selectedFloorNumber}
                  </Typography>
                  {selectedHostelId && selectedFloorNumber && (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={handleAddRoomClick}
                      className="rounded-pill"
                    >
                      Add Room
                    </Button>
                  )}
                </Box>
                {selectedFloor ? (
                  selectedFloor.rooms.length > 0 ? (
                    <Grid container spacing={2}>
                      {selectedFloor.rooms.map((room) => {
                        const occupiedBedsCount = room.beds.filter(
                          (bed) => bed.isOccupied
                        ).length;
                        const totalBedsCount = room.beds.length;
                        const occupancyPercentage =
                          totalBedsCount > 0
                            ? (occupiedBedsCount / totalBedsCount) * 100
                            : 0;

                        let statusColor = "text-success";
                        if (occupancyPercentage >= 75) {
                          statusColor = "text-danger";
                        } else if (occupancyPercentage > 0) {
                          statusColor = "text-warning";
                        }

                        return (
                          <Grid item xs={12} sm={6} md={4} key={room.id}>
                            <Card
                              className="shadow-sm rounded-3 h-100 d-flex flex-column justify-content-between"
                              sx={{
                                transition: "transform 0.2s",
                                "&:hover": { transform: "scale(1.02)" },
                              }}
                            >
                              <CardContent>
                                <Box className="d-flex justify-content-between align-items-start mb-1">
                                  <Typography variant="h6">
                                    Room {room.roomNumber}
                                  </Typography>
                                  <Box>
                                    {room.isAC && (
                                      <AcUnitIcon
                                        color="primary"
                                        sx={{ fontSize: 20, ml: 0.5 }}
                                        titleAccess="AC Room"
                                      />
                                    )}
                                    {room.hasTable && (
                                      <TableChartIcon
                                        color="action"
                                        sx={{ fontSize: 20, ml: 0.5 }}
                                        titleAccess="Has Table"
                                      />
                                    )}
                                  </Box>
                                </Box>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Capacity: {totalBedsCount} beds
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={`fw-bold ${statusColor}`}
                                >
                                  Occupancy: {occupiedBedsCount}/
                                  {totalBedsCount}
                                </Typography>
                              </CardContent>
                              <Box className="p-3 bg-light rounded-bottom-3 d-flex justify-content-end gap-2">
                                <Button
                                  size="small"
                                  variant="outlined"
                                  className="rounded-pill"
                                  onClick={() => handleRoomCardClick(room)}
                                >
                                  View Beds
                                </Button>
                                <IconButton
                                  size="small"
                                  onClick={() => handleEditRoomClick(room)}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  onClick={() => handleDeleteRoom(room.id)}
                                >
                                  <DeleteIcon fontSize="small" color="error" />
                                </IconButton>
                              </Box>
                            </Card>
                          </Grid>
                        );
                      })}
                    </Grid>
                  ) : (
                    <Typography
                      variant="body1"
                      className="text-center text-muted"
                    >
                      No rooms on this floor. Click "Add Room" to get started.
                    </Typography>
                  )
                ) : (
                  <Typography
                    variant="body1"
                    className="text-center text-muted"
                  >
                    Select a floor to view rooms.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="body1" className="text-center text-muted">
          No hostel selected or available. Please add a new hostel.
        </Typography>
      )}

      {/* Dialogs - Rendered as components, not inline JSX */}
      <AddHostelDialog
        open={openAddHostelDialog}
        onClose={() => setOpenAddHostelDialog(false)}
        onAddHostel={handleAddHostel}
        newHostelName={newHostelName}
        setNewHostelName={setNewHostelName}
        newHostelFloors={newHostelFloors}
        setNewHostelFloors={setNewHostelFloors}
      />
      <AddEditRoomDialog
        open={openAddEditRoomDialog}
        onClose={() => setOpenAddEditRoomDialog(false)}
        currentRoom={currentRoom}
        roomForm={roomForm}
        setRoomForm={setRoomForm}
        onSaveRoom={handleSaveRoom}
      />
      <RoomDetailsDialog
        open={openRoomDetailsDialog}
        onClose={() => setOpenRoomDetailsDialog(false)}
        currentRoomForDetails={currentRoomForDetails}
        getStudentById={getStudentById}
        handleBedClick={handleBedClick}
      />
      <AssignStudentDialog
        open={openAssignStudentDialog}
        onClose={() => setOpenAssignStudentDialog(false)}
        selectedBedForAssignment={selectedBedForAssignment}
        currentRoomForDetails={currentRoomForDetails}
        studentToAssign={studentToAssign}
        setStudentToAssign={setStudentToAssign}
        getAvailableStudents={getAvailableStudents}
        onAssignStudent={handleAssignStudent}
      />
    </Box>
  );
};

export default HostelStructure;
