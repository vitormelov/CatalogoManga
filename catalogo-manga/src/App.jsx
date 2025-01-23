import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import MySpace from './pages/MySpace';
import CreateAccount from './pages/CreateAccount';
import Collection from './pages/Collection';
import SearchManga from './pages/SearchManga';
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
          <Route path="/searchmanga" element={<SearchManga />} />
        </Routes>
      </Router>
    </CollectionProvider>
  );
};

export default App;
