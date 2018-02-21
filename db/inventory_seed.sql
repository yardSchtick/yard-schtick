CREATE TABLE IF NOT EXISTS Inventory (
    id SERIAL PRIMARY KEY,
    inv_name VARCHAR(180),
    inv_picture VARCHAR(300),
    inv_desc VARCHAR(300),
    inv_price Decimal(10,2),
    sale_id INTEGER REFERENCES Sale (id)
)

INSERT INTO inventory(inv_name, inv_picture, inv_desc, inv_price, sale_id)
values('AK47', 'https://i.ebayimg.com/images/g/yB0AAMXQrhdTV9WO/s-l300.jpg', 'after a lot of use, I need to depart', 10.00, 1),
('Couch', 'http://cozycouchsf.com/wp-content/uploads/2016/03/main-image.jpg', 'Brand new couch, never sat upon', 500.00, 2),
('TV 80" Samsung', 'http://images.samsung.com/is/image/samsung/au-feature-uhd-ku6000-60840211?$Download-Source$', 'Just wanted to give away tv', 00.01, 3)