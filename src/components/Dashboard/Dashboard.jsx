import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import RemindsList from '../RemindsList/RemindsList';

const Dashboard = ({ user }) => {
  const [reminds, setReminds] = useState([]);


  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>This is the dashboard page where you can manage your Remind Me's.</p>
      <Link to="/create-remind">
        <button>Create Remind Me</button>
      </Link>
      <RemindsList reminds={reminds} setReminds={setReminds} />
    </main>
  );
};

export default Dashboard;