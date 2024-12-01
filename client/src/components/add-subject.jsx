'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubjectForm = () => {
  const [subjectName, setSubjectName] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users?role=teacher');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setMessage('Failed to fetch teachers. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('http://localhost:8000/sections/674bce5e1682d6f6f8e27a10/subjects', {
        subjectName,
        teacher: selectedTeacher
      });

      if (response.status === 200 || response.status === 201) {
        setMessage('Subject added successfully!');
        setSubjectName('');
        setSelectedTeacher('');
      } else {
        setMessage('Failed to add subject. Please try again.');
      }
    } catch (error) {
      console.error('Error adding subject:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Subject</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="subjectName" className="block text-sm font-medium text-gray-700">
            Subject Name
          </label>
          <input
            type="text"
            id="subjectName"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="teacher" className="block text-sm font-medium text-gray-700">
            Teacher
          </label>
          <select
            id="teacher"
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select a teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.fullName}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Subject
        </button>
      </form>
      {message && (
        <p className="mt-4 text-sm text-center text-gray-600">{message}</p>
      )}
    </div>
  );
};

export default SubjectForm;

