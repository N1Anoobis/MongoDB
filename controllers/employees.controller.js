const Employees = require('../models/employees.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Employees.find().populate('department'));
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };
  
  exports.getRandom = async (req, res) => {
    try {
      const count = await Employees.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const dep = await Employees.findOne().skip(rand).populate('department');
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };
  
  exports.getById = async (req, res) => {
    try {
      const dep = await Employees.findById(req.params.id).populate('department');
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };
  
  exports.postNew = async (req, res) => {
    try {
      const { firstName } = req.body;
      const { lastName } = req.body;
      const { department } = req.body;
      const newEmployees = new Employees({ firstName: firstName, lastName: lastName, department: department  });
      await newEmployees.save();
      res.json({ message: 'OK' });
    } catch(err) {
      res.status(500).json({ message: err });
    }
  };
  
  exports.updateById = async (req, res) => {
    const { firstName } = req.body;
    const { lastName } = req.body;
    const { department } = req.body;
    try {
      const dep = await(Employees.findById(req.params.id));
      if(dep) {
        dep.firstName = firstName;
        dep.lastName = lastName;
        dep.department = department;
        await dep.save();
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };
  
  exports.deleteById = async (req, res) => {
    try {
      const dep = await(Employees.findById(req.params.id));
      if(dep) {
        await Employees.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };