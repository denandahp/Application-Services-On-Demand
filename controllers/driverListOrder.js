const user = require('../models/driverListOrder.js');

class DriverListOrderController {

    async listorder(req, res, next) {

        try {
            let result = await user.listorder();
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

    async listorderbydriver(req, res, next) {

        let id = req.params.id
        try {
            let result = await user.listorderbydriver(id);
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

    async detailorderjfood(req, res, next) {

        let kode = req.params.kode
        try {
            let result = await user.detailorderjfood(kode);
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

    async detailorderjride(req, res, next) {

        let kode = req.params.kode
        try {
            let result = await user.detailorderjride(kode);
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

module.exports = new DriverListOrderController();