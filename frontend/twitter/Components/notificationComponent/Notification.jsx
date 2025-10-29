import React, { useEffect, useState } from "react";
import dp from "/logos/x-logo.png";
import "./Notification.css";
import axios from "axios";
import { BaseURL } from "../../BaseUrl/BaseURL";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-toastify";

const Notification = () => {
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const fetchNotification = async () => {
    try {
      const res = await axios.get(`${BaseURL}/api/notifications/`, {
        withCredentials: true,
      });

      // Handle both cases (array or wrapped object)
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.notifications || [];

      const sorted = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setNotification(sorted);
    } catch (error) {
      console.error("Error fetching notifications:", error.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchNotification();
  }, [refresh]);

  const handleMarkAsReadBtn = (id) => {
    setNotification((prev) =>
      prev.map((n) =>
        n._id === id ? { ...n, read: !n.read } : n
      )
    );
  };

  const handleDeleteAllNotification = async () => {
    try {
      const res = await axios.delete(`${BaseURL}/api/notifications/`, { withCredentials: true });
      toast.success(res.data.message);
      setRefresh(!refresh);
    } catch (error) {
      console.log(`Error occured in delete all notification: ${error.message}`);
      toast.error(error.response?.data?.error);
    }
  }

  const handleDeleteNotification = async (id) => {
    try {

      const res = await axios.delete(`${BaseURL}/api/notifications/${id}`, { withCredentials: true });
      toast.success(res.data.message);
      setRefresh(!refresh);

    } catch (error) {
      console.log(`Error occured in delete notification: ${error.message}`);
      toast.error(error.response?.data?.error);
    }
  }

  return (
    <div className="notificationComponent">
      <h2 className="notification-title">Notifications</h2>

      <div className="d-flex justify-content-end">
        <button className="btn btn-danger" onClick={handleDeleteAllNotification}>Delete All</button>
      </div>



      <div className="notify">
        {loading ? (
          <p>Loading notifications...</p>
        ) : notification.length === 0 ? (
          <p>No Notification</p>
        ) : (
          notification.map((n) => (
            <div
              className={`notification-card ${n.read ? "read" : "unread"}`}
              key={n._id}
            >
              <div className="notification-header">
                <img src={n.from.profileImg || dp} alt="dp" />
                <div>
                  <h3>{n.from.username}</h3>
                  <p className="notification-time">
                    {formatDistanceToNow(new Date(n.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>

              <div className="notification-body">
                {n.type === "like"
                  ? "liked your post"
                  : n.type === "follow"
                    ? "started following you"
                    : n.type}
              </div>

              <div className="notification-actions">
                <button onClick={() => handleMarkAsReadBtn(n._id)}>Mark as read</button>
                <button onClick={() => handleDeleteNotification(n._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notification;
