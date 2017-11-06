HTMLHelper.options = function( options ) {
    var acc = []
    for (i in options) {
      acc.push( "<option value='" + option[i] + "'>" + option[i] + "</option>" );
    }
    return acc
}
