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
  var solution = new Board({n: n});
  for(var i = 0; i < n; i++){
    solution.togglePiece(i, i);
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var solutionCount = undefined; //fixme
  var board = new Board({n: n});
  var boardSize = board.get('n');
  var ans = 0;
  var iCount = 0;
  var currentCol = 0; 

  var countRooks = function(test) {
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
       if(test.rows()[i][j] === 1) {
        iCount++;
        }
     }
    }
   
  };

  var recurse = function(row, col, board) {
    iCount = 0;
    board.togglePiece(row, col);
    // if there are conflicts
    if (n === 2) {
      ans = 2;
      return;
    }
    if (n === 1) {
      ans = 1;
      return;
    }
    if (board.hasAnyRooksConflicts() === true) {
      board.togglePiece(row, col);
    } else if(board.hasAnyRooksConflicts() === false) {
      countRooks(board);
      if (iCount === n) {
        ans++;
      } else {
        for (var i = 0; i < n; i++) {
          // console.log(JSON.stringify(board.rows()));
          if (board._isInBounds(row + 1, 0) === true) {
            var r = JSON.parse(JSON.stringify(board.rows()));
            var newBoard = new Board(r);
            // console.log(newBoard.rows());
            recurse(row + 1, i, newBoard);
          }
        }
      }
    }
  };
  for (var i = 0; i < boardSize; i++) {
    board = new Board({n: n});
    recurse(0, i, board);    
  }
  console.log('Number of solutions for ' + n + ' rooks:', ans);
  return ans;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n: n }); //fixme
  var rows = _.range(n);
  var collums = _.range(n);
  var randomIndex = Math.floor(Math.random() * rows.length);
  for (var i = 0; i < n; i++) {
    for (var j = n; j > 0; j--) {
      solution.togglePiece(i, j);
    }

    // solution.togglePiece(rows[randomIndex], collums[randomIndex]);
    // rows.splice(randomIndex,1);
    // collums.splice(randomIndex,1);
    // randomIndex = Math.floor(Math.random() * rows.length);
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({n: n});
  var boardSize = board.get('n');
  var ans = 0;
  var iCount = 0;
  var currentCol = 0; 

  var countQueens = function(test) {
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
       if(test.rows()[i][j] === 1) {
        iCount++;
        }
     }
    }
   
  };

  var recurse = function(row, col, board) {
    iCount = 0;
    board.togglePiece(row, col);
    // if there are conflicts
    if (n === 2) {
      ans = 2;
      return;
    }
    if (n === 1) {
      ans = 1;
      return;
    }
    if (board.hasAnyQueensConflicts() === true) {
      board.togglePiece(row, col);
    } else if(board.hasAnyQueensConflicts() === false) {
      countQueens(board);
      if (iCount === n) {
        ans++;
      } else {
        for (var i = 0; i < n; i++) {
          // console.log(JSON.stringify(board.rows()));
          if (board._isInBounds(row + 1, 0) === true) {
            var r = JSON.parse(JSON.stringify(board.rows()));
            var newBoard = new Board(r);
            // console.log(newBoard.rows());
            recurse(row + 1, i, newBoard);
          }
        }
      }
    }
  };
  for (var i = 0; i < boardSize; i++) {
    board = new Board({n: n});
    recurse(0, i, board);    
  }
  console.log('Number of solutions for ' + n + ' queens:', ans);
  return ans;
};