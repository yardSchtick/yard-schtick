UPDATE User
SET address_street = $1, address_city = $2, address_state = $3, address_zip = $4, user_name = $5, user_img = $6
WHERE id = $7;