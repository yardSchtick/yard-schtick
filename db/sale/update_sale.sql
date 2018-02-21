UPDATE Sale
SET sale_name = $1, sale_desc = $2, start_time = $3, end_time = $4, start_date = $5, end_date = $6, sale_img = $7 
WHERE id = $8;

select * from sale
where id=$8