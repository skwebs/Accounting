import api from '../api/api';

const PostService = {
  searchPost: query => api.get(`/posts/search?query=${query}`),
  getPosts: () => api.get('/posts'),
  getPostById: id => api.get(`/posts/${id}`),
  createPost: postData => api.post('/posts', postData),
  updatePost: (id, postData) => api.put(`/posts/${id}`, postData),
  deletePost: id => api.delete(`/posts/${id}`),
  getTrashedPosts: () => api.get('/posts/trashed'),
  restorePost: id => api.post(`/posts/${id}/restore`),
  restoreAllPost: () => api.put('/posts/restore-all'),
  deletePostForever: id => api.delete(`/posts/${id}/delete-forever`),
  deleteAllTrashedPostForever: () =>
    api.delete('/posts/delete-all-trashed-forever'),
};

export default PostService;
