module.exports = function AuthMediator(opts) {
    const { svcTalos } = opts;

    async function initial() {
        account = await svcTalos.initial();
        return account;
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
    return {
        initial,
        checkUser,
        signUp,
    };
};
