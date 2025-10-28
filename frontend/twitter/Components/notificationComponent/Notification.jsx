import React from 'react'
import dp from '/logos/x-logo.png'
import './Notification.css'


const Notification = () => {
  return (
    <>
      <div className="notificationComponent">

        <div>Notifications</div>

        <div className="notify">

          <div className="notification-notify">
            <div className="notification-user-info">
              <img src={dp} alt='dp' />
              <h3 className="notification-username">jai</h3>
              <p className='timing'>5 hours ago</p>
            </div>
            <div className="notification-type">
              liked your post
            </div>
            <div className="notification-actions">
              <button>Mark as read</button>
              <button>Delete</button>
            </div>

          </div>

          <div className="notification-notify">
            <div className="notification-user-info">
              <img src={dp} alt='dp' />
              <h3 className="notification-username">jai</h3>
              <p className='timing'>5 hours ago</p>
            </div>
            <div className="notification-type">
              liked your post
            </div>
            <div className="notification-actions">
              <button>Mark as read</button>
              <button>Delete</button>
            </div>

          </div>

          <div className="notification-notify">
            <div className="notification-user-info">
              <img src={dp} alt='dp' />
              <h3 className="notification-username">jai</h3>
              <p className='timing'>5 hours ago</p>
            </div>
            <div className="notification-type">
              liked your post
            </div>
            <div className="notification-actions">
              <button>Mark as read</button>
              <button>Delete</button>
            </div>

          </div>

        </div>

      </div>

    </>
  )
}

export default Notification