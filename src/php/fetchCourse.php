<?php
/** 
  *@author github.com/daser46
*/
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"));

$username = $data->radioValue;

// database connection file
require_once('dbCon.php');
//select reviews and course
$sql = "SELECT
course.course_Id,
course.coursename,
course.level,
course.duration,
course.course_image_Sm AS image,
AVG(review.value) AS ratings
FROM
course
LEFT JOIN
review ON course.course_Id = review.course_Id
GROUP BY
course.course_Id, course.coursename, course.level, course.duration";

if ($db_conn) {
    $row = mysqli_query($db_conn,$sql);
    $courses = mysqli_fetch_all($row, MYSQLI_ASSOC);//FETCH DATA AS AN ASSOCIATIVE ARRAY
    echo json_encode($courses);
} else {
    echo "Error: " . $sql . "<br>" . $db_conn->error;
}

$db_conn->close();
?>