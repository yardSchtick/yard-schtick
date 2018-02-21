CREATE TABLE IF NOT EXISTS Sale (
    id SERIAL PRIMARY KEY,
    sale_user INTEGER REFERENCES Users (id),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    sale_date VARCHAR(40) NOT NULL,
    sale_desc VARCHAR(300)
)