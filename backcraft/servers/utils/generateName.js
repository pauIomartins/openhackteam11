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

module.exports = generateRandomMobName;