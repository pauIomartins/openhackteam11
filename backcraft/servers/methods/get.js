const {retrieveServices} = require('./../k8s/retriveServices');

module.exports = async () => {
    const services = await retrieveServices();    
    return services;
};