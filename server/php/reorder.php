<?php
	require('init.php');

	if($_POST) {

		switch ($_POST['QueryType']) {  // Cases for Ajax Requests

			case 'get':  
                $database_handler = new DatabaseHandler();
				echo json_encode($database_handler->get_images());
				break;

			case 'reorder':
                $database_handler = new DatabaseHandler();
				echo json_encode($database_handler->reorder_images($_POST));
				break;

			case 'delete':
                $database_handler = new DatabaseHandler();
				echo json_encode($database_handler->delete_image($_POST));	
				break;			
		}
	}

?>