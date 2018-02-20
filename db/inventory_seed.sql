CREATE TABLE IF NOT EXISTS Inventory (
    id SERIAL PRIMARY KEY,
    inv_name VARCHAR(180),
    inv_picture VARCHAR(300),
    inv_desc VARCHAR(300),
    inv_price Decimal(10,2),
    sale_id INTEGER REFERENCES Sale (id)
)