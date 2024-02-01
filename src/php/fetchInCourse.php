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



$sql = "SELECT 
course.*,
AVG(review.value) AS avg_review,
COUNT(review.course_Id) AS review_count
FROM 
course
LEFT JOIN 
review ON course.course_id = review.course_id
WHERE 
course.course_id = '$courseID'";

$sql2 = "SELECT COUNT(*) AS quizzesCount
        FROM course_module cm
        JOIN module m ON cm.module_id = m.module_id
        WHERE cm.course_id = '$courseID' AND m.module_Type = 'quiz'";

$sql3 = "SELECT COUNT(course_Id) AS enrollments FROM course_enroll WHERE course_Id = '$courseID'";

if ($db_conn) {
    $row = mysqli_query($db_conn,$sql);
    $inCourse = mysqli_fetch_all($row, MYSQLI_ASSOC);// FETCH DATA AS AN ASSOCIATIVE ARRAY
    $row2 = mysqli_query($db_conn,$sql2);
    $moduleCount = mysqli_fetch_assoc($row2);
    $row3 = mysqli_query($db_conn,$sql3);
    $enrollments = mysqli_fetch_assoc($row3);
    $inCourse[1] = $moduleCount;
    $inCourse[2] = $enrollments;
    echo json_encode($inCourse);
} else {
    echo "Error: " . $sql . "<br>" . $db_conn->error;
}

$db_conn->close();
?>