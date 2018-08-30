const {createNewK8sAPIClient} = require('./k8sConfig');

module.exports = {
    createPvc: async (pvcName) => {
        const apiClient = await createNewK8sAPIClient();

        const pvcs = await apiClient.api.v1.namespaces('default').persistenvolumeclaims.get();

        console.log(JSON.stringify(pvcs, null, 2));
    },
};