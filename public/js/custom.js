// =============  Data Table - (Start) ================= //

$(document).ready(function(){
    
    var table = $('#example').DataTable({
        
        buttons:['excel', 'pdf', 'print']
        //'copy', 'csv', 
        
    });
    
    
    table.buttons().container()
    .appendTo('#example_wrapper .col-md-6:eq(0)');

});
$(document).ready(function(){
    
    var table = $('#user_table').DataTable({
        
        buttons:['copy', 'csv', 'excel', 'pdf', 'print']
        
    });
    
    
    table.buttons().container()
    .appendTo('#example_wrapper .col-md-6:eq(0)');

});

// =============  Data Table - (End) ================= //
