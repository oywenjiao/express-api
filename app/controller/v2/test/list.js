module.exports = function (req, res, helper) {
    res.json(helper.jsonSuccess(['a','b']));
};
