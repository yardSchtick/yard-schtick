CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    address_street VARCHAR(180),
    address_city VARCHAR(180),
    address_state VARCHAR(2),
    address_zip VARCHAR(11),
    latitude FLOAT,
    longitude FLOAT,
    user_name VARCHAR(180),
    user_img VARCHAR(300),
    auth_id TEXT,
    user_id INTEGER REFERENCES Users (id)
)

INSERT INTO Users
(id, address_street, address_city, address_state, address_zip, latitude, longitude, user_name, user_img)
VALUES (1, '850 N 1260 E', 'Provo', 'UT', '84604', 40.245048, -111.637274, 'Harrison Ford', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Harrison_Ford_Cannes.jpg/170px-Harrison_Ford_Cannes.jpg'),
(2, '1595 E 400 S', 'Pleasant Grove', 'UT', '84062', 40.359227, -111.704710, 'Daniel Lym', 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAkpAAAAJGFmMTExOTgxLTUxZWYtNDYwYy05ODNjLWNmMDk2YzZmNzgwMw.jpg')
