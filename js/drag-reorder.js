$(window).load(function() {

    $.ajax({  // Call fires on page load to get all images stored in database
        url  : 'server/php/reorder.php',
        type : 'POST',
        data: {
            QueryType: 'get'
        },
        success: function(d) {
            if(d.length > 0) {
                $('tbody.files').empty();
                var images = jQuery.parseJSON(d);
                console.log(images);
                for(var a in images) {
                    new image_row(images[a]); // Runs protoype to build image rows on page
                }
            }          
        }
    });

    $('.image-link').css("cursor","move");	
    $(".reorder-images-list")
    .sortable({  // Call fires when images are dropped on reorder
    	tolerance: 'pointer',
    	stop: function(event,ui){ 
        	var ids = [];
        	$(".image-handle").each(function(){
        		if($(this).attr('id')) { ids.push($(this).attr('id').substr(10)); }
        	});   
        	$.ajax({
				url  : 'server/php/reorder.php',
				type : 'POST',
				data: {
                    QueryType: 'reorder',
					IDs: ids
				}
			})
    	}
    });	
});

$('#fileupload').fileupload({ // Callback when uploader is finished
    stop: function (e) {
        location.reload();
    },
});

function image_row(data) { // Prototype function
    var _this = this;
    this.data = data;
    this.init_row();
}

image_row.prototype = { // Prototype method for building image rows
    init_row: function() {
        var _this = this;
        $('tbody.files').append(
            $('<tr>', {id: 'image-row-' + _this.data.ID, class: 'image-link image-handle template-download fade in ui-sortable-handle', css: {'cursor' : 'move'}}).append(
                $('<td>').append(
                    $('<span>', {class: 'preview'}).append(
                        $('<a>', {href: 'server/php/files/' + _this.data.ImageName, title: _this.data.ImageName, download: _this.data.ImageName, 'data-gallery': ''}).append(
                            $('<img>', {src: 'server/php/files/thumbnail/' + _this.data.ImageName})
                        )
                    )
                ),
                $('<td>').append(
                    $('<p>', {class: 'name'}).append(
                        $('<a>', {href: 'server/php/files/' + _this.data.ImageName, title: _this.data.ImageName, download: _this.data.ImageName, 'data-gallery': "", text: _this.data.ImageName})
                    )
                ),                    
                $('<td>').append(
                    $('<span>', {class: 'size', text: _this.data.Size})
                ),
                $('<td>').append(
                    $('<button>', {class: 'btn btn-danger delete', 'data-type' : 'DELETE', 'data-url': 'server/php/index.php?file=' + _this.data.ImageName}).append(
                        $('<i>', {class: 'glyphicon glyphicon-trash'}),
                        $('<span>', {text: 'Delete'})
                    ).on('click', function() {
                        _this.delete_row(_this.data.ID)                      
                    }),
                    $('<input>', {class: 'toggle', name: 'delete', value: '1', type: 'checkbox', css: {'margin-left': '5px'}})
                )
            )
        )
    },
    delete_row: function(id) {
        $.ajax({
            url  : 'server/php/reorder.php',
            type : 'POST',
            data: {
                QueryType: 'delete',
                ID: id
            },
            success: function(d) {
                location.reload(); 
            }
        })         
    }
}