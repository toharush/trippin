SELECT * 
FROM trippin.place 
WHERE "category_id" = (
    SELECT id 
    FROM trippin.category 
    WHERE "client_category" = {{curret_client_category}}
);