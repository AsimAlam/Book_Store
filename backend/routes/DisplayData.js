const express = require('express');
const router = express.Router();

router.post('/bookData', async (req, res) => {
    try {
        // console.log(JSON.stringify(global.bookTitle));
        res.send([global.bookStory, global.bookTitle]);
    } catch (err) {
        res.send("display data error");
        console.log(err);
    }
})

module.exports = router;