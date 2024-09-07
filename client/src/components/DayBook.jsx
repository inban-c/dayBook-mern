// src/components/DayBook.js
import React, { useState } from "react";
import './DayBook.css';

function DayBook() {
  const [activities, setActivities] = useState([]);
  const [name, setName] = useState("");
  const [activity, setActivity] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAdd = () => {
    if (name.trim() === "" || activity.trim() === "") return;
    if (editIndex !== null) {
      const updatedActivities = activities.map((item, index) =>
        index === editIndex ? { name, activity } : item
      );
      setActivities(updatedActivities);
      setEditIndex(null);
    } else {
      setActivities([...activities, { name, activity }]);
    }
    setName("");
    setActivity("");
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setName(activities[index].name);
    setActivity(activities[index].activity);
  };

  const handleDelete = (index) => {
    const updatedActivities = activities.filter((_, i) => i !== index);
    setActivities(updatedActivities);
    if (editIndex === index) {
      setEditIndex(null);
      setName("");
      setActivity("");
    }
  };

  return (
    <div className="daybook-container">
      <h2>DayBook</h2>
      <div className="input-group">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="Enter your activity"
        />
        <button onClick={handleAdd} className="add-button">
          {editIndex === null ? "Add" : "Update"}
        </button>
      </div>
      <ul className="activity-list">
        {activities.map((item, index) => (
          <li key={index} className="activity-item">
            <span>{item.name}: {item.activity}</span>
            <button onClick={() => handleEdit(index)} className="edit-button">
              Edit
            </button>
            <button onClick={() => handleDelete(index)} className="delete-button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DayBook;
