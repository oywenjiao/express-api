module.exports = function (req, res, helper) {
    const {Order, User} = require(process.cwd() + '/app/models/order');
    Order.findAndCountAll({
        where: {
            user_id: 1,
        },
        include: [
            {
                model: User,
                required: true,
                attributes: ['nickname', 'phone']
            }
        ]
    }).then((result) => {
        return res.json(helper.jsonSuccess({postData: req.body, result: result}));
    }).catch((err) => {
        return res.json(err);
    })
};
