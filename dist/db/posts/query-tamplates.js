"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectPostByIdTemplate = exports.deletePostTemplate = exports.insertPostTemplate = exports.selectPostsTemplate = void 0;
exports.selectPostsTemplate = `
SELECT *
FROM posts
WHERE user_id = ?
`;
exports.insertPostTemplate = `
INSERT INTO posts (id, user_id, title, body, created_at)
VALUES (?, ?, ?, ?, ?)
`;
exports.deletePostTemplate = `
DELETE FROM posts
WHERE id = ?
`;
exports.selectPostByIdTemplate = `
SELECT *
FROM posts
WHERE id = ?
`;
