// import React, {createContext, useReducer, ReactNode} from "react";
// import {appReducer, initialState} from "./appReducer";

// export const AppContext = createContext<any>(null);

// export const AppProvider: ({children}: {children: ReactNode}) => {
//     const [state, dispatch] = useReducer(appReducer, initialState); 
//     return (
//         <AppContext.Provider value={{state, dispatch}}>
//             {children}
//         </AppContext.Provider>
//     );

// };
import React, { createContext, useReducer, ReactNode } from 'react';
import { appReducer, initialState } from './appReducer';

export const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
