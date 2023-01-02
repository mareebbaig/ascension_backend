module.exports = function MdlTest() {
    return {
        usertable:
            "CREATE TABLE IF NOT EXISTS users(user_id VARCHAR PRIMARY KEY,first_name VARCHAR ( 50 )  NOT NULL,last_name VARCHAR (50) NOT NULL,email VARCHAR ( 255 ) UNIQUE NOT NULL,password VARCHAR ( 50 ) NOT NULL ,user_type int);",
        sellerTabel:
            "CREATE TABLE IF NOT EXISTS business_sellers (user_id VARCHAR PRIMARY KEY , title VARCHAR ( 50 )  NOT NULL , FOREIGN KEY (user_id) REFERENCES users (user_id))",

        chat: "CREATE TABLE IF NOT EXISTS chat ( chat_id VARCHAR PRIMARY KEY, user_id VARCHAR, hash VARCHAR , message TEXT, created_at timestamp, FOREIGN KEY (user_id) REFERENCES users (user_id))",

        inbox: "CREATE TABLE IF NOT EXISTS inbox( inbox_id VARCHAR PRIMARY KEY, sender_id VARCHAR ,receiver_id VARCHAR, hash VARCHAR , last_message TEXT, created_at timestamp, title VARCHAR , FOREIGN KEY (sender_id) REFERENCES users (user_id) ,FOREIGN KEY (receiver_id) REFERENCES users (user_id))",

        checkUser: "SELECT * from users where email = ${email}",

        signup: "insert into users(user_id , first_name , last_name , email , password , user_type) VALUES(${user_id}, ${first_name} , ${last_name} , ${email} , ${password} , ${user_type})",
        insertSeller:
            "insert into business_sellers(user_id , title) VALUES (${user_id},${title})",
        insertIntoChat:
            "insert into chat(chat_id,user_id,hash,message,created_at)VALUES(${chat_id},${user_id},${hash},${message},${created_at})",
        getMessages:
            "select * from chat where hash = ${hash1} OR hash = ${hash2}",
        // getInbox:
        //     "select * from inbox INNER JOIN users u ON inbox.receiver_id = u.user_id INNER JOIN users u2 ON inbox.sender_id=u2.user_id",
        getInbox:
            "select * from inbox where sender_id = ${user_id} OR receiver_id = ${user_id}",
        getUser: "select * from users where user_id = ${user_id}",
        insertIntoInbox:
            "insert into inbox (inbox_id,sender_id,receiver_id,hash,last_message,created_at,title) VALUES(${inbox_id},${sender_id},${receiver_id},${hash},${last_message},${created_at},${title})",
        updateLastMsg:
            "UPDATE inbox SET last_message = ${last_message} , created_at = ${created_at} WHERE hash = ${hash1} OR hash = ${hash2}",
    };
};
