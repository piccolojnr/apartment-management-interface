import { Role } from "@/types/user";
import {
  Badge,
  Box,
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import React from "react";
import Label from "./label";
import Iconify from "./iconify";

interface CustomMultiSelectProps {
  label: string;
  roles: Role[];
  selectedRoles: number[];
  setSelectedRoles: (roles: number[]) => void;
  error?: string;
  className?: string;
}

const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({
  label,
  roles,
  selectedRoles,
  setSelectedRoles,
  className,
  error,
}) => {
  return (
    <div className={className}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          py: 1,
        }}
      >
        {selectedRoles.map((id) => {
          const role = roles.find((r) => r.id === id);
          return (
            <Label
              key={id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>{role?.name}</div>
              <IconButton
                type="button"
                onClick={() => {
                  setSelectedRoles(selectedRoles.filter((r) => r !== id));
                }}
                sx={{ p: 0.5 }}
              >
                <Iconify icon="mdi:close" className="w-4 h-4" />
              </IconButton>
            </Label>
          );
        })}
      </Box>
      <TextField label={label} defaultValue={""} select sx={{ width: "100%" }}>
        <MenuItem value={""}>Select roles</MenuItem>
        {roles
          .filter((role) => !selectedRoles.includes(role.id))
          .map((role) => (
            <MenuItem
              key={role.id}
              onClick={() => {
                setSelectedRoles([...selectedRoles, role.id]);
              }}
              value={role.id}
            >
              {role.name}
            </MenuItem>
          ))}
      </TextField>
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default CustomMultiSelect;
