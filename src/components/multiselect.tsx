import { forwardRef, useState } from "react";
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Stack,
  Chip,
} from "@mui/material";
import Iconify from "./iconify";
import { palette } from "@/theme/palette";

interface MultiSelectProps {
  sx?: object;
  label: string;
  options: {
    name: string;
    id: number;
  }[];
  selected: number[];
  setSelected: (selected: number[]) => void;
  [x: string]: any;
}

const MultiSelect = ({
  label,
  options,
  sx,
  selected,
  setSelected,
  other,
}: MultiSelectProps) => {
  return (
    <FormControl sx={sx}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={selected}
        onChange={(e: any) => setSelected(e.target.value)}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => (
          <Stack gap={1} direction="row" flexWrap="wrap">
            {(selected as number[]).map((value) => (
              <Chip
                key={value}
                label={options.find((item) => item.id === value)?.name}
                onDelete={() =>
                  setSelected(
                    (selected as number[]).filter((item) => item !== value)
                  )
                }
                deleteIcon={
                  <Iconify
                    icon="bi:x-circle"
                    onMouseDown={(event: any) => event.stopPropagation()}
                    width={16}
                  />
                }
              />
            ))}
          </Stack>
        )}
        {...other}
      >
        {options.map((option) => (
          <MenuItem
            key={option.id}
            value={option.id}
            sx={{ justifyContent: "space-between" }}
          >
            {option.name}
            {selected.includes(option.id as never) ? (
              <Iconify icon="bi:check2-circle" />
            ) : null}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelect;
