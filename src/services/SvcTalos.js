module.exports = function SvcTalos(opts) {
    const { svcCache, queryHandler, mdlTest, db } = opts;
    async function initial() {
        const result = db["primary"].task(async (t) => {
            await t.any(mdlTest.usertable);
            await t.any(mdlTest.sellerTabel);
            await t.any(mdlTest.chat);
            await t.any(mdlTest.inbox);
        });
        const response = result;
        return response;
    }

    async function writeMsgInDB({
        chat_id,
        sender_id,
        hash,
        message,
        created_at,
    }) {
        const result = await db["primary"].query(mdlTest.insertIntoChat, {
            chat_id,
            user_id: sender_id,
            hash,
            message,
            created_at,
        });
    }
    async function getMessages(sender_id, received_id) {
        const result = await db["primary"].query(mdlTest.getMessages, {
            hash1: sender_id + received_id,
            hash2: received_id + sender_id,
        });
        return result;
    }

    async function updateInbox(
        sender_id,
        received_id,
        last_message,
        created_at
    ) {
        await db["primary"].any(mdlTest.updateLastMsg, {
            hash1: sender_id + received_id,
            hash2: received_id + sender_id,
            last_message,
            created_at,
        });
    }

    async function getInbox(user_id) {
        const result = await db["primary"].any(mdlTest.getInbox, {
            user_id,
        });
        var allUsers = [];
        for (i = 0; i < result.length; i++) {
            if (result[i].receiver_id == user_id) {
                temp = await db["primary"].query(mdlTest.getUser, {
                    user_id: result[i].sender_id,
                });
                temp[0].inbox = result[i];
                allUsers.push(temp[0]);
            } else {
                temp = await db["primary"].query(mdlTest.getUser, {
                    user_id: result[i].receiver_id,
                });
                temp[0].inbox = result[i];
                allUsers.push(temp[0]);
            }
        }
        return allUsers;
    }

    async function checkUser({ email }) {
        const result = await db["primary"].any(mdlTest.checkUser, { email });
        return result;
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
        const result = db["primary"].task(async (t) => {
            await t.none(mdlTest.signup, {
                user_id,
                first_name,
                last_name,
                email,
                password,
                user_type,
            });
            if (user_type == 1) {
                // seller type = 1
                await t.any(mdlTest.insertSeller, {
                    user_id,
                    title,
                });
            }
        });
        const response = result;
        return response;
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
        await db["primary"].any(mdlTest.insertIntoInbox, {
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
