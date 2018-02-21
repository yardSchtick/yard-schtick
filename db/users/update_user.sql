UPDATE Users
SET address_street = $1, address_city = $2, address_state = $3, address_zip = $4,latitude = $5, longitude = $6 user_name = $7, user_img = $8
WHERE id = $9;

select * from Users
where id = $9