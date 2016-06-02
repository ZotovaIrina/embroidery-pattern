// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var imageSchema = new Schema({
    images: [{
        type: 'String'
    }],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});


// the schema is useless so far
// we need to create a model using it
var Images = mongoose.model('Images', imageSchema);

// make this available to our Node applications
module.exports = Images;