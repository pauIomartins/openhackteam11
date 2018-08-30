const {createNewK8sAPIClient} = require('./../k8s/k8sConfig');

const K8S_NAMESPACE = process.env.K8S_NAMESPACE || 'default';

module.exports = async () => {
    const apiClient = await createNewK8sAPIClient();

    // const {body} = await apiClient.listNamespacedPvc(K8S_NAMESPACE);

    // console.log(JSON.stringify(body, null, 2));
    
    return [];
};