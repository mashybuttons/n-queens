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

  // var board = new Board({n:n});
  // var boardSize = board.get('n');
  // var ans = [];



  // function recurs () {
  //   // place peice.
  //   board.togglePice(rowIndex, colIndex);
  //   if (board.hasRowConflictAt(rowIndex) || board.hasColConflictAt(colIndex)){
  //     return;      
  //   }
  // }


  // }
  // //place one togglepiece first
  //   //recurs through that start point, and add pieces according to first piece
  //     //add this solution to the solutton count
  // //place new start point
  //   //do it again.

  //   //if at any point index repeates
  // recurs();


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n:n}); //fixme
  var rows =  _.range(n);
  var collums =  _.range(n);
  var randomIndex = Math.floor(Math.random() * rows.length);
  for(var i = 0; i < n; i++){
    for(var j = n; j > 0; j--) {
      solution.togglePiece(i, j)
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
