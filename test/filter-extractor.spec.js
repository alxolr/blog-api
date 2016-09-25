const chai = require('chai');
const expect = chai.expect;
const fe = require('../services/filter-extractor')

describe('Filter extractor', () => {
    const configs = [{ in: "title::test",
        out: {
            title: "test"
        }
    }, {
        "in": "title::test|other::test2",
        "out": {
            "title": "test",
            "other": "test2"
        }
    }];

    it('should exist the extract method', () => {
        expect(fe.extract()).to.be.eql(null);
    });

    configs.forEach(config => {
        it(`should return ${JSON.stringify(config.out)} given ${config.in}`, () => {
            expect(fe.extract(config.in)).to.be.eql(config.out);
        });
    });

});