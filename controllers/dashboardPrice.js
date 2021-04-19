const price = require('../models/dashboardPrice.js');

class DashboardPriceController {

    async pricingpost(req, res, next) {

        let newPrice = req.body
        try {
            let result = await price.pricingpost(newPrice);
            res.status(200).send({
                status: res.statusCode,
                data: result
            })
        } catch (e) {
            next(e.detail);
        }
    }

    async pricingget(req, res, next) {

        let service = req.params.service
        try {
            let result = await price.pricingget(service);
            res.status(200).send({
                status: res.statusCode,
                data: result
            })
        } catch (e) {
            next(e.detail);
        }
    }

}

module.exports = new DashboardPriceController();