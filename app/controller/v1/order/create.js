module.exports = function () {
    const model = require(process.cwd() + '/app/models/order');
    model.create({
        trade_sn: 'MY201912101744'
    }).then((ret) => {
        return ret;
    }).catch((err) => {
        return err;
    })
};
