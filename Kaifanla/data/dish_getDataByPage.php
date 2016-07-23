<?php
 /**分页查询数据，由main.html调用**/
header('Content-Type:application/json');
$output=[];
$count=5;//一次5条
@$start = $_REQUEST['start'];//@符号可以压制当前行产生的错误提示
if(empty($start)){$start=0;};
$conn=mysqli_connect('127.0.0.1','root','','kaifanla');
mysqli_query($conn,"SET NAMES UTF8");
$sql="SELECT did,name,price,img_sm,material FROM kf_dish LIMIT $start,$count";
$result=mysqli_query($conn,$sql);
while(($row=mysqli_fetch_assoc($result))!==null){
    $output[]=$row;

}
echo json_encode($output);
?>