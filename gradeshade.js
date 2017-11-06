
// App Namespace - Don't polute global namespace.
var Gradeshade = {};
Gradeshade.HTML = {};
Gradeshade.Assignments = {};
Gradeshade.Assignment = {};
Gradeshade.Assignment.count = 1;
Gradeshade.deleteMode = false;
Gradeshade.Grade = {};

////////////////////////////////////////////////////////////////////////////////
// READY FUNCTION
////////////////////////////////////////////////////////////////////////////////
jQuery(function(){
//////////////////////////////////////////////////////////////////////////////// 
// Constants

Gradeshade.Constants = {
    MAX_FONT_SIZE: 36,
    MIN_FONT_SIZE: 12,
    AFFIRMATIONS: [ 
      "You got this.", 
      "Might as well aim high.", 
      "(Hopefully.)", 
      "Rock star you are!", 
      "Let's do this." 
    ]
}

// *Must* define outside of Constants instantion.
Gradeshade.Constants.FONT_DELTA = 
  (Gradeshade.Constants.MAX_FONT_SIZE - Gradeshade.Constants.MIN_FONT_SIZE);

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
      // DECIDE HOW TO DO AFFIRMATIONS
      // ret = "A" + "<br>\n" + affirmation 
      ret = "A !"
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
                
Gradeshade.aboutHandler = function() {
  if ( !$("#aboutRow").is(":visible") ) {
      $("#aboutRow").slideDown(100);
  }
  else  {
      $("#aboutRow").slideUp(1000);
  }
};

Gradeshade.startOver = function() {
  window.location= "./gradeshade.html"
}

Gradeshade.HTML.deleteAssignment = function( obj ) { 
    $( obj ).parent("div").remove() 
    if ( $("div.assignment").length <= 0 ) {
      Gradeshade.deleteMode = false;
      Gradeshade.startOver()
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
            <input class="name leftColumn leftColumnWide" type="text" placeholder="?" value="">
            <select class="weight middleColumn">
              <option value='0'>0</option><option value='5'>5</option><option value='10'>10</option><option value='15'>15</option><option value='20'>20</option><option value='25'>25</option><option value='30'>30</option><option value='35'>35</option><option value='40'>40</option><option value='45'>45</option><option value='50'>50</option><option value='55'>55</option><option value='60'>60</option><option value='65'>65</option><option value='70'>70</option><option value='75'>75</option><option value='80'>80</option><option value='85'>85</option><option value='90'>90</option><option value='95'>95</option><option value='100'>100</option>
            </select>
            <select class="grade rightColumn">
              <option value=''></option>
              <option value='110'>110</option><option value='109'>109</option><option value='108'>108</option><option value='107'>107</option><option value='106'>106</option><option value='105'>105</option><option value='104'>104</option><option value='103'>103</option><option value='102'>102</option><option value='101'>101</option>
              <option value='100'>100</option><option value='99'>99</option><option value='98'>98</option><option value='97'>97</option><option value='96'>96</option><option value='95'>95</option><option value='94'>94</option><option value='93'>93</option><option value='92'>92</option><option value='91'>91</option>
              <option value='90'>90</option><option value='89'>89</option><option value='88'>88</option><option value='87'>87</option><option value='86'>86</option><option value='85'>85</option><option value='84'>84</option><option value='83'>83</option><option value='82'>82</option><option value='81'>81</option>
              <option value='80'>80</option><option value='79'>79</option><option value='78'>78</option><option value='77'>77</option><option value='76'>76</option><option value='75'>75</option><option value='74'>74</option><option value='73'>73</option><option value='72'>72</option><option value='71'>71</option>
              <option value='70'>70</option><option value='69'>69</option><option value='68'>68</option><option value='67'>67</option><option value='66'>66</option><option value='65'>65</option><option value='64'>64</option><option value='63'>63</option><option value='62'>62</option><option value='61'>61</option>
              <option value='60'>60</option><option value='59'>59</option><option value='58'>58</option><option value='57'>57</option><option value='56'>56</option><option value='55'>55</option><option value='54'>54</option><option value='53'>53</option><option value='52'>52</option><option value='51'>51</option>
              <option value='50'>50</option><option value='49'>49</option><option value='48'>48</option><option value='47'>47</option><option value='46'>46</option><option value='45'>45</option><option value='44'>44</option><option value='43'>43</option><option value='42'>42</option><option value='41'>41</option>
              <option value='40'>40</option><option value='39'>39</option><option value='38'>38</option><option value='37'>37</option><option value='36'>36</option><option value='35'>35</option><option value='34'>34</option><option value='33'>33</option><option value='32'>32</option><option value='31'>31</option>
              <option value='30'>30</option><option value='29'>29</option><option value='28'>28</option><option value='27'>27</option><option value='26'>26</option><option value='25'>25</option><option value='24'>24</option><option value='23'>23</option><option value='22'>22</option><option value='21'>21</option>
              <option value='20'>20</option><option value='19'>19</option><option value='18'>18</option><option value='17'>17</option><option value='16'>16</option><option value='15'>15</option><option value='14'>14</option><option value='13'>13</option><option value='12'>12</option><option value='11'>11</option>
              <option value='10'>10</option><option value='9'>9</option><option value='8'>8</option><option value='7'>7</option><option value='6'>6</option><option value='5'>5</option><option value='4'>4</option><option value='3'>3</option><option value='2'>2</option><option value='1'>1</option><option value='0'>0</option>
            </select>
            <span class='pointsRatio'></span>
            <button class='deleteButton' onclick='Gradeshade.HTML.deleteAssignment(this)'>X</button> 
        </div>
    `
  return ret
}

Gradeshade.HTML.pointsRatioPresent = function() {
     var grade = $(this).parent(".assignment").children(".grade").val() || "?"
     var weight = $(this).parent(".assignment").children(".weight").val()
     var earned = Gradeshade.gradeWeighted( grade, weight ) 
     earned = isNaN( earned ) ? "?" : earned
     return "<sup>" + earned + "</sup>&frasl;<sub>" + weight + "</sub>"
}

Gradeshade.Graph = {

    drawBox: function ( assg, left ) {
        var unit = $( "#graph" ).height();
        var name = $( assg ).children( "input.name").val();
        var width = $( assg ).children( "select.weight" ).val() * unit/100;
        var height = $( assg ).children( "select.grade" ).val() * unit/100;
        var pointsRatio = $( assg ).children( "span.pointsRatio" ).html()
        var barId = $( assg ).attr("id") + "_bar"
        var barHTML = '<div class="bar" '  + 'id=' + '"' + barId + '"' +  '></div>'

        $("#graph").append( barHTML )
        var bar = $( "#" + barId )

        bar.html( name + "<br>" + pointsRatio )
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
//jQuery(function() {

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
        Gradeshade.deleteMode = !Gradeshade.deleteMode;

        // Convenience - automatically exit deleteMode
        //   if there's no more assignments.
        if ( $("div.assignment").length <= 0 ) {
          Gradeshade.deleteMode = false;
          Gradeshade.startOver()
        }

        Gradeshade.draw()
    };

    Gradeshade.finish_basic_page = function() {

        $("#addButton").on( "click", function() {
            $("#formTop").append( Gradeshade.HTML.new_assignment )
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

////////////////////////////////////////////////////////////////////////////////
// DRAW
////////////////////////////////////////////////////////////////////////////////

    Gradeshade.draw = function() {

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

        // MAYBE
        // TODO subtract from above instead of fixing right now...
        $(".deleteButton").css("font-size", "10px")

        // DELETE MODE
        if (Gradeshade.deleteMode) {
          $(".leftColumn").removeClass("leftColumnWide")
          $(".leftColumn").addClass("leftColumnNarrow")
          $(".deleteButton").show()
          $("#editUI").show()
          $("#normalUI").hide()
        }
        else {
          $(".leftColumn").removeClass("leftColumnNarrow")
          $(".leftColumn").addClass("leftColumnWide")
          $(".deleteButton").hide()
          $("#editUI").hide()
          $("#normalUI").show()
        }

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

//}) // Closes ready function. Don't delete

////////////////////////////////////////////////////////////////////////////////
// EXAMPLES
////////////////////////////////////////////////////////////////////////////////

Gradeshade.Examples = {
// Example: Basic - student has multiple weighted assignments.
    basic: function() {
        Gradeshade.deleteAssignments()
        Gradeshade.Assignment.count = 0;
        Gradeshade.deleteMode = false;

        $("#formTop").append( Gradeshade.HTML.new_assignment )
        $("#assignment1 input.name").val("Final")
        $("#assignment1 select.weight").val(40)
        $("#assignment1 select.grade").val(85)

        $("#formTop").append( Gradeshade.HTML.new_assignment )
        $("#assignment2 input.name").val("Quiz")
        $("#assignment2 select.weight").val(30)
        $("#assignment2 select.grade").val(80)

        $("#formTop").append( Gradeshade.HTML.new_assignment )
        $("#assignment3 input.name").val("Homework")
        $("#assignment3 select.weight").val(20)
        $("#assignment3 select.grade").val(75)

        $("#formTop").append( Gradeshade.HTML.new_assignment )
        $("#assignment4 input.name").val("Participation")
        $("#assignment4 select.weight").val(10)
        $("#assignment4 select.grade").val(95)

        Gradeshade.draw()
    },

// Example: Student is just shy of an A
    onTheBubble: function() {
        Gradeshade.deleteAssignments()
        Gradeshade.Assignment.count = 0;
        Gradeshade.deleteMode = false;

        $("#formTop").append( Gradeshade.HTML.new_assignment )
        $("#assignment1 input.name").val("Final")
        $("#assignment1 select.weight").val(40)
        $("#assignment1 select.grade").val(89)

        $("#formTop").append( Gradeshade.HTML.new_assignment )
        $("#assignment2 input.name").val("Quiz")
        $("#assignment2 select.weight").val(30)
        $("#assignment2 select.grade").val(89)

        $("#formTop").append( Gradeshade.HTML.new_assignment )
        $("#assignment3 input.name").val("Homework")
        $("#assignment3 select.weight").val(20)
        $("#assignment3 select.grade").val(89)

        $("#formTop").append( Gradeshade.HTML.new_assignment )
        $("#totals").before( Gradeshade.HTML.new_assignment )
        $("#assignment4 input.name").val("Participation")
        $("#assignment4 select.weight").val(10)
        $("#assignment4 select.grade").val(89)

        Gradeshade.draw()
    }
};

})
