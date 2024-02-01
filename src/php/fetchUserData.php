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

$username = $data->userData;

$sql = "SELECT username,email,date_Of_Birth,avatar FROM `user` WHERE email = '$username'";// THIS WILL IMPORT USER data

if ($db_conn) {
    $row = mysqli_query($db_conn,$sql);
    $userdata = mysqli_fetch_all($row, MYSQLI_ASSOC);// FETCH DATA AS AN ASSOCIATIVE ARRAY
    echo json_encode($userdata);
} else {
    echo "Error: " . $sql . "<br>" . $db_conn->error;
}

$db_conn->close();
?>