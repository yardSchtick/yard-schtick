-- $1 = user latitude, $2 = user longitude, $3 = user.id

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
    sale_img
FROM
    users
JOIN 
    sale on users.id = sale.sale_user
where
    (
        6371 *
        acos(
            cos( radians( 40.359227 ) ) *
            cos( radians( latitude ) ) *
            cos(
                radians( longitude ) - radians( -111.70471 )
            ) +
            sin(radians(40.359227)) *
            sin(radians(latitude))
        )
    ) < 25 and not users.id = $3
ORDER BY
    (
        6371 *
        acos(
            cos( radians( 40.359227 ) ) *
            cos( radians( latitude ) ) *
            cos(
                radians( longitude ) - radians( -111.70471 )
            ) +
            sin(radians(40.359227)) *
            sin(radians(latitude))
        )
    )