<?php
try {
 $dbh = new PDO("mysql:host=localhost;dbname=test_calendar_2", 'root', '');
}
catch(PDOException $e) {
 echo $e->getMessage();
}
$er = 1;
?>