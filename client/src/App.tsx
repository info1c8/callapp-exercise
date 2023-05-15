import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./assets";
import { theme } from "./theme";
import { UsersTable } from "./layouts";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <UsersTable />
    </ThemeProvider>
  )
}

export default App;