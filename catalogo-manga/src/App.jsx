import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import MySpace from './pages/MySpace';
import CreateAccount from './pages/CreateAccount';
import Collection from './pages/Collection';
import WishList from './pages/WishList';
import Finance from './pages/Finance';
import { CollectionProvider } from './context/CollectionContext.jsx';

const App = () => {
  return (
    <CollectionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myspace" element={<MySpace />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="*" element={<MySpace />} /> {/* Redireciona para MySpace por padrão */}
        </Routes>
      </Router>
    </CollectionProvider>
  );
};

export default App;
