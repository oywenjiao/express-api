const {Sequelize, sequelize} = require(process.cwd() + '/app/config/database');

/**
 * 非数据表映射的方式定义model
 */
const Model = Sequelize.Model;
class Order extends Model {}
Order.init({
    status: {
        type: Sequelize.BOOLEAN
    },
    trade_sn: {
        type: Sequelize.STRING(32)
    }
}, {
    sequelize,
    timestamps: false
});

module.exports = Order;
