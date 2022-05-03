import ReactDOM from "react-dom";
import {useReducer} from 'react'
import React from 'react'
import {User} from './components/User'
import {Books} from './components/Books'
import {Movies} from './components/Movies'
import {Context} from './context'
// 定义 store
const store = {
  user: null,
  books: null,
  movies: null
};
// 定义 reducer
function reducer(state, action) {
  switch (action.type) {
    case "setUser":
      return { ...state, user: action.user };
    case "setBooks":
      return { ...state, books: action.books };
    case "setMovies":
      return { ...state, movies: action.movies };
    default:
      throw new Error();
  }
}


function App() {
  const [state, dispatch] = useReducer(reducer, store);

  const api = { state, dispatch };
  return (
    // 将第四部分的内容放到 Context
    // 意思就是把 读写 api 放到 Context.Provider 上
    // Context 提供给下边三个组件
    // 三个组件就能获取到读写 api 了
    <Context.Provider value={api}>
      <User />
      <hr />
      <Books />
      <Movies />
    </Context.Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

