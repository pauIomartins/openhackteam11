const getFunction = require('./get');
const {expect} = require('chai');


describe('Testing GET function', function () {
    this.timeout(0);
    let response;

    before(async () => {
        response = await getFunction();
    })

    it('Testing if it responds with an array', async () => {
        expect(response).to.be.an('array');
    });

    it('Testing if it responds an array, with objects with keys', async () => {
        // const response = await getFunction();
        expect(response[0]).to.haveOwnProperty('name');
        
        expect(response[0])
        .to.haveOwnProperty('endpoints'); 
    });

    it('Testing if `endpoints` object is valid', async () => {
        // const response = await getFunction();        

        expect(response[0].endpoints).to.be.a('object')
        .and.to.haveOwnProperty('minecraft');

        expect(response[0].endpoints).to.be.a('object')
        .and.to.haveOwnProperty('rcon');
    });
});