GradeCube.Test = {}

GradeCube.Test.clearAssignments = function() {
  $(".assignment").remove();
  GradeCube.draw();
}

// Test Setup Some assignments
GradeCube.Test.testSetup = function() {

  GradeCube.Test.clearAssignments()
  GradeCube.Assignment.count = 0;

  $("#totals").before( GradeCube.HTML.new_assignment )
  $("#assignment1 input.name").val("Final")
  $("#assignment1 select.weight").val(40)
  $("#assignment1 select.grade").val(85)

  $("#totals").before( GradeCube.HTML.new_assignment )
  $("#assignment2 input.name").val("Quiz")
  $("#assignment2 select.weight").val(30)
  $("#assignment2 select.grade").val(80)

  $("#totals").before( GradeCube.HTML.new_assignment )
  $("#assignment3 input.name").val("Homework")
  $("#assignment3 select.weight").val(20)
  $("#assignment3 select.grade").val(75)

  $("#totals").before( GradeCube.HTML.new_assignment )
  $("#assignment4 input.name").val("Participation")
  $("#assignment4 select.weight").val(10)
  $("#assignment4 select.grade").val(95)

  GradeCube.draw()
}
