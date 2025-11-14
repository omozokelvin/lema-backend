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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../db/users/users");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of users from the database with pagination.
 *     parameters:
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *           default: 0
 *         description: The page number to retrieve.
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 4
 *         description: The number of users to retrieve per page.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The user ID.
 *                     example: d3a4ec91a50447ebb64e395e124caf40
 *                   name:
 *                     type: string
 *                     description: The user's name.
 *                     example: John Doe
 *                   username:
 *                     type: string
 *                     description: The user's username.
 *                     example: CRJFvWA
 *                   email:
 *                     type: string
 *                     description: The user's email.
 *                     example: oQMoMEF@pTWwpsQ.edu
 *                   phone:
 *                     type: string
 *                     description: The user's phone.
 *                     example: 106-725-1483
 *                   address:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The address ID.
 *                         example: c5358841705b44178fc464f51c69e24e
 *                       street:
 *                         type: string
 *                         description: The street name.
 *                         example: 4709 Blagden Terrace Northwest
 *                       city:
 *                         type: string
 *                         description: The city name.
 *                         example: Washington
 *                       state:
 *                         type: string
 *                         description: The state short code.
 *                         example: DC
 *                       zipcode:
 *                         type: string
 *                         description: The ZIP code.
 *                         example: 20011
 *       400:
 *        description: Invalid page number or page size.
 */
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pageNumber = Number(req.query.pageNumber) || 1;
    const pageSize = Number(req.query.pageSize) || 4;
    if (pageNumber < 1 || pageSize < 1) {
        res.status(400).send({ message: 'Invalid page number or page size' });
        return;
    }
    const users = (yield (0, users_1.getUsersWithAddressLeftJoin)(pageNumber, pageSize)).map((user) => {
        const { address_id, address_street, address_city, address_state, address_zipcode } = user, rest = __rest(user, ["address_id", "address_street", "address_city", "address_state", "address_zipcode"]);
        return Object.assign(Object.assign({}, rest), { address: {
                id: address_id,
                street: address_street,
                city: address_city,
                state: address_state,
                zipcode: address_zipcode,
            } });
    });
    res.send(users);
}));
/**
 * @swagger
 * /users/count:
 *   get:
 *     tags: [Users]
 *     summary: Get the total number of users
 *     description: Retrieve the total count of users in the database.
 *     responses:
 *       200:
 *         description: The total number of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: The total number of users.
 *                   example: 100
 */
router.get('/count', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield (0, users_1.getUsersCount)();
    res.send({ count });
}));
exports.default = router;
