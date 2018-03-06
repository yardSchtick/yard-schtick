UPDATE Sale
SET start_time = $1, end_time = $2, sale_desc = $3, sale_name = $5, start_date = $6, end_date = $7, sale_img = $8
WHERE id = $4;