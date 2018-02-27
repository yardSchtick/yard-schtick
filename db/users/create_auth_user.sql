INSERT INTO Users (displayName, user_id, picture)
VALUES ($1, $2, $3)
RETURNING *;