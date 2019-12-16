const {Sequelize, sequelize} = require(process.cwd() + '/app/config/database');

/**
 * 非数据表映射的方式定义model
 */
/*const Model = Sequelize.Model;
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
});*/

const { User } = require('./user');

const Order = sequelize.define('order', {
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1,
        comment: '订单状态：1未付款，2已付款'
    },
    userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        references: {
            model: User,
            key: 'id'
        }
    },
    tradeSn: {
        type: Sequelize.STRING(32),
        field: 'trade_sn',
        allowNull: false,
        comment: '交易单号'
    },
    payment: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        comment: '订单金额'
    },
    paySn: {
        type: Sequelize.STRING(100),
        field: 'pay_sn'
    },
    payTime: {
        type: Sequelize.INTEGER,
        field: 'pay_time'
    },
    createTime: {
        type: Sequelize.DATE,
        field: 'create_time'
    },
    updateTime: {
        type: Sequelize.DATE,
        field: 'update_time'
    }
}, {
    timestamps: false,
    underscored: true,  // 设置关联外键的字段名称为表名+下划线的方式
    freezeTableName: true,
    tableName: "order",
    comment: '订单数据表'
});

Order.belongsTo(User);

/*Order.sync({force: true}).then(() => {
    console.log('数据表创建成功!');
}).catch((err) => {
    console.log('出错了', err);
});*/

module.exports = {
    Order: Order,
    User: User,
    Op: Sequelize.Op
};
