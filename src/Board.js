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
      //get the desired row / set up count
      var row = this.get(rowIndex);

      var count = 0;
      // go through each index of the row
      for (var i = 0; i < row.length; i++) {
      // find sum of row
        count += row[i];
      }
      // if count > 1
      //console.log('this is the row ', row , 'this is our test ' , count > 1);
      return (count > 1);
        // return false
      // else return true
      //return false; // fixme

    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // access the whole board
      // how do we access the whole board? if we know the size we can access all the rows
      var size = this.get('n');
      // console.log('this is our size', size);
      // loop through each row to see if it has conflict
      for (var i = 0; i < size; i++) {
        // if row has no conflict continue - this is where we use hasRowConflictAt
        // if row has conflict return false
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
      //return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //get number of columns, which is n
      var size = this.get('n');
      // make count variable
      var count = 0;

      // loop through each row
      for (var i = 0; i < size; i++) {
      // add index zero of current row to count
        var row = this.get(i);
        count += row[colIndex];
      }

      // if count greater than 1 
      return (count > 1);
        //return true


      // if not return false; // fixme

    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // find number of columns
      var columns = this.get('n');
      // loop through each columns to see if it has conflict
      for (var i = 0; i < columns; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      //  if it has conflict
        // return true
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //get the size of the board
      var cols = this.get('n');
      //counter for number of instances
      var count = 0;
      //console.log('this is the first index ', majorDiagonalColumnIndexAtFirstRow );
      //iterate over each row
      if (majorDiagonalColumnIndexAtFirstRow >= 0) {
        for (var i = 0; i < cols - majorDiagonalColumnIndexAtFirstRow; i++ ) {  // makes sure we dont add undefined      
          //access the index + 1 on each row
          var row = this.get(i);
          count += row[majorDiagonalColumnIndexAtFirstRow + i];
           //if index + 1 is greater than one
            // return true
            // return false
        } 
        return (count > 1);
      }
      if (majorDiagonalColumnIndexAtFirstRow < 0) {
        var startAt = Math.abs(majorDiagonalColumnIndexAtFirstRow);
        //console.log('This is our input' ,majorDiagonalColumnIndexAtFirstRow, 'This is where we start', startAt);
        for (var j = 0; j < cols - startAt; j++) {
        //debugger;
          var row = this.get(startAt + j);
          count += row[j];

        }
        return (count > 1);
      }
      // console.log('this is the row ', row , 'this is our test ' , count > 1);
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //get board size (find n)
      // start at -n loop all the way to n
      // call hasMajorDiagonal on n
      var size = this.get('n');
      for (var i = -size; i <= size; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
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
