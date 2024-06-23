import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const AddPersonForm = ({ addPerson }: any) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addPerson({ name });
    setName("");
  };

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, mb: 3 }}>
      <CardContent>
        <Typography variant="h6">Add Person</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddPersonForm;
