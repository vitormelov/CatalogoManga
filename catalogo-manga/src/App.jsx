import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import MySpace from './pages/MySpace';
import CreateAccount from './pages/CreateAccount';
import Collection from './pages/Collection';
import { CollectionProvider } from './context/CollectionContext.jsx';

const App = () => {
  return (
    <CollectionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myspace" element={<MySpace />} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/collection" element={<Collection />} />
        </Routes>
      </Router>
    </CollectionProvider>
  );
};

export default App;
