const Sequelize = require('sequelize');
const config = require('./env');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: 3306,
    dialect: 'mysql',
    timezone: '+08:00', // 设置时区
    pool: {
        max: 5, // 连接池中最大连接数量
        min: 0, // 连接池中最小连接数量
        idle: 10000 // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程。单位是毫秒
    }
});


module.exports = {
    Sequelize,
    sequelize
};
