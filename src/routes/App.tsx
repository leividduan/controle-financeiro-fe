import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import getCurrentUser from '../utils/getUser';

function App() {
  const navigate = useNavigate();

  useEffect(() =>{
    const currentUser = getCurrentUser();
    if(!currentUser) {
      navigate('/login');
    }
  }, []);
  return (
    <>
      <Header />
      <div className="max-w-4xl m-auto mt-5 rounded-lg bg-white p-5">
        <Outlet />
      </div>
    </>
  );
}
 
export default App;