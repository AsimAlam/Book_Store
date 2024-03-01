const mongoose = require('mongoose');
const mongoURI = 'mongodb://asimalam8:<PASSWORD>@ac-yogi2tv-shard-00-00.liakaku.mongodb.net:27017,ac-yogi2tv-shard-00-01.liakaku.mongodb.net:27017,ac-yogi2tv-shard-00-02.liakaku.mongodb.net:27017/bookStore?ssl=true&replicaSet=atlas-lbmxxw-shard-0&authSource=admin&retryWrites=true&w=majority'

const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
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