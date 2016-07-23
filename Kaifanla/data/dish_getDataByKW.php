<?php
/**根据关键字查询数据**/
header('Content-Type:application/json');
$output = [];
@$kw = $_REQUEST['kw'];      //搜索关键字
if( empty($kw) ){
    echo '[]';
    return;
}
@$start = $_REQUEST['start'];
if( empty($start) ){ $start = 0;}
$pageSize = 5;  //一次可以向客户端返回的最大的记录数
$conn = mysqli_connect('127.0.0.1','root','','kaifanla');
$sql = 'SET NAMES UTF8';
mysqli_query($conn,  $sql);
$sql = "SELECT did,name,price,img_sm,material FROM kf_dish WHERE name LIKE '%$kw%' OR material LIKE '%$kw%'
 LIMIT  $start,$pageSize";
$result = mysqli_query($conn, $sql);
while(($row=mysqli_fetch_assoc($result))!==null){
    $output[]=$row;

}
echo json_encode($output);
?>