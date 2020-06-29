<?php

class TreeRepository {

    /**
     * @var \PDO
     */
    private $db;

    /**
     * @param \PDO $db
     */
    public function __construct(\PDO $db)
    {
        $this->db = $db;
    }

    /**
     * @param string|null $name
     * @param int|null $parentId
     * @return void
     */
    public function addNode($name = null, $parentId = null): void
    {
        $query = $this->db->prepare("INSERT INTO `tree` SET `name` = :name, `parent_id` = :parent_id");
        $query->execute(['name' => $name, 'parent_id' => $parentId]);
    }

    /**
     * @param int $id
     * @param string $newName
     * @return void
     */
    public function renameNode($id, $newName): void
    {
        $query = $this->db->prepare("UPDATE `tree` SET `name` = :name WHERE `id` = :id");
        $query->execute(['name' => $newName, 'id' => $id]);
    }

    /**
     * @param int $id
     * @return void
     */
    public function removeNode($id): void
    {
        $queryDelete = $this->db->prepare("DELETE FROM `tree` WHERE `id` = :id");
        $queryDelete->execute(['id' => $id]);

        $querySelect = $this->db->prepare("SELECT `id` FROM `tree` WHERE `parent_id` = :parent_id");
        $querySelect->execute(['parent_id' => $id]);

        $ids = $querySelect->fetchAll(PDO::FETCH_ASSOC);

        if (count($ids) > 0) {
            foreach ($ids as $id => $idToRemove) {
                $this->removeNode((int)$idToRemove['id']);
            }
        }
    }

    /**
     * @return array
     */
    public function getTreeData()
    {
        $query = $this->db->prepare("SELECT * FROM `tree` ORDER BY `id`");
        $query->execute();

        return $query->fetchAll(PDO::FETCH_ASSOC);
    }
}