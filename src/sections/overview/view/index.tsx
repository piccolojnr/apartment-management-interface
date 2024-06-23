import { Container, Grid, TextField, Typography } from "@mui/material";
import { useMqtt } from "../../../context/mqtt-context";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

export default function AppView() {
  const [text, setText] = useState("");
  const { isConnected, message, publish, loading } = useMqtt();

  const handlePublish = () => {
    if (!isConnected) return;
    if (text === "") return;
    publish("test/topic", text);
    setText("");
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">MQTT</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>Connected: {isConnected ? "Yes" : "No"}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>Message: {message?.message}</Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            disabled={!isConnected || loading}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <LoadingButton
            onClick={handlePublish}
            loading={loading}
            variant="contained"
          >
            Publish
          </LoadingButton>
        </Grid>
      </Grid>
    </Container>
  );
}
