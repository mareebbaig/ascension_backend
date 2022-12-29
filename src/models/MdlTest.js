module.exports = function MdlTest() {
    return {
        usertable:
            "CREATE TABLE users(user_id VARCHAR PRIMARY KEY,first_name VARCHAR ( 50 )  NOT NULL,last_name VARCHAR (50) NOT NULL,email VARCHAR ( 255 ) UNIQUE NOT NULL,password VARCHAR ( 50 ) NOT NULL ,user_type int);",
        sellerTabel:
            "CREATE TABLE business_sellers (user_id VARCHAR PRIMARY KEY , title VARCHAR ( 50 )  NOT NULL , FOREIGN KEY (user_id) REFERENCES users (user_id))",

        industiesTable:
            "CREATE TABLE industries (id int  GENERATED ALWAYS AS IDENTITY PRIMARY KEY , label varchar)",

        location:
            "CREATE TABLE cities (id int  GENERATED ALWAYS AS IDENTITY PRIMARY KEY , label varchar); CREATE TABLE countries (id int  GENERATED ALWAYS AS IDENTITY PRIMARY KEY , label varchar); CREATE TABLE locations (id int  GENERATED ALWAYS AS IDENTITY primary key, city int references cities(id) , country int references countries(id)) ",

        insertSeller:
            "insert into business_sellers(user_id , title) VALUES (${user_id},${title})",

        priceTable : 'create table prices (id int GENERATED ALWAYS AS IDENTITY primary key,asking_price double precision not null,cash_flow double precision not null,gross_revenue double precision not null,inventory_price double precision, net_income double precision not null, ebitda double precision)',

        listingTable : "create table listing(id int  GENERATED ALWAYS AS IDENTITY primary key, title varchar not null, headline varchar not null, description varchar not null,reason_for_selling varchar not null,industry int references industries(id), location int references locations(id) , is_auctioned bool not null,is_established bool not null, price int references prices(id) unique, seller varchar references users(user_id))"
    };
};
