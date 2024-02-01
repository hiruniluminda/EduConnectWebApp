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

$sql = "SELECT SUM(user_module.marks) AS module_marks,module.module_Type,SUM(module.weighted) AS module_weighted
FROM user_module
JOIN module ON module.module_Id = user_module.module_Id
JOIN course_module ON course_module.module_Id = user_module.module_Id
JOIN user ON user.username = user_module.username
WHERE user.email = '$username' AND course_module.course_Id = '$courseID'
GROUP BY module.module_Type";

if ($db_conn) {
    $result = mysqli_query($db_conn, $sql);
    $progressData = mysqli_fetch_all($result, MYSQLI_ASSOC);// FETCH DATA AS AN ASSOCIATIVE ARRAY
    echo json_encode($progressData);   
} else {
    echo "Error: " . $sql . "<br>" . $db_conn->error;
}

$db_conn->close();
?>