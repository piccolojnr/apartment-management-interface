import ThemeProvider from "./theme";
import "./global.css";
import { UserProvider } from "./context/user-context";
import Router from "./routes/sections";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Router />
        </LocalizationProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
