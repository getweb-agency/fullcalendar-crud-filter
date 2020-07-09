<?php
try {
 $dbh = new PDO("mysql:host=localhost;dbname=test_calendar_2", 'root', '33klwZ_76');
}
catch(PDOException $e) {
 echo $e->getMessage();
}
$er = 1;
?>