const {createNewK8sAPIClient} = require('./k8sConfig');
const R = require('ramda');


/** 
[
  {
    "metadata": {
      -> "name": "minecraft-service",
      "namespace": "default",
      "selfLink": "/api/v1/namespaces/default/services/minecraft-service",
      "uid": "974f69c9-abb3-11e8-95e1-868242153ee5",
      "resourceVersion": "142596",
      "creationTimestamp": "2018-08-29T17:47:26Z",
      "labels": {
        "owner": "minesoft-corp"
      },
      "annotations": {
        "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"v1\",\"kind\":\"Service\",\"metadata\":{\"annotations\":{},\"labels\":{\"owner\":\"minesoft-corp\"},\"name\":\"minecraft-service\",\"namespace\":\"default\"},\"spec\":{\"ports\":[{\"name\":\"service-game\",\"port\":25565,\"targetPort\":\"game-port\"},{\"name\":\"service-rcon\",\"port\":25575,\"targetPort\":\"rcon-port\"}],\"selector\":{\"app\":\"minecraft-app\"},\"type\":\"LoadBalancer\"}}\n"
      }
    },
    "spec": {
      -> "ports": [
        {
          "name": "service-game",
          "protocol": "TCP",
          "port": 25565,
          "targetPort": "game-port",
          "nodePort": 31161
        },
        {
          "name": "service-rcon",
          "protocol": "TCP",
          "port": 25575,
          "targetPort": "rcon-port",
          "nodePort": 30685
        }
      ],
      "selector": {
        "app": "minecraft-app"
      },
      "clusterIP": "10.0.222.219",
      "type": "LoadBalancer",
      "sessionAffinity": "None",
      "externalTrafficPolicy": "Cluster"
    },
    "status": {
      "loadBalancer": {
        -> "ingress": [
          {
            "ip": "40.121.145.171"
          }
        ]
      }
    }
  }
] 
*/


function pickRequiredFields(service) {
    const transformPorts = R.curry(mapIpToThePorts)(service.status.loadBalancer.ingress[0].ip);

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