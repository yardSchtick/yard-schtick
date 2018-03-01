-- $1 = user latitude, $2 = user longitude, $3 distance in miles

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
    ) < $3
    and
    sale.sale_user != $4
ORDER BY
    distance