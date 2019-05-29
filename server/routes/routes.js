
const express = require('express');
const router = express.Router();

const gatewayController = require('../controllers/gateway.controller');
const deviceController = require('../controllers/device.controller');

router.get('/',gatewayController.listAll);
router.get('/:id',gatewayController.getOne);
router.post('/',gatewayController.create);
router.put('/',gatewayController.update);
router.delete('/:id',gatewayController.delete);

router.get('/device',deviceController.listAll);
router.get('/device/:id',deviceController.getOne);
router.post('/device',deviceController.create);
router.put('/device',deviceController.update);
router.delete('/device/:id',deviceController.delete);

module.exports=router;
