const Employee = require('../employees.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
    it('should throw an error if no some args are missing', () => {
        const employee1 = new Employee({firstName:'John', lastName:'Connor', department:''});
        const employee2 = new Employee({firstName:'John', department:'Counting'});
        const employee3 = new Employee({lasttName:'Mike', department:'Anderson'});

        const cases = [employee1, employee2, employee3]
        for (const emp of cases) {
        emp.validate(err => {
            expect(err.errors).to.exist;
        });
        }
        after(() => {
            mongoose.models = {};
        });
    });
    it('should throw an error if no some args are NOT string', () => {
        const employee1 = new Employee({firstName:'John', lastName:'Connor', department:[1]});
        const employee2 = new Employee({firstName:'John', lastName:[true], department:'Counting'});
        const employee3 = new Employee({firstName:['lorem'], lastName:'Connor', department:'Counting'});

        const cases = [employee1, employee2, employee3]
        for (const emp of cases) {
        emp.validate(err => {
            expect(err.errors).to.exist;
        });
        }
        after(() => {
            mongoose.models = {};
        });
    });
    it('should NOT throw an error if args are alright', () => {
        const employee = new Employee({firstName:'John', lastName:'Connor', department:'HR'});
        employee.validate(err => {
            expect(err).to.not.exist;
        });
        after(() => {
            mongoose.models = {};
        });
    });
});