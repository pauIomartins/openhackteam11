const {createNewK8sAPIClient} = require('./k8sConfig');

module.exports = {
    createPvc: async (pvcName) => {
        const apiClient = await createNewK8sAPIClient();

        const pvcs = await apiClient.apis.v1.namespaces('default').persistentvolumeclaim.get();

        console.log(JSON.stringify(pvcs, null, 2));
    },
};