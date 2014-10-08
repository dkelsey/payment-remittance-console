      $(function() {
      $.getJSON("http://localhost/wp-json/uploads", function(data){
        $.each( data, function( key, val ) {
           $.each(val, function(key, val) {
           $("#upload_tbody")
              .append($('<tr>')
                  .append('<td width="30%">' + key + '</td>')
                  .append('<td width="10%">' + val.filectime + '</td>')
                  .append('<td width="7%">' + val.filesize + '</td>')
                  .append('<td width="20%"><div></div></td>')
                  .append('<td><div class="btn-group">' + 
                               '<button type="button" class="btn btn-info">Validate</button>' +
                               '<button type="button" class="btn btn-primary">Process</button>' +
                               '<button type="button" class="btn btn-danger">Del</button>' +
                               '</div>' +
                               '</td>')
              );
           });
        });
     });
      $.getJSON("http://localhost/wp-json/archives", function(data){
        $.each( data, function( key, val ) {
           $.each(val, function(key, val) {
	   var zip_btn_text = 'zip';
	   if ( /.gz$/.test(key) ) 
	       zip_btn_text = 'unzip';

           $("#archives_tbody")
              .append($('<tr>')
                  .append('<td width="30%">' + key + '</td>')
                  .append('<td width="10%">' + val.filectime + '</td>')
                  .append('<td width="7%">' + val.filesize + '</td>')
                  .append('<td width="20%"><div></div></td>')
                  .append('<td><div class="btn-group">' + 
                               '<button type="button" class="btn btn-info">' + zip_btn_text + '</button>' +
                               '<button type="button" class="btn btn-primary">Un-Archive</button>' +
                               '<button type="button" class="btn btn-danger">Del</button>' +
                               '</div>' +
                               '</td>')
              );
           });
        });
      });

      $(document).on('click','button', function() {
         if ($(this).text() === 'Validate') {
	       tr = $(this).parent().parent().parent();
	       div = tr.find('td:eq(3)');
	       fname = tr.find('td:eq(0)');
               div.stop(true,true);
               div.text('').show();
               div.text('testing file on server').fadeOut(3000, function() {
                  $(this).text('').show();
               });
               $.getJSON('http://localhost/wp-json/uploads/test/' + fname.html(), function(data){
                  $.each( data, function(key,val){
                  alert(val);
                  });
               });
         } else if ($(this).text() === 'Process') {
	       tr = $(this).parent().parent().parent();
	       div = tr.find('td:eq(3)');
	       fname = tr.find('td:eq(0)');
               div.stop(true,true);
               div.text('').show();
               div.text('the file is being processed').fadeOut(3000, function() {
                  $(this).text('').show();
               });
               $.getJSON('http://localhost/wp-json/uploads/process/' + fname.html(), function(data){
                  $.each( data, function(key,val){
	   	       newrow = div.parent().clone();
		       $("#archives_tbody").append(newrow);
		       newrow.find('td:eq(3)').text('');
		       newrow.find('div:eq(0)').find('button:eq(0)').text('zip');
		       newrow.find('div:eq(0)').find('button:eq(1)').text('Un-Archive');
		       div.parent().remove();
                       alert(val);
                  });
               });
         } else if ($(this).text() === 'Del') {
	       tr = $(this).parent().parent().parent();
	       arch_tbody = $('#archives_tbody');
	       upld_tbody = $('#upload_tbody');
	       tbody = tr.parent();
	       div = tr.find('td:eq(3)');
	       fname = tr.find('td:eq(0)');
               var serverUrl = 'http://localhost/wp-json/uploads/' + fname.html();

	       if ( tbody[0] == arch_tbody[0] ) 
                    serverUrl = 'http://localhost/wp-json/archives/' + fname.html();
               div.stop(true,true);
               div.text('').show();
               div.text( fname.html() + ' is being Deleted').fadeOut(3000, function() {
                  $(this).text('').show();
               });
               $.ajax({
                  type: "DELETE",
                  url: serverUrl,
                  processData: false,
                  contentType: false,
                  success: function(data) {
                    alert(data.message);
		    tr.fadeOut(3000, function() {
		       tr.remove();
		    });
                  },
                  error: function(data) {
                    console.log(data);
                    var obj = jQuery.parseJSON(data);
                    alert(obj);
                  }
               });
	       ////////////////////
         } else if ( /(un|)zip/.test($(this).text() )  ) {
               tr =$(this).parent().parent().parent();
	       div = tr.find('td:eq(3)');
	       fname = tr.find('td:eq(0)');
               fsize = tr.find('td:eq(2)');
	       divtext = 'unzipping';
	       if (/csv$/.test(fname.html()) )
		    divtext = 'zipping';
	       zipbtn = $(this);
               div.stop(true,true);
               div.text('').show();
               div.text(divtext).fadeOut(3000, function() {
                  $(this).text('').show();
               });
	       var serverUrl = 'http://localhost/wp-json/archives/zip/' + fname.html();

               $.ajax({
                  type: "PUT",
                  url: serverUrl,
                  processData: false,
                  contentType: false,
                  success: function(data) {
         
                    alert(data.message);
		    var newtext ;
		    if (/csv$/.test(fname.html()) ) {
		       fname.html( fname.html() + '.gz' ) ;
		       newtext = 'unzip';
		    }
		    else {
		       fname.html( fname.html().replace('.gz', '') );
		       newtext = 'zip';
		    }

		    $.ajax({
		       type: "GET",
		       url: 'http://localhost/wp-json/archives/' + fname.html(),
		       processDate: false,
		       contentType: false,
		       success: function(data) {
		          $.each(data, function(key,val){
		               //file_name = key;
			       //filectime = val.filectime;
			       //filesize = val.filesize;
			       fsize.html(val.filesize);
			       zipbtn.text(newtext);
			  });
		       },
		    });
                  },
                  error: function(data) {
                    console.log(data);
                    var obj = jQuery.parseJSON(data);
                    alert(obj);
                  }
               });
	       /////////////////////
         } else if ($(this).text() === 'Un-Archive') {
               tr =$(this).parent().parent().parent();
               div = $(this).parent().parent().parent().find('td:eq(3)');
               fname = $(this).parent().parent().parent().find('td:eq(0)');
               div.stop(true,true);
               div.text('').show();
               div.text('Un-Archiveing').fadeOut(3000, function() {
                  $(this).text('').show();
               });
	       var serverUrl = 'http://localhost/wp-json/archives/unarchive/' + fname.html();

               $.ajax({
                  type: "PUT",
                  url: serverUrl,
                  processData: false,
                  contentType: false,
                  success: function(data) {
		    newrow = div.parent().clone();
		    $("#upload_tbody").append(newrow);
		    newrow.find('td:eq(3)').text('');
		    newrow.find('div:eq(0)').find('button:eq(0)').text('Validate');
		    newrow.find('div:eq(0)').find('button:eq(1)').text('Process');
		    div.parent().remove();
                    alert(data.message);
                  },
                  error: function(data) {
                    var obj = jQuery.parseJSON(data);
                    alert(obj);
                  }
               });
	       /////////////////////
         }
         });

<!---------------------  -->
<!---------------------  -->
         var file;
         var fd = new FormData();

         // Set an event listener on the Choose File field.
         $('#fileselect').bind("change", function(e) {
           var files = e.target.files || e.dataTransfer.files;
           // Our file var now holds the selected file
           file = files[0];
           fd.append( 'file', file);
           fd.append( 'name', 'file');
         });

         // This function is called when the user clicks on Upload to Parse. It will create the REST API request to upload this image to Parse.
         $('#uploadbutton').click(function() {
           var serverUrl = 'http://localhost/wp-json/uploads';

           $.ajax({
             type: "POST",
             url: serverUrl,
             data: fd,
             processData: false,
             contentType: false,
             success: function(data) {
               alert("File available at: " + data.message);
	       // find the uploads_tbody
               $.ajax({
	            type: "GET",
		    url: 'http://localhost/wp-json/uploads/' + file.name,
		    processData: false,
		    contentType: false,
		    success: function(data) {
		         $.each(data, function(key,val) {
	                      $('#upload_tbody')
                                 .append($('<tr>')
                                 .append('<td width="30%">' + key + '</td>')
                                 .append('<td width="10%">' + val.filectime + '</td>')
                                 .append('<td width="7%">' + val.filesize + '</td>')
                                 .append('<td width="20%"><div></div></td>')
                                 .append('<td><div class="btn-group">' +
                                              '<button type="button" class="btn btn-info">Validate</button>' +
                                              '<button type="button" class="btn btn-primary">Process</button>' +
                                              '<button type="button" class="btn btn-danger">Del</button>' +
                                              '</div>' +
                                              '</td>')
                              );
			 });
		    },
               });
             },
             error: function(data) {
               console.log(data);
               var obj = jQuery.parseJSON(data);
               alert(obj);
             }
           });
         });
    });
