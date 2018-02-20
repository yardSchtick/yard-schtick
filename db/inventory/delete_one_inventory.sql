DELETE FROM Inventory
WHERE user = $1
AND id = $2;