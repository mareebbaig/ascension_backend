module.exports = function AuthRequestHandlers(opts) {
    const { authMediator, guid, bcrypt, logger, config, jwt , _ } = opts;
    const { secret } = config.get("jwt");

    async function initial(request, reply) {
        // const { body, elSession } = request;
        // console.log('initial')
        const sent = await authMediator.initial();
        reply.send(JSON.stringify(sent));
    }
    async function checkUser(request, reply) {
        try {
            const { body } = request;
            const response = await authMediator.checkUser({ ...body });
            if (response.length == 0) {
                reply.send(false);
            } else reply.send(true);
        } catch (error) {
            console.log(error);
            reply.send(error);
        }
    }

    async function signUp(request, reply) {
        try {
            const { body } = request;
            body.user_id = await guid.v1();
            body.password = await bcrypt.hash(body.password, 10);
            const response = await authMediator.signUp({ ...body });
            reply.send(response);
        } catch (error) {
            console.log(error);
            reply.send(error);
        }
    }

    async function login(request, reply) {
        try {
            const { email, password } = request.body;
            const response = await authMediator.checkUser({ email });

            if (response.length == 0) {
                reply.send({ error: "Incorrect email" }).status(401);
            } else {
                if (await bcrypt.compare(password, response[0].password)) {
                    const payLoad = {
                        user_id: response[0].user_id,
                    };

                    const token = await jwt.sign(payLoad, secret);

                    reply.send({ token: token });
                } else {
                    reply.send({ error: "Incorrect password" }).status(401);
                }
            }
        } catch (error) {
            console.log(error);
            reply.send(error);
        }
    }

    return {
        initial,
        checkUser,
        signUp,
        login,
    };
};
