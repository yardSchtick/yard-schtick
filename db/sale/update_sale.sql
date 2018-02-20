UPDATE Sale
SET start_time = $1, end_time = $2, sale_desc = $3
WHERE id = $4;

select * from sale
where id=$4