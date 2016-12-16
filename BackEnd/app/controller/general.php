<?php

require_once('../../run.php');

use app\model\general;
use library\excel;
use library\csv;

$objeto = new general;
$excel = new excel;
$csv = new csv;

$returnValue = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$url = explode("general.php/", trim($returnValue, "/"));
$first = array_shift($url);
$id = array_pop($url);
$MaxArgs = count($url);



$request = strtoupper($_SERVER['REQUEST_METHOD']);

switch ($request) {
	
	
	case 'GET':  
	
	if(isset($method) and $method == 'all_csv'){	
		
		$csv->all_csv($table, $file);		
		
	}

	if(isset($method) and $method == 'all_excel'){	
		
		$excel->all_csv($table, $file);		
		
	}	

	if(isset($method) and $method == 'search'){		
		
		$result =  $objeto->search($table, $id);		
		
		print ($result);
		
	}	
	
	if(isset($method) and $method == 'column'){		
		
		$result =  $objeto->column($table);		
		
		print ($result);
		
	}	

	if(isset($table) and !isset($method)){        		
		
		$result = $objeto->all($table);		
		
		print ($result);
		
	}
	
	break;
	
	
	case 'POST':
	
	$receives = json_decode(file_get_contents('php://input'), true);

	$process = "";	
	
	foreach($receives as $key => $val){
		
		$process .=  $key.'='."'$val',";
		
	}	
	
	$data = substr($process,0,-1);	
	
	if(isset($method) and $method == 'add'){		
		
		print $objeto->add($table, $data);		
		
	}	
	
	break;
	
	
	case 'PUT':
	
	$receives = json_decode(file_get_contents('php://input'), true);
	
	$process = "";

	foreach($receives as $key => $val){
		
		$process .=  $key.'='."'$val', ";
		
	}	
	
	$data = substr($process,0,-2);
	
	
	if(isset($method) and $method == 'change'){		
		
		print $objeto->change($table, $data, $id);		
		
	}
	
	
	break;	
	
	case 'DELETE':
	
	if(isset($id)){			
		
		print $objeto->remove($table, $id);
		
		
	}	
	
	break;	
	
}

?>