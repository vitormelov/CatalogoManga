import React, { createContext, useContext, useState } from 'react';

const CollectionContext = createContext();

export const CollectionProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);

  const addToCollection = (manga) => {
    setCollections((prev) => [...prev, manga]);
  };

  return (
    <CollectionContext.Provider value={{ collections, addToCollection }}>
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollection = () => useContext(CollectionContext);
