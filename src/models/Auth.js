module.exports = function Auth() {
    return {
        checkUser: "SELECT * from users where email = ${email}",

        signup: "insert into users(user_id , first_name , last_name , email , password , user_type) VALUES(${user_id}, ${first_name} , ${last_name} , ${email} , ${password} , ${user_type})",
    };
};
