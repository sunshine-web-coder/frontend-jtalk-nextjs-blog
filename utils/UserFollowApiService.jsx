import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const UserFollowApiService = {

  // Follow a user
  followUser: async (targetUserId, token) => {
    try {
      const response = await axios.post(
        `${API_URL}/user/follow-for-follow`,
        { targetUserId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Unfollow a user
  unfollowUser: async (targetUserId, token) => {
    try {
      const response = await axios.post(
        `${API_URL}/user/unfollow`,
        { targetUserId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export default UserFollowApiService;
