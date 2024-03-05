import React from 'react';

const BookModal = ({
  title,
  handleCloseModal,
  newBook,
  handleInputChange,
  handleSaveBook,
}) => {
  return (
    <div
      className="modal"
      style={{ display: 'block' }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={newBook.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Author</label>
                <input
                  type="text"
                  className="form-control"
                  name="author"
                  value={newBook.author}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input
                  type="number"
                  className="form-control"
                  name="year"
                  value={newBook.year}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseModal}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveBook}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
