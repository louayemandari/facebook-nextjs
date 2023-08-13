import React, { createContext, useState } from 'react';

// Create the Context
export const MyContext = createContext({});
export const MyContextProvider = ({ children }) => {
  const [cacheBox, setCasheBox] = useState('');
  const [switching, setSwitching] = useState(true);
  const [messages, setMessages] = useState([]); // Initialize messages state here

  return (
    <MyContext.Provider value={{ messages, setMessages,switching, setSwitching, cacheBox, setCasheBox }}>
      {children}
    </MyContext.Provider>
  );
};