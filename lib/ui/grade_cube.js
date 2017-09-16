
// App Namespace - Don't polute global namespace.
    var GradeCube = {};
    GradeCube.Constants = {};
    GradeCube.Number = {};
    GradeCube.Class = {};
    GradeCube.Class.Assignments = {};
    GradeCube.Class.Assignments.Assignment = {};
    GradeCube.Class.Cube = {};
    GradeCube.Class.Grade = {};

// Constants
    GradeCube.Constants.MAX_FONT_SIZE = 72;
    GradeCube.Constants.MIN_FONT_SIZE = 12;
    GradeCube.Constants.FONT_DELTA = 
        GradeCube.Constants.MAX_FONT_SIZE - GradeCube.Constants.MIN_FONT_SIZE; 

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
        else if ( num >=60 && num<70 ) { return "D";    }
        else if ( num <60 )            { return "F";    }
        else                           { return "Huh?"; }
    }

    GradeCube.Number.weighted = function( num, weight ) {
        return  (num * weight / 100).toFixed( 1 )
    }

    GradeCube.Class.Assignments.Assignment.weightedFont = function( num ) {
        var delta = GradeCube.Constants.FONT_DELTA * num / 100
        var ret = (GradeCube.Constants.MIN_FONT_SIZE + delta) + "px"
        return ret
    }

// Class Grade
    GradeCube.Class.Grade.number = function() {
        var calculation = null;
        var ret  = calculation 
        return ret
    }

    GradeCube.Class.Grade.letter = function() {
        return GradeCube.Number.toGrade( GradeCube.Class.Grade.number() )
    }

    GradeCube.Class.Grade.present = function( n ) {
        var num = n || GradeCube.Class.Grade.number();
        var letter = GradeCube.Number.toGrade( num );
        var ret = "" + letter + " (" + num + ")";
        return ret
    }
                
// Tests
    console.log( "MAIN TESTS")
    console.log( GradeCube.Number.normalize( 52 ) )
    console.log( GradeCube.Number.toGrade( "87 " ) )
    console.log( GradeCube.Class.Grade.number() )
    console.log( GradeCube.Class.Grade.letter() )
    console.log( GradeCube.Class.Grade.present() )
    console.log( "---" )


// Events
jQuery(function() {

    GradeCube.Class.Assignments.weightSum = function() {
        var sum = 0;
        var weights = jQuery(".weight");
        weights.each( function() {
            sum += parseFloat( $(this).val() )
        })
        return sum
    }

    var draw = function() {
        $(".assignment *").each( function() {
            $(this).css("font-size", function() {
                var num = $(this).parent().children(".weight").val()
                var ret = GradeCube.Class.Assignments.Assignment.weightedFont( num )
                return ret
            })
        })
        $("#classAssignmentsWeightSum").html( GradeCube.Class.Assignments.weightSum() )
        $("#classAssignmentsWeightSum").toggleClass( "warning", 
            (GradeCube.Class.Assignments.weightSum() != 100) 
        ) 
        $(".weightedPointsEarned").html( function() {
            var grade = $(this).parent(".assignment").children(".grade").val()
            var weight = $(this).parent(".assignment").children(".weight").val()
            var earned = GradeCube.Number.weighted( grade, weight )
            return earned
        })
        $(".weightedPointsPossible").html( function() {
            return $(this).parent(".assignment").children(".weight").val()
        })
        $("#classGradeNumber").html( function () {
            var sum = 0
            $(".weightedPointsEarned").each( function() { 
                var num = parseFloat ( $(this).html() ) 
                sum += num
            })
            var ret = sum.toFixed( 1 )
            return ret
        })
        $("#gradeCubeSays").html( GradeCube.Class.Grade.present( 
              $("#classGradeNumber").html())
        )
    } // Closes draw function. Don't delete.


    // Done Start the loop
    draw()
    $("body").change( draw )

})

