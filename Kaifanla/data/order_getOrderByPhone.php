<?php
/**�����ֻ��Ų�ѯ��������**/
header('Content-Type:application/json');

$output = [];

@$phone = $_REQUEST['phone'];
if(empty($phone)){
    echo "[]"; //���ͻ���δ�ύ�绰���룬�򷵻�һ�������飬
    return;    //���˳���ǰҳ���ִ��
}

//�������ݿ�
$conn = mysqli_connect('127.0.0.1','root','','kaifanla');
$sql = 'SET NAMES utf8';
mysqli_query($conn, $sql);
$sql = "SELECT kf_order.oid,kf_order.user_name,kf_order.order_time,kf_dish.img_sm,kf_dish.did FROM kf_order,kf_dish WHERE kf_order.did=kf_dish.did AND kf_order.phone='$phone'";
$result = mysqli_query($conn, $sql);
//���ݱ�Ų�ѯ����������ֻ��һ�м�¼
while( ($row=mysqli_fetch_assoc($result))!==NULL ){
    $output[] = $row;
}
echo json_encode($output);
?>