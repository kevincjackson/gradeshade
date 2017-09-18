
// App Namespace - Don't polute global namespace.
    var GradeCube = {};
    GradeCube.Constants = {};
    GradeCube.Number = {};
    GradeCube.Array = {};
    GradeCube.HTML = {};
    GradeCube.Assignments = {};
    GradeCube.Assignment = {};
    GradeCube.Assignment.count = 1;
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
      "(Hopefully.)", "Rock star you are!", "Let's do this." ]
    
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

    GradeCube.HTML.options = function( options ) {
        var acc = []
        for (i in options)
          acc.push(
            "<option value=" + "'" + options[i] + "'" + ">" + options[i] + "</option>" 
          )
        acc = acc.join( "\n" )
        return acc
    }

    GradeCube.HTML.gradeOptions = GradeCube.HTML.options( 
        [""].concat( GradeCube.Constants.GRADES)
    )

    GradeCube.HTML.weightOptions = GradeCube.HTML.options( 
        GradeCube.Constants.WEIGHTS 
    )
    
