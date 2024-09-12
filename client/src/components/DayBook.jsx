import React, { useEffect, useState } from "react";
import axios from 'axios';
import './DayBook.css';
import { useUser } from "../App"; // Import the useUser hook

function  DayBook() {
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [addButtonClicked, setAddButtonClicked] = useState(false)
  const { user } = useUser(); // Access user from context
  useEffect(()=>{
    setActivities(user.user.activities)
  },[])
  const handleAdd = async () => {
    setAddButtonClicked(true);
    if (activity.trim() === "") return
    // alert(activity)
    if (editIndex !== null) {
      const updatedActivities = activities.map((item, index) =>
        index === editIndex ? { activity } : item
      );
      setActivities(updatedActivities);
      setEditIndex(null);
    } else {
      try {
        const response = await axios.post('http://localhost:3000/add-activity', {
          email: user.user.email,
          activity
        });

        // alert(JSON.stringify(response.data.activities))
        setActivities(response.data.activities);
      } catch (error) {
        console.error("Error adding activity", error);
      }
    }

    setActivity("");
  };

  const handleDelete = async (index, activityId) => {
    try {
      const response = await axios.post('http://localhost:3000/delete-activity', {
        email: user.user.email,
        date:activityId
      });
      setActivities(response.data.activities);
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
      {/* {JSON.stringify(user)} */}
      <h2>Welcome, {user ? user.user.firstName : "Guest"}</h2>
      <div>
        {addButtonClicked && <div>{activity}</div>}
      </div>
      <h3>Your Activity History:</h3>
      <ul className="activity-list">
        {activities.length > 0 ? (
          activities.map((item, index) => (
            <li key={item._id} className="activity-item">
              <span>{item.activity}</span>
              {/* {item.date} */}
              <button onClick={() => handleEdit(index)} className="edit-button">
                Edit
              </button>
              <button onClick={() => handleDelete(index, item.date)} className="delete-button">
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
