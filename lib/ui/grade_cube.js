
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

    GradeCube.HTML.randomAffirmation = function() {
        var lastAff = GradeCube.HTML.lastAffirmation 
        var newAff = GradeCube.Array.sample( GradeCube.Constants.AFFIRMATIONS )
        while ( newAff == lastAff ) {
           newAff = GradeCube.Array.sample( GradeCube.Constants.AFFIRMATIONS )
        }
        GradeCube.HTML.lastAffirmation = newAff
        return newAff
    }
                    

    GradeCube.HTML.delete_parent_div = function(e) { 
      $(e).parent("div").remove() 
      if ( $("div.assignment").length == 0 ) {
        $( "button#gear" ).click()
      }
      GradeCube.draw() // You have to manually call this. 
    } 

    GradeCube.HTML.new_assignment = function() {

      var ret = `
        <div class="assignment" id="assignment` + ++GradeCube.Assignment.count + `">` +
          `
            <input class="name"   type="text" placeholder="?" value="">
            <select class="weight">
          ` + GradeCube.HTML.weightOptions +
          `
            </select>
            <select class="grade">` +
                GradeCube.HTML.gradeOptions +
          `
            </select>
            <span class="pointsRatio"></span>
            <button class="delete" onclick="GradeCube.HTML.delete_parent_div(this)"> X </button>
        </div>
        `
        
      return ret
    }

    GradeCube.HTML.pointsRatioPresent = function() {
         var grade = $(this).parent(".assignment").children(".grade").val() || "?"
         var weight = $(this).parent(".assignment").children(".weight").val()
         var earned = GradeCube.Number.weighted( grade, weight ) 
         earned = isNaN( earned ) ? "?" : earned
         var ret = "" + earned + " / " + weight
         return ret
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

    GradeCube.HTML.deleteModeToggle = function() {
        if ( $("div.assignment").length == 0 ) {
          $("button#done").hide()
          $("button#add").show()
          return
        }

        $("button.delete").toggle()
        $("button#add").toggle()
        $("button#done").toggle()
    }

    GradeCube.finish_basic_page = function() {

        $("button#gear").click( GradeCube.HTML.deleteModeToggle )
        $("button#done").click( GradeCube.HTML.deleteModeToggle )

        $("button#add").on( "click", function() {
            $("#totals").before( GradeCube.HTML.new_assignment )
            $("input.name").last().focus()
            GradeCube.draw()
        })

    } // CLOSES finish_basic_page - DON'T DELETE

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
        sum = sum.toFixed(1)
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
                var ret = GradeCube.Assignment.weightedFont( num )
                return ret
            })
        })

        $("#weightSum").html( GradeCube.Assignments.weightSum() )

        $("#weightSum").toggleClass( "warning", 
            (GradeCube.Assignments.weightSum() != 100) 
        ) 


        $("span.pointsRatio").html( GradeCube.HTML.pointsRatioPresent )

        
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
