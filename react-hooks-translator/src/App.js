import { UserContextProvider } from "./context";
import Screen from "./Screen";

const App = () => {
  return (
    <UserContextProvider>
      <Screen />
    </UserContextProvider>
  );
};

export default App;
