module.exports = function AuthRequestHandlers(opts) {
    const { authMediator, guid, bcrypt, logger, config, jwt, _ } = opts;
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
            if (_.isEmpty(response)) {
                reply.send(false);
            } else reply.send(true);
        } catch (error) {
            console.log(error);
            reply.send(error);
        }
    }
    async function insertCities(request, reply) {
        const { body } = request;
        for (i = 0; i < body.cities.length; i++) {
            await authMediator.insertCities(body.cities[i]);
        }
        reply.send("ok");
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
            console.log("User:", response);
            if (_.isEmpty(response)) {
                reply
                    .send({ message: "Incorrect email or password" })
                    .status(401);
            } else {
                if (await bcrypt.compare(password, response[0].password)) {
                    const payLoad = {
                        user_id: response[0].user_id,
                        first_name: response[0].first_name,
                        last_name: response[0].last_name,
                        email: response[0].email,
                        user_type: response[0].user_type,
                    };

                    const token = await jwt.sign(payLoad, secret);

                    reply.send({ token: token });
                } else {
                    reply
                        .send({ message: "Incorrect email or password" })
                        .status(401);
                }
            }
        } catch (error) {
            console.log(error);
            reply.send(error);
        }
    }

    return {
        initial,
        insertCities,
        checkUser,
        signUp,
        login,
    };
};
