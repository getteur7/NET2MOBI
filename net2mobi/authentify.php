<?php session_start();
	$login = $_POST['user_name'];
	$pwd = $_POST['password'];
	
	if($login == "1" AND $pwd == "1")
	{
		$_SESSION['u_name'] = $login;
		echo 'aa921792';
	}
	else
		echo 'badf34d6';
?>