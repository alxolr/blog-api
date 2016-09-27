const chai = require('chai');
const expect = chai.expect;
const fe = require('../services/filter-extractor')

describe('Filter extractor', () => {
    const configs = [{ in: "title::test",
        "out": [{
            "property": "title",
            "value": "test",
            "operator": null
        }]
    }, {
        "in": "title::test|other::test2",
        "out": [{
            "property": "title",
            "value": "test",
            "operator": null
        }, {
            "property": "other",
            "value": "test2",
            "operator": null
        }]
    }, {
        "in": "title::test|other::test2|test::true",
        "out": [{
            "property": "title",
            "value": "test",
            "operator": null
        }, {
            "property": "other",
            "value": "test2",
            "operator": null
        }, {
            "property": "test",
            "value": true,
            "operator": null
        }]
    }, {
        "in": "created_at::>2016-06-24",
        "out": [{
            "property": "created_at",
            "value": "2016-06-24",
            "operator": ">"
        }]
    }, {
        "in": "created_at::<=2016-05-12",
        "out": [{
            "property": "created_at",
            "value": "2016-05-12",
            "operator": "<="
        }]
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