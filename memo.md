# React Hooks Demo

- Redux나 useContext를 사용하는 이유는 State Management(상태 관리)를 하기 위해서이다.
- useContext는 상태 관리를 위한 간단한 해결책을 제시하는데, 데이터를 사용자가 만든 Component나 State에 저장하고 보관한다.
- 그래서 Props를 전달하기 위해서 Props를 사용하지 않는 컴포넌트를 굳이 이용하지 않고, 데이터가 필요할 때 언제든지 데이터가 저장된 객체에 들어가서 필요한 데이터만 가져와서 사용한다.
- Context는 React를 사용해서 적용할 수 있는 비교적 간단한 방식이고, Redux는 거기서 좀 더 거대한 State와 많은 상태 변화가 있을 때 적합하다.

#### Context

- Context는 어플리케이션의 데이터 저장소이다.
- 컴포넌트들을 필요할 때마다 Context안에 있는 데이터를 가져와서 사용할 수 있다.
- useContext: https://ko.reactjs.org/docs/hooks-reference.html#usecontext

```javascript
// context.js
import { createContext, useState } from "react";

// createContext메서드를 이용해서 context를 생성한다.
// context는 일종의 데이터 저장소이다.
export const UserContext = createContext();

// 위에서 생성한 context를 이용해서 context의 provide를 생성한다.
// UserContext.Provider안에 넣는 모든 자식 컴포넌트들은 UserContext.Provider가 가지고 있는 value props의 값에 접근할 수 있다.
// context, 일종의 데이터 저장소를 제공하는 provider를 생성한다.
export const UserContextProvider = ({ children }) => {
  return <UserContext.Provider value={{ name: "GW" }}>{children}</UserContext.Provider>;
};

// App.js
import { UserContextProvider } from "./context";
import Screen from "./Screen";

// UserContext.Provider컴포넌트 내부에 들어오는 Screen은 UserContext.Provider가 가지고 있는 value props에 접근할 수 있다.
const App = () => {
  return (
    <UserContextProvider>
      <Screen />
    </UserContextProvider>
  );
};

export default App;

// Header.js
import { useContext } from "react";
import { UserContext } from "./context";

const Header = () => {
  // UserContext.Provider가 가지고 있는 value props를 사용하기 위해 useContext훅에게 생성한 context인 UserContext를 전달해준다.
  const context = useContext(UserContext);

  return (
    <h1>Header {context.name}</h1>
  );
};

export default Header;
```

#### Context 사용 예시

- App.js에서 createContext()메서드를 이용해서 Context를 생성해줬다.
- 생성해준 Context를 이용해서 Context.Provider컴포넌트를 만들고, Context.Provider컴포넌트의 value props에 전달하고자 하는 값을 할당한다.
- 이렇게 해주면 Context.Provider컴포넌트의 모든 자식 컴포넌트들은 value props의 값을 가져와서 사용할 수 있다.
- useContext훅에 createContext()를 이용해서 생성한 Context를 전달해주면 Context안에 있는 value값인 "Hello"를 받아올 수 있다.

```javascript
// App.js
import { createContext } from "react";
import GrandParent from "./GrandParent";

export const Context = createContext();

function App() {
  return (
    <div>
      <h1>App</h1>
      <Context.Provider value={"Hello"}>
        <GrandParent></GrandParent>
      </Context.Provider>
    </div>
  );
}

export default App;

// GrandParent.js
import { useContext } from "react";
import { Context } from "./App";
import Parent from "./Parent";

const GrandParent = () => {
  const text = useContext(Context);

  return (
    <div>
      <h1>{text} GrandParent</h1>
      <Parent></Parent>
    </div>
  );
};

export default GrandParent;

// Parent.js
import { useContext } from "react";
import { Context } from "./App";
import Child from "./Child";

const Parent = () => {
  const text = useContext(Context);

  return (
    <div>
      <h1>{text} Parent</h1>
      <Child></Child>
    </div>
  );
};

export default Parent;

// Child.js
import { useContext } from "react";
import { Context } from "./App";

const Child = () => {
  const text = useContext(Context);

  return (
    <div>
      <h1>{text} Child</h1>
    </div>
  );
};

export default Child;
```