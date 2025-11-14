"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const posts_1 = require("../db/posts/posts");
const utils_1 = require("../lib/utils");
const types_1 = require("../lib/types");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /posts:
 *   post:
 *     tags: [Posts]
 *     summary: Create a new post
 *     description: Creates a new post in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - title
 *               - body
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user creating the post.
 *               title:
 *                 type: string
 *                 description: The title of the post.
 *               body:
 *                 type: string
 *                 description: The body content of the post.
 *     responses:
 *       201:
 *         description: The post was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Missing required fields (userId, title, or body).
 *       500:
 *         description: An error occurred while creating the post.
 */
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, title, body } = req.body;
        if (!userId || !title || !body) {
            throw new utils_1.HttpError(types_1.HttpStatus.BAD_REQUEST, 'userId, title, and body are required');
        }
        const newPost = yield (0, posts_1.createPost)({ user_id: userId, title, body });
        res.status(types_1.HttpStatus.CREATED).send(newPost);
    }
    catch (error) {
        if (error instanceof utils_1.HttpError) {
            res.status(error.status).send({ error: error.message });
            return;
        }
        res
            .status(types_1.HttpStatus.INTERNAL_SERVER_ERROR)
            .send({ error: 'An error occurred while creating the post' });
    }
}));
/**
 * @swagger
 * /posts:
 *   get:
 *     tags: [Posts]
 *     summary: Retrieve a list of posts by user ID
 *     description: Retrieve a list of posts from the database for a given user ID.
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to retrieve posts for.
 *     responses:
 *       200:
 *         description: A list of posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The post ID.
 *                     example: d3a4ec91a50447ebb64e395e124caf40
 *                   userId:
 *                     type: string
 *                     description: The ID of the user who created the post.
 *                     example: d3a4ec91a50447ebb64e395e124caf40
 *                   title:
 *                     type: string
 *                     description: The title of the post.
 *                     example: My first post
 *                   body:
 *                     type: string
 *                     description: The body of the post.
 *                     example: This is the body of my first post.
 *                   created_at:
 *                     type: date
 *                     description: The date the post was created.
 *                     example: 2024-01-24T12:45:32+02:00.
 *       400:
 *         description: userId is required.
 */
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.query.userId) === null || _a === void 0 ? void 0 : _a.toString();
    if (!userId) {
        res.status(types_1.HttpStatus.BAD_REQUEST).send({ error: 'userId is required' });
        return;
    }
    const posts = yield (0, posts_1.getPosts)(userId);
    res.send(posts);
}));
/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     tags: [Posts]
 *     summary: Delete a post by ID
 *     description: Deletes a single post from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post to delete.
 *     responses:
 *       204:
 *         description: The post was successfully deleted.
 *       404:
 *         description: The post was not found.
 *       500:
 *         description: An error occurred while deleting the post.
 */
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const changes = yield (0, posts_1.deletePost)(id);
        if (changes === 0) {
            res.status(types_1.HttpStatus.NOT_FOUND).send({ error: 'Post not found' });
            return;
        }
        res.status(types_1.HttpStatus.OK).send(true);
    }
    catch (error) {
        res
            .status(types_1.HttpStatus.INTERNAL_SERVER_ERROR)
            .send({ error: 'An error occurred while deleting the post' });
    }
}));
exports.default = router;
