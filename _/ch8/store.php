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
	// Init "datastore"
	if (isset($_SESSION['store']))
	{
		$store['rooms'] = Array(
                "1" => "{'id':'1', 'name':'Large Meeting Room', 'location':'Red and blue pillows' }",
                "2" => "{'id':'2', 'name':'Small Meeting Room', 'location':'Beside beer fridge' }"
                );	
		$_SESSION['store'] = $store;
                $_SESSION['count'] = 0;
                $count = 0;
	}
	else
	{
		$store = $_SESSION['store'];
                $count = $_SESSION['count'];
	}
	header("Content-Type: " . ($_SERVER["CONTENT_TYPE"] == 'application/json' ? 'application/json' : 'text/plain'));
	
	//$fn = $_REQUEST['location'];
        $fn = $_SERVER['REQUEST_URI'];
        //logit("query string is $fn");
        $stripval = -1; 
        if( $fn[strlen($fn)-1] == '?') // If the store send a '?' at the end, it wants all entities
        {
          $stripval = -2;
        }
        $foo = substr($fn, strpos($fn, ".php")+5, $stripval);
        $bar = substr($fn, strrpos($fn, "/")+1, strlen($fn));
        
        $r = $store['rooms'];
        
        //logit("entity string is $foo");
	if ($foo != "")
	{
		$m = $_SERVER["REQUEST_METHOD"];
		logit("entity = '$foo', id = '$bar',  method = '$m'");
		switch ($m) {
			case "GET" :
                                $rv = "";
                                $s = $store[$foo];
                                logit("lenght of s = ".count($s));
                                if ($bar == "?")
                                {
                                  $rv = "[";
                                  while (list($key, $value) = each($s)) 
                                  { 
                                    $rv = $rv.$value.",";
                                  }
                                  if($i > 0) $rv = substr($rv, 0, -1);
                                  $rv = $rv."]";
                                }
                                else
                                {
                                  $rv = $s[$bar];
                                }
                                logit("Returning '".$rv."'");
				print $rv;
				break;
			case "PUT" :
				$contents = file_get_contents('php://input');
                                $x = $store[$foo];
                                logit("PUT old content of '$bar' is '".$x[$bar]."'");
                                $x[$bar] = $contents;
                                logit("PUT new content of '$bar' is '".$x[$bar]."'");
				$store[$foo] = $x;
                                print $store[$foo];
				break;
			case "POST" :				
				// Rememebr to set the 'Location' header with the entity and id, so that the store gets informed back
				break;
			case "DELETE" :
				$x = $store[$foo];
                                unset($x[$bar]);
                                $store[$foo] = $x;
				break;
		}
		$_SESSION['store'] = $store;
                $_SESSION['count'] = $count;
	}
?>
