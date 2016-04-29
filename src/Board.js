// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // var board = this.rows()
      // var row = board[rowIndex]
      var row = this.get(rowIndex);
      var piecesInRow = 0;
      var result;
      _.each(row, function(space) {
        if (space === 1) {
          piecesInRow++;
        }
      });
      return !(piecesInRow <= 1); 
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var board = this;
      var result = false;
      for (var i = 0; i < this.get('n'); i++) {
        result = result || board.hasRowConflictAt(i);
      }
      return result;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //find how many columns
      var board = this.rows();
      var colCount = this.get('n');
      var piecesInCol = 0;

      _.each(board, function(row) {
        if (row[colIndex] !== 0) {
          piecesInCol++;
        }
      });
      return !(piecesInCol <= 1); // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var board = this;
      var cols = this.get('n');
      var result = false;
      for (var i = 0; i < cols; i++) {
        result = result || board.hasColConflictAt(i);
      }
      return result; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //find length of board
      //count how many major diagnols

      var board = this.rows();
      var boardSize = this.get('n');
      //var diagonalCount = (2 * boardSize) - 1;
      var diagStart = majorDiagonalColumnIndexAtFirstRow;
      var negColCount = 0;
      var piecesInDiag = 0;
      var posColCount = diagStart;
      if (diagStart <= 0) {
        board = board.slice(Math.abs(diagStart));
        _.each(board, function(row) {
          if (row[negColCount] === 1) {
            piecesInDiag++;
          }
          negColCount++;

        });
      } else {
        _.each(board, function(row) {
          if (row[posColCount] === 1) {
            piecesInDiag++; 
          }
          posColCount++;
        });
      }
      
      return !(piecesInDiag <= 1); // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var board = this;
      var negColCount = -board.get('n');
      var posColCount = board.get('n');
      var result = false;
      // breaks everything but why?
     
      for (var i = negColCount + 1; i < posColCount; i++) {
        result = result || board.hasMajorDiagonalConflictAt(i);
      }


      return result; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var board = this.rows();
      var boardSize = this.get('n');
      //var diagonalCount = (2 * boardSize) - 1;
      var diagStart = minorDiagonalColumnIndexAtFirstRow;


      var negColCount = boardSize - 1;
      var piecesInDiag = 0;
      var posColCount = diagStart;

      if (diagStart >= boardSize) {
        board = board.slice(diagStart + 1 - boardSize);
        _.each(board, function(row) {
          if (row[negColCount] === 1) {
            piecesInDiag++;
          }
          negColCount--;

        });
      } else {
        _.each(board, function(row) {
          if (row[posColCount] === 1) {
            piecesInDiag++; 
          }
          posColCount--;
        });
      }
      
      return !(piecesInDiag <= 1); // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var board = this;
      var posColCount = board.get('n');
      var result = false;
      // breaks everything but why?
     
      for (var i = 0; i <= posColCount * 2 - 1; i++) {
        result = result || board.hasMinorDiagonalConflictAt(i);
      }


      return result; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
