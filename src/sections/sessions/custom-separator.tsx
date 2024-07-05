import { Breadcrumbs, Button, Stack, Typography } from "@mui/material";
import Iconify from "../../components/iconify";
import { palette } from "../../theme/palette";

function CustomSeparator({
  breadcrumbs,
  changePage,
  page,
}: {
  page: number;
  breadcrumbs: {
    label: string;
  }[];
  changePage: (index: number) => void;
}): JSX.Element {
  const Breadcrumb = ({ index, label }: { index: number; label: string }) => (
    <Button
      color="inherit"
      sx={{ textTransform: "capitalize" }}
      onClick={() => changePage(index)}
    >
      {label}
    </Button>
  );

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<Iconify icon="ic:baseline-navigate-next" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs.map((breadcrumb, index) => (
          <Typography
            key={index}
            variant="body2"
            component="span"
            color={
              page <= index
                ? page === index
                  ? palette.primary.main
                  : "text.disabled"
                : "inherit"
            }
          >
            {page <= index ? (
              breadcrumb.label
            ) : (
              <Breadcrumb index={index} label={breadcrumb.label} />
            )}
          </Typography>
        ))}
      </Breadcrumbs>
    </Stack>
  );
}

export default CustomSeparator;
