const express = require('express');
const categoryRouter = require('./categoryRoutes');
const postRouter = require('./postRoutes');
const userRouter = require('./userRoutes');

const router = express.Router();

router.use('/user', userRouter);
router.use('/categories', categoryRouter);
router.use('/post', postRouter);

module.exports = router;
