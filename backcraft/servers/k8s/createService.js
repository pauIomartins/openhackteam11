const {createNewK8sAPIClient} = require('./k8sConfig');
const {readFileSync} = require('fs');
const jsToYaml = require('js-yaml');
const {join} = require('path');




module.exports = {
    createService: async (serviceName) => {
        const apiClient = await createNewK8sAPIClient();

        const rawService = readFileSync(join(__dirname, 'objects', 'service.yml'), 'utf-8');

        const baseService = jsToYaml.safeLoad(rawService);

        baseService.metadata.name = serviceName;
        baseService.metadata.labels.serviceName = serviceName;

        const {body} = await apiClient.api.v1.namespace('default').service.post({
            body: baseService,
        });

        return {
            name: body.metadata.name,
            endpoints: {
                minecraft: 'Pending',
                rcon: 'Pending',
            },
        }
    },
};