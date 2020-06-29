<?php

require_once 'App/Component/Db/TreeRepository.php';
require_once 'Config/settings.php';

$db = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
$repo = new TreeRepository($db);

if (!empty($_POST['parentId']) || !empty($_POST['nodeName'])) {
    $repo->addNode($_POST['nodeName'] ?? null, $_POST['parentId'] ?? null);
} elseif (!empty($_POST['newName']) && !empty($_POST['nodeId'])) {
    $repo->renameNode($_POST['nodeId'], $_POST['newName']);
} elseif (!empty($_POST['nodeId'])) {
    $repo->removeNode($_POST['nodeId']);
}

$treeData = $repo->getTreeData();
print_r(json_encode($treeData));
