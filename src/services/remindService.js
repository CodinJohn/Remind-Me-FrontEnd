const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

export const fetchReminds = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BACKEND_URL}/reminds`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const createRemind = async (remindData) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BACKEND_URL}/reminds`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(remindData)
  });
  return res.json();
};

export const updateRemind = async (id, remindData) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BACKEND_URL}/reminds/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(remindData)
  });
  return res.json();
};

export const deleteRemind = async (id) => {
  const token = localStorage.getItem('token');
  await fetch(`${BACKEND_URL}/reminds/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
};