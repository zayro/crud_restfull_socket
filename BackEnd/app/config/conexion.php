<?php

namespace app\config;

//require_once('../../run.php');

use library\DBMS;

const PI = 3.14;

/**
 * CLASE GENERAL PRINCIPAL.
 *
 * En esta parte nos encargamos de crear los tipos de conexion del proyecto
 * para poder asi administrar los tipos de permisos de acceso
 */

class connect extends DBMS
{
    public function __construct()
    {
        $database_type = 'mysql';

        $host = 'localhost';

        $database = 'prueba';

        $user = 'root';

        $password = 'zayro';

        $port = '3306';

        parent::__construct($database_type, $host, $database, $user, $password, $port);

        $this->Cnxn();

        print_r($this->getError());

//print 'conexion exitosa' ;
    }
}

//$instance = new connect();
