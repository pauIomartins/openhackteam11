const {createNewK8sAPIClient} = require('./k8sConfig');
const R = require('ramda');



function pickRequiredFields(service) {
    const ip = R.pathOr('Pending', ['status','loadBalancer','ingress','0','ip'], service);

    const transformPorts = R.curry(mapIpToThePorts)(ip);

    const newService = {
        name: service.metadata.name,
        endpoints: service.spec.ports
                                .map(transformPorts)
                                .reduce((acc, actual) => R.merge(acc, actual)),
    };

    return newService;
}

function mapIpToThePorts(ip, port) {
    if(R.test(new RegExp(".*game.*"), port.name)) {
        return {
            minecraft: `${ip}:${port.port}`,
        };
    } else {
        return {
            rcon: `${ip}:${port.port}`,
        };
    }
}

module.exports = {
    retrieveServices: async () => {
        const client = await createNewK8sAPIClient();
        const {body:{items}} = await client.api.v1.namespaces('default').services.get({
            qs: {
                labelSelector: "owner=minesoft-corp",
            },
        });

        const result = items.map(pickRequiredFields);

        return result;
    }
};