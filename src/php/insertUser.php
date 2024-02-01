<?php
/** 
  *@author github.com/daser46
*/
// database connection file
require_once('dbCon.php');

// Get data from the request
$data = json_decode(file_get_contents("php://input"));

$username = $data->username;
$email = $data->email;
$dob = $data->dob;
$password = $data->password;

// Insert data into the second database (relational db)
$sql = "INSERT INTO user (username, email, date_Of_Birth, password) VALUES ('$username', '$email', '$dob', '$password')";

if ($db_conn->query($sql) === TRUE) {
    echo "User data inserted successfully";
} else {
    echo "Error: " . $sql . "<br>" . $db_conn->error;
}

$db_conn->close();
?>