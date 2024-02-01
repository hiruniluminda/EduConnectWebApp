<?php
/** 
  *@author github.com/daser46
*/
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"));

// $email = $data->userData;
$course_Id = $data->courseID;
$module_Id = $data->id;
$email = $data->userName;
// $course_Id = 'c0001';
// $module_Id = 'm001';
// $email = 'daser@gmail.com';
 

// database connection file
require_once('dbCon.php');
$sql = "SELECT module.*,course.coursename,user.username FROM module,course,user WHERE course.course_Id = '$course_Id' AND module.module_Id= '$module_Id' AND user.email = '$email'";

if ($db_conn) {
    $row = mysqli_query($db_conn,$sql);
    $courses = mysqli_fetch_all($row, MYSQLI_ASSOC);// FETCH DATA AS AN ASSOCIATIVE ARRAY
    echo json_encode($courses);
} else {
    echo "Error: " . $sql . "<br>" . $db_conn->error;
}

$db_conn->close();
?>