const express = require('express')

const router = express.Router()
const AuthController =  require('./blog_controller');

router.get('/post',AuthController.getAllPost);
router.get('/post/:id',AuthController.getPost);
router.post('/post', AuthController.createPost);
router.put('/post/:id',AuthController.putPost);
router.delete('/post/:id',AuthController.deletePost);


module.exports = router;