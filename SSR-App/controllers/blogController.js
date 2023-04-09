const Blog = require('../models/blog');

const getAllBlogs = async (req, res) => {
  try {
    const result = await Blog.find().sort({ createdAt: -1 });
    res.render('blogs/index', { blogs: result, title: 'All blogs' });
  } catch (error) {
    console.log(error);
  }
};

const getSingleBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Blog.findById(id);
    if (!result) throw new Error('Blog not found');
    res.render('blogs/details', { blog: result, title: 'Blog Details' });
  } catch (error) {
    res.status(404).render('error', { title: 'Blog not found' });
  }
};

const getBlogForm = (req, res) => {
  res.render('blogs/create', { title: 'Create a new blog' });
};

const createBlogPost = async (req, res) => {
  const blog = new Blog(req.body);

  try {
    await blog.save();
    res.redirect('/blogs');
  } catch (error) {
    console.log(error);
  }
};

const deleteBlogPost = async (req, res) => {
  const { id } = req.params;

  try {
    await Blog.findByIdAndDelete(id);
    res.json({ redirect: '/blogs' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllBlogs,
  getSingleBlog,
  getBlogForm,
  createBlogPost,
  deleteBlogPost,
};
