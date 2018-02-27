DELETE FROM Sale
WHERE id = $1;

select * from Sale
where sale_user = $2