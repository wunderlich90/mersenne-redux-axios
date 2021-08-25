  import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'

function BookList() {
  const bookList = useSelector(store => store.bookList);
  const dispatch = useDispatch();

  // When this component load
  // fetch our books from the server
  // (GET /books, and save to redux store)
  useEffect(() => {
    dispatch({
      type: 'FETCH_BOOKS',
    });
  }, []);

  return (
    <section>
      <h2>All Books</h2>
      <ul>
        {bookList.map((book, index) => 
          <li key={index}>{book.title} by {book.author}</li>  
        )}
      </ul>
    </section>
  );
}

export default BookList;