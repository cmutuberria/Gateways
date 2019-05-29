const Device= require('../models/device');

const mongoose = require('mongoose');
const {Schema} = mongoose;

const gatewaySchema = new Schema({
    _id:Schema.Types.ObjectId,
    name:{type:String, required:true},
    ipv4:{type:String, 
          required: [true, 'Ip V4 Address is required'],
          validate: {
              validator: function (v) {
                  return /^(\d){1,3}\.(\d){1,3}\.(\d){1,3}\.(\d){1,3}$/.test(v);
              },
              message: props => `${props.value} is not a valid IP V4 address!`
          },
    },
    // devices: [{ type: Schema.Types.ObjectId, ref: 'Device' }]
    devices: [{
        type: Schema.Types.ObjectId,
        ref: 'Device'
    }]

});

module.exports = mongoose.model('Gateway', gatewaySchema);