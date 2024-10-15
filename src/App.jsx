import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import RemindsList from './components/RemindsList/RemindsList';
import CreateRemindForm from './components/CreateRemindForm/CreateRemindForm';
import EditRemindForm from './components/EditRemindForm/EditRemindForm'; 
import * as authService from '../src/services/authService';
import * as categoryService from '../src/services/categoryService';


const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [categories, setCategories] = useState([]);
  
  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  useEffect(() => {
    (async ()=>{
       const newCategories = await categoryService.fetchCategories()
       setCategories(newCategories)
    })();
},[]);

  return (
    <>
      <NavBar user={user} handleSignout={handleSignout} />
      <Routes>
        <Route path="/" element={user ? <Dashboard user={user} /> : <Landing />} />
        <Route path="/signup" element={<SignupForm setUser={setUser} />} /> 
        <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        <Route path="/reminds" element={<RemindsList/>} />
        <Route path="/create-remind" element={<CreateRemindForm  categories={categories} />} />
        <Route path="/edit-remind/:id" element={<EditRemindForm  categories={categories} />} /> 
      </Routes>
    </>
  );
};

export default App;