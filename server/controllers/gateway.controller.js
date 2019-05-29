
const Gateway = require('../models/gateway');
const Device = require('../models/device');
const mongoose = require('mongoose');

module.exports = {
    async listAll(req, res) {
        const gateways = await Gateway.find().populate('devices');
        res.json(gateways);
    },
    async getOne(req, res) {
        const {id} = req.params;
        const obj = await Gateway.findById(id).populate('devices');
        res.json(obj);
    },
    async create(req, res) {
        const obj = new Gateway({
            _id:new mongoose.Types.ObjectId(),
            name: req.body.name,
            ipv4: req.body.ipv4
        });
        await obj.save(function (error) {
            if (error) {                
                res.json({success: false, message: 'error', error:error});
            }else{
                res.json({
                    success: true,
                    message: 'Gateway created success',
                    error: error
                });
            }
        });


    },
    async update(req, res) {
        const obj = {
            _id: req.body._id,
            name: req.body.name,
            ipv4: req.body.ipv4
        };
        await Gateway.findByIdAndUpdate(obj._id, {$set: obj}, {new: true}, function (error) {
            if (error) {
                res.json({
                    success: false,
                    message: 'error',
                    error: error
                });
            } else {
                res.json({
                    success: true,
                    message: 'Gateway updated success',
                    error: error
                });
            }
        });

    },
    async delete(req, res) {
        const {id} = req.params;
        await Device.deleteMany({ gateway_id:  id});
        await Gateway.findByIdAndRemove(id, function(error) {
            if (error) {
                res.json({
                    success: false,
                    message: 'Error deleted Gateway',
                    error: error
                });
            } else {
                res.json({
                    success: true,
                    message: 'Gateway deleted success',
                    error: error
                });
            }
        });
    },
};