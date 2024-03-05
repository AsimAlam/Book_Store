const mongoose = require('mongoose');

const URI = process.env.mongoURI;

const mongoDB = async () => {
    await mongoose.connect(URI, { useNewUrlParser: true }, async (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("connected to mongodb");
            const fetched_data = await mongoose.connection.db.collection("bookStory");
            fetched_data.find({}).toArray(async function (err, data) {
                const bookTitle = await mongoose.connection.db.collection("bookTitle");
                bookTitle.find({}).toArray(async function (err, tdata) {
                    if (err) console.log(err);
                    else {
                        global.bookStory = data;
                        global.bookTitle = tdata;
                        // console.log(global.bookTitle);
                        // console.log(global.bookStory);
                    }
                })
            })
        }
    })
}

module.exports = mongoDB;