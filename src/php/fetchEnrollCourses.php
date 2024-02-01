<?php
/** 
  *@author github.com/daser46
*/
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"));

$username = $data->userData;
//$username = 'daser';

// database connection file
require_once('dbCon.php');
//select reviews and course
$sql = "SELECT
course.course_Id,
course.coursename,
course.level,
course.duration,
course.course_image_Sm AS image,
course_enroll.progress AS curr_progress
FROM
course
JOIN
course_enroll ON course.course_Id = course_enroll.course_Id
WHERE
course_enroll.username = '$username'";

if ($db_conn) {
    $row = mysqli_query($db_conn,$sql);
    $enroll_courses = mysqli_fetch_all($row, MYSQLI_ASSOC);// FETCH DATA AS AN ASSOCIATIVE ARRAY
    echo json_encode($enroll_courses);
} else {
    echo "Error: " . $sql . "<br>" . $db_conn->error;
}

$db_conn->close();
?>