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
const obj = {
  'setUser': (state, action) => {
    return {...state, user: action.user }
  },
  'setBooks': (state, action) => {
    return {...state, books: action.books }
  },
  'setMovies': (state, action) => {
    return {...state, movies: action.movies }
  }
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

