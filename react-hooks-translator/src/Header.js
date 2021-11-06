import { useContext } from "react";
import { UserContext } from "./context";

const Header = () => {
  const context = useContext(UserContext);

  return (
    <div>
      <h1>Header {context.user.name}</h1>
    </div>
  );
};

export default Header;
