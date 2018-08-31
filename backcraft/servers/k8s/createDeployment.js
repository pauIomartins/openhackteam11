const {createNewK8sAPIClient} = require('./k8sConfig');
const {readFileSync} = require('fs');
const {safeLoad} = require('js-yaml');
const {join} = require('path');

module.exports = {
    createDeployment: async (serviceName, pvcName) => {
        const apiClient = await createNewK8sAPIClient();
        const rawDeployment = readFileSync(join(__dirname, 'objects', 'deployment.yml'), 'utf-8');

        const baseDeployment = safeLoad(rawDeployment);

        baseDeployment.metadata.name = `pod-${serviceName}`; 
        baseDeployment.metadata.labels.serviceName = serviceName;

        baseDeployment.spec.template.spec.volumes[0].persistentVolumeClaim.claimName = pvcName;

        const {body} = await apiClient.apis.apps.v1.namespace('default').deployment.post({
            body: baseDeployment,
        });
        
        return {
            name: body.metadata.name,
        };
    }
}