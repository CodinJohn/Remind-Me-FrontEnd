import React, { useState } from 'react';
import { createRemind } from '../../services/remindService';

const CreateRemindForm = ({ onRemindCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    category: 'Shopping List',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdRemind = await createRemind(formData);
      onRemindCreated(createdRemind);
      setFormData({ title: '', text: '', category: 'Shopping List' });
    } catch (error) {
      console.error('Error creating remind:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Text:</label>
        <input name="text" value={formData.text} onChange={handleChange} required />
      </div>
      <div>
        <label>Category:</label>
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="Shopping List">Shopping List</option>
          <option value="House Chores">House Chores</option>
          <option value="Fitness Tracker">Fitness Tracker</option>
          <option value="Things to not Forget">Things to not Forget</option>
          <option value="Movies to watch">Movies to watch</option>
        </select>
      </div>
      <button type="submit">Add Remind</button>
    </form>
  );
};

export default CreateRemindForm;