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
// $courseID = "c0001";
// $username = 'daser@gmail.com';

$sql = "UPDATE course_enroll
SET progress = (
    SELECT SUM(user_module.marks) FROM user_module JOIN module ON module.module_Id = user_module.module_Id JOIN course_module ON course_module.module_Id = user_module.module_Id JOIN user ON user.username = user_module.username WHERE user.username = (SELECT username FROM user where email = '$username') AND course_module.course_Id = '$courseID'
)
WHERE course_enroll.username = (SELECT username FROM user where email = '$username') 
AND course_enroll.course_Id = '$courseID'";

$sql2 = "SELECT progress FROM course_enroll WHERE course_Id = '$courseID' 
AND username = (SELECT username FROM user WHERE email = '$username')";

if ($db_conn) {
    mysqli_query($db_conn, $sql);
    $result = mysqli_query($db_conn, $sql2);
    $progress = mysqli_fetch_all($result, MYSQLI_ASSOC);// FETCH DATA AS AN ASSOCIATIVE ARRAY
    echo json_encode($progress);   
} else {
    echo "Error: " . $sql . "<br>" . $db_conn->error;
}

$db_conn->close();
?>