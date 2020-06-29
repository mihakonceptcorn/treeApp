#treeApp

<h4>Example</h4>
http://tree.polushop.com.ua/

<h4>About:</h4>
The application creates a tree structure.
You can add, delete, rename nodes.

<h4>Database:</h4>
CREATE TABLE `tree` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `name` char(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Unnamed'
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;