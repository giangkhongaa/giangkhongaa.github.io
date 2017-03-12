<?php
	$user = $_GET['user'];

	$con = mysqli_connect("localhost", "root");
	if (!$con) {
		die('Could not connect: ' . mysqli_error($con));
	}
	mysqli_select_db($con,"login_acc");
	$sql="SELECT * FROM account WHERE username = '".$user."'";
	$result = mysqli_query($con,$sql);
	if (mysqli_num_rows($result)== 0)
		echo "user không trùng khớp";
	else
		echo "Submit thành công";
?>