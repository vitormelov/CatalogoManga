import React, { createContext, useContext, useState } from 'react';

const CollectionContext = createContext();

export const CollectionProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCollection = (manga) => {
    setCollections((prev) => [...prev, manga]);
  };

  const addToWishlist = (manga) => {
    setWishlist((prev) => [...prev, manga]);
  };

  return (
    <CollectionContext.Provider value={{ collections, wishlist, addToCollection, addToWishlist }}>
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollection = () => useContext(CollectionContext);
