
// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// universal find solution function
window.findSolution = function(row, n, board, validator, callback) {
  // if row count is equal to n, we have reached a valid solution
  if (row === n) {
    return callback()
  }

  for (var i = 0; i < n; i++) {
    board.togglePiece(row, i);
    if (!board[validator]()) {
      var result = findSolution (row + 1, n, board, validator, callback);
      if (result) {
        return result;
      }
    }
    // pick piece back up
    board.togglePiece(row, i);
  }
}

window.findNRooksSolution = function(n) {
  var board = new Board({'n': n});

  var solution = findSolution(0, n, board, 'hasAnyRooksConflicts', function() {
    return _.map(board.rows(), function(row) {
      return row.slice();
    })
  });

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({'n': n});

  findSolution(0, n, board, 'hasAnyRooksConflicts', function() {
    solutionCount++;
  })


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({'n': n});
  var solution = findSolution(0, n, board, 'hasAnyQueensConflicts', function() {
    return _.map(board.rows(), function(row) {
      return row.slice();
    });
  });

  // if no solution exists, return original board;
  solution = solution || board.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({'n': n});

  findSolution(0, n, board, 'hasAnyQueensConflicts', function() {
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
