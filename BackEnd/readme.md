# COMANDOS PARA DE FUNCIONAMIENTO PHP

- instalar paquetes de php

```shell
composer install
```

- cargamos la libreria de composer

```shell
composer dump-autoload --optimize 
```


- instalar documentacion de php

### puede ejecutar el comando en el directorio vendor/bin

```shell
phpdoc template:list
phpdoc -d app/model -t build/docs
phpdoc -d library  -d app -t build/docs --template="responsive"
```

### indentacion codigo php

```shell
php-cs-fixer fix app --rules=@PSR2,cast_spaces,space_after_semicolon,whitespace_after_comma_in_array --using-cache=no

php-cs-fixer fix app --rules=@Symfony,-@PSR2 --using-cache=no

php-cs-fixer fix library --rules=@Symfony,-@PSR2 --using-cache=no

```