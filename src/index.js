import ReactDOM from "react-dom";
import {useReducer} from 'react'
import React from 'react'
import {User} from './components/User'
import {Books} from './components/Books'
import {Movies} from './components/Movies'
import {Context} from './context'
import userReducer from './redusers/user_reducer'
import booksReducer from './redusers/books_reducer'
import moviesReducer from './redusers/movies_reduser'

// 定义 store
const store = {
  user: null,
  books: null,
  movies: null
};
const obj = {
  ...userReducer,
  ...booksReducer,
  ...moviesReducer
}
// 定义 reducer
function reducer(state, action) {
  const fn = obj[action.type]
  if(obj[action]){
    return fn(state, action)
  }else{
    throw new Error('传的什么玩意')
  }
}


function App() {
  const [state, dispatch] = useReducer(reducer, store);

  const api = { state, dispatch };
  return (
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

