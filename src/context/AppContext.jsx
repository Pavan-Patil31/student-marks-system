import React from 'react';
import { createContext, useContext, useReducer, useEffect } from 'react';
import { studentReducer, initialState } from '../reducer/studentReducer';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(studentReducer, initialState);

  // Load students from localStorage on initial render
  useEffect(() => {
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      dispatch({ type: 'LOAD_STUDENTS', payload: JSON.parse(savedStudents) });
    }
  }, []);

  // Save students to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(state.students));
  }, [state.students]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);