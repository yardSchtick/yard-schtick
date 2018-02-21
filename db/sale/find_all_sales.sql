SELECT * FROM Sale
INNER JOIN users ON sale.sale_user = users.id;