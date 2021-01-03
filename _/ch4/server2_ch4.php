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
	logit("Server reached");
	foreach($_GET as $key =>$value)
	{
       		$x = "GET param $key -> $value\n";
		logit($x);
		echo($x);
       	} 
	foreach($_POST as $key =>$value)
	{
       		$x = "POST param $key -> $value\n";
		logit($x);
		echo($x);
       	} 
?> 
