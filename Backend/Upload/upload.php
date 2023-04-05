<?php
	// See LICENSE file for copyright and license details.
	$data="const Input={brand:\"".$_POST['brand']."\", name:\"".$_POST['name']."\", ";
	if($_POST['function']=="add-file") {
		if($_FILES['file']['type']=="text/plain") {
			move_uploaded_file($_FILES['file']['tmp_name'], "files/".$_FILES['file']['name']);
			$data=$data."fileName:\"".$_FILES['file']['name']."\", ";
		}
	}
	$data=$data."suffix:\"".$_POST['suffix']."\", func:\"".$_POST['function']."\"};\nmodule.exports={Input};";

	$file=fopen("variables.js", "w");
	fwrite($file, $data);
	fclose($file);
	exec("node modify.js");
	
	if(error_get_last()) print_r(error_get_last());
	else header("Location: index.html");
?>	