DELETE FROM Sale
WHERE user = $1
AND id = $2;