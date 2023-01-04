module.exports = function AuthMediator(opts) {
    const { authService } = opts;

    async function initial() {
        account = await authService.initial();
        return account;
    }
    async function insertCities(value) {
        result = await authService.insertCities(value);
        return result;
    }

    async function checkUser({ email }) {
        return await authService.checkUser({ email });
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
        return await authService.signUp({
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
        insertCities,
    };
};
