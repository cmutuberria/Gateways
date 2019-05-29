const Device = require('../models/device');
const Gateway = require('../models/gateway');
const mongoose = require('mongoose');

module.exports = {
    async listAll(req, res) {
        const devices = await Device.find();
        res.json(devices);
    },
    async getOne(req, res) {
        const {
            id
        } = req.params;
        const obj = await Device.findById(id);
        res.json(obj);
    },
    async create(req, res) {
        let deviceObj = new Device({
            vendor: req.body.vendor,
            date: req.body.date,
            status: req.body.status,
            gateway_id: req.body.gateway_id
        });

        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            let respuesta = {
                "success": false,
                "message": "Error creating device"
            };
            let gatewayObj = await Gateway.findById(deviceObj.gateway_id);
            if (gatewayObj.devices.length < 10) {
                await deviceObj.save();
                gatewayObj.devices.push(deviceObj._id);
                //gatewayObj.$session(session);
                await gatewayObj.save();
                respuesta = {
                    "success": true,
                    "message": "Device created success"
                };
            } else {
                respuesta.message = "Error creating device, only 10 devices are allowed per gateway";
            }
            await session.commitTransaction();
            session.endSession();
            res.json(respuesta);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            res.status(400).json({
                "success": false,
                "message": "Error creating device",
                "error": error
            });

        }
    },
    async update(req, res) {
        const obj = {
            _id: req.body._id,
            vendor: req.body.vendor,
            date: req.body.date,
            status: req.body.status,
            gateway_id: req.body.gateway_id
        };
        const session = await mongoose.startSession();
        session.startTransaction();
        try {

            var a = await Device.findByIdAndUpdate(obj._id, {
                $set: obj
            }, {
                new: true
            });
            await session.commitTransaction();
            session.endSession();
            res.json({
                "success": false,
                "message": "Device updated success"
            });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            res.status(400).json({
                "success": false,
                "message": "Error Updating device",
                "error": error
            });

        }
    },
    async delete(req, res) {
        const {
            id
        } = req.params;
        const session = await mongoose.startSession();
        session.startTransaction();
        try {

            await Gateway.update({
                devices: id
            }, {
                $pull: {
                    devices: id
                }
            }, {
                new: true
            });
            await Device.findByIdAndRemove(id);
            await session.commitTransaction();
            session.endSession();
            res.json({
                "success": false,
                "message": "Device deleted success"
            });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            res.status(400).json({
                "success": false,
                "message": "Error Updating device",
                "error": error
            });

        }
    },
};