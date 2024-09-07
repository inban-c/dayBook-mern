import React, { useState, useEffect } from "react";
import axios from 'axios';
import './DayBook.css';

function DayBook({ user }) {
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Fetch activities from backend
  useEffect(() => {
    if (user) {
      const fetchActivities = async () => {
        try {
          const response = await axios.get('http://localhost:3000/get-activities', {
            params: { email: user.email }
          });
          setActivities(response.data.activities);
        } catch (error) {
          console.error("Error fetching activities", error);
        }
      };
      fetchActivities();
    }
  }, [user]);

  // Add or update activity
  const handleAdd = async () => {
    if (activity.trim() === "") return;
    
    if (editIndex !== null) {
      const updatedActivities = activities.map((item, index) =>
        index === editIndex ? { activity } : item
      );
      setActivities(updatedActivities);
      setEditIndex(null);
    } else {
      try {
        const response = await axios.post('http://localhost:3000/add-activity', {
          email: user.email,
          activity
        });
        setActivities(response.data.activities);
      } catch (error) {
        console.error("Error adding activity", error);
      }
    }

    setActivity("");
  };

  // Delete activity
  const handleDelete = async (index, activityId) => {
    try {
      const response = await axios.post('http://localhost:3000/delete-activity', {
        email: user.email,
        activityId
      });
      setActivities(response.data.activities); // Update local activities after deletion
    } catch (error) {
      console.error("Error deleting activity", error);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setActivity(activities[index].activity);
  };

  return (
    <div className="daybook-container">
      <h2>Welcome, {user ? user.firstName : "Guest"}</h2>
      <h3>Your Activity History:</h3>
      <ul className="activity-list">
        {activities.length > 0 ? (
          activities.map((item, index) => (
            <li key={item._id} className="activity-item">
              <span>{item.activity}</span>
              <button onClick={() => handleEdit(index)} className="edit-button">
                Edit
              </button>
              <button onClick={() => handleDelete(index, item._id)} className="delete-button">
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No activities found.</p>
        )}
      </ul>

      <div className="input-group">
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="Enter a new activity"
        />
        <button onClick={handleAdd} className="add-button">
          {editIndex === null ? "Add" : "Update"}
        </button>
      </div>
    </div>
  );
}

export default DayBook;
