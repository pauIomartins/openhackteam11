const {createNewK8sAPIClient} = require('./k8sConfig');
// const API_VERSION = require('@kubernetes/client-node').Core_v1Api;
const {expect} = require('chai');


describe.only('Testing the makeK8sAPIClient function', function() {
    this.timeout(0);
    it('Should return an object with `listNamespacedPod` function', async () => {
        const apiClient = await createNewK8sAPIClient();

        const pods = await  apiClient.api.v1.namespaces.get();

        console.log(JSON.stringify(pods));

        expect(pods.body).to.haveOwnProperty('kind');//.and.be.equal('PodList');
    });
});