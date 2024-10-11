// App.jsx
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import SignupForm from './components/SignupForm/SignupForm' // import the SignupForm

const App = () => {
  const [user, setUser] = useState(null);
return (
  <>
    <NavBar user={user} />
    <Routes>
      {
        user ?
          <Route path="/" element={<Dashboard user={user} />} />
        :
          <Route path="/" element={<Landing />} />
      }

      <Route path='/signup' element={<SignupForm setUser={setUser} />} /> // import the signup form here
    </Routes>
  </>
)};

export default App;
