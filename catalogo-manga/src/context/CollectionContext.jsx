import React, { createContext, useContext, useState } from 'react';

const CollectionContext = createContext();

export const CollectionProvider = ({ children }) => {
  const [collections, setCollections] = useState([]); // Lista de coleção
  const [wishlist, setWishlist] = useState([]); // Lista de desejos

  // Adicionar à coleção
  const addToCollection = (manga) => {
    setCollections((prev) => [...prev, manga]);
    setWishlist((prev) => prev.filter((item) => item.mal_id !== manga.mal_id)); // Remove da wishlist
  };

  // Adicionar à lista de desejos
  const addToWishlist = (manga) => {
    setWishlist((prev) => [...prev, manga]);
  };

  return (
    <CollectionContext.Provider
      value={{
        collections,
        setCollections,
        wishlist,
        setWishlist,
        addToCollection,
        addToWishlist,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollection = () => useContext(CollectionContext);
