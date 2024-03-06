import React, { useState, useEffect } from 'react';
import LogoutButton from '../Logout/Logout';
import BookModal from '../Books/BookModal';
import UsersList from './Users';
import BooksTable from '../Books/BooksTable';
import {
  getBooksByUser,
  getCustomers,
  removeBook,
  saveNewBook,
  updateBook,
} from '../../services/apiService';

const Bookstore = ({ userDetails, selectedUserId }) => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [error, setError] = useState('');
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    year: '',
    user_id: selectedUserId,
  });

  useEffect(() => {
    if (userDetails.role === 'librarian' || userDetails.role === 'admin') {
      getCustomers(setUsers, setError)
        .then((response) => {
          setUsers(response);
        })
        .catch(() => {
          setError('There was an issue with your request');
        });
    } else if (userDetails.role === 'customer') {
      getBooksByUser(userDetails.id)
        .then((response) => {
          setBorrowedBooks(response);
        })
        .catch(() => {
          setError('There was an issue with your request');
        });
    }
  }, [userDetails, selectedUserId]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    if (userDetails.role === 'librarian' || userDetails.role === 'admin') {
      getBooksByUser(user.id)
        .then((response) => {
          setBorrowedBooks(response);
        })
        .catch(() => {
          setError('There was an issue with your request');
        });
    }
  };

  const handleAddBookClick = () => {
    setShowModal(true);
  };

  const handleEditBookClick = (book) => {
    setNewBook(book);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleInputChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleSaveBook = () => {
    const bookData = { ...newBook, user_id: selectedUser.id };
    saveNewBook(bookData)
      .then((response) => {
        setShowModal(false);
        setBorrowedBooks([...borrowedBooks, response]);
        setNewBook({
          title: '',
          author: '',
          year: '',
          user_id: selectedUser.id,
        });
      })
      .catch(() => {
        setError('There was an issue with your request');
      });
  };

  const handleUpdateBook = () => {
    const bookData = { ...newBook, user_id: selectedUser.id };
    updateBook(bookData)
      .then((response) => {
        const updatedBooks = borrowedBooks.map((book) =>
          book.id === response.data.id ? response.data : book,
        );
        setBorrowedBooks(updatedBooks);
        setShowEditModal(false);
        setNewBook({
          title: '',
          author: '',
          year: '',
          user_id: selectedUser.id,
        });
      })
      .catch(() => {
        setError('There was an issue with your request');
      });
  };

  const handleRemoveBook = (bookId) => {
    removeBook(selectedUser.id, bookId)
      .then((response) => {
        const updatedBooks = response.filter((book) => book.id !== bookId);
        setBorrowedBooks(updatedBooks);
      })
      .catch(() => {
        setError('There was an issue with your request');
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-11">
          <h1>Bookstore</h1>
        </div>
        <div className="col-md-1">
          <LogoutButton />
        </div>
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}
        {(userDetails.role === 'librarian' || userDetails.role === 'admin') && (
          <div className="col-md-4">
            <UsersList users={users} handleUserClick={handleUserClick} />
          </div>
        )}
        {(userDetails.role === 'customer' || selectedUser) && (
          <div className="col-md-8">
            <BooksTable
              borrowedBooks={borrowedBooks}
              firstName={
                userDetails.role === 'customer'
                  ? userDetails.first_name
                  : selectedUser.first_name
              }
              lastName={
                userDetails.role === 'customer'
                  ? userDetails.last_name
                  : selectedUser.last_name
              }
              handleAddBookClick={handleAddBookClick}
              userRole={userDetails.role}
              handleEditBook={handleEditBookClick}
              handleRemoveBook={handleRemoveBook}
            />
          </div>
        )}
      </div>
      {showModal && (
        <BookModal
          title={'Add Book'}
          handleCloseModal={handleCloseModal}
          newBook={newBook}
          handleInputChange={handleInputChange}
          handleSaveBook={handleSaveBook}
        />
      )}
      {showEditModal && (
        <BookModal
          title={'Edit Book'}
          handleCloseModal={handleCloseEditModal}
          newBook={newBook}
          handleInputChange={handleInputChange}
          handleSaveBook={handleUpdateBook}
        />
      )}
    </div>
  );
};

export default Bookstore;
