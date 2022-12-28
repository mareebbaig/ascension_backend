module.exports = function MdlTest() {
    return {
        usertable:
            "CREATE TABLE users(user_id VARCHAR PRIMARY KEY,first_name VARCHAR ( 50 )  NOT NULL,last_name VARCHAR (50) NOT NULL,email VARCHAR ( 255 ) UNIQUE NOT NULL,password VARCHAR ( 50 ) NOT NULL ,user_type int);",
        sellerTabel:
            "CREATE TABLE business_sellers (user_id VARCHAR PRIMARY KEY , title VARCHAR ( 50 )  NOT NULL , FOREIGN KEY (user_id) REFERENCES users (user_id))",

        industiesTable:
            "CREATE TABLE industries (id int PRIMARY KEY , label varchar)",

        location:
            "CREATE TABLE cities (id int PRIMARY KEY , label varchar); CREATE TABLE countries (id int PRIMARY KEY , label varchar); CREATE TABLE locations (id int primary key, city int references cities(id) , country int references countries(id)) ",

        insertSeller:
            "insert into business_sellers(user_id , title) VALUES (${user_id},${title})",
    };
};
