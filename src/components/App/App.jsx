import BookList from '../BookList/BookList';
import BookForm from '../BookForm/BookForm';

import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

function App() {

  return (
    <div className="App">
      <header><h1>Books w/ Redux!</h1></header>
      <main>
        <BookForm />
        <BookList />
      </main>
    </div>
  );
}

export default App;