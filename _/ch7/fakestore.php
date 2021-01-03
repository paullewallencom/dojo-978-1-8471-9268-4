<?php

	$log = "";
	$logstart = getcwd();
	
	function logit($it)
	{
		//------------------------------------------------------------------
		global $log;
		global $logstart;
		$log = $log.$it;	
		$fp2 = fopen($logstart."/meh.log", "a");
		$d = date("Y-m-d H:i:s");
		fwrite($fp2, $d.">".$it."\n");					
		fclose($fp2);
		//------------------------------------------------------------------
	}

	session_start();	
	header("Content-Type: " . ($_SERVER["CONTENT_TYPE"] == 'application/json' ? 'application/json' : 'text/plain'));
	
	$fn = $_REQUEST['location'];
	if ($fn != "")
	{
	$m = $_SERVER["REQUEST_METHOD"];
	logit("fn = $fn. m = $m");
	switch ($m) {
		case "GET" :
			if (isset($_SESSION[$fn])) {
				print($_SESSION[$fn]);
			}
			else {
				$fh = fopen($fn, 'r');
				print(fread($fh, filesize($fn)));
				fclose($fh);
			}
			break;
		case "PUT" :
			$contents = file_get_contents('php://input');
			print($contents);
			$_SESSION[$fn]=$contents;
			break;
		case "POST" :
			if (isset($_SESSION[$fn])) {
				$old = $_SESSION[$fn];
			}
			else {
				$fh = fopen($fn, 'r');
				$old = fread($fh, filesize($fn));
				fclose($fh);
			}
			$contents = file_get_contents('php://input');
			$_SESSION[$fn]=$old . $contents;
			break;
		case "DELETE" :
			$_SESSION[$fn]="deleted";
			break;
	}
	}
?>
