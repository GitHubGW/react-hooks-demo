# React Hooks Demo

## useContext

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

#### useContext 사용 예시

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

## useReducer

- useReducer는 주로 컴포넌트가 많은 수의 state값을 가지고 있을 때 쓰이거나, 컴포넌트의 state를 좀 더 최적화시킬 때 사용한다.
- 즉, 컴포넌트의 state를 변경해야 하는데, 이 state가 굉장히 방대해서 파악하기 힘들 때, 좀 더 보기 쉽게 정리정돈해서 작업할 수 있다.

#### useReducer 사용 예시

```javascript
import { useReducer } from "react";

// reducer함수는 파라미터 state에 현재 state를 받아오게 되고, action에는 dispatch함수가 보낸 값을 전달받게 된다.
// reducer함수가 리턴하는 값이 곧, 현재 state값으로 대체해서 들어가게 된다.
// dispatch함수는 reducer함수를 재실행시키는 역할을 하는데, 재실행시킬 때 action을 같이 보내주게 된다.
// 그렇게되면 reducer함수는 이 action을 받아서 action안에 있는 타입에 따라 if문이나 switch문을 실행하고 새로운 state값을 리턴하게 된다.
const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return { count: state.count + 1 };
    case "minus":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};

const App = () => {
  // useReducer훅은 첫 번째 인자로 reducer함수를 받고, 두 번째 인자로는 state의 초기값을 받는다.
  // useReducer훅을 실행하게 되면 state와 dispatch를 받아올 수 있는데 state에는 현재 state값을 받아오고, dispatch에는 reducer함수를 재실행시킬 수 있는 dispatch함수를 받아온다.
  // reducer함수가 처음으로 실행될 때, useReducer를 통해 전달한 값인 { count: 0 }을 state의 초기값으로 받아서 실행한다.
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <h2>{state.count}</h2>
      <button onClick={() => dispatch({ type: "add" })}>Add</button>
      <button onClick={() => dispatch({ type: "minus" })}>Minus</button>
    </div>
  );
};

export default App;
```
