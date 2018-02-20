CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    address_street VARCHAR(180) NOT NULL,
    address_city VARCHAR(180) NOT NULL,
    address_state VARCHAR(2) NOT NULL,
    address_zip VARCHAR(11) NOT NULL,
    user_name VARCHAR(180),
    user_img VARCHAR(300)
)