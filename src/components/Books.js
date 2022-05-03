import React, {useContext, useEffect} from 'react'

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
export {Books}