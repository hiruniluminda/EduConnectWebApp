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
$course_Id = $data->course_Id;
//$course_Id = 'c0001';
 

// database connection file
require_once('dbCon.php');
$sql = "SELECT module.module_Id, module.module_Type,course_module.week,course_module.day FROM module 
JOIN course_module ON module.module_Id = course_module.module_Id 
WHERE course_module.course_Id = '$course_Id' 
GROUP BY course_module.week, course_module.day";

if ($db_conn) {
    $row = mysqli_query($db_conn,$sql);
    $courses = mysqli_fetch_all($row, MYSQLI_ASSOC);// FETCH DATA AS AN ASSOCIATIVE ARRAY
    echo json_encode($courses);
} else {
    echo "Error: " . $sql . "<br>" . $db_conn->error;
}

$db_conn->close();
?>