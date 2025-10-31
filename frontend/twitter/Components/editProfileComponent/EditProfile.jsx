import React, { useState } from 'react';
import './EditProfile.css';
import coverImage from '/logos/x-cover-image.png';
import profilePic from '/logos/default-user-image.png';
import { useUser } from '../../src/context/UserContext';
import axios from 'axios';
import { BaseURL } from '../../BaseUrl/BaseURL';
import { toast } from 'react-toastify';

const EditProfile = ({ setActiveSection }) => {
    const { user, setUser, fetchUser } = useUser();

    const [editProfile, setEditProfile] = useState({
        username: user?.username || '',
        email: user?.email || '',
        currentPassword: '',
        newPassword: '',
        fullname: user?.fullname || '',
        bio: user?.bio || '',
        link: user?.link || '',
        profileImg: user?.profileImg?.trim() ? user.profileImg : profilePic,
        coverImg: user?.coverImg?.trim() ? user.coverImg : coverImage,
    });

    const [loading, setLoading] = useState(false);

    const handleImageChange = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setEditProfile(prev => ({ ...prev, [type]: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const handleEditProfile = async () => {

        const updatedData = {
            username: editProfile.username,
            fullname: editProfile.fullname,
            email: editProfile.email,
            bio: editProfile.bio,
            link: editProfile.link,
            currentPassword: editProfile.currentPassword,
            newPassword: editProfile.newPassword,
        };

        // Only include these if user actually changed/uploaded them
        if (editProfile.profileImg !== profilePic) {
            updatedData.profileImg = editProfile.profileImg;
        }
        if (editProfile.coverImg !== coverImage) {
            updatedData.coverImg = editProfile.coverImg;
        }

        if (editProfile.newPassword && !editProfile.currentPassword) {
            return toast.error("Enter current password to set a new password");
        }

        if (!user) {
            return toast.error("User data not available");
        }


        setLoading(true);
        try {

            const res = await axios.put(`${BaseURL}/api/user/updateuser`, updatedData, {
                withCredentials: true,
            });
            await fetchUser();

            setUser(prev => ({
                ...prev,
                ...res.data
            }));

            setTimeout(() => {
                toast.success(res.data.message, {
                    autoClose: 1000,
                    pauseOnHover: false,
                    pauseOnFocusLoss: false,
                    toastId: 'profile-updated',
                });
            }, 200);

        } catch (error) {
            console.error("Error in handleEditProfile:", error.message);
            toast.error(error?.response?.data?.error || "Something went wrong while updating your profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="edit-profile-component">
            <div className="edit-profile-images">
                <div className="edit-profile-cover-image">
                    <img src={editProfile.coverImg} alt="cover" />
                    <label htmlFor="cover-upload">
                        <i className="bi bi-pencil-square cover-edit-icon"></i>
                    </label>
                    <input
                        type="file"
                        id="cover-upload"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleImageChange(e, 'coverImg')}
                    />
                </div>

                <div className="edit-user-profile-pic">
                    <img src={editProfile.profileImg} alt="profile" />
                    <label htmlFor="profile-upload">
                        <i className="bi bi-camera-fill profile-edit-icon"></i>
                    </label>
                    <input
                        type="file"
                        id="profile-upload"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleImageChange(e, 'profileImg')}
                    />
                </div>
            </div>

            <form
                className="edit-profile-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleEditProfile();
                }}
            >
                <label>Username:
                    <input type="text" value={editProfile.username}
                        onChange={(e) => setEditProfile({ ...editProfile, username: e.target.value })} />
                </label>

                <label>Fullname:
                    <input type="text" value={editProfile.fullname}
                        onChange={(e) => setEditProfile({ ...editProfile, fullname: e.target.value })} />
                </label>

                <label>Bio:
                    <input type="text" placeholder="Enter your bio"
                        value={editProfile.bio}
                        onChange={(e) => setEditProfile({ ...editProfile, bio: e.target.value })} />
                </label>

                <label>Link:
                    <input type="text" placeholder="Enter your link"
                        value={editProfile.link}
                        onChange={(e) => setEditProfile({ ...editProfile, link: e.target.value })} />
                </label>

                <label>Email:
                    <input type="email" value={editProfile.email}
                        onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })} />
                </label>

                <label>Current Password:
                    <input type="password" placeholder="Enter your current password"
                        value={editProfile.currentPassword}
                        onChange={(e) => setEditProfile({ ...editProfile, currentPassword: e.target.value })} />
                </label>

                <label>New Password:
                    <input type="password" placeholder="Enter your new password"
                        value={editProfile.newPassword}
                        onChange={(e) => setEditProfile({ ...editProfile, newPassword: e.target.value })} />
                </label>

                <div className="btns">
                    <button type="submit" disabled={loading}>
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                    <button type="button" className="ms-3" onClick={() => setActiveSection('userprofile')}>
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
