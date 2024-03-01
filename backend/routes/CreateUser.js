const express = require('express');
const route = express.Router();
const User = require('../model/User');

route.post('/createuser', async (req, res) => {
    try {

        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json({ success: true });

    } catch (err) {
        res.json({ success: false });
        console.log(err);
    }
});

route.post('/login', async (req, res) => {
    try {

        const data = {
            "email": req.body.email,
            "password": req.body.password
        };

        // console.log(data);

        const response = await User.findOne(data);
        // console.log(response);
        if (response) {
            // console.log(response.bookmark);
            // console.log("inside login api");
            // console.log(response._id);
            res.send({ success: true, bookmark: response.bookmark, id : response._id });
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
