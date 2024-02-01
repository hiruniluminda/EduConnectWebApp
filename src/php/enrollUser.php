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

$courseID = $data->courseID;
$username = $data->userName;

$sql2 = "SELECT username FROM user WHERE email = '$username'";

if ($db_conn) {
    $result = mysqli_query($db_conn, $sql2);
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $user = $row['username'];
        $sql = "INSERT INTO course_enroll VALUES ('$user','$courseID', 'onprogress', 0)";
        mysqli_query($db_conn,$sql);
        echo "user inserted!";
    } else {
        echo "user bypass error!";
    }      
} else {
    echo "Error: " . $sql . "<br>" . $db_conn->error;
}

$db_conn->close();
?>