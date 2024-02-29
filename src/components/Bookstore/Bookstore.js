import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LogoutButton from '../Logout/Logout';
import BookModal from '../Books/BookModal';
import UsersList from './Users';
import BooksTable from '../Books/BooksTable';
import { removeBook } from '../../services/apiService';

const Bookstore = ({ userDetails, selectedUserId }) => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    year: '',
    user_id: selectedUserId,
  });

  useEffect(() => {
    if (userDetails.role === 'librarian' || userDetails.role === 'admin') {
      axios.get(`${process.env.REACT_APP_API_URL}/users/customers`)
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    } else if (userDetails.role === 'customer') {
      axios.get(`${process.env.REACT_APP_API_URL}/users/${userDetails.id}/books`)
        .then(response => {
          setBorrowedBooks(response.data);
        })
        .catch(error => {
          console.error('Error fetching borrowed books:', error);
        });
    }
  }, [userDetails, selectedUserId]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    if (userDetails.role === 'librarian' || userDetails.role === 'admin') {
      axios.get(`${process.env.REACT_APP_API_URL}/users/${user.id}/books`)
        .then(response => {
          setBorrowedBooks(response.data);
        })
        .catch(error => {
          console.error('Error fetching borrowed books:', error);
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
    axios.post(`${process.env.REACT_APP_API_URL}/books/borrow`, bookData)
      .then(response => {
        setShowModal(false);
        setBorrowedBooks([...borrowedBooks, response.data]);
        setNewBook({
          title: '',
          author: '',
          year: '',
          user_id: selectedUser.id
        });
      })
      .catch(error => {
        console.error('Error adding book:', error);
      });
  };

  const handleUpdateBook = () => {
    const bookData = { ...newBook, user_id: selectedUser.id };
    axios.put(`${process.env.REACT_APP_API_URL}/books/${newBook.id}`, bookData)
      .then(response => {
        setShowEditModal(false);
        const updatedBooks = borrowedBooks.map(book => {
          if (book.id === newBook.id) {
            return newBook;
          } else {
            return book;
          }
        }
        );
        setBorrowedBooks(updatedBooks);
        setNewBook({
          title: '', 
          author: '', 
          year: '', 
          user_id: selectedUser.id
        });
      })
      .catch(error => {
        console.error('Error updating book:', error);
      });
  };

  const handleRemoveBook = (bookId) => { 
    removeBook(bookId, borrowedBooks, setBorrowedBooks);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-11">
          <h1>Bookstore</h1>
        </div>
        <div className="col-md-1">
          <LogoutButton />
        </div>
        {(userDetails.role === 'librarian' || userDetails.role === 'admin') && (
          <div className="col-md-4">
            <UsersList
              users={users}
              handleUserClick={handleUserClick}
            />
          </div>
        )}
        {(userDetails.role === 'customer' || selectedUser) && (
          <div className="col-md-8">
            <BooksTable 
              borrowedBooks={borrowedBooks}
              firstName={userDetails.role === 'customer' ? userDetails.first_name : selectedUser.first_name} 
              lastName={userDetails.role === 'customer' ? userDetails.last_name : selectedUser.last_name}
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
          title = {"Add Book"}
          handleCloseModal={handleCloseModal}
          newBook={newBook}
          handleInputChange={handleInputChange}
          handleSaveBook={handleSaveBook}
        />
      )}
      {showEditModal && (
        <BookModal
          title = {"Edit Book"}
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
