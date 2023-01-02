module.exports = function AuthMediator(opts) {
    const { svcTalos } = opts;

    async function initial() {
        account = await svcTalos.initial();
        return account;
    }
    async function writeMsgInDB(
        { chat_id, message, created_at },
        sender_id,
        receiver_id
    ) {
        const hash = sender_id + receiver_id; // sender + recieverid
        return await svcTalos.writeMsgInDB({
            chat_id,
            sender_id,
            hash,
            message,
            created_at,
        });
    }

    async function getMessages(sender_id, received_id) {
        return await svcTalos.getMessages(sender_id, received_id);
    }
    async function updateInbox(
        sender_id,
        received_id,
        last_message,
        created_at
    ) {
        return await svcTalos.updateInbox(
            sender_id,
            received_id,
            last_message,
            created_at
        );
    }

    async function getInbox({ user_id }) {
        return await svcTalos.getInbox(user_id);
    }

    async function checkUser({ email }) {
        return await svcTalos.checkUser({ email });
    }

    async function signUp({
        user_id,
        first_name,
        last_name,
        email,
        password,
        user_type,
        title,
    }) {
        return await svcTalos.signUp({
            user_id,
            first_name,
            last_name,
            email,
            password,
            user_type,
            title,
        });
    }

    async function CreateInbox({
        inbox_id,
        sender_id,
        receiver_id,
        hash,
        last_message,
        created_at,
        title,
    }) {
        return await svcTalos.CreateInbox({
            inbox_id,
            sender_id,
            receiver_id,
            hash,
            last_message,
            created_at,
            title,
        });
    }

    return {
        initial,
        checkUser,
        signUp,
        CreateInbox,
        writeMsgInDB,
        getMessages,
        getInbox,
        updateInbox,
    };
};
