import React, {createContext, useContext, useState} from 'react';

const Context = createContext();

const ContextProvider = ({children, value}) => {
  const [initial, setInitial] = useState(true);
  return (
    <Context.Provider value={{...value, initial, setInitial}}>
      {children}
    </Context.Provider>
  );
};

export const useValue = () => {
  const value = useContext(Context);
  return value;
};

export default ContextProvider;
