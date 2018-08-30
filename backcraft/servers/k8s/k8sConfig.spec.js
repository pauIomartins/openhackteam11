const {createNewK8sAPIClient} = require('./k8sConfig');
// const API_VERSION = require('@kubernetes/client-node').Core_v1Api;
const {expect} = require('chai');


describe('Testing the makeK8sAPIClient function', function() {
    this.timeout(15000);
    it('Should return an object with `listNamespacedPod` function', async () => {
        const apiClient = await createNewK8sAPIClient();

        const pods = await apiClient.apis.v1.namespaces('default').persistentvolumeclaim.get();

        expect(pods.body).to.haveOwnProperty('kind').and.be.equal('PersistentVolumeClaimList');
    });
});