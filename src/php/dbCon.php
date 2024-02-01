<?php
/** 
  *@author github.com/daser46
*/
$db_host ='localhost';
$user = 'root';
$pasword = '';
$db_name = 'testdatabase';

$db_conn = mysqli_connect($db_host,$user,$pasword,$db_name);

if(!$db_conn){
    die('database connection error');
}
?>