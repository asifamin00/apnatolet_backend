// =============  Data Table - (Start) ================= //

$(document).ready(function(){
    
    var table = $('#example').DataTable({
        
       // buttons:['excel', 'pdf', 'print'],
        //'copy', 'csv', 
        "columnDefs": [
            {
               
                "targets": 3, // target the second column
                "render": function(data, type, row, meta) {
                    return '**** **** **** ' + data.slice(-4); // mask all but the last 4 digits
                }
            }
        ],
        
        
        
    });
    
    
    table.buttons().container()
    .appendTo('#example_wrapper .col-md-6:eq(0)');

});
// $(document).ready(function(){
    
//     var table = $('#user_table').DataTable({
        
//         buttons:['copy', 'csv', 'excel', 'pdf', 'print']
        
//     });
    
    
//     table.buttons().container()
//     .appendTo('#example_wrapper .col-md-6:eq(0)');

// });

// =============  Data Table - (End) ================= //
