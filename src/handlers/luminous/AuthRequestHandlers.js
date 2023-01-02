module.exports = function AuthRequestHandlers(opts) {
    const { authMediator, guid, cache } = opts;
    webSockets = {};
    async function initial(request, reply) {
        // const { body, elSession } = request;
        // console.log('initial')
        const sent = await authMediator.initial();
        reply.send(JSON.stringify(sent));
    }

    async function websocketHandler(connection, request) {
        const sender_id = request.query.sender_id;
        const receiver_id = request.query.receiver_id;
        result = await getMessages(sender_id, receiver_id);
        console.log(result);
        if (result[0]) {
            connection.socket.send(JSON.stringify(result));
        }
        webSockets[sender_id] = connection;
        console.log("connected: " + sender_id);
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
            await cache["primary"].set(sender_id, messageObject.message);
            await writeMsgInDB(messageObject, sender_id, receiver_id);
        });

        connection.socket.on("close", async function () {
            delete webSockets[sender_id];
            const last_message = await cache["primary"].get(sender_id);
            if (last_message) {
                await updateInbox(sender_id, received_id, last_message);
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

    async function writeMsgInDB(messageObject, userID, received_id) {
        messageObject.chat_id = await guid.v1();
        messageObject.created_at = new Date();
        const response = await authMediator.writeMsgInDB(
            { ...messageObject },
            userID,
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
        checkUser,
        signUp,
        login,
        CreateInbox,
        websocketHandler,
        handler,
        getInbox,
    };
};
