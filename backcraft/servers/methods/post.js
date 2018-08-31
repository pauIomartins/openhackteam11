const generateRandomMobName = require('./../utils/generateName');
const {createDeployment} = require('./../k8s/createDeployment');
const {createService} = require('./../k8s/createService');
const {createPvc} = require('./../k8s/createPvc');

module.exports = async () => {
    const serviceName = `${generateRandomMobName()}-${new Date().getTime()}`

    const service = await createService(serviceName);

    const pvc = await createPvc(serviceName);
    
    const deployment = await createDeployment(serviceName, pvc.name);

    return {
        deployment,
        service,
        pvc,
    }
};