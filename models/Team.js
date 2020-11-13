const mongoose = require('mongoose');

const TeamSchema = mongoose.Schema({
    name: {
        type: String,
    },
    img: {
        data: Buffer,
        contentType: String 
    }
});

module.exports = mongoose.model('Teams', TeamSchema);