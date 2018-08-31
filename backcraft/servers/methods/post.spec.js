const postFunction = require('./post');
const {expect} = require('chai');


describe.only('Testing the POST request', function () {
    this.timeout(0);

    it('Should create everything cool!', async () => {
        const result = await postFunction();

        console.log(JSON.stringify(result, null, 2));

        expect(result).to.haveOwnProperty('service');
    });
})