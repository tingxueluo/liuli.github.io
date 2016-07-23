<?php
  header('Content-Type:application/json');
    $output = [];
//获取客户端传来$id
@$id=$_REQUEST['did'];
if(empty($id)){
    echo '[]';
    return;
}
 $conn = mysqli_connect('127.0.0.1','root','','kaifanla');
 $sql = 'SET NAMES UTF8';
 mysqli_query($conn,  $sql);
 $sql = "SELECT did,name,price,img_lg,material  FROM  kf_dish where did=$id";
 $result = mysqli_query($conn, $sql);
 while(($row=mysqli_fetch_assoc($result))!==null){
     $output[]=$row;
 }
 echo json_encode($output);
 ?>