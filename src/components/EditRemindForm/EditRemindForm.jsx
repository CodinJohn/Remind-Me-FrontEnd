import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateRemind, fetchReminds } from '../../services/remindService';

const EditRemindForm = ({categories}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    categoryid: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRemind = async () => {
      try {
        const reminds = await fetchReminds(); 
        const remind = reminds.find(r => r._id === id); 
        if (remind) {
          setFormData(remind);
          console.log('remind', remind)
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

  const categoryList = [];

  for(let i=0; i < categories.length; i++){
    if(categories[i]["_id"] == formData.categoryid){
      categoryList.push(
        <option selected={"selected"} value={categories[i]["_id"]}>{categories[i]["name"]}</option>
      )
    }else{
      categoryList.push(
        <option value={categories[i]["_id"]}>{categories[i]["name"]}</option>
      )
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
        <select name="categoryid" value={ formData.categoryid._id} onChange={handleChange}>
          {categoryList}
        </select>
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditRemindForm;