import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchReminds, deleteRemind } from '../../services/remindService';

const RemindsList = () => {
  const [reminds, setReminds] = useState([]);

  useEffect(() => {
    const getReminds = async () => {
      try {
        const data = await fetchReminds();
        setReminds(data);
      } catch (error) {
        console.error('Error fetching reminds:', error);
      }
    };
    getReminds();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteRemind(id);
      setReminds(reminds.filter(remind => remind._id !== id));
    } catch (error) {
      console.error('Error deleting remind:', error);
    }
  };

  return (
    <div>
      <h2>Remind Me:</h2>
      {reminds.map(remind => (
        <div key={remind._id}>
          <h4>Title- {remind.title}</h4>
          <h5>Information- {remind.text}</h5>
          <h5>Category- {remind.category}</h5>
          <Link to={`/edit-remind/${remind._id}`}><button>Edit</button></Link>
          <button onClick={() => handleDelete(remind._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default RemindsList;
