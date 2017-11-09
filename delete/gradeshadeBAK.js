
// App Namespace - Don't polute global namespace.
var Gradeshade = {};
Gradeshade.HTML = {};
Gradeshade.Assignments = {};
Gradeshade.Assignment = {};
Gradeshade.Assignment.count = 1;
Gradeshade.Grade = {};

//////////////////////////////////////////////////////////////////////////////// 
// Constants

Gradeshade.Constants = {
    MAX_FONT_SIZE: 72,
    MIN_FONT_SIZE: 12,
    FONT_DELTA:    60, // 72 - 12
    WEIGHTS: 
        [ 0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100 ],
    GRADES: [ "", 
        110, 109, 108, 107, 106, 105, 104, 103, 102, 101, 100,  
              99,  98,  97,  96,  95,  94,  93,  92,  91,  90, 
              89,  88,  87,  86,  85,  84,  83,  82,  81,  80, 
              79,  78,  77,  76,  75,  74,  73,  72,  71,  70, 
              69,  68,  67,  66,  65,  64,  63,  62,  61,  60, 
              59,  58,  57,  56,  55,  54,  53,  52,  51,  50, 
              49,  48,  47,  46,  45,  44,  43,  42,  41,  40, 
              39,  38,  37,  36,  35,  34,  33,  32,  31,  30, 
              29,  28,  27,  26,  25,  24,  23,  22,  21,  20, 
              19,  18,  17,  16,  15,  14,  13,  12,  11,  10,
               9,   8,   7,   6,   5,   4,   3,   2,   1,   0 ],
    AFFIRMATIONS: [ 
      "You got this.", 
      "Might as well aim high.", 
      "(Hopefully.)", 
      "Rock star you are!", 
      "Let's do this." ]
}

////////////////////////////////////////////////////////////////////////////////o
    
// intervalToArray( 0, 2 ) // [0,1,2]
//      Set reverse with third option
//      intervalToArray( 0, 2, "reverse" ) // [2,1,0]
// Used internally to generate constants. Don't use in production!
// Gradeshade.Constants.GRADES = Gradeshade.intervalToArray(0,110,"reverse")
Gradeshade.intervalToArray = function(a,b,reverse) {
  var acc = []
  for (var i=a; i<=b; ++i) { acc.push( i ); }
  acc = (reverse == "reverse") ? acc.reverse() : acc
  return acc
}

//  Get a random array element.
//  Array -> Object
//  arraySample( [1,2,3] ) // 2
Gradeshade.arraySample = function( arr ) {
  var rand = Math.floor( Math.random() * arr.length )
  return arr[rand]
}

// Make sure you have a number to work with.
// Number / String -> Number
// numberNormalize( " 52 \n" ) // 52
Gradeshade.numberNormalize = function( num ) {
    return parseFloat( String( num ).replace( /(\r\n|\n|\r)/gm, "") )
}

// Convert integer to letter grade
// Number -> String
// numberNormalize( 87 ) // "B+" 
Gradeshade.numberToGrade = function( num ) {
    num = Gradeshade.numberNormalize( num )
    if      ( num >= 93 )             { return "A";    }
    else if ( num >= 90 && num < 93 ) { return "A-";   }
    else if ( num >= 87 && num < 90 ) { return "B+";   }
    else if ( num >= 83 && num < 87 ) { return "B";    }
    else if ( num >= 80 && num < 83 ) { return "B-";   }
    else if ( num >= 77 && num < 80 ) { return "C+";   }
    else if ( num >= 73 && num < 77 ) { return "C";    }
    else if ( num >= 70 && num < 73 ) { return "C-";   }
    else if ( num >= 67 && num < 70 ) { return "D+";   }
    else if ( num >= 63 && num < 67 ) { return "D";    }
    else if ( num >= 60 && num < 63 ) { return "D-";   }
    else if ( num <60 )               { return "F";    }
    else                              { return "Huh?"; }
}

// Multiply a grade (number) times the weight (percentage)
// Number, Number -> String
// gradeWeighted( 80, 80 ) // "64.0"
Gradeshade.gradeWeighted = function( num, weight ) {
    return  (num * weight / 100).toFixed( 1 )
}

Gradeshade.htmlOptionTag = function( option ) { 
    return "<option value=" + "'" + option + "'" + ">" + option + "</option>" 
}


Gradeshade.HTML.options = function( options ) {
    var acc = []
    for (i in options) {
      acc.push( Gradeshade.htmlOptionTag( options[i] ) )
    }
    // acc = acc.join( "\n" )
    return acc
}

Gradeshade.HTML.gradeOptions = Gradeshade.HTML.options( 
    Gradeshade.Constants.GRADES
)

Gradeshade.HTML.weightOptions = Gradeshade.HTML.options( 
    Gradeshade.Constants.WEIGHTS 
)

Gradeshade.Assignment.weightedFont = function( num ) {
    var delta = Gradeshade.Constants.FONT_DELTA * num / 100
    var ret = (Gradeshade.Constants.MIN_FONT_SIZE + delta) + "px"
    return ret
}

Gradeshade.Grade.present = function() {
    var num =  Gradeshade.Assignments.currentPointsNormalized(),
        ret
    if (num) {
      var letter = Gradeshade.numberToGrade( num );
      ret = "" + letter + " (" + num + "%)"; 
    }
    else {
      var affirmation = Gradeshade.HTML.randomAffirmation()
      ret = "A" + "<br>\n" + affirmation
    }
    return ret
}

Gradeshade.HTML.lastAffirmation = ""

Gradeshade.HTML.randomAffirmation = function() {
    var lastAff = Gradeshade.HTML.lastAffirmation 
    var newAff = Gradeshade.arraySample( Gradeshade.Constants.AFFIRMATIONS )
    while ( newAff == lastAff ) {
       newAff = Gradeshade.arraySample( Gradeshade.Constants.AFFIRMATIONS )
    }
    Gradeshade.HTML.lastAffirmation = newAff
    return newAff
}
                

Gradeshade.deleteAssignment = function(e) { 
    $(e).parent("div").remove() 
    if ( $("div.assignment").length == 0 ) {
        $( "button#gear" ).click()
    }
    Gradeshade.draw() // You have to manually call this. 
} 

Gradeshade.deleteAssignments = function() {
  $(".assignment").remove();
  Gradeshade.draw();
}


Gradeshade.HTML.new_assignment = function() {
    var ret = `
    <div class="assignment" id="assignment` + ++Gradeshade.Assignment.count + `">` +
      `
        <input class="name"   type="text" placeholder="?" value="">
        <select class="weight">
      ` + Gradeshade.HTML.weightOptions +
      `
        </select>
        <select class="grade">` +
            Gradeshade.HTML.gradeOptions +
      `
        </select>
        <span class="pointsRatio"></span>
        <button class="delete" onclick="Gradeshade.deleteAssignment(this)"> x </button>
    </div>
    `
    
  return ret
}

Gradeshade.HTML.pointsRatioPresent = function() {
     var grade = $(this).parent(".assignment").children(".grade").val() || "?"
     var weight = $(this).parent(".assignment").children(".weight").val()
     var earned = Gradeshade.gradeWeighted( grade, weight ) 
     earned = isNaN( earned ) ? "?" : earned
     var ret = "" + earned + " / " + weight
     return ret
}

Gradeshade.Graph = {

    drawBox: function ( assg, left ) {
        var unit = $( "#graph" ).height();
        var name = $( assg ).children( "input.name").val();
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
    },

    drawBoxes: function () {
        // Start from scratch, maybe implement as check/update
        $(".bar").remove()

        var unit = $("#graph").height();
        var sumOfPreviousWidths = 0;

        $(".assignment").each( function () {
            // Draw box
            Gradeshade.Graph.drawBox( $(this), sumOfPreviousWidths )

            // Keep summing widths for the next box.
            var width = $(this).children( "select.weight" ).val() * unit/100;
            sumOfPreviousWidths += width;
        })
    },

    // Set or get size of the graph
    // -> Number
    size: function ( num ) {
        if (num) {
            $("#graph").height( num );
            $("#graph").width( num );
        }
        else {
            $("#graph").height();
        }
        $("body").change()
        return $("#graph").height();
    }
};



// Events
jQuery(function() {

    // -> Number or NaN
    Gradeshade.Assignment.earned = function( assig ) {
        var grade = $(assig).children(".grade").val() || "?"
        var weight = $(assig).children(".weight").val()
        var earned = Gradeshade.gradeWeighted( grade, weight ) 
        var ret = parseFloat( earned )
        return ret
    }

    // -> Number
    Gradeshade.Assignment.possible = function( assig ) {
        var possible = $(assig).children(".weight").val() || 0
        var ret = parseFloat( possible )
        return ret
    }

    Gradeshade.HTML.deleteModeToggle = function() {
        if ( $("div.assignment").length == 0 ) {
          $("button#done").hide()
          $("button#add").show()
          return
        }

        $("button.delete").toggle()
        $("button#add").toggle()
        $("button#done").toggle()
    }

    Gradeshade.finish_basic_page = function() {

        $("button#gear").click( Gradeshade.HTML.deleteModeToggle )
        $("button#done").click( Gradeshade.HTML.deleteModeToggle )

        $("button#add").on( "click", function() {
            $("#totals").before( Gradeshade.HTML.new_assignment )
            $("input.name").last().focus()
            Gradeshade.draw()
        })
    } // CLOSES finish_basic_page - DON'T DELETE

    Gradeshade.Assignments.weightSum = function() {
        var sum = 0;
        var weights = jQuery(".weight");
        weights.each( function() {
            sum += parseFloat( $(this).val() )
        })
        return sum
    }

    // -> Number
    Gradeshade.Assignments.weightedPointsEarnedSum = function() {
        var sum = 0
        $(".assignment").each( function() {
             var earned = Gradeshade.Assignment.earned( this )
             sum += earned ? earned : 0
        })
        sum = sum.toFixed(1)
        return sum
    }

    Gradeshade.Assignments.weightedPointsPossibleSum = function() {
        var sum = 0
        $(".assignment").each( function() {
            var earned = Gradeshade.Assignment.earned( this )
            var possible = Gradeshade.Assignment.possible( this )
            sum += earned ? possible : 0
        })
        return sum
    }

    Gradeshade.Assignments.currentPointsNormalized = function() {
        
        var ratio =  Gradeshade.Assignments.weightedPointsEarnedSum() /
                     Gradeshade.Assignments.weightedPointsPossibleSum() 
        var normalized =  100 * ratio
        var rounded = parseFloat( normalized.toFixed( 1 ) )
        var ret = rounded
        return ret
    }

    Gradeshade.draw = function() {

        // Hide gear if there are no assignments.
        $("div.assignment").length == 0 ? $("#gear").hide() : $("#gear").show()

        // Force the default weight entry of 0
        $(".weight").each( function() {
            if ( !$(this).val() ) {
              $(this).val( 0 )
            }
        })

        $(".assignment *").each( function() {
            $(this).css("font-size", function() {
                var num = $(this).parent().children(".weight").val()
                var ret = Gradeshade.Assignment.weightedFont( num )
                return ret
            })
        })

        $("#weightSum").html( Gradeshade.Assignments.weightSum() )

        $("#weightSum").toggleClass( "warning", 
            (Gradeshade.Assignments.weightSum() != 100) 
        ) 


        $("span.pointsRatio").html( Gradeshade.HTML.pointsRatioPresent )

        
        $("#currentPoints").html( 
          Gradeshade.Assignments.weightedPointsEarnedSum() + " / " +
          Gradeshade.Assignments.weightedPointsPossibleSum()
        )
            
        $("#gradeCubeSays").html( Gradeshade.Grade.present() )
        
        // Graph
        Gradeshade.Graph.drawBoxes()

    } // Closes draw function. Don't delete.


    // Done - Start the loop
    Gradeshade.finish_basic_page()
    Gradeshade.draw()
    $("body").change( Gradeshade.draw )

}) // Closes ready function. Don't delete


Gradeshade.Examples = {
// Example: Basic - student has multiple weighted assignments.
    basic: function() {
        Gradeshade.deleteAssignments()
        Gradeshade.Assignment.count = 0;

        $("#totals").before( Gradeshade.HTML.new_assignment )
        $("#assignment1 input.name").val("Final")
        $("#assignment1 select.weight").val(40)
        $("#assignment1 select.grade").val(85)

        $("#totals").before( Gradeshade.HTML.new_assignment )
        $("#assignment2 input.name").val("Quiz")
        $("#assignment2 select.weight").val(30)
        $("#assignment2 select.grade").val(80)

        $("#totals").before( Gradeshade.HTML.new_assignment )
        $("#assignment3 input.name").val("Homework")
        $("#assignment3 select.weight").val(20)
        $("#assignment3 select.grade").val(75)

        $("#totals").before( Gradeshade.HTML.new_assignment )
        $("#assignment4 input.name").val("Participation")
        $("#assignment4 select.weight").val(10)
        $("#assignment4 select.grade").val(95)

        Gradeshade.draw()
    },

// Example: Student is just shy of an A
    onTheBubble: function() {
        Gradeshade.deleteAssignments()
        Gradeshade.Assignment.count = 0;

        $("#totals").before( Gradeshade.HTML.new_assignment )
        $("#assignment1 input.name").val("Final")
        $("#assignment1 select.weight").val(40)
        $("#assignment1 select.grade").val(89)

        $("#totals").before( Gradeshade.HTML.new_assignment )
        $("#assignment2 input.name").val("Quiz")
        $("#assignment2 select.weight").val(30)
        $("#assignment2 select.grade").val(89)

        $("#totals").before( Gradeshade.HTML.new_assignment )
        $("#assignment3 input.name").val("Homework")
        $("#assignment3 select.weight").val(20)
        $("#assignment3 select.grade").val(89)

        $("#totals").before( Gradeshade.HTML.new_assignment )
        $("#assignment4 input.name").val("Participation")
        $("#assignment4 select.weight").val(10)
        $("#assignment4 select.grade").val(89)

        Gradeshade.draw()
    }
};
