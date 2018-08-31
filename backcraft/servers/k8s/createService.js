const {createNewK8sAPIClient} = require('./k8sConfig');
const {readFileSync} = require('fs');
const jsToYaml = require('js-yaml');
const {join} = require('path');

const serverNamesPrefix = [
    "bat",
    "blaze",
    "cave-spider",
    "chicken",
    "chicken-jockey",
    "cod",
    "cow",
    "creeper",
    "dolphin",
    "donkey",
    "drowned",
    "elder-guardian",
    "ender-dragon",
    "enderman",
    "endermite",
    "evoker",
    "ghast",
    "giant",
    "guardian",
    "horse",
    "husk",
    "illusioner",
    "iron-golem",
    "killer-bunny",
    "llama",
    "magma-cube",
    "mooshroom",
    "mule",
    "npc",
    "ocelot",
    "phantom",
    "parrot",
    "pig",
    "polar-bear",
    "pufferfish",
    "rabbit",
    "salmon",
    "sheep",
    "shulker",
    "silverfish",
    "skeleton",
    "skeleton-horse",
    "skeleton-horseman",
    "slime",
    "snow-golem",
    "spider",
    "spider-jockey",
    "squid",
    "stray",
    "tropical-fish",
    "turtle",
    "vex",
    "villager",
    "vindicator",
    "witch",
    "wither",
    "wither-skeleton",
    "wolf",
    "zombie",
    "zombie-horse",
    "zombie-pigman",
    "zombie-villager"
];

function generateRandomMobName() {
    const max = serverNamesPrefix.length - 1;

    const index = Math.floor(Math.random() * (max - 0)) + 0;

    return serverNamesPrefix[index];
}

module.exports = {
    createService: async (serviceName) => {
        const apiClient = await createNewK8sAPIClient();

        const rawService = readFileSync(join(__dirname, 'objects', 'service.yml'), 'utf-8');

        const baseService = jsToYaml.safeLoad(rawService);

        baseService.metadata.name = `${baseService.metadata.name}-${serviceName}-${generateRandomMobName()}`

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