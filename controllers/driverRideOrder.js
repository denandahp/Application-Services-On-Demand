const user = require('../models/driverRideOrder.js');
const jsotp = require('jsotp');

class DriverRideOrderController {

    async incomingorder(req, res, next) {

        let kode = req.params.kode
        try {
            let result = await user.incomingorder(kode);
            if (result.status == 404) {
                res.status(404).json({
                    status: res.statusCode,
                    message: result.errors
                });
            } else {
                res.status(200).send({
                    status: res.statusCode,
                    data: result
                })
            }
        } catch (e) {
            next(e.detail);
        }
    }

    async acceptorder(req, res, next) {

        let id = req.user.data.id
        let kode = req.params.kode
        let token = req.body.token
        let lat = req.body.latitude
        let long = req.body.longitude
        try {
            let result = await user.acceptorder(kode, id, token, lat, long);
            res.status(200).send({
                status: res.statusCode,
                data: result
            })
        } catch (e) {
            next(e.detail);
        }
    }

    async rejectorder(req, res, next) {

        let kode = req.params.kode
        let id = req.user.data.id
        let lat = req.body.latitude
        let long = req.body.longitude
        let reason = req.body.reason
        let token = req.body.token
        try {
            let result = await user.rejectorder(kode, id, lat, long, reason, token);
            res.status(200).send({
                status: res.statusCode,
                data: result
            })
        } catch (e) {
            next(e.detail);
        }
    }

    async dataorder(req, res, next) {

        let id = req.user.data.id
        let kode = req.params.kode
        try {
            let result = await user.dataorder(kode, id);
            if (result.status == 404) {
                res.status(404).json({
                    status: res.statusCode,
                    message: result.errors
                });
            } else {
                res.status(200).send({
                    status: res.statusCode,
                    data: result
                })
            }
        } catch (e) {
            next(e.detail);
        }
    }

    async telahdenganpenumpang(req, res, next) {

        let kode = req.params.kode
        let id = req.user.data.id
        let token = req.body.token
        try {
            let result = await user.telahdenganpenumpang(kode, id, token);
            if (result.status == 404) {
                res.status(404).json({
                    status: res.statusCode,
                    message: result.errors
                });
            } else {
                res.status(200).send({
                    status: res.statusCode,
                    data: result
                })
            }
        } catch (e) {
            next(e.detail);
        }
    }

    async selesaiantar(req, res, next) {

        let kode = req.params.kode
        let id = req.user.data.id
        let token = req.body.token
        try {
            let result = await user.selesaiantar(kode, id, token);
            if (result.status == 404) {
                res.status(404).json({
                    status: res.statusCode,
                    message: result.errors
                });
            } else {
                res.status(200).send({
                    status: res.statusCode,
                    data: result
                })
            }
        } catch (e) {
            next(e.detail);
        }
    }
}

module.exports = new DriverRideOrderController();