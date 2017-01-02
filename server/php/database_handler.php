<?php

class DatabaseHandler {

	private $connection;

	public function __construct() {
		$this->open_connection();
	}

    public function open_connection() {  // DB Params

        $this->connection = mysqli_connect(DB_SERVER, DB_USER, DB_PASS, DB_NAME);
		if(mysqli_connect_errno()) {
				die("Database connection failed: " . 
				mysqli_connect_error() . 
				" (" . mysqli_connect_errno() . ")"
			);
		}        
    }  

    public function post_image($post) {  // Add New Image

    	$image_name = mysqli_real_escape_string($this->connection, $post['file_name']);
    	$size = mysqli_real_escape_string($this->connection, $post['size']);
    	$bytes = number_format($size / 1000, 2) . ' KB';
        $sql = "INSERT INTO `images` (ImageName, Size) VALUES ('$image_name', '$bytes')";
        $result = mysqli_query($this->connection, $sql);
        $this->confirm_query($result);
    }

    public function get_images() {  // Load All Images

    	$sql = "SELECT * FROM `images` WHERE `Status` = 1 ORDER BY `Order` ASC";
        $result = mysqli_query($this->connection, $sql);
        $this->confirm_query($result);
	    if ($result) {
	        $return = array();
	        while($row = $result->fetch_assoc()) {
	        	$return[] = $row;
	        }
	    }
	    return $return;
    }

    public function delete_image($post) {  // Deletes Image Record

    	$id = mysqli_real_escape_string($this->connection, $post['ID']);
    	$sql = "UPDATE `images` SET `Status` = 0 WHERE `ID` = '$id'";
        $result = mysqli_query($this->connection, $sql);
        $this->confirm_query($result);
        return 1;
    }

    public function reorder_images($post) {  // Saves New Ordering On Drag And Drop

		$count = 1;
		foreach($post['IDs'] as $value) {
        	$id    = mysqli_real_escape_string($this->connection, $value);	 
            $sql = "UPDATE `images` SET `Order` = '$count' WHERE `id` = '$id'";
			$result = mysqli_query($this->connection, $sql);
	        $this->confirm_query($result);
			$count++;
		}
		return 1;	
    }

	private function confirm_query($result) {  // Simple Query For Checking SQL Success/Fail

		if (!$result) {
			die("Database query failed.");
		}
	}    

}