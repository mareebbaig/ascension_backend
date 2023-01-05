module.exports = function AuthRequestHandlers(opts) {
    const { authMediator, guid, cache, bcrypt, logger, config, jwt, _ } = opts;
    const { secret } = config.get("jwt");
    webSockets = {};

    async function initial(request, reply) {
        // const { body, elSession } = request;
        const sent = await authMediator.initial();
        reply.send(JSON.stringify(sent));
    }

    async function websocketHandler(connection, request) {
        const sender_id = request.query.sender_id;
        const receiver_id = request.query.receiver_id;

        result = await getMessages(sender_id, receiver_id);

        //sending data to the connected client
        connection.socket.send(JSON.stringify(result));

        // storing connected connection to the local storage --> todo:  redis mai save krna hai bad mai (stateless)
        webSockets[sender_id] = connection;
        console.log("connected: " + sender_id);

        // event for message
        connection.socket.on("message", async (message) => {
            console.log("received from " + sender_id + ": " + message);
            const messageObject = JSON.parse(message);
            const toUserWebSocket = webSockets[receiver_id];

            if (toUserWebSocket) {
                console.log(
                    "sent to " +
                        receiver_id +
                        ": " +
                        JSON.stringify(messageObject.message)
                );
                toUserWebSocket.socket.send(JSON.stringify(messageObject));
            }
            await cache["primary"].set(
                sender_id + receiver_id,
                messageObject.message
            );
            await writeMsgInDB(messageObject, sender_id, receiver_id);
        });

        connection.socket.on("close", async function () {
            delete webSockets[sender_id];
            const last_message = await cache["primary"].get(
                sender_id + receiver_id
            );
            if (last_message) {
                await updateInbox(sender_id, receiver_id, last_message);
                console.log("last message updated : ", last_message);
            }
            console.log("deleted: " + sender_id);
        });
    }

    async function getMessages(sender_id, received_id) {
        const result = await authMediator.getMessages(sender_id, received_id);
        return result;
    }

    async function updateInbox(sender_id, received_id, last_message) {
        const created_at = new Date();
        const result = await authMediator.updateInbox(
            sender_id,
            received_id,
            last_message,
            created_at
        );
        return result;
    }

    async function writeMsgInDB(messageObject, sender_id, receiver_id) {
        messageObject.chat_id = await guid.v1();
        messageObject.created_at = new Date();
        const response = await authMediator.writeMsgInDB(
            { ...messageObject },
            sender_id,
            receiver_id
        );
    }

    async function getInbox(request, reply) {
        const { body } = request;
        const result = await authMediator.getInbox({ ...body });
        reply.send(result);
    }

    async function handler(request, reply) {
        reply.send("hello");
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

    async function CreateInbox(request, reply) {
        const { body } = request;
        body.inbox_id = await guid.v1();
        body.hash = body.sender_id + body.receiver_id;
        body.created_at = new Date();
        const response = await authMediator.CreateInbox({ ...body });
        reply.send(response);
    }

    return {
        initial,
        insertCities,
        checkUser,
        signUp,
        login,
        CreateInbox,
        websocketHandler,
        handler,
        getInbox,
    };
};
