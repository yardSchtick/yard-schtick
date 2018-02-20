CREATE TABLE IF NOT EXISTS Inventory (
    id INT SERIAL PRIMARY KEY,
    inv_name VARCHAR(180),
    inv_picture VARCHAR(300),
    inv_desc VARCHAR(300),
    inv_price VARCHAR(Decimal),
    sale_id INTEGER REFERENCES Sale (id)
)