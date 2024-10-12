import React, { useEffect, useState } from 'react';
import CreateRemindForm from '../CreateRemindForm/CreateRemindForm';
import RemindsList from '../RemindsList/RemindsList';

const Dashboard = ({ user }) => {
  const [reminds, setReminds] = useState([]);

  const handleRemindCreated = (newRemind) => {
    setReminds([...reminds, newRemind]); 
  };

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>This is the dashboard page where you can manage your reminders.</p>

      <CreateRemindForm onRemindCreated={handleRemindCreated} />
      <RemindsList reminds={reminds} setReminds={setReminds} />
    </main>
  );
};

export default Dashboard;
