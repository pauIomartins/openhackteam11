const {createPvc} = require('./createPvc');
const {expect} = require('chai');


describe('Testing the createPVC function', function () {
    this.timeout(0);
 
    describe('Should create a new PersistentVolumeClaim', () => {
        it('Should load the correct file into memory', async () => {
            const result = await createPvc(new Date().getTime(), 'testing-creation');
            expect(result)
                .to.haveOwnProperty('name')
                .and.to.be.a('string');
        });
    });
});