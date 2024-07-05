import {
  Box,
  Button,
  Card,
  Container,
  Fade,
  Grid,
  Slide,
  Stack,
} from "@mui/material";
import { AddBillSession } from "../../settings/forms";
import { useEffect, useState } from "react";
import { BillSession, UtilityType } from "@/types/table";
import PickDevice from "../pick-device";
import PickUtilityType from "../pick-utility-type";
import PickSession from "../pick-session";
import CustomSeparator from "../custom-separator";

export default function SessionsView() {
  const [session, setSession] = useState<BillSession>();
  const [utilityType, setUtilityType] = useState<UtilityType>();
  const [page, setPage] = useState(0);

  useEffect(() => {
    const savedSession = localStorage.getItem("session");
    const savedUtilityType = localStorage.getItem("utilityType");
    const savedPage = localStorage.getItem("page");

    if (savedSession) setSession(JSON.parse(savedSession));
    if (savedUtilityType) setUtilityType(JSON.parse(savedUtilityType));
    if (savedPage) setPage(parseInt(savedPage));
  }, []);

  useEffect(() => {
    if (session) localStorage.setItem("session", JSON.stringify(session));
  }, [session]);

  useEffect(() => {
    if (utilityType)
      localStorage.setItem("utilityType", JSON.stringify(utilityType));
  }, [utilityType]);

  const breadcrumbs = [
    { label: "Add Sessions" },
    { label: "Pick Session" },
    { label: "Utility Types" },
    { label: "Devices" },
  ];

  const handleChangePage = (index: number) => {
    setPage(index);
    localStorage.setItem("page", index.toString());
  };

  const handleSubmitSession = (session: BillSession) => {
    setSession(session);
    handleChangePage(1);
  };

  const handleSetUtilityType = (utilityType: UtilityType) => {
    setUtilityType(utilityType);
    handleChangePage(3);
  };

  const handleSetSession = (session: BillSession) => {
    setSession(session);
    handleChangePage(2);
  };

  return (
    <Container>
      <Stack spacing={2}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <CustomSeparator
            page={page}
            breadcrumbs={breadcrumbs}
            changePage={handleChangePage}
          />
        </Grid>

        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ mt: 2, width: "100%" }}
        >
          {[0, 1, 2, 3].map((index) => (
            <Fade
              in={page === index}
              key={index}
              timeout={{ enter: 500, exit: 500 }}
            >
              <Box
                display={page === index ? "block" : "none"}
                sx={{ width: "100%" }}
              >
                <Slide in={page === index} direction="left">
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {index === 0 && (
                      <>
                        <Grid
                          container
                          direction="row"
                          justifyContent="start"
                          alignItems="center"
                          spacing={2}
                          sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row-reverse",
                            justifyContent: "space-between",
                            alignItems: "center",
                            justifyItems: "space-between",
                            my: 2,
                            ml: 2,
                          }}
                          gap={4}
                        >
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleChangePage(1)}
                          >
                            Pick Session
                          </Button>
                        </Grid>
                        <Card
                          sx={{
                            boxShadow: 3,
                            borderRadius: 2,
                            p: 4,
                            maxWidth: 400,
                          }}
                        >
                          <AddBillSession onClose={handleSubmitSession} />
                        </Card>
                      </>
                    )}
                    {index === 1 && (
                      <PickSession handleSetSession={handleSetSession} />
                    )}
                    {index === 2 && (
                      <PickUtilityType
                        handleSetUtilityType={handleSetUtilityType}
                      />
                    )}
                    {index === 3 && (
                      <PickDevice
                        utilityType={utilityType}
                        billSession={session}
                      />
                    )}
                  </Box>
                </Slide>
              </Box>
            </Fade>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}
