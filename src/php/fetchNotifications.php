<?php
/** 
  *@author github.com/daser46
*/
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// database connection file
require_once('dbCon.php');

// Get data from the request
$data = json_decode(file_get_contents("php://input"));

$username = $data->username;


$sql = "SELECT * FROM `notification` 
JOIN 
user_notification
ON
notification.notification_id = user_notification.notification_id
where user_notification.username = '$username'";

if ($db_conn) {
    $row = mysqli_query($db_conn,$sql);
    $notificationdata = mysqli_fetch_all($row, MYSQLI_ASSOC);// FETCH DATA AS AN ASSOCIATIVE ARRAY
    echo json_encode($notificationdata);
} else {
    echo "Error: " . $sql . "<br>" . $db_conn->error;
}

$db_conn->close();
?>