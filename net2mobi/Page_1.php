<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
	<meta name="viewport" content="user-scalable=no, width=device-width" />
	<script type="text/javascript" src="script/jquery.js"></script>
	<!--<script type="text/javascript" src="script/jquery.mobile.js"></script>-->
	<link rel="stylesheet" href="script/jquery.mobile.css" />
	<?php
	if (preg_match("#Linux#", getenv("HTTP_USER_AGENT")))
	{
  		$os = "Linux";
		echo('<link rel="stylesheet" href="css/defaultAndroid.css" type="text/css" />');
	}
	elseif ((preg_match("#Mac#", getenv("HTTP_USER_AGENT"))) || (preg_match("#PPC#", getenv("HTTP_USER_AGENT"))))
	{
  		$os = "Mac";
		echo('<link rel="stylesheet" href="css/defaultIphone.css" type="text/css" />');
	}
	if (preg_match("#Win#", getenv("HTTP_USER_AGENT")))
	{
  		$os = "Windows";
		echo('<link rel="stylesheet" href="css/defaultAndroid.css" type="text/css" />');
	}
	
	?><title>Document sans titre</title>
	</head><body style="background:-moz-linear-gradient(center top , #ffffff, #ffffff) repeat scroll 0 0 transparent;background:-webkit-gradient(linear, center top , center bottom, from(#ffffff), to(#ffffff));background-repeat:no-repeat;background-color:#ffffff;">
	<div data-role="page">
	<?php
		echo $os;
	?></div>
		</body>
		</html>