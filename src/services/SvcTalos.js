module.exports = function SvcTalos(opts) {
    const { svcCache, queryHandler, mdlTest, db } = opts;
    async function initial() {
        const result = db["primary"].task(async (t) => {
            await t.any(mdlTest.usertable);

            await t.any(mdlTest.sellerTabel);
        });
        const response = result;
        return response;
    }

    async function checkUser({ email }) {
        const result = db["primary"].any(mdlTest.checkUser, { email });
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

    return {
        initial,
        checkUser,
        signUp,
    };
};
