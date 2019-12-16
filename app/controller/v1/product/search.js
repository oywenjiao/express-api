module.exports = function (req, res, helper) {
    const {Product, Op, sequelize} = require(process.cwd() + '/app/models/product');
    let params = req.body;
    let order = [];
    let title = params.title;
    if (!title) {
        order = sequelize.random();
    } else {
        order[0] = ['id', 'desc']
    }
    let where = {};
    if (title) {
        where['title'] = {
            [Op.like]: "%" + title + "%"
        }
    }
    Product.findAndCountAll({
        where: where,
        order: order,
        limit: 10
    }).then((result) => {
        res.json(helper.jsonSuccess(result));
    }).catch((err) => {
        res.json(helper.jsonError(err));
    })
};
