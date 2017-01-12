<?php
	$conn=mysql_connect("localhost:8080", "root", "root") or die("can't connect database");
	mysql_select_db("login_acc",$conn);
	$sql="select * from account";
    $query=mysql_query($sql);
	if(mysql_num_rows($query) == 0){
    echo "Chua co du lieu";
	} else {
		while($row=mysql_fetch_array($query)){
			echo $row['username'] ." - ".$row['password']."<br />";
		}
	}
?>