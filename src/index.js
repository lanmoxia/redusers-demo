import ReactDOM from "react-dom";
import {useContext, useEffect, useReducer} from 'react'
import React from 'react'

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
// 定义 Context
const Context = React.createContext(null);

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
// user 组件
function User() {
  // user 组件通过 useContext 获取到 Context 也就是读写 api
  const { state, dispatch } = useContext(Context);
  // 每次 user 组件刷新 都要setUser，每次都要请求 ajax
  // 通过 useEffect 设置就地磁进来刷新请求 ajax
  useEffect(() => {
    // user 数据默认是空，谁来设置他的数据更新呢 这里通过一个假的 ajax 来获取数据
    // 通过 ajax 返回获取到 user
    ajax("/user").then((user) => {
      // 通过 dispatch 来设置 user
      dispatch({ type: "setUser", user: user });
    });
  }, []);
  return (
    <div>
      <h1>个人信息</h1>
      <div>name: {state.user ? state.user.name : ""}</div>
    </div>
  );
}
function Books() {
  const { state, dispatch } = useContext(Context);
  useEffect(() => {
    ajax("/books").then((books) => {
      dispatch({ type: "setBooks", books: books });
    });
  }, []);
  return (
    <div>
      <h1>我的书籍</h1>
      <ol>
        {state.books
          ? state.books.map((book) => <li key={book.id}>{book.name}</li>)
          : "加载中"}
      </ol>
    </div>
  );
}

function Movies() {
  const { state, dispatch } = useContext(Context);
  useEffect(() => {
    ajax("/movies").then((movies) => {
      dispatch({ type: "setMovies", movies: movies });
    });
  }, []);
  return (
    <div>
      <h1>我的电影</h1>
      <ol>
        {state.movies
          ? state.movies.map((movie) => <li key={movie.id}>{movie.name}</li>)
          : "加载中"}
      </ol>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// 帮助函数

// 假 ajax
// 两秒钟后，根据 path 返回一个对象，必定成功不会失败
function ajax(path) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (path === "/user") {
        resolve({
          id: 1,
          name: "Frank"
        });
      } else if (path === "/books") {
        resolve([
          {
            id: 1,
            name: "JavaScript 高级程序设计"
          },
          {
            id: 2,
            name: "JavaScript 精粹"
          }
        ]);
      } else if (path === "/movies") {
        resolve([
          {
            id: 1,
            name: "爱在黎明破晓前"
          },
          {
            id: 2,
            name: "恋恋笔记本"
          }
        ]);
      }
    }, 2000);
  });
}