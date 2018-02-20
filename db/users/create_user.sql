INSERT INTO Users (address_street, address_city, address_state, address_zip, user_name, user_img)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;