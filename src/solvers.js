/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = new Board({'n': n}); //fixme
  var size = n;
  for (var i = 0; i < size; i++) {
    solution.get(i)[i] = 1;
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme
  // //tracker to keep track of our location
  // var colIdx = 0;
  // //tracker for rows
  // var rowIdx = 0;
  // //get first row
  // var currentRow = solution.get(rowIdx);

  // //add a rook to the first location, (cc)
  // currentRow[colIdx] = 1;
  // //add a roook to second location, (cc)
  // for (var i = colIdx; i < currentRow.length; i++) {
  //   //check for conflics
  //   debugger;
  //   if (solution.hasAnyRowConflicts() || solution.hasAnyRowConflicts()) {
  //     console.log('move index')
  //     currentRow[colIdx] = 0;
  //     colIdx++
  //   } 
  //   currentRow
  //   //if no conflics ? 

  //   //if conflics ?
  // }
  

    //if no conflics drop rook

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
