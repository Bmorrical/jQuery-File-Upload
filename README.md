# jQuery File Upload Plugin

## Demo
[Demo File Upload](http://jquery-file-upload.morrical.net/)

## Description
Starting with the master branch, I added a database class and a jQuery sortable feature for image reordering.  When the page is refreshed, the image ordering is reloaded.

## Setup
* **MySQL Table:** 
  The create statement for the MySQL table is located at server/php/create-sql.sql
* **Database Configuration:** 
  The database configuration file is located at server/php/database_config.php

## Features
* **Drag And Drop:**  
  After images have been uploaded, you can then drag and drop the image rows to sort.  Changes are saved to the database class on drop.
* **Database Class:**  
  Database class was added for storing the sort order.

## Support
This project is actively maintained, but there is no official support channel.  
If you have a question that another developer might help you with, please post to [Stack Overflow](http://stackoverflow.com/questions/tagged/blueimp+jquery+file-upload) and tag your question with `blueimp jquery file upload`.

## License
Released under the [MIT license](http://www.opensource.org/licenses/MIT).
