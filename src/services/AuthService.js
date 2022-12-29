module.exports = function AuthService(opts) {
    const { mdlTest, auth, db } = opts;
    async function initial() {
        // const result = db["primary"].task(async (t) => {
        //      await t.any(mdlTest.industriesTable);

        //     // await t.any(mdlTest.location);
        // });
        //const result = db["primary"].any(mdlTest.location);

        const result = db["primary"].any(mdlTest.listingTable);
        console.log(result);
        const response = result;
        return response;
    }

    async function checkUser({ email }) {
        const result = db["primary"].any(auth.checkUser, { email });
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
            await t.none(auth.signup, {
                user_id,
                first_name,
                last_name,
                email,
                password,
                user_type,
            });
            if (user_type == 1) {
                // seller type = 1
                await t.any(auth.insertSeller, {
                    user_id,
                    title,
                });
            }
        });
        const response = result;
        return response;
    }

    return {
        initial,
        checkUser,
        signUp,
    };
};
