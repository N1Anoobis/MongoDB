const express = require('express');
const router = express.Router();
const DepartmentController = require('../controllers/departments.controller');

router.get('/departments', DepartmentController.getAll);
router.get('/departments/random', DepartmentController.getRandom);
router.get('/departments/:id', DepartmentController.getById);
router.post('/departments', DepartmentController.postNew);
router.put('/departments/:id', DepartmentController.updateById);
router.delete('/departments/:id', DepartmentController.deleteById);

module.exports = router;
