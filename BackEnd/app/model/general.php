<?php

namespace app\model;

//require_once('../config/conexion.php');

use app\config\connect;

/**
 * CLASE GENERAL PRINCIPAL.
 *
 * En esta parte nos encargamos de crear los tipos de conexion del proyecto
 * para poder asi administrar los tipos de permisos de acceso
 */

class general extends connect
{
    public function column($table)
    {
        $rows = $this->columns($table);
        $result = array(
        'Error' => $this->getError(),
        'total' => $this->rowcount(),
        'result' => $rows,
        'instance' => 'all',
        );

        return json_encode($result);
        $this->disconnect();
    }

    public function all($table)
    {
        $execute = "SELECT * FROM $table ";
        $rows = $this->query($execute);
        $result = array(
        'Error' => $this->getError(),
        'total' => $this->rowcount(),
        'result' => $rows,
        'instance' => 'all',
        );

        return json_encode($result);
        $this->disconnect();
    }

    public function search($table, $id)
    {
        $sql = "SELECT * FROM $table WHERE id  = ?";
        $params = array(
        "$id",
        );
        $rows = $this->query_secure($sql, $params, true, true);
        $result = array(
        'sql' => $this->getSql(),
        'Error' => $this->getError(),
        'total' => $this->rowcount(),
        'result' => $rows,
        'instance' => 'search',
        );

        return json_encode($result);
        $this->disconnect();
    }

    public function add($table, $data)
    {
        $result = $this->insert("$table", " $data");
        if ($result === false) {
            $error = array(
            'error' => $this->getError(),
            'sql' => $this->getSql(),
            'result' => $result,
            );

            return json_encode($error);
        } else {
            $result = array(
            'success' => true,
            'result' => $result,
            );

            return json_encode($result);
        }
        $this->disconnect();
    }

    public function change($table, $data, $id)
    {
        $result = $this->update("$table", " $data", "id = $id");
        if ($result === false) {
            $error = array(
            'error' => $this->getError(),
            'sql' => $this->getSql(),
            'result' => $result,
            );

            return json_encode($error);
        } else {
            $result = array(
            'success' => true,
            'result' => $result,
            );

            return json_encode($result);
        }
        $this->disconnect();
    }

    public function remove($table, $id)
    {
        $result = $this->delete("$table", "id = $id");
        if ($result === false) {
            $error = array(
            'error' => $this->getError(),
            'msg' => $this->err_msg,
            );

            return json_encode($error);
        } else {
            $result = array(
            'success' => true,
            'result' => $result,
            );

            return json_encode($result);
        }
        $this->disconnect();
    }
}

//$instance = new general();
/**Document Testing clase*/
//print_r($instance->search('demo', 1));
