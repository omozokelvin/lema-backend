"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectUsersWithAddressLeftJoinTemplate = exports.selectCountOfUsersTemplate = exports.selectUsersTemplate = void 0;
exports.selectUsersTemplate = `
SELECT *
FROM users
ORDER BY name
LIMIT ?, ?
`;
exports.selectCountOfUsersTemplate = `
SELECT COUNT(*) as count
FROM users
`;
exports.selectUsersWithAddressLeftJoinTemplate = `
SELECT
    u.*,
    a.id AS address_id,
    a.street AS address_street,
    a.city AS address_city,
    a.state AS address_state,
    a.zipcode AS address_zipcode
FROM users u
LEFT JOIN addresses a ON u.id = a.user_id
ORDER BY u.name
LIMIT ?, ?
`;
