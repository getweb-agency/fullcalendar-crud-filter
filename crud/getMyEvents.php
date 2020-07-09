<?php
require_once('connect.php');
// Get ALl Event
$calendarUserData = $dbh->query("SELECT * FROM events WHERE id_user = 1 ORDER BY events.date ASC");
$calendarUserData->execute();
$users = $calendarUserData->fetchAll();
foreach ($users as $row) {
  $data[] = array(
    'title' => $row['title'], 
    'start' => $row['date'], 
    'end' => $row['date']
  );
}
echo $jData = json_encode($data);
?>