"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = exports.deletePost = exports.getPosts = void 0;
const crypto_1 = require("crypto");
const connection_1 = require("../connection");
const query_tamplates_1 = require("./query-tamplates");
const getPosts = (userId) => new Promise((resolve, reject) => {
    connection_1.connection.all(query_tamplates_1.selectPostsTemplate, [userId], (error, results) => {
        if (error) {
            reject(error);
        }
        resolve(results);
    });
});
exports.getPosts = getPosts;
const deletePost = (postId) => new Promise((resolve, reject) => {
    connection_1.connection.run(query_tamplates_1.deletePostTemplate, [postId], function (error) {
        if (error) {
            reject(error);
        }
        resolve(this.changes);
    });
});
exports.deletePost = deletePost;
const createPost = (post) => {
    const postId = (0, crypto_1.randomUUID)();
    const createdAt = new Date().toISOString();
    return new Promise((resolve, reject) => {
        connection_1.connection.run(query_tamplates_1.insertPostTemplate, [postId, post.user_id, post.title, post.body, createdAt], function (error) {
            if (error) {
                return reject(error);
            }
            connection_1.connection.get(query_tamplates_1.selectPostByIdTemplate, [postId], (selectError, createdPost) => {
                if (selectError) {
                    return reject(selectError);
                }
                resolve(createdPost);
            });
        });
    });
};
exports.createPost = createPost;
