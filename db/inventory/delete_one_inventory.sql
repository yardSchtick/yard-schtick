DELETE FROM Inventory
WHERE sale_user = $1
AND id = $2;