const mongoose = require('mongoose');
const {
    Schema
} = mongoose;
var deviceSchema = new Schema({
    vendor: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        required: true
    },
    gateway_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Gateway'
    }
})
module.exports = mongoose.model('Device', deviceSchema);