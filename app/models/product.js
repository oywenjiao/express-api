const {Sequelize, sequelize} = require(process.cwd() + '/app/config/database');

// 字段类型查询：https://demopark.github.io/sequelize-docs-Zh-CN/data-types.html

const Product = sequelize.define('product', {
    title: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: '产品标题'
    },
    originalPrice: {
        type: Sequelize.DECIMAL(10, 2),
        field: 'original_price',
        allowNull: false,
        comment: '产品原价'
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        comment: '产品售价'
    },
    cover: {
        type: Sequelize.STRING(50),
        comment: '产品主图'
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
    tableName: 'product',
    comment: '产品数据表'
});

/*Product.sync({force: true}).then(() => {
    console.log('数据表创建成功!');
}).catch((err) => {
    console.log('出错了', err);
});*/

module.exports = {
    Product: Product,
    Op: Sequelize.Op,
    sequelize
};
