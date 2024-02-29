import React from 'react';

const UsersList = ({ users, handleUserClick }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Bookstore Customers</h5>
      </div>
      <div className="card-body">
        <ul className="list-group">
          {users.map(user => (
            <li key={user.id} className="list-group-item" onClick={() => handleUserClick(user)}>
              {user.first_name} {user.last_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UsersList;
