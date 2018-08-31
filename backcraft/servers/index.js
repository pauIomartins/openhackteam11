const methods = require('./methods');
const logger = require('./logger');

module.exports = async function (context, req) {
    logger.init(context, req);

    switch(req.method.toUpperCase()) {
        case 'GET': 
            context.res = {
                status: 200,
                body: await methods.get(),
            };

            break;
        default:
            context.res = {
                status: 200,
                body: await methods.get(),
            };

            break;
    }

    context.done();
};