const express = require('express');
const {
  createData,
  getAllData,
  getDataById,
  updateData,
  deleteData,
} = require('../controllers/dataController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticateToken, createData);
router.get('/', authenticateToken, getAllData);
router.get('/:id', authenticateToken, getDataById);
router.put('/:id', authenticateToken, updateData);
router.delete('/:id', authenticateToken, deleteData);

module.exports = router;
