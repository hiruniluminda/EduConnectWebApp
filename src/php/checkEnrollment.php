<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

/** 
  *@author github.com/daser46
*/

// database connection file
require_once('dbCon.php');


// Get data from the request
$data = json_decode(file_get_contents("php://input"));

$courseID = $data->courseID;
$username = $data->userName;//userName is actually the email

$sql = "SELECT ce.*
FROM course_enroll ce
JOIN user u ON ce.username = u.username
WHERE ce.course_Id = '$courseID' AND u.email = '$username';";

if ($db_conn) {
    $result = mysqli_query($db_conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        echo "true";
    } else {
        echo "false";
    }
        
} else {
    echo "Error: " . $sql . "<br>" . $db_conn->error;
}

$db_conn->close();
?>