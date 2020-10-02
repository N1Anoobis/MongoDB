const Employee = require('../employees.model');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

describe('Employee', () => {
    before(async () => {
        try {
          const fakeDB = new MongoMemoryServer();
          const uri = await fakeDB.getUri();
          await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        } catch(err) {
          console.log(err);
        }
      });

      describe('Reading data', () => {
        before(async () => {
          const testEmpOne = new Employee({ firstName: 'John', lastName: 'Connor', department: 'AI' });
          await testEmpOne.save();
          const testEmpTwo = new Employee({ firstName: 'Thomas', lastName: 'Anderson', department: 'IT' });
          await testEmpTwo.save();
        });
      
        it('should return all the data with "find" method', async () => {
            const employees = await Employee.find();
            const expectedLength = 2;
            expect(employees.length).to.be.equal(expectedLength);
          });
        it('should return a proper document by "name" with "findOne" method', async () => {
            const employee = await Employee.findOne({ firstName: 'John' });
            const expectedName = 'John';
            expect(employee.firstName).to.be.equal('John');
          });
        after(async () => {
            await Employee.deleteMany();
          });
      });

      describe('Creating data', () => {
        it('should insert new document with "insertOne" method', async () => {
          const employee = new Employee({ firstName: 'All', lastName: 'Bundy', department: 'Shoes' });
          await employee.save();
          expect(employee.isNew).to.be.false;
        });
        after(async () => {
          await Employee.deleteMany();
        });
      });

      describe('Updating data', () => {
        beforeEach(async () => {
          const testEmpOne = new Employee({ firstName: 'John', lastName: 'Connor', department: 'AI' });
          await testEmpOne.save();
        
          const testEmpTwo = new Employee({ firstName: 'Thomas', lastName: 'Anderson', department: 'IT' });
          await testEmpTwo.save();
        });

        it('should properly update one document with "updateOne" method', async () => {
          await Employee.updateOne({ firstName: 'John' }, { $set: { firstName: 'Ryszard' }});
          const updatedEmployee = await Employee.findOne({ firstName: 'Ryszard' });
          expect(updatedEmployee).to.not.be.null;
        });
        it('should properly update one document with "save" method', async () => {
          const employee = await Employee.findOne({ firstName: 'Thomas' });
          employee.firstName = 'Sylwester';
          await employee.save();
          const updatedEmployee = await Employee.findOne({ firstName: 'Sylwester' });
          expect(updatedEmployee).to.not.be.null;
        });
        it('should properly update multiple documents with "updateMany" method', async () => {
          await Employee.updateMany({}, { $set: { firstName: 'Updated!' }});
          const employees = await Employee.find();
          expect(employees[0].firstName).to.be.equal('Updated!');
          expect(employees[1].firstName).to.be.equal('Updated!');
        });
      
        afterEach(async () => {
          await Employee.deleteMany();
        });
      });

      describe('Removing data', () => {
        beforeEach(async () => {
          const testEmpOne = new Employee({ firstName: 'John', lastName: 'Connor', department: 'AI' });
          await testEmpOne.save();
          const testEmpTwo = new Employee({ firstName: 'Thomas', lastName: 'Anderson', department: 'IT' });
          await testEmpTwo.save();
        });
        
        it('should properly remove one document with "deleteOne" method', async () => {
          await Employee.deleteOne({ firstName: 'John' });
          const removeEmployee = await Employee.findOne({ firstName: 'John' });
          expect(removeEmployee).to.be.null;
        });
        it('should properly remove one document with "remove" method', async () => {
          const employee = await Employee.findOne({ firstName: 'Thomas' });
          await employee.remove();
          const removedEmployee = await Employee.findOne({ firstName: 'Thomas' });
          expect(removedEmployee).to.be.null;
        });
        it('should properly remove multiple documents with "deleteMany" method', async () => {
          await Employee.deleteMany();
          const employees = await Employee.find();
          expect(employees.length).to.be.equal(0);
        });

        afterEach(async () => {
          await Employee.deleteMany();
        });
      });

  after(() => {
    mongoose.models = {};
  });
});