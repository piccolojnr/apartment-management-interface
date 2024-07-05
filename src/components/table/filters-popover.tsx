import React from "react";
import { Popover, Stack, Typography, Grid, Button } from "@mui/material";
import { FiltersPopoverProps } from "../../types/table";

const FiltersPopover: React.FC<FiltersPopoverProps> = ({
  open,
  filters,
  handleClose,
  setFilter,
  filter: currentFilter,
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
        sx: { width: 200, padding: 2, boxShadow: 3, borderRadius: 2 },
      }}
    >
      <Stack direction="column" alignItems="center" spacing={2}>
        <Typography variant="subtitle2" sx={{ color: "seconary.main", mb: 1 }}>
          Select Filter
        </Typography>
        <Grid container spacing={1} direction="column" alignItems="center">
          {filters.map((filter) => (
            <Grid item key={filter.id} sx={{ width: "100%" }}>
              <Button
                color="primary"
                fullWidth
                onClick={() =>
                  currentFilter?.id !== filter.id && handleFilterClick(filter)
                }
                sx={{
                  width: "100%",
                  justifyContent: "flex-start",
                }}
                disabled={currentFilter?.id === filter.id}
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
