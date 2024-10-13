import React, { useState } from 'react';
import axios from 'axios';
import "./style.css";

const UserForm = () => {
  const [name, setName] = useState('');
  const [socialHandle, setSocialHandle] = useState('');
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('socialHandle', socialHandle);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      await axios.post('http://localhost:5000/submit', formData);
      alert('Submission successful');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-form">
      <h1>Submission Portal</h1>
    <form onSubmit={handleSubmit}>
    <label>Name : </label>
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required 
    className="input-style"/>
    <br/>
    <label>Social Media Handle : </label>
    <input type="text" value={socialHandle}
    className="input-style" onChange={(e) => setSocialHandle(e.target.value)} required />
    <br/>
    <label>Upload Images : </label>
    <input type="file"
    className="input-style" multiple onChange={(e) => setImages(e.target.files)} required />
    <br/>
    <button type="submit" className='button'>Submit</button>
  </form>
  </div>
  );
};

export default UserForm;
