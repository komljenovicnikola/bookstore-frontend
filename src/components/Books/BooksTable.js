import React from 'react';

const BooksTable = ({
  borrowedBooks,
  firstName,
  lastName,
  handleAddBookClick,
  userRole,
  handleEditBook,
  handleRemoveBook,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">
          Books Borrowed by {firstName} {lastName}
        </h5>
        {(userRole === 'librarian' || userRole === 'admin') && (
          <button className="btn btn-primary" onClick={handleAddBookClick}>
            Add Book
          </button>
        )}
      </div>
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              {(userRole === 'librarian' || userRole === 'admin') && (
                <th>Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
                {(userRole === 'librarian' || userRole === 'admin') && (
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEditBook(book)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveBook(book.id)}
                    >
                      Remove
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BooksTable;
