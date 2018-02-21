INSERT INTO Inventory (inv_name, inv_picture, inv_desc, inv_price, sale_id)
VALUES ($1, $2, $3, $4, $5);

select * from Inventory
where sale_id = $5