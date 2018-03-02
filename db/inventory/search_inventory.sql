-- $1 user latitude, $2 user longitude, $3 distance in miles, $4 user id, $5 search

SELECT
    sale.id,
    (
        6371 *
        acos(
            cos( radians( $1 ) ) *
            cos( radians( latitude ) ) *
            cos(
                radians( longitude ) - radians( $2 )
            ) +
            sin(radians($1)) *
            sin(radians(latitude))
        )
    ) as distance,
    sale_name,
    sale_desc,
    start_time,
    end_time,
    start_date,
    end_date,
    sale_img,
    address_street,
    address_city
FROM
    users
JOIN 
    sale on users.id = sale.sale_user
JOIN
    inventory on inventory.sale_id = sale.id
where
    (
        6371 *
        acos(
            cos( radians( $1 ) ) *
            cos( radians( latitude ) ) *
            cos(
                radians( longitude ) - radians( $2 )
            ) +
            sin(radians($1)) *
            sin(radians(latitude))
        )
    ) < 25
    and
    sale.sale_user != $4
    and
    (UPPER(inv_name) like $5
        or
    UPPER(inv_desc) like $5)

ORDER BY
    distance