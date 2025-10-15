// Notification Controller.js

import User from "../models/userModel.js";
import Notification from "../models/notificationModel.js";


export const getNotification = async (req, res) => {
    try {
        const id = req.user._id;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // fetch notifications first
        const notifications = await Notification.find({ to: id })
            .populate({ path: "from", select: "username profileImg" })
            .sort({ createdAt: -1 }); // newest first (optional)

        // mark all unread as read
        const updateResult = await Notification.updateMany(
            { to: id, read: false },
            { $set: { read: true } }
        );

        if (notifications.length === 0) {
            return res.status(200).json({ message: "No notifications yet" });
        }

        res.status(200).json(notifications);
    } catch (error) {
        console.log(`Error occurred in getNotification controller: ${error.message}`);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteNotification = async (req, res) => {
    try {
        const id = req.user._id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        const deleteNotification = await Notification.deleteMany({ to: id })
        if (!deleteNotification) {
            res.status(200).json({ message: " No notification" })
        }

        res.status(200).json({ message: "Successfully deleted the notification" })

    } catch (error) {
        console.log(`Error occurred in deleteNotification controller: ${error.message}`);
        res.status(500).json({ error: "Internal server error" });
    }
}
