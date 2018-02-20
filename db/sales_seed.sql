CREATE TABLE IF NOT EXISTS Sale (
    id INT SERIAL PRIMARY KEY,
    user INTEGER REFERENCES User (id),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    sale_desc VARCHAR(300)
)