INSERT INTO Users (display_name, user_img)
VALUES ($1, $2)
RETURNING *;