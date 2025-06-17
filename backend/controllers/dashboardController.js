// controllers/dashboardController.js
const asyncHandler = require("express-async-handler");
const dashboardModel = require("../models/dashboard.js");

const getDashboardData = asyncHandler(async (req, res) => {
    const { cidade, unidade } = req.query;
    const data = await dashboardModel.getDashboardData({ cidade, unidade });
    res.json(data);
});

const getComparativoData = asyncHandler(async (req, res) => {
    const { data1, data2, cidade, unidade } = req.query;
    if (!data1 || !data2) {
        return res.status(400).json({ message: 'As datas de início e fim são obrigatórias.' });
    }
    const data = await dashboardModel.getComparativoData({ data1, data2, cidade, unidade });
    res.json(data);
});

module.exports = { getDashboardData, getComparativoData };