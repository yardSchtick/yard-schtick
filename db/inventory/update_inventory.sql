UPDATE Inventory
SET inv_name = $1, inv_picture = $2, inv_desc = $3, inv_price = $4
WHERE id = $5;


select * from Inventory
where sale_id = $6