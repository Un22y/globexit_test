USE testdb;
WITH Subordinates AS (
    SELECT s.id AS sub_id, s.name AS sub_name, s.parent_id, 0 AS sub_level
    FROM subdivisions s
    WHERE s.id = (SELECT subdivision_id FROM collaborators WHERE name = 'Сотрудник 1' AND id = 710253)
    
    UNION ALL
    
    SELECT s.id, s.name, s.parent_id, sub_level + 1
    FROM subdivisions s
    JOIN Subordinates sub ON s.parent_id = sub.sub_id
)

SELECT c.id, c.name, Subordinates.sub_name, Subordinates.sub_id, Subordinates.sub_level,
       (SELECT COUNT(*) FROM collaborators WHERE subdivision_id = Subordinates.sub_id) AS colls_count
FROM collaborators c
JOIN Subordinates ON c.subdivision_id = Subordinates.sub_id
WHERE c.age < 40 AND c.subdivision_id NOT IN (100055, 100059)
ORDER BY Subordinates.sub_level;