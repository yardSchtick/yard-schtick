INSERT INTO Sale (sale_user, start_time, end_time, sale_desc, sale_name, start_date, end_date, sale_img)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *;
