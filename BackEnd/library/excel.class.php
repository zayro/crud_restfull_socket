<?php

namespace library;

//require_once('../run.php');

use app\config\connect;

class excel extends connect
{
public function exportar($query, $filename){
  //header("Content-Type: application/vnd.ms-excel");
  header('Content-Type: application/vnd.ms-excel; charset=utf-8');
  header('Content-type: application/x-msexcel; charset=utf-8');
  header("Content-Disposition: attachment; filename=$filename.xls");
  header('Pragma: no-cache');
  header('Expires: 0');

  $nombres = $this->query($query, 'named');

  $fields = array_keys($nombres);
  $count = count($fields);

  echo "<table border='1'>";

  echo '<tr>';

  for ($i = 0; $count > $i; ++$i){
    echo '<th>'.$fields[$i].'</th>';
  }

  echo '</tr>';

  foreach ($this->query($query, 'both') as $row) {
    echo '<tr>';

  for ($i = 0; $count > $i; ++$i){
    echo '<td>'.$row[$i].'</td>';
  }	


    echo '</tr>';
  }

    echo '</table>';
    }
  }

/*
  $instance = new excel();

  $instance->exportar('select * from demo', 'report');

  */

?>

  