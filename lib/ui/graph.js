GradeCube.Graph = {};

GradeCube.Graph.drawBox = function( assg, left ) {
    var unit = $("#graph").height();
    var name =$( assg ).children( "input.name").val() ;
    var width = $( assg ).children( "select.weight" ).val() * unit/100;
    var height = $( assg ).children( "select.grade" ).val() * unit/100;

    var barId = $( assg ).attr("id") + "_bar"
    var barHTML = '<div class="bar" '  + 'id=' + '"' + barId + '"' +  '></div>'

    $("#graph").append( barHTML )
    var bar = $( "#" + barId )

    bar.html( name )
    bar.css( "left", left )
    bar.width( width )
    bar.height( height )
}

GradeCube.Graph.drawBoxes = function() {

    // Start from scratch, maybe implement as check/update
    $(".bar").remove()

    var unit = $("#graph").height();
    var sumOfPreviousWidths = 0;

    $(".assignment").each( function() {
        // Draw box
        GradeCube.Graph.drawBox( $(this), sumOfPreviousWidths )

        // Keep summing widths for the next box.
        var width = $(this).children( "select.weight" ).val() * unit/100;
        sumOfPreviousWidths += width;
    })
}


jQuery( function() {

  // Set or get size of the graph
  // -> Null
  GradeCube.Graph.size = function( num ) {
      if (num) {
          $("#graph").height( num );
          $("#graph").width( num );
      }
      else {
          $("#graph").height();
      }
      return $("#graph").height();
  }

  // Initialize graph
  GradeCube.Graph.size(400);

})
