import { ThemeProvider } from "styled-components";
import { Helmet } from "react-helmet-async";
import { GlobalStyles } from "./assets";
import { theme } from "./theme";
import { UsersTable } from "./layouts";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Helmet>
      <UsersTable />
    </ThemeProvider>
  )
}

export default App;