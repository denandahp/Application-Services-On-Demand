const user = require('../models/driverOrder.js');

class DriverOrderController {

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
        try {
            let result = await user.acceptorder(kode, id);
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

    async rejectorder(req, res, next) {

        let id = req.user.data.id
        let kode = req.params.kode
        try {
            await user.rejectorder(kode, id);
            res.status(200).send({
                status: res.statusCode,
            })
        } catch (e) {
            next(e.detail);
        }
    }

    async updatedatadriver(req, res, next) {

        let id = req.user.data.id
        let lat = req.body.latitude
        let long = req.body.longitude
        let token = req.body.token

        try {
            let result = await user.updatedatadriver(id, lat, long, token);
            res.status(200).send({
                status: res.statusCode,
                data: result
            })
        } catch (e) {
            next(e.detail);
        }
    }

    async verifikasi(req, res, next) {

        let verifikasi = req.body.verifikasi
        let kode = req.params.kode
        try {
            let result = await user.verifikasi(kode, verifikasi);
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

    async antarkanpesanan(req, res, next) {

        let kode = req.params.kode
        try {
            let result = await user.antarkanpesanan(kode);
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
        try {
            let result = await user.selesaiantar(kode);
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

    async pesananselesai(req, res, next) {

        let kode = req.params.kode
        try {
            let result = await user.pesananselesai(kode);
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

module.exports = new DriverOrderController();