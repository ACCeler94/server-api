const expect = require('chai').expect;
const mongoose = require('mongoose');
const Workshop = require('../workshop.model');

describe('Workshop', () => {
  it('should throw an error if no argument is given', () => {
    const ws = new Workshop({});

    ws.validateSync(err => {
      expect(err.error.name).to.exist;
    })
  });
  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];
    for (let name of cases) {
      const ws = new Workshop({ name: name, concertId: '652ff8c9474981f1b2c335c9' });

      ws.validateSync(err => {
        expect(err.error.name).to.exist;
      })
    }
  });
  it('should throw an error if "concertId" is not a string', () => {
    const cases = [{}, []];
    for (let id of cases) {
      const ws = new Workshop({ name: 'Workshop #1', concertId: id });

      ws.validateSync(err => {
        expect(err.error.name).to.exist;
      })
    }
  });
  it('should not throw an error with valid arguments', () => {
    const ws = new Workshop({ name: 'Workshop #1', concertId: '652ff8c9474981f1b2c335c9' });

    ws.validateSync(err => {
      expect(err.error.name).to.not.exist
    })
  })
})