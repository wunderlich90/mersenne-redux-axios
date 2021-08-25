import axios from 'axios';
import {useState} from 'react';
import { useDispatch } from 'react-redux';

function BookForm() {
  const dispatch = useDispatch();
  /* const [title, setTitle] = useState('');
  const [author, setAuthor] = useState(''); */
  const [book, setBook] = useState({
    title: '',
    author: ''
  })

  const handleSubmit = event => {
    event.preventDefault();

    console.log(`Adding book`, book);


    setBook({
      title: '',
      author: ''
    })

    // Send my book to a saga
    dispatch({
      type: 'ADD_BOOK',
      payload: book
    });

  };

  return (
    <section>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit} className="add-book-form">
        <input 
          required 
          placeholder="Title" 
          value={book.title}
          onChange={(event) => setBook({
            ...book,
            title: event.target.value
          })}
        />

        <input 
          required 
          placeholder="Author" 
          value={book.author}
          onChange={(event) => setBook({
            ...book,
            author: event.target.value
          })}
        />

        <button type="submit">
          Add Book
        </button>
      </form>
    </section>
  );
}

export default BookForm;