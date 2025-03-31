import api from '../api/api';

const AuthService = {
  searchPost: query => api.get(`/posts/search?query=${query}`),
  getPosts: () => api.get('/posts'),
  getPostById: id => api.get(`/posts/${id}`),
  login: loginData => api.post('/login', loginData),
  updatePost: (id, postData) => api.put(`/posts/${id}`, postData),
  deletePost: id => api.delete(`/posts/${id}`),
  getTrashedPosts: () => api.get('/posts/trashed'),
  restoreSinglePost: id => api.put(`/posts/${id}/restore`),
  restoreAllPost: () => api.put('/posts/restore-all'),
  deleteSinglePostForever: id => api.delete(`/posts/${id}/delete-forever`),
  deleteAllTrashedPostForever: () =>
    api.delete('/posts/delete-all-trashed-forever'),
};

export default AuthService;
