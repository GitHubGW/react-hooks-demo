import { useContext } from "react";
import { UserContext } from "./context";
import Header from "./Header";

const Screen = () => {
  const context = useContext(UserContext);

  return (
    <div>
      <Header></Header>
      <h1>Screen {context.user.name}</h1>
    </div>
  );
};

export default Screen;
