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
	$arg = $_GET["arg"];
	logit("server got arg = $arg");
	echo "Server says. You wrote '$arg'";
?> 
