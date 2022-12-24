module.exports = function MdlTest() {
    return {
        usertable:
            "CREATE TABLE users(user_id VARCHAR PRIMARY KEY,first_name VARCHAR ( 50 )  NOT NULL,last_name VARCHAR (50) NOT NULL,email VARCHAR ( 255 ) UNIQUE NOT NULL,password VARCHAR ( 50 ) NOT NULL ,user_type int);",
        sellerTabel:
            "CREATE TABLE business_sellers (user_id VARCHAR PRIMARY KEY , title VARCHAR ( 50 )  NOT NULL , FOREIGN KEY (user_id) REFERENCES users (user_id))",

        checkUser: "SELECT * from users where email = ${email}",

        signup: "insert into users(user_id , first_name , last_name , email , password , user_type) VALUES(${user_id}, ${first_name} , ${last_name} , ${email} , ${password} , ${user_type})",
        insertSeller:
            "insert into business_sellers(user_id , title) VALUES (${user_id},${title})",
    };
};
