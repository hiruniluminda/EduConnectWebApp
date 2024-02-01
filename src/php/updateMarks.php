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
$module_Id = $data->id;
$marks = $data->marks;

$sql = "INSERT INTO user_module (username, module_Id, marks) VALUES ('$username', '$module_Id', '$marks')";

if ($db_conn->query($sql) === TRUE) {
    echo "marks inserted successfully";
} else {
    echo "Error: " . $sql . "<br>" . $db_conn->error;
}

$db_conn->close();
?>