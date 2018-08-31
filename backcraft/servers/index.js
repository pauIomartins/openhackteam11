const methods = require('./methods');
const logger = require('./logger');

function returnHTTPResponse(body, status) {
    return {
        headers: {
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        },
        status,
        body,
    }
}

module.exports = async (context, req) => {
    logger.init(context, req);

    switch(req.method.toUpperCase()) {
        case 'GET': 
            context.res = returnHTTPResponse(await methods.get(), 200);
            break;

        case 'POST': 
            context.res = returnHTTPResponse(await methods.post(), 201);
            break;

        default:
            context.res = returnHTTPResponse(await methods.get(), 200);
            break;
    }
};