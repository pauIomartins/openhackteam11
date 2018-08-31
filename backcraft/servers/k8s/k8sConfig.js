const k8s = require('kubernetes-client');
const {join} = require('path');



module.exports = {
    createNewK8sAPIClient: async () => {
        const configFile = join(__dirname,'objects', 'config.yml');
        
        const client = new k8s.Client({
            config: k8s.config.fromKubeconfig(configFile),
            version: '1.10',
        });

        await client.loadSpec();

        return client;
    },
}