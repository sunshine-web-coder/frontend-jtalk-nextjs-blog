import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const UserApiService = {
  //register user
  register: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, formData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  //login user
  login: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, formData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Authenticated and authorized user to get a single post by slug
  getUserBySlug: async (slug) => {
    try {
      const response = await axios.get(`${API_URL}/user/${slug}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  //update your account
  updateProfile: async (formData, token) => {
    try {
      const response = await axios.put(
        `${API_URL}/user/update-profile`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  //delete your account
  deleteAccount: async (token) => {
    try {
      const response = await axios.delete(
        `${API_URL}/user/delete-account`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // //authenticated and authorized user to create a post
  // createPost: async (formData, token) => {
  //   try {
  //     const response = await axios.post(`${API_URL}/post/create-post`, formData, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     throw error.response.data;
  //   }
  // },

  // //authenticated and authorized user to get all post
  // getAllPosts: async () => {
  //   try {
  //     const response = await axios.get(`${API_URL}/post/all-posts`);
  //     return response.data;
  //   } catch (error) {
  //     throw error.response.data;
  //   }
  // },

  // //authenticated and authorized user to update their post
  // updatePost: async (postId, formData, token) => {
  //   try {
  //     const response = await axios.put(
  //       `${API_URL}/post/update-post/${postId}`,
  //       formData,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     throw error.response.data;
  //   }
  // },

  // //authenticated and authorized user to delete their post
  // deletePost: async (postId, token) => {
  //   try {
  //     const response = await axios.delete(
  //       `${API_URL}/post/delete-post/${postId}`,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     throw error.response.data;
  //   }
  // },
};

export default UserApiService;
