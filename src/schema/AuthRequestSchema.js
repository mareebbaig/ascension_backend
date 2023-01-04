module.exports = function AuthRequestSchema(opts) {
    const { authRequestHandlers, Joi } = opts;

    // const verifyAuthOtvc = () => {
    //     return {
    //         method: 'POST',
    //         schema: {
    //             body: Joi.object().keys({
    //                 otvc: Joi.string().required(),
    //                 phone: Joi.string().required(),
    //             })
    //         },
    //         url: '/verify/auth/otvc',
    //         handler: authRequestHandlers.verifyAuthOtvc,
    //     }
    // }

    const reqtest = () => {
        return {
            method: "POST",
            url: "/initial",
            handler: authRequestHandlers.initial,
        };
    };

    const insertCities = () => {
        return {
            method: "POST",
            url: "/insertCities",
            handler: authRequestHandlers.insertCities,
        };
    };

    const checkUser = () => {
        return {
            method: "POST",
            url: "/userAlreadyExists",
            handler: authRequestHandlers.checkUser,
        };
    };

    const signUp = () => {
        return {
            method: "POST",
            url: "/signup",
            handler: authRequestHandlers.signUp,
        };
    };
    const login = () => {
        return {
            method: "POST",
            url: "/login",
            handler: authRequestHandlers.login,
        };
    };

    return {
        reqtest,
        checkUser,
        signUp,
        login,
        insertCities,
    };
};
