export const studentReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_STUDENT':
      return {
        ...state,
        students: [...state.students, action.payload],
        currentStudent: null
      };
      
    case 'UPDATE_STUDENT':
      return {
        ...state,
        students: state.students.map(student => 
          student.id === action.payload.id ? action.payload : student
        ),
        currentStudent: null
      };
      
    case 'DELETE_STUDENT':
      return {
        ...state,
        students: state.students.filter(student => student.id !== action.payload)
      };
      
    case 'SET_CURRENT_STUDENT':
      return {
        ...state,
        currentStudent: action.payload
      };
      
    case 'CLEAR_CURRENT':
      return {
        ...state,
        currentStudent: null
      };
      
    case 'LOAD_STUDENTS':
      return {
        ...state,
        students: action.payload
      };
      
    default:
      return state;
  }
};

export const initialState = {
  students: [],
  currentStudent: null
};