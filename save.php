
<?php
//error_reporting(E_ALL);
//var_dump($_SERVER);
$res = "";
$json = file_get_contents('php://input');
$trimed = substr($json,5);
if (!empty($json)) {
    $filename = 'qual.json';
    $handle = fopen($filename, "w");
    fwrite($handle, $trimed);
    fclose($handle);
    $res = 'data not empty';
    echo $res;
} else {
    $filename = 'qual.json';
    $res = 'data empty';
    $handle = fopen($filename, "w");
    fwrite($handle, $res);
    fclose($handle);
    echo $res;
}
?>