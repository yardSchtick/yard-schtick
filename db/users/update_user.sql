UPDATE Users
SET address_street = $1, address_city = $2, address_state = $3, address_zip = $4, user_name = $5, user_img = $6, latitude = $8, longitude = $9
WHERE id = $7;

select * from Users
where id = $7