import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const PostApiService = {

  //authenticated and authorized user to create a post
  createPost: async (formData, token) => {
    try {
      const response = await axios.post(`${API_URL}/post/create-post`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  //authenticated and authorized user to get all post
  getAllPosts: async () => {
    const res = await fetch(`${API_URL}/post/all-posts`,
      { next: { revalidate: 1 } }
    )
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    return res.json()
  },

  // Authenticated and authorized user to get a single post by slug
  getPostBySlug: async (slug) => {
    try {
      const response = await axios.get(`${API_URL}/post/posts/${slug}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  //authenticated and authorized user to update their post
  updatePost: async (slug, formData, token) => {
    try {
      const response = await axios.put(
        `${API_URL}/post/update-post/${slug}`,
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

  //authenticated and authorized user to delete their post
  deletePost: async (postId, token) => {
    try {
      const response = await axios.delete(
        `${API_URL}/post/delete-post/${postId}`,
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

export default PostApiService;
