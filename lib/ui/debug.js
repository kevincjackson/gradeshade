jQuery(function() {

////// Constants
//  MAX_FONT_SIZE = 100;
//
  var log = function( obj ) {
    console.log( obj );
  };
//
//  NumberToGrade = function( num ) {
//    num = num.replace(/(\r\n|\n|\r)/gm,"");
//    if      ( num >= 93 )          { return "A"; }
//    else if ( num >=90 && num<93 ) { return "A-"; }
//    else if ( num >=87 && num<90 ) { return "B+"; }
//    else if ( num >=83 && num<87 ) { return "B"; }
//    else if ( num >=80 && num<83 ) { return "B-"; }
//    else if ( num >=77 && num<80 ) { return "C+"; }
//    else if ( num >=73 && num<77 ) { return "C"; }
//    else if ( num >=70 && num<73 ) { return "C-"; }
//    else if ( num >=64 && num<70 ) { return "D"; }
//    else if ( num<64 )             { return "F"; }
//    else                           { return "Huh?"; }
//  };
//
//
//  var  WeightToFontSize = function( num ) {
//    var num_stripped = String( num ).replace( /(\r\n|\n|\r)/gm, "" );
//    var num_int = parseInt( num_stripped, 10 );
//    return ( MAX_FONT_SIZE * ( num_int / 80 ) + 20 ) + "px";
//  };
//
//  var sumWeights = function() {
//    var sum = 0;
//    var weights = jQuery(".weight");
//    jQuery.each( weights, function( obj ) {
//      sum += obj.val();
//    })
//    return sum;
//  };
//
//
//// Handlers
//  jQuery("#averageGrade").change( function() {
//    jQuery("#gradeCubeSays").html( NumberToGrade( jQuery(this).val() ) )
//  })
//
//
//  jQuery(".weight").change( function() {
//    var weight = jQuery(this).val()
//    var weightedFont = WeightToFontSize( weight )
//    jQuery(this).parent("div").children("input").css("font-size", weightedFont )
//  })
//
//// On page load
//  jQuery(".assignment input").css("font-size", WeightToFontSize( 25 ) )
//  jQuery(".weight").change()
//
//
})



