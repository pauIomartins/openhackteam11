module.exports = {
    init(context, req) {
        context.log(`[${new Date()}] RECEIVED ${req.method.toUpperCase()} REQUEST`);
        context.log(`URL: ${req.url}`);
        context.log(`ORIGINAL-URL: ${req.originalUrl}`);
    },
}