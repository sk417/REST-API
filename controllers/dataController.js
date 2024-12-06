const Data = require('../models/Data');

exports.createData = async (req, res) => {
  try {
    const data = new Data({ ...req.body, createdBy: req.user.id });
    await data.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllData = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'createdAt', order = 'desc', search = '' } = req.query;
    const filter = search ? { title: new RegExp(search, 'i') } : {};

    const data = await Data.find(filter)
      .sort({ [sort]: order === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Data.countDocuments(filter);
    res.json({ data, total, page, limit });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getDataById = async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateData = async (req, res) => {
  try {
    const data = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) return res.status(404).json({ message: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteData = async (req, res) => {
  try {
    const data = await Data.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ message: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};