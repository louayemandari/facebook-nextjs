import React, { createContext, useState } from 'react';

// Create the Context
export const MyContext = createContext({});
export const MyContextProvider = ({ children }) => {
  const [cacheBox, setCasheBox] = useState('');
  const [switching, setSwitching] = useState(true);
  const [messages, setMessages] = useState([]); // Initialize messages state here
  const [friend,setFriend] = useState('')
  return (
    <MyContext.Provider value={{friend,setFriend, messages, setMessages,switching, setSwitching, cacheBox, setCasheBox }}>
      {children}
    </MyContext.Provider>
  );
};