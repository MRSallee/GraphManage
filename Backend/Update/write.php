/* See LICENSE file for copyright and license details */
<?php
	$data="var Input = {\n\toName: '\"name\": \"".$_POST['oName']."\"',\n\tnName: '\"name\": \"".$_POST['nName']."\"',\n\toFilename: '\"".$_POST['oFilename']."\"',\n\tnFilename: '\"".$_POST['nFilename']."\"',\n\toLabel: '\"".$_POST['oLabel']."\"',\n\tnLabel: '\"".$_POST['nLabel']."\"',\n\toReviewscore: '\"reviewScore\": \"".$_POST['oReviewscore']."\"',\n\tnReviewscore: '\"reviewScore\": \"".$_POST['nReviewscore']."\"',\n\toReviewlink: '\"reviewLink\": \"".$_POST['oReviewlink']."\"',\n\tnReviewlink: '\"reviewLink\": \"".$_POST['nReviewlink']."\"',\n\toPrice: '\"price\": \"".$_POST['oPrice']."\"',\n\tnPrice: '\"price\": \"".$_POST['nPrice']."\"',\n\toShoplink: '\"shopLink\": \"".$_POST['oShoplink']."\"',\n\tnShoplink: '\"shopLink\": \"".$_POST['nShoplink']."\"'\n};\nmodule.exports={Input};";
	// File being overwritten
	$file=fopen("variables.js","w");
	if($file) {
		// Create backup JSON
		shell_exec("cp -f phone_book.json phone_book.bak.json");
		fwrite($file,$data);
		fclose($file);
		// Run update.js
		shell_exec("node update.js");
		// Redirect to html
		header('Location: '.'index.html');
	}
	print_r(error_get_last());
?>
