const express = require('express');
const blogControllers = require('../controllers/blogController');

const router = express.Router();

router.get('/', blogControllers.getAllBlogs);
router.post('/', blogControllers.createBlogPost);
router.get('/create', blogControllers.getBlogForm);
router.get('/:id', blogControllers.getSingleBlog);
router.delete('/:id', blogControllers.deleteBlogPost);

module.exports = router;
