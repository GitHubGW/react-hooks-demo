import { LanguageContextProvider } from "./context";
import Home from "./Home";

const App = () => {
  return (
    <LanguageContextProvider>
      <Home />
    </LanguageContextProvider>
  );
};

export default App;
