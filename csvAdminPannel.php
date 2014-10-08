<?php
/*
Plugin Name: Barkerville Remittance/Batch Admin Console
Plugin URI: http://codex.wordpress.org/Adding_Administration_Menus
Description: An Admin console to upload, verify, process Batch and Remittance Reports for Barkerville Brewing
Author: Dave Kelsey
Author URI: https://twitter.com/_Steve_Brule
*/

// Hook for adding admin menus
add_action('admin_menu', 'mt_add_pages');

// action function for above hook
function mt_add_pages() {
    // Add a new top-level menu (ill-advised):
    add_menu_page(__('Batch & Remittance Reports','menu-test'), __('Batch & Remittance Reports','menu-test'), 'manage_options', 'batch-remittance-console', 'batch_remittance_console_page' );
}


// mt_toplevel_page() displays the page content for the custom Test Toplevel menu
function batch_remittance_console_page() {
    echo <<<EOT
    <div>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="js/underscore-min.js"></script> 
    <script src="//backbonejs.org/backbone.js"></script> 
     <!-- Latest compiled and minified bootstrap  CSS I customize it with lessc.
         See http://hereswhatidid.com/2014/02/use-bootstrap-3-styles-within-the-wordpress-admin/
     -->
     <link rel="stylesheet" href="css/localized-bootstrap/css/localized-bootstrap.min.css">
     <div class="bootstrap-wrapper">


     <div class="container">

          <div class="starter-template">
               <h1>Barkerville Brewing Batch and Remittance Reports</h1>
               <p class="lead">For managing your Batch and Remittance Reports.<br> "Just hose it down ya dummy!"</p>
          </div>

     <div class="panel panel-default">

          <!-- Default panel contents -->
          <div class="panel-heading">
             <h3 class="panel-title">File Upload</h3>
          </div>
          <div class="panel-body">
            <p>
            <form id="fileupload" name="fileupload" enctype="multipart/form-data" method="post">
              <fieldset>
	        <span class="btn btn-file">
                <input type="file" accept=".csv" name="fileselect" id="fileselect"></input>
		</span>
                <input id="uploadbutton" type="button" class="btn btn-primary" value="Upload"/>
              </fieldset>
            </form>
            </p>
            <p>Uploaded files</p>
          </div>

          <table class="table">
             <thead>
                <tr>
                  <th>File Name</th>
                  <th>Upload Date</th>
                  <th>Size</th>
                  <td width="80"><div></div></td>
                  <th>Options</th>
                </tr>
             </thead>
             <tbody id='upload_tbody'>
<!--                <tr>  -->
<!--                  <td>aakaer.csv</td>  -->
<!--                  <td>Aug 28, 2014</td>  -->
<!--                  <td>232kb</td>  -->
<!--                  <td width="80"><div></div></td>  -->
<!--                  <td>  -->
<!--                    <div class="btn-group">  -->
<!--                    <button type="button" class="btn btn-default">Test</button>  -->
<!--                    <button type="button" class="btn btn-default">Process</button>  -->
<!--                    <button type="button" class="btn btn-default">Archive</button>  -->
<!--                    <button type="button" class="btn btn-default">Del</button>  -->
<!--                    </div>  -->
<!--                  </td>  -->
<!--                </tr>  -->
             </tbody>
          </table>
      </div>

      <div class="panel panel-default">

          <div class="panel-heading">
             <h3 class="panel-title">Processed/Archived </h3>
          </div>
          <div class="panel-body">
            <p>Processed files</p>
          </div>

          <!-- Table -->
          <table class="table">
             <thead>
                <tr>
                  <th>File Name</th>
                  <th>Upload Date</th>
                  <th>Size</th>
                  <td width="80"><div></div></td>
                  <th>Options</th>
                </tr>
             </thead>
             <tbody id='archives_tbody'>
             </tbody>
          </table>
      </div>
      <script src="js/bvb-console.js"></script>
EOT;
}
?>
