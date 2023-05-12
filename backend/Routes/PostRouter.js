const express = require('express')
const router = express.Router()
const postController = require('../Controllers/postController')
const requireAuth = require('../Middleware/requireAuth')


//-- GET ALL POSTS --//
router.get('/', requireAuth,postController.getAllPosts)
//-- CREATE POST --//
router.post('/',requireAuth, postController.createPost)

//-- TIMELINE POSTS --//
router.get('/timeline/all',requireAuth, postController.timelinePosts)

//-- GET USER POSTS --//
router.get('/profile/:userId',requireAuth, postController.getProfilePosts)

//-- GET SINGLE POST --//
router.get('/:id', postController.getSinglePost)

//-- UPDATE POST --//
router.patch('/:id',requireAuth, postController.updatePost)

//-- DELETE POST --//
router.delete('/:id',requireAuth, postController.deletePost)

//-- POST LIKES --//
router.patch('/:id/like',requireAuth, postController.likePost)

//-- POST COMMENTS --//
router.post('/:id/comments', requireAuth, postController.commentPost)

//-- EDIT COMMENT --//
router.put('/:id/comments/:commentId',requireAuth,postController.editComment)

//-- COMMENT LIKES --//
router.put('/:id/comments/:commentId/likes',requireAuth,postController.likeComment)

//-- DELETE COMMENT --//
router.delete('/:id/comments/:commentId/delete',requireAuth,postController.deleteComment)

module.exports = router