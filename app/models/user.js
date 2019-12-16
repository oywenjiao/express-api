const {Sequelize, sequelize} = require(process.cwd() + '/app/config/database');

/**
 * 以映射数据表字段的方式定义model
 * @type {Model|void}
 */
const User = sequelize.define('user', {
    nickname: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: '用户昵称'
    },
    phone:  {
        type: Sequelize.STRING(20),
        allowNull: false,
        comment: '用户手机号'
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1,
        comment: '状态：1正常，2关闭'
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
    freezeTableName: true,
    tableName: 'user',
    comment: '用户数据表'
});

/**
 * 新增数据表
 * @type {Model|void}
 */
// User.sync({force: true}).then(() => {
//     console.log('数据表创建成功!');
// }).catch((err) => {
//     console.log('出错了', err);
// });

module.exports = {
    User: User,
    Op: Sequelize.Op
};


