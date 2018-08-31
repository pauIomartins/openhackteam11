const {createDeployment} = require('./../k8s/createDeployment');
const {createService} = require('./../k8s/createService');
const {createPvc} = require('./../k8s/createPvc');

module.exports = async () => {
    const actualTimestamp = new Date().getTime();

    const service = await createService(actualTimestamp);

    const pvc = await createPvc(actualTimestamp, service.name);
    
    const deployment = await createDeployment(actualTimestamp, service.name, pvc.name);

    return {
        deployment,
        service,
        pvc,
    }
};