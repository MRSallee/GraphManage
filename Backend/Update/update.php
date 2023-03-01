<?php
	// See LICENSE file for copyright and license details.
	$data=file_get_contents('phone_book.json');
	file_put_contents('backup.json',$data);
	
	$data=str_replace("\"name\": \"".$_POST['oName'],"\"name\": \"".$_POST['nName'],$data);
	$data=str_replace("\"reviewScore\": \"".$_POST['oReviewscore'],"\"reviewScore\": \"".$_POST['nReviewscore'],$data);
	$data=str_replace("\"reviewLink\": \"".$_POST['oReviewlink'],"\"reviewLink\": \"".$_POST['nReviewlink'],$data);
	$data=str_replace("\"price\": \"".$_POST['oPrice'],"\"price\": \"".$_POST['nPrice'],$data);
	$data=str_replace("\"shopLink\": \"".$_POST['oShoplink'],"\"shopLink\": \"".$_POST['nShoplink'],$data);

	file_put_contents('phone_book.json',$data);
	if(error_get_last()) {
		print_r(error_get_last());
	} else {
		header('Location: '.'index.html');
	}
?>