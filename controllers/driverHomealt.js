const user = require('../models/driverHomealt.js');

class HomeAltDriverController {

    async is_active(req, res, next) {

        let id = req.user.data.id
        try {
            await user.is_active(id);
            res.status(200).send({
                status: res.statusCode,
                message: "success"
            })
        } catch (e) {
            next(e.detail);
        }
    }

    async active(req, res, next) {

        let id = req.user.data.id
        try {
            await user.active(id);
            res.status(200).send({
                status: res.statusCode,
                message: "active",
            })
        } catch (e) {
            next(e.detail);
        }
    }

    async nonactive(req, res, next) {

        let id = req.user.data.id
        try {
            await user.nonactive(id);
            res.status(200).send({
                status: res.statusCode,
                message: "non active",
            })
        } catch (e) {
            next(e.detail);
        }
    }

    async autobid(req, res, next) {

        let id = req.user.data.id
        try {
            await user.autobid(id);
            res.status(200).send({
                status: res.statusCode,
                message: "success"
            })
        } catch (e) {
            next(e.detail);
        }
    }

    async activeautobid(req, res, next) {

        let id = req.user.data.id
        try {
            await user.activeautobid(id);
            res.status(200).send({
                status: res.statusCode,
                message: "active",
            })
        } catch (e) {
            next(e.detail);
        }
    }

    async nonactiveautobid(req, res, next) {

        let id = req.user.data.id
        try {
            await user.nonactiveautobid(id);
            res.status(200).send({
                status: res.statusCode,
                message: "non active",
            })
        } catch (e) {
            next(e.detail);
        }
    }

    async homealt(req, res, next) {

        let id = req.user.data.id
        try {
            let result = await user.homealt(id);
            res.status(200).send({
                status: res.statusCode,
                data: result
            })
        } catch (e) {
            next(e.detail);
        }
    }

    async history(req, res, next) {

        let id = req.user.data.id
        let time = req.body
        try {
            let result = await user.history(id, time);
            res.status(200).send({
                status: res.statusCode,
                data: result
            })
        } catch (e) {
            next(e.detail);
        }
    }

    async detailhistory(req, res, next) {

        let id = req.user.data.id
        let kode = req.params.kode
        try {
            let result = await user.detailhistory(id, kode);
            res.status(200).send({
                status: res.statusCode,
                data: result
            })
        } catch (e) {
            next(e.detail);
        }
    }
}

module.exports = new HomeAltDriverController();