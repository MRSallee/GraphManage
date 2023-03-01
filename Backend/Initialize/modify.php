<?php
$data="const Input={brand:\"".$_POST['brand']."\",func:\"".$_POST['function']."\",name:\"".$_POST['name']."\"};\nmodule.exports={Input};";

$file=fopen("variables.js","w");
fwrite($file,$data);
fclose($file);
exec("node modify.js");

if(error_get_last()) {
	print_r(error_get_last());
} else {
	header('Location: '.'index.html');
}
?>