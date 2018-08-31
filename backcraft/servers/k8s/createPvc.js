const {createNewK8sAPIClient} = require('./k8sConfig');
const {readFileSync} = require('fs');
const jsToYaml = require('js-yaml');
const {join} = require('path');


module.exports = {
    createPvc: async (serviceName) => {
        const apiClient = await createNewK8sAPIClient();

        const rawPersistentVolumeClaim = readFileSync(join(__dirname, 'objects','pvc.yml'), 'utf-8');

        const persistentVolumeClaim = jsToYaml.safeLoad(rawPersistentVolumeClaim);

        persistentVolumeClaim.metadata.name = `pvc-${serviceName}`
        persistentVolumeClaim.metadata.labels.serviceName = serviceName;
        
        const {body} = await apiClient.api.v1.namespace('default').persistentvolumeclaim.post({
            body: persistentVolumeClaim,
        });

        return {
            name: body.metadata.name,
        };
    },
};