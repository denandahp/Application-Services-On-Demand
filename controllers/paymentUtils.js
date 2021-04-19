const axios = require('axios');

class PaymentIntegrationController {
    async generateSnap(req, res, next) {
        // req.body.transaction_details.order_id = "order-csb-" + Math.round(new Date().getTime() / 1000)
        try {
            const result = await axios({
                method: "post",
                url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Basic " +
                        Buffer.from("SB-Mid-server-YSRtOBQ5Oe6FtdO81TOL1vfZ").toString("base64")
                },
                data: req.body
            }).then(response => {
                console.log(response.data.token);
                req.body.transaction_details.token = response.data
                res.status(200).json(response.data);
            })
        } catch (error) {
            res.send(error)
        }
    }
}
module.exports = new PaymentIntegrationController();