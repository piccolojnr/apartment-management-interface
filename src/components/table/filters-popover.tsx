import React from "react";
import { Popover, Stack, Typography, Grid, Button } from "@mui/material";
import { FiltersPopoverProps } from "../../types/table";

const FiltersPopover: React.FC<FiltersPopoverProps> = ({
  open,
  filters,
  handleClose,
  setFilter,
}) => {
  const handleFilterClick = (filter: any) => {
    setFilter && setFilter(filter);
    handleClose();
  };

  return (
    <Popover
      open={!!open}
      anchorEl={open}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      PaperProps={{
        sx: { width: 200, padding: 0, boxShadow: 3, borderRadius: 2 },
      }}
    >
      <Stack direction="column" alignItems="center" spacing={2}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          Select Filter
        </Typography>
        <Grid container spacing={1} direction="column" alignItems="center">
          {filters.map((filter) => (
            <Grid item key={filter.id} sx={{ width: "100%" }}>
              <Button
                color="primary"
                fullWidth
                onClick={() => handleFilterClick(filter)}
                sx={{
                  width: "100%",
                  justifyContent: "flex-start",
                }}
              >
                {filter.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Popover>
  );
};

export default FiltersPopover;
