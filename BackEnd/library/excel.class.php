<?php

namespace library;

#require_once('../run.php');

use app\config\connect;

class excel extends connect  {
		
	
	public function exportar($query, $filename){			


  #header("Content-Type: application/vnd.ms-excel");
  header("Content-Type: application/vnd.ms-excel; charset=utf-8");
  header("Content-type: application/x-msexcel; charset=utf-8");
  header("Content-Disposition: attachment; filename=$filename.xls");
  header("Pragma: no-cache");
  header("Expires: 0");


  $nombres = $this->query($query, 'named');

  $fields = array_keys($nombres);
  $count = count($fields);


  print "<table border='1'>";

  print "<tr>";

  for ($i = 0 ; $count>$i; $i++){
    
    print "<th>". $fields[$i] . "</th>";
    
  }

  print "</tr>";



  foreach ($this->query($query, 'both') as $row) {

    print "<tr>";
    
  for ($i = 0 ; $count>$i; $i++){
    
    print "<td>". $row[$i]. "</td>";
    
  }	


    print "</tr>";	
  }

    print "</table>";

      
    }	
    
    
    
  }

/*
  $instance = new excel();

  $instance->exportar('select * from demo', 'report');

  */

?>

  