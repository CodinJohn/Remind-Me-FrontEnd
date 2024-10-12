import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateRemind, fetchReminds } from '../../services/remindService';

const EditRemindForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    category: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRemind = async () => {
      try {
        const reminds = await fetchReminds(); 
        const remind = reminds.find(r => r._id === id); 
        if (remind) {
          setFormData(remind);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching remind:', error);
        setLoading(false);
      }
    };

    fetchRemind();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRemind(id, formData);
      navigate('/reminds');
    } catch (error) {
      console.error('Error updating remind:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

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
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditRemindForm;
