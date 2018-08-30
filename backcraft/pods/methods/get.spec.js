const getFunction = require('./get');
const {expect} = require('chai');


describe('Testing GET function', () => {
    it('Testing if it responds with an array', async () => {
        const response = await getFunction();
        expect(response).to.be.an('array');
    });

    it('Testing if it responds an array, with objects with keys', async () => {
        const response = await getFunction();
        expect(response[0]).to.haveOwnProperty('name');
        
        expect(response[0])
        .to.haveOwnProperty('endpoints'); 
    });

    it('Testing if `endpoints` object is valid', async () => {
        const response = await getFunction();

        expect(response[0]).to.be.a('object')
        .and.to.haveOwnProperty('minecraft');

        expect(response[0]).to.be.a('object')
        .and.to.haveOwnProperty('rcon');
    });
});