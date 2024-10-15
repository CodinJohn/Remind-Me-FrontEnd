import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRemind } from '../../services/remindService';

const CreateRemindForm = ({ onRemindCreated, categories }) => {
  const navigate = useNavigate();
  let defaultCategory = 0
  if (categories.Length > 0){
    defaultCategory = categories[0]["_id"]
  }
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    categoryid: defaultCategory,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdRemind = await createRemind(formData);
      if (onRemindCreated && typeof onRemindCreated === 'function') {
        onRemindCreated(createdRemind);
      }      
      setFormData({ title: '', text: '', categoryid: defaultCategory });
      navigate('/'); 
    } catch (error) {
      console.error('Error creating remind:', error);
    }
  };

  const categoryList = [];

  for(let i=0; i < categories.length; i++){
    categoryList.push(
      <option value={categories[i]["_id"]}>{categories[i]["name"]}</option>
    )
  };

  useEffect(() => {
    setFormData({ title: '', text: '', categoryid: defaultCategory });
  },[categories]);


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
        <select name="categoryid" value={formData.category} onChange={handleChange}>
          {categoryList}
        </select>
      </div>
      <button type="submit">Add Remind</button>
    </form>
  );
};

export default CreateRemindForm;