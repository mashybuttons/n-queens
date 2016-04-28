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
  var firstBoard = new Board({n: n});
  console.log('first first first board', JSON.stringify(firstBoard.rows()));
  var boardSize = firstBoard.get('n');
  var ans = 0;
  var iCount = 0;    //keep adding pices, until, both conflicts are false. then recurs on that spot
  

  // toggle row/col index that was passed in
  // if no conflicts
     //n rooks, add to ans
      // untoggle.
      // recurse to next node over row - 1 col + 1
    // check if end of row?
      //nope recurse(row + 1, col);
    // check if theres a next collum?
      //yes recurse(row, col + 1);
    
    // Need to know where we're at , which node to go to, and how to get there!



  // var recurs = function(rowIndex, colIndex, board) {
  //   console.log('board before', board.rows());
  //   board.togglePiece(rowIndex, colIndex);
  //   console.log(board.hasAnyRooksConflicts(), board.rows());

  //   if (board.hasAnyRooksConflicts() === false) {
  //     _.flatten(board.rows()).forEach(function(space) {
  //     if (space === 1) {
  //       iCount++;
  //     }
  //     });
  //     if (iCount === n) {
  //       iCount = 0;
  //       console.log('correct',board.rows());
  //       ans++;
  //     }
  //     if (board._isInBounds(rowIndex, colIndex + 1) === false && board._isInBounds(rowIndex + 1, 0)) {
  //       recurs(rowIndex + 1, 0, board);
  //     } else if (board._isInBounds(rowIndex, colIndex + 1) === true){
  //       recurs(rowIndex, colIndex + 1, board);
  //     } 
  //   }
  // };

  //   recurs(0, 0, firstBoard);
  
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
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
