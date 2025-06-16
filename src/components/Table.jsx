import { useState, useContext } from 'react';
import { useAppContext } from '../context/AppContext.jsx';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Table = () => {
  const { state, dispatch } = useAppContext();
  const { students } = state;
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (student) => {
    dispatch({ type: 'SET_CURRENT_STUDENT', payload: student });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student record?')) {
      dispatch({ type: 'DELETE_STUDENT', payload: id });
    }
  };

  const startInlineEdit = (student) => {
    setEditingId(student.id);
    setEditData({
      name: student.name,
      age: student.age,
      marks1: student.marks1,
      marks2: student.marks2,
      marks3: student.marks3,
      marks4: student.marks4,
      marks5: student.marks5
    });
  };

  const handleInlineChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: name === 'name' ? value : parseInt(value)
    });
  };

  const calculatePercentage = (marks) => {
    const total = marks.reduce((sum, mark) => sum + mark, 0);
    return (total / (marks.length * 100)) * 100;
  };

  const getDivision = (percentage) => {
    if (percentage >= 80) return 'First';
    if (percentage >= 60) return 'Second';
    if (percentage >= 40) return 'Third';
    return 'Fail';
  };

  const saveInlineEdit = (id) => {
    const marks = [
      editData.marks1,
      editData.marks2,
      editData.marks3,
      editData.marks4,
      editData.marks5
    ];
    
    const percentage = calculatePercentage(marks);
    const division = getDivision(percentage);
    
    const updatedStudent = {
      id,
      name: editData.name,
      age: editData.age,
      marks1: editData.marks1,
      marks2: editData.marks2,
      marks3: editData.marks3,
      marks4: editData.marks4,
      marks5: editData.marks5,
      percentage,
      division
    };
    
    dispatch({ type: 'UPDATE_STUDENT', payload: updatedStudent });
    setEditingId(null);
  };

  const cancelInlineEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="table-container">
      <h2>Student Records</h2>
      {students.length === 0 ? (
        <p>No student records found. Add some students to see them here.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Subject 1</th>
              <th>Subject 2</th>
              <th>Subject 3</th>
              <th>Subject 4</th>
              <th>Subject 5</th>
              <th>Percentage</th>
              <th>Division</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>
                  {editingId === student.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleInlineChange}
                      className="editing"
                    />
                  ) : (
                    student.name
                  )}
                </td>
                <td>
                  {editingId === student.id ? (
                    <input
                      type="number"
                      name="age"
                      value={editData.age}
                      onChange={handleInlineChange}
                      className="editing"
                      min="5"
                      max="25"
                    />
                  ) : (
                    student.age
                  )}
                </td>
                <td>
                  {editingId === student.id ? (
                    <input
                      type="number"
                      name="marks1"
                      value={editData.marks1}
                      onChange={handleInlineChange}
                      className="editing"
                      min="0"
                      max="100"
                    />
                  ) : (
                    student.marks1
                  )}
                </td>
                <td>
                  {editingId === student.id ? (
                    <input
                      type="number"
                      name="marks2"
                      value={editData.marks2}
                      onChange={handleInlineChange}
                      className="editing"
                      min="0"
                      max="100"
                    />
                  ) : (
                    student.marks2
                  )}
                </td>
                <td>
                  {editingId === student.id ? (
                    <input
                      type="number"
                      name="marks3"
                      value={editData.marks3}
                      onChange={handleInlineChange}
                      className="editing"
                      min="0"
                      max="100"
                    />
                  ) : (
                    student.marks3
                  )}
                </td>
                <td>
                  {editingId === student.id ? (
                    <input
                      type="number"
                      name="marks4"
                      value={editData.marks4}
                      onChange={handleInlineChange}
                      className="editing"
                      min="0"
                      max="100"
                    />
                  ) : (
                    student.marks4
                  )}
                </td>
                <td>
                  {editingId === student.id ? (
                    <input
                      type="number"
                      name="marks5"
                      value={editData.marks5}
                      onChange={handleInlineChange}
                      className="editing"
                      min="0"
                      max="100"
                    />
                  ) : (
                    student.marks5
                  )}
                </td>
                <td className={`percentage ${student.division.toLowerCase()}`}>
                  {student.percentage.toFixed(2)}%
                </td>
                <td className={student.division.toLowerCase()}>
                  {student.division}
                </td>
                <td>
                  {editingId === student.id ? (
                    <>
                      <button
                        className="action-btn edit-btn"
                        onClick={() => saveInlineEdit(student.id)}
                      >
                        Save
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={cancelInlineEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="action-btn edit-btn"
                        onClick={() => startInlineEdit(student)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(student.id)}
                      >
                        <FaTrash />
                      </button>
                      <button
                        className="action-btn edit-btn"
                        onClick={() => handleEdit(student)}
                        style={{ marginLeft: '5px' }}
                      >
                        Full Edit
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;