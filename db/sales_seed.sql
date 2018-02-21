CREATE TABLE IF NOT EXISTS Sale (
    id SERIAL PRIMARY KEY,
    sale_user INTEGER REFERENCES Users (id),
    sale_name VARCHAR(100),
    sale_desc VARCHAR(300),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
<<<<<<< HEAD
    sale_date VARCHAR(40) NOT NULL,
    sale_desc VARCHAR(300)
)
=======
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    sale_img VARCHAR(300)
)

insert into sale (sale_user, sale_name, sale_desc, start_time, end_time, start_date, end_date, sale_img)
values (1, 'guns, ammo, and rockets', 'A garage sale with all of the guns and ammo you could need', '10:00:00 AM', '12:00:00 PM', '2018-03-09', '2018-03-10', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Yard_Sale_Northern_CA_2005.JPG/1200px-Yard_Sale_Northern_CA_2005.JPG'),
 (2, 'Danos stuff', 'Danos crap in a garage sale', '10:00:00 AM', '12:00:00 PM', '2018-03-09', '2018-03-10', 'http://www.duncanville.com/wp-content/uploads/2016/04/garage-sale.jpg'),
 (3, 'Bens stuff', 'Bens exteremly expensive funiture for free', '10:00:00 AM', '12:00:00 PM', '2018-03-09', '2018-03-10', 'https://s3.amazonaws.com/product-images.imshopping.com/nimblebuy/lgs-events-clark-county-garage-sale-early-bird-6-3116852-regular.jpg')
>>>>>>> master
