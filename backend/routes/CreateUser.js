const express = require('express');
const route = express.Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

route.post('/createuser', [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect Password').isLength({ min: 5 })]
    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {

            const userExist = await User.findOne({ email: req.body.email });
            // console.log("response", userExist);

            if (userExist) {
                // console.log("inside createuser findone");
                res.json({ userExist: true });
            } else {
                const authPassword = await bcrypt.hash(req.body.password, 10);

                await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: authPassword
                })
                res.json({ success: true });
            }

        } catch (err) {
            res.json({ success: false });
            console.log(err);
        }
    });

route.post('/login', [
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 })]
    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {

            const userEmail = await User.findOne({ email: req.body.email });
            const match = await bcrypt.compare(req.body.password, userEmail.password);

            if (match) {
                // console.log("inside match condition");
                res.send({ success: true, bookmark: userEmail.bookmark, id: userEmail._id });
            } else {
                res.send({ success: false });
            }

        } catch (err) {
            console.log(err);
        }
    })

route.post('/update', async (req, res) => {
    try {
        const obj = {
            "documentId" : req.body.id
        };
        const response = await User.findOne(obj);
        // console.log(response);
        if (response) {
            await User.findOneAndUpdate(
                {
                    _id: req.body.id
                },
                {
                    bookmark: req.body.bookmark
                }
            );
            res.send({ success: true });
        } else {
            console.log("Cannot Update db bookmark");
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = route;
