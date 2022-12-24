module.exports = function AuthRequestHandlers(opts) {
    const { authMediator, guid } = opts;

    async function initial(request, reply) {
        // const { body, elSession } = request;
        // console.log('initial')
        const sent = await authMediator.initial();
        reply.send(JSON.stringify(sent));
    }
    async function checkUser(request, reply) {
        const { body } = request;
        const response = await authMediator.checkUser({ ...body });
        if (response.length == 0) {
            reply.send(false);
        } else reply.send(true);
    }

    async function signUp(request, reply) {
        const { body } = request;
        body.user_id = await guid.v1();
        const response = await authMediator.signUp({ ...body });
        reply.send(response);
    }

    async function login(request, reply) {
        const { email, password } = request.body;
        const response = await authMediator.checkUser({ email });
        if (response.length == 0) {
            reply.send(false);
        } else {
            if (password == response[0].password) reply.send(response);
            else {
                reply.send("password did not match");
            }
        }
    }

    return {
        initial,
        checkUser,
        signUp,
        login,
    };
};
