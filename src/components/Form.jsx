import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useAppContext } from '../context/AppContext.jsx';
import { FaUser, FaCalendarAlt, FaBook } from 'react-icons/fa';

const Form = () => {
  const { state, dispatch } = useAppContext();
  const { currentStudent } = state;
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    marks1: '',
    marks2: '',
    marks3: '',
    marks4: '',
    marks5: ''
  });

  useEffect(() => {
    if (currentStudent) {
      setFormData({
        name: currentStudent.name,
        age: currentStudent.age.toString(),
        marks1: currentStudent.marks1.toString(),
        marks2: currentStudent.marks2.toString(),
        marks3: currentStudent.marks3.toString(),
        marks4: currentStudent.marks4.toString(),
        marks5: currentStudent.marks5.toString()
      });
    }
  }, [currentStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const calculatePercentage = (marks) => {
    const total = marks.reduce((sum, mark) => sum + parseInt(mark || 0), 0);
    return (total / (marks.length * 100)) * 100;
  };

  const getDivision = (percentage) => {
    if (percentage >= 80) return 'First';
    if (percentage >= 60) return 'Second';
    if (percentage >= 40) return 'Third';
    return 'Fail';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const marks = [
      formData.marks1,
      formData.marks2,
      formData.marks3,
      formData.marks4,
      formData.marks5
    ];
    
    const percentage = calculatePercentage(marks);
    const division = getDivision(percentage);
    
    const studentData = {
      id: currentStudent ? currentStudent.id : Date.now(),
      name: formData.name,
      age: parseInt(formData.age),
      marks1: parseInt(formData.marks1),
      marks2: parseInt(formData.marks2),
      marks3: parseInt(formData.marks3),
      marks4: parseInt(formData.marks4),
      marks5: parseInt(formData.marks5),
      percentage,
      division
    };
    
    if (currentStudent) {
      dispatch({ type: 'UPDATE_STUDENT', payload: studentData });
    } else {
      dispatch({ type: 'ADD_STUDENT', payload: studentData });
    }
    
    setFormData({
      name: '',
      age: '',
      marks1: '',
      marks2: '',
      marks3: '',
      marks4: '',
      marks5: ''
    });
  };

  const handleClear = () => {
    setFormData({
      name: '',
      age: '',
      marks1: '',
      marks2: '',
      marks3: '',
      marks4: '',
      marks5: ''
    });
    dispatch({ type: 'CLEAR_CURRENT' });
  };

  const marks = [
    formData.marks1,
    formData.marks2,
    formData.marks3,
    formData.marks4,
    formData.marks5
  ];
  const percentage = calculatePercentage(marks);
  const division = getDivision(percentage);

  return (
    <div className="form-container">
      <h2>{currentStudent ? 'Edit Student' : 'Student  Marks Details'}</h2>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name"><FaUser /> Student  Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="age"><FaCalendarAlt /> Student Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="5"
            max="25"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="marks1"><FaBook /> Subject 1 Marks</label>
          <input
            type="number"
            id="marks1"
            name="marks1"
            value={formData.marks1}
            onChange={handleChange}
            min="0"
            max="100"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="marks2"><FaBook /> Subject 2 Marks</label>
          <input
            type="number"
            id="marks2"
            name="marks2"
            value={formData.marks2}
            onChange={handleChange}
            min="0"
            max="100"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="marks3"><FaBook /> Subject 3 Marks</label>
          <input
            type="number"
            id="marks3"
            name="marks3"
            value={formData.marks3}
            onChange={handleChange}
            min="0"
            max="100"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="marks4"><FaBook /> Subject 4 Marks</label>
          <input
            type="number"
            id="marks4"
            name="marks4"
            value={formData.marks4}
            onChange={handleChange}
            min="0"
            max="100"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="marks5"><FaBook /> Subject 5 Marks</label>
          <input
            type="number"
            id="marks5"
            name="marks5"
            value={formData.marks5}
            onChange={handleChange}
            min="0"
            max="100"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Percentage: <span className={`percentage ${division.toLowerCase().replace(' ', '-')}`}>
            {percentage.toFixed(2)}% ({division})
          </span></label>
        </div>
        
        <div className="btn-group">
          <button type="submit" className="btn btn-primary">
            {currentStudent ? 'Update Student' : 'Add Student'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;