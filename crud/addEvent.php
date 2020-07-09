<?php
	// Require DB Connection
require_once('connect.php');
    // Add Event
$sth = $dbh->prepare("INSERT INTO events (id_user, title, events.date, description, color) VALUES (?,?,?,?,?)");
$sth->execute(array($_POST['id_user'], $_POST['title'], $_POST['date'], $_POST['description'], $_POST['color']));

