import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./style.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5000/api/users');
      setUsers(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className='login-form'>
      <h2>Dashboard</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <h3>{user.name}</h3>
            <p>Social Handle: {user.socialHandle}</p>
            <div>
              {user.images.map((img, idx) => (
                <a key={idx} href={`http://localhost:5000/uploads/${img}`} target="_blank" rel="noopener noreferrer">
                  <img
                    src={`http://localhost:5000/uploads/${img}`}
                    alt={`User ${user.name} Upload ${idx}`}
                    style={{ width: '100px', height: '100px', marginRight: '10px' }}
                  />
                </a>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;