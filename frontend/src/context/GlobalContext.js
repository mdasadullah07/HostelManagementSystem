import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(null);
  const [schoolId, setSchoolId] = useState(null);

  return (
    <GlobalContext.Provider value={{ sessionId, schoolId, setSessionId, setSchoolId }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
