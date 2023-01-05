module.exports = function MdlTest() {
    return {
        usertable:
            "CREATE TABLE IF NOT EXISTS users(user_id VARCHAR PRIMARY KEY,first_name VARCHAR ( 50 )  NOT NULL,last_name VARCHAR (50) NOT NULL,email VARCHAR ( 255 ) UNIQUE NOT NULL,password VARCHAR ( 50 ) NOT NULL ,user_type int);",
        sellerTabel:
            "CREATE TABLE IF NOT EXISTS business_sellers (user_id VARCHAR PRIMARY KEY , title VARCHAR ( 50 )  NOT NULL , FOREIGN KEY (user_id) REFERENCES users (user_id))",

        chat: "CREATE TABLE IF NOT EXISTS chat ( chat_id VARCHAR PRIMARY KEY, user_id VARCHAR, hash VARCHAR , message TEXT, created_at timestamp, FOREIGN KEY (user_id) REFERENCES users (user_id))",

        inbox: "CREATE TABLE IF NOT EXISTS inbox( inbox_id VARCHAR PRIMARY KEY, sender_id VARCHAR ,receiver_id VARCHAR, hash VARCHAR , last_message TEXT, created_at timestamp, title VARCHAR , FOREIGN KEY (sender_id) REFERENCES users (user_id) ,FOREIGN KEY (receiver_id) REFERENCES users (user_id))",

        industiesTable:
            "CREATE TABLE industries (id int  GENERATED ALWAYS AS IDENTITY PRIMARY KEY , label varchar)",

        location:
            "CREATE TABLE cities (id int  GENERATED ALWAYS AS IDENTITY PRIMARY KEY , label varchar); CREATE TABLE countries (id int  GENERATED ALWAYS AS IDENTITY PRIMARY KEY , label varchar); CREATE TABLE locations (id int  GENERATED ALWAYS AS IDENTITY primary key, city int references cities(id) , country int references countries(id)) ",

        insertSeller:
            "insert into business_sellers(user_id , title) VALUES (${user_id},${title})",

        imagesTable:
            "create table images(id int generated always as identity primary key,listing_id int references listing(id) , image_url varchar)",

        priceTable:
            "create table prices (id int GENERATED ALWAYS AS IDENTITY primary key,asking_price double precision not null,cash_flow double precision not null,gross_revenue double precision not null,inventory_price double precision, net_income double precision not null, ebitda double precision)",

        insertCities: "insert into cities (label) VALUES (${label})",
        listingTable:
            "create table listing(id int  GENERATED ALWAYS AS IDENTITY primary key, title varchar not null, headline varchar not null, description varchar not null,reason_for_selling varchar not null,industry int references industries(id), location int references locations(id) , is_auctioned bool not null,is_established bool not null, price int references prices(id) unique, seller varchar references users(user_id))",

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
