const user = require('../models/homealtdriver.js');

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

    async allorderhistory(req, res, next) {

        let id = req.user.data.id
        try {
            let result = await user.allorderhistory(id);
            res.status(200).send({
                status: res.statusCode,
                data: result
            })
        } catch (e) {
            next(e.detail);
        }
    }

    async lastorder(req, res, next) {

        let id = req.user.data.id
        try {
            let result = await user.lastorder(id);
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