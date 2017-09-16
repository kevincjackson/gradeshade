
// App Namespace - Don't polute global namespace.
    var GradeCube = {};
    GradeCube.Constants = {};
    GradeCube.Number = {};
    GradeCube.Array = {};
    GradeCube.HTML = {};
    GradeCube.Assignments = {};
    GradeCube.Assignment = {};
    GradeCube.Cube = {};
    GradeCube.Grade = {};

// Constants
    GradeCube.Constants.MAX_FONT_SIZE = 72;
    GradeCube.Constants.MIN_FONT_SIZE = 12;
    GradeCube.Constants.FONT_DELTA = 
        GradeCube.Constants.MAX_FONT_SIZE - GradeCube.Constants.MIN_FONT_SIZE; 
    GradeCube.Constants.WEIGHTS = 
        [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]
    GradeCube.Constants.AFFIRMATIONS = [ "You got this.", "Might as well aim high.",
      "There's nothing you can't handle.", "(Hopefully.)", "Rock star you are.",
      "Let's do this." ]
    
    // IntervalToArray( 0, 2 ) // [0,1,2]
    // Set reverse with third option
    // IntervalToArray( 0, 2, "reverse" ) // [2,1,0]
    GradeCube.IntervalToArray = function(a,b,reverse) {
      var acc = []
      for (var i=a; i<=b; ++i) {
        acc.push( i )
      }
      acc = (reverse == "reverse") ? acc.reverse() : acc
      return acc
    }

    GradeCube.Constants.GRADES = GradeCube.IntervalToArray(0,110,"reverse")

    GradeCube.Array.sample = function( arr ) {
      var ran = Math.floor( Math.random() * arr.length )
      return arr[ran]
    }

// Number
// GradeCube.Number.normalize( 52 )    // 52
// GradeCube.Number.normalize( "52 " ) // 52
    GradeCube.Number.normalize = function( num ) {
        var string_num = String( num );
        var trimmed = string_num.replace(/(\r\n|\n|\r)/gm,"");
        var floated = parseFloat( trimmed );
        var ret = floated;
        return ret
    }

    GradeCube.Number.toGrade = function( num ) {
        num = GradeCube.Number.normalize( num )
        if      ( num >= 93 )          { return "A";    }
        else if ( num >=90 && num<93 ) { return "A-";   }
        else if ( num >=87 && num<90 ) { return "B+";   }
        else if ( num >=83 && num<87 ) { return "B";    }
        else if ( num >=80 && num<83 ) { return "B-";   }
        else if ( num >=77 && num<80 ) { return "C+";   }
        else if ( num >=73 && num<77 ) { return "C";    }
        else if ( num >=70 && num<73 ) { return "C-";   }
        else if ( num >=67 && num<70 ) { return "D+";    }
        else if ( num >=63 && num<67 ) { return "D";    }
        else if ( num >=60 && num<63 ) { return "D-";    }
        else if ( num <60 )            { return "F";    }
        else                           { return "Huh?"; }
    }

    GradeCube.Number.weighted = function( num, weight ) {
        return  (num * weight / 100).toFixed( 1 )
    }

    GradeCube.Assignment.weightedFont = function( num ) {
        var delta = GradeCube.Constants.FONT_DELTA * num / 100
        var ret = (GradeCube.Constants.MIN_FONT_SIZE + delta) + "px"
        return ret
    }

// Class Grade
    GradeCube.Grade.number = function() {
        var calculation = null;
        var ret  = calculation 
        return ret
    }

    GradeCube.Grade.letter = function() {
        return GradeCube.Number.toGrade( GradeCube.Grade.number() )
    }

    GradeCube.Grade.present = function() {
        var num =  GradeCube.Assignments.currentPointsNormalized(),
            ret
        if (num) {
          var letter = GradeCube.Number.toGrade( num );
          ret = "" + letter + " (" + num + "%)"; 
        }
        else {
          var affirmation = GradeCube.HTML.randomAffirmation()
          ret = "A" + "<br>\n" + affirmation
        }
        return ret
    }

    GradeCube.HTML.lastAffirmation = ""

    GradeCube.HTML.options = function( options ) {
        var acc = []
        for (i in options)
          acc.push(
            "<option value=" + "'" + options[i] + "'" + ">" + options[i] + "</option>" 
          )
        acc = acc.join( "\n" )
        return acc
    }

    GradeCube.HTML.randomAffirmation = function() {
        var lastAff = GradeCube.HTML.lastAffirmation 
        var newAff = GradeCube.Array.sample( GradeCube.Constants.AFFIRMATIONS )
        while ( newAff == lastAff ) {
           newAff = GradeCube.Array.sample( GradeCube.Constants.AFFIRMATIONS )
        }
        GradeCube.HTML.lastAffirmation = newAff
        return newAff
    }
                    
// Events
jQuery(function() {

    // -> Number or NaN
    GradeCube.Assignment.earned = function( assig ) {
        var grade = $(assig).children(".grade").val() || "?"
        var weight = $(assig).children(".weight").val()
        var earned = GradeCube.Number.weighted( grade, weight ) 
        var ret = parseFloat( earned )
        return ret
    }

    // -> Number
    GradeCube.Assignment.possible = function( assig ) {
        var possible = $(assig).children(".weight").val() || 0
        var ret = parseFloat( possible )
        return ret
    }

    GradeCube.finish_basic_page = function() {
        // add grade options
        $("select.grade").html( GradeCube.HTML.options(
              [""].concat( GradeCube.Constants.GRADES)) )
        // add weight options
        $("select.weight").html( GradeCube.HTML.options( GradeCube.Constants.WEIGHTS ) )
    }

    GradeCube.Assignments.weightSum = function() {
        var sum = 0;
        var weights = jQuery(".weight");
        weights.each( function() {
            sum += parseFloat( $(this).val() )
        })
        return sum
    }

    // -> Number
    GradeCube.Assignments.weightedPointsEarnedSum = function() {
        var sum = 0
        $(".assignment").each( function() {
             var earned = GradeCube.Assignment.earned( this )
             sum += earned ? earned : 0
        })
        return sum
    }

    GradeCube.Assignments.weightedPointsPossibleSum = function() {
        var sum = 0
        $(".assignment").each( function() {
            var earned = GradeCube.Assignment.earned( this )
            var possible = GradeCube.Assignment.possible( this )
            sum += earned ? possible : 0
        })
        return sum
    }

    GradeCube.Assignments.currentPointsNormalized = function() {
        
        var ratio =  GradeCube.Assignments.weightedPointsEarnedSum() /
                     GradeCube.Assignments.weightedPointsPossibleSum() 
        var normalized =  100 * ratio
        var rounded = parseFloat( normalized.toFixed( 1 ) )
        var ret = rounded
        return ret
    }

    GradeCube.draw = function() {
        // Force the default weight entry of 0
        $(".weight").each( function() {
            if ( !$(this).val() ) {
              $(this).val( 0 )
            }
        })

        $(".assignment *").each( function() {
            $(this).css("font-size", function() {
                var num = $(this).parent().children(".weight").val()
                var ret = GradeCube.Assignment.weightedFont( num )
                return ret
            })
        })
        $("#weightSum").html( GradeCube.Assignments.weightSum() )
        $("#weightSum").toggleClass( "warning", 
            (GradeCube.Assignments.weightSum() != 100) 
        ) 

        $("span.pointsRatio").html( function() {
             var grade = $(this).parent(".assignment").children(".grade").val() || "?"
             var weight = $(this).parent(".assignment").children(".weight").val()
             var earned = GradeCube.Number.weighted( grade, weight ) 
             earned = isNaN( earned ) ? "?" : earned
             var ret = "" + earned + " / " + weight
             return ret
        })
        
        $("#currentPoints").html( 
          GradeCube.Assignments.weightedPointsEarnedSum() + " / " +
          GradeCube.Assignments.weightedPointsPossibleSum()
        )
            
        $("#gradeCubeSays").html( GradeCube.Grade.present() )
    } // Closes draw function. Don't delete.


    // Done - Start the loop
    GradeCube.finish_basic_page()
    GradeCube.draw()
    $("body").change( GradeCube.draw )

}) // Closes ready function. Don't delete
