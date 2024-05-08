/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Ships = __webpack_require__(/*! ./ships */ "./src/ships.js");
var Board = /*#__PURE__*/function () {
  function Board() {
    _classCallCheck(this, Board);
    this.board = this.generateBoard();
    this.carrier = new Ships(5, 0, false, "Crr", "Carrier");
    this.battleship = new Ships(4, 0, false, "Bat", "Battleship");
    this.cruiser = new Ships(3, 0, false, "Cru", "Cruiser");
    this.submarine = new Ships(3, 0, false, "Sub", "Submarine");
    this.destroyer = new Ships(2, 0, false, "Des", "Destroyer");
  }
  _createClass(Board, [{
    key: "generateBoard",
    value: function generateBoard() {
      var board = [];
      for (var i = 0; i < 10; i++) {
        var boardRow = [];
        for (var j = 0; j < 10; j++) {
          boardRow.push(j);
        }
        board.push(boardRow);
      }
      return board;
    }
  }, {
    key: "placeShip",
    value: function placeShip(ship, rowCoord, colCoord, direction) {
      var coordValue = this.board[rowCoord][colCoord];
      if (direction === "horizontal" && colCoord + ship.length > this.board[rowCoord].length) {
        return false;
      }
      if (direction === "vertical" && rowCoord + ship.length > this.board.length) {
        return false;
      }
      for (var i = 0; i < ship.length; i++) {
        if (direction === "horizontal") {
          if (typeof this.board[rowCoord][colCoord + i] === "string") {
            return false;
          }
        } else if (direction === "vertical") {
          if (typeof this.board[rowCoord + i][colCoord] === "string") {
            return false;
          }
        }
      }
      if (typeof coordValue == "number" && coordValue <= 9) {
        if (direction === "horizontal") {
          var _this$board$rowCoord;
          var arr = [];
          for (var _i = 0; _i < ship.length; _i++) {
            arr.push(ship.boardName);
          }
          (_this$board$rowCoord = this.board[rowCoord]).splice.apply(_this$board$rowCoord, [colCoord, ship.length].concat(arr));
          return this;
        } else if (direction === "vertical") {
          for (var _i2 = 0; _i2 < ship.length; _i2++) {
            this.board[rowCoord + _i2].splice(colCoord, 1, ship.boardName);
          }
          return this;
        } else {
          return this;
        }
      }
    }
  }, {
    key: "receiveAttack",
    value: function receiveAttack(rowCoord, colCoord) {
      var coordValue = this.board[rowCoord][colCoord];
      if (typeof coordValue == "number") {
        this.board[rowCoord].splice(colCoord, 1, "Miss");
        return this;
      } else if (coordValue == "Hit" || coordValue == "Miss") {
        console.log("You cannot hit the same place twice");
        return this;
      } else {
        var ship = this.findShipByName(coordValue);
        ship.hit();
        this.board[rowCoord].splice(colCoord, 1, "Hit");
        this.allShipsSunk();
      }
      return this;
    }
  }, {
    key: "findShipByName",
    value: function findShipByName(name) {
      if (name === "Crr") {
        return this.carrier;
      }
      if (name === "Bat") {
        return this.battleship;
      }
      if (name === "Cru") {
        return this.cruiser;
      }
      if (name === "Sub") {
        return this.submarine;
      }
      if (name === "Des") {
        return this.destroyer;
      }
    }
  }, {
    key: "allShipsSunk",
    value: function allShipsSunk() {
      for (var _i3 = 0, _arr = [this.carrier, this.battleship, this.cruiser, this.submarine, this.destroyer]; _i3 < _arr.length; _i3++) {
        var ship = _arr[_i3];
        if (!ship || !ship.sunk) {
          return false;
        }
      }
      console.log("All Ships Have Been Sunk. You Win");
      return true;
    }
  }]);
  return Board;
}();
module.exports = Board;

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ (() => {

// const initializeGameUI = () => {
//   const content = document.querySelector(".content");

//   const title = document.createElement("h1");
//   title.innerText = "Battleships";
//   content.appendChild(title);
// };

// const formContainer = document.createElement("div");
// const playerNameLabel = document.createElement("label");
// const playerNameForm = document.createElement("form");
// const playerNameButton = document.createElement("button");
// playerNameButton.className = "player-name-button";
// const playerNameInput = document.createElement("input");
// playerNameInput.className = "player-name-input";
// playerNameLabel.textContent = "Enter Your Name";
// playerNameButton.textContent = "Start";
// playerNameForm.appendChild(playerNameInput);
// formContainer.appendChild(playerNameLabel);
// formContainer.appendChild(playerNameForm);
// formContainer.appendChild(playerNameButton);
// content.appendChild(formContainer);

// const boardsContainer = document.createElement("div");
// boardsContainer.className = "boards-container";
// content.appendChild(boardsContainer);

// const myBoardContainer = document.createElement("div");
// const myBoardTitle = document.createElement("h2");
// // myBoardTitle.innerText = "Your Board";

// const myBoardGrid = document.createElement("div");
// myBoardGrid.className = "grid-container";

// const computerBoardContainer = document.createElement("div");
// const computerBoardTitle = document.createElement("h2");
// computerBoardTitle.innerText = "Opponent Board";

// const computerBoardGrid = document.createElement("div");
// computerBoardGrid.className = "grid-container";

// boardsContainer.appendChild(myBoardContainer);
// myBoardContainer.appendChild(myBoardTitle);
// myBoardContainer.appendChild(myBoardGrid);
// boardsContainer.appendChild(computerBoardContainer);
// computerBoardContainer.appendChild(computerBoardTitle);
// computerBoardContainer.appendChild(computerBoardGrid);

// // boardsContainer.style.display = "none";
// // Reveal this again to hid boards after name input

// const renderMyBoard = (myBoardGrid, arr) => {};

// const renderComputerBoard = (computerBoardGrid, arr) => {};

// renderMyBoard(arr) {
//   myBoardGrid.innerHTML = "";
//   let flatArr = arr.flat();
//   for (let i = 0; i <= 99; i++) {
//     let item = document.createElement("div");
//     item.innerText = flatArr[i];
//     item.className = "square";
//     this.myBoardSquares(item);
//     myBoardGrid.appendChild(item);

//     this.myBoardShipSelect(item, i, arr);

//     ////// Need this to only happen before the start of the game:
//     placePlayerShip(item, flatArr);
//   }
// }

// myBoardSquares(item) {
//   if (item.innerText === "Hit") {
//     item.style.backgroundColor = "red";
//   }
//   if (item.innerText === "Miss") {
//     item.style.backgroundColor = "green";
//   }
// }

// myBoardShipSelect(item, index, arr) {
//   let row = Math.floor(index / 10);
//   let column = index % 10;

//   item.addEventListener("click", () => {
//     playerObject.myBoard.placeShip(playerObject.myBoard.carrier, row, column, "horizontal");
//     // playerObject.myBoard.placeShip(playerObject.myBoard.battleship, 1, 0, "vertical");
//     // playerObject.myBoard.placeShip(playerObject.myBoard.cruiser, 4, 3, "horizontal");
//     // playerObject.myBoard.placeShip(playerObject.myBoard.submarine, 5, 4, "vertical");
//     // playerObject.myBoard.placeShip(playerObject.myBoard.destroyer, 8, 6, "vertical");
//     this.renderMyBoard(arr);
//   });
// }

// renderComputerBoard(arr) {
//   let flatArr = arr.flat();

//   for (let i = 0; i <= 99; i++) {
//     let item = document.createElement("div");
//     item.innerText = flatArr[i];
//     item.className = "square";
//     computerBoardGrid.appendChild(item);
//     // item.style.color = "yellow";
//     // This will make the text invisible again

//     this.computerBoardSquares(item, i);
//   }
// }

// computerBoardSquares(item, index) {
//   const shipValues = ["Crr", "Bat", "Cru", "Sub", "Des"];
//   const row = Math.floor(index / 10);
//   const column = index % 10;

//   item.addEventListener("click", () => {
//     if (!playerObject.playerTurn) return;
//     if (shipValues.includes(item.innerText)) {
//       item.style.backgroundColor = "red";
//       item.innerText = "HIT!";
//       item.style.color = "black";
//       item.style.pointerEvents = "none";
//       playerObject.myAttack(row, column);
//       // console.log("compboard", playerObject.computerBoard.board);
//       // console.log("myboard", playerObject.myBoard.board);
//     } else {
//       item.style.backgroundColor = "green";
//       item.innerText = "MISS";
//       item.style.color = "black";
//       item.style.pointerEvents = "none";
//       playerObject.myAttack(row, column);
//       playerObject.playerTurn = false;
//       // console.log("compboard", playerObject.computerBoard.board);
//       // console.log("myboard", playerObject.myBoard.board);
//     }
//   });
// }

// module.exports = { initializeGameUI, renderMyBoard, renderComputerBoard };

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_battleship_logo_jpg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/battleship-logo.jpg */ "./src/assets/battleship-logo.jpg");
/* module decorator */ module = __webpack_require__.hmd(module);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Board = __webpack_require__(/*! ./board */ "./src/board.js");

var content = document.querySelector(".content");
var titleImage = document.createElement("img");
titleImage.src = _assets_battleship_logo_jpg__WEBPACK_IMPORTED_MODULE_0__;
titleImage.className = "title-image";
content.appendChild(titleImage);
var formContainer = document.createElement("div");
formContainer.className = "form-container";
var playerNameLabel = document.createElement("label");
var playerNameForm = document.createElement("form");
var playerNameButton = document.createElement("button");
playerNameButton.className = "player-name-button";
var playerNameInput = document.createElement("input");
playerNameInput.className = "player-name-input";
playerNameLabel.textContent = "Enter Your Name";
playerNameButton.textContent = "Start";
playerNameForm.appendChild(playerNameInput);
formContainer.appendChild(playerNameLabel);
formContainer.appendChild(playerNameForm);
formContainer.appendChild(playerNameButton);
content.appendChild(formContainer);
var axisButton = document.createElement("button");
axisButton.innerText = "Horizontal";
content.appendChild(axisButton);
var boardsContainer = document.createElement("div");
boardsContainer.className = "boards-container";
content.appendChild(boardsContainer);
var myBoardContainer = document.createElement("div");
var myBoardTitle = document.createElement("h2");
var myBoardGrid = document.createElement("div");
myBoardGrid.className = "grid-container";
var computerBoardGrid = document.createElement("div");
computerBoardGrid.className = "grid-container";
var computerBoardContainer = document.createElement("div");
var computerBoardTitle = document.createElement("h2");
computerBoardTitle.innerText = "Opponent Board";
boardsContainer.appendChild(myBoardContainer);
myBoardContainer.appendChild(myBoardTitle);
myBoardContainer.appendChild(myBoardGrid);
boardsContainer.appendChild(computerBoardContainer);
computerBoardContainer.appendChild(computerBoardTitle);
computerBoardContainer.appendChild(computerBoardGrid);

// const { renderMyBoard, renderComputerBoard } = require("./dom");

boardsContainer.style.display = "none";
myBoardContainer.style.display = "none";
computerBoardContainer.style.display = "none";
axisButton.style.display = "none";
var orientation = "horizontal";
var changeAxis = function changeAxis() {
  if (axisButton.innerText === "Horizontal") {
    axisButton.innerText = "Vertical";
    orientation = "vertical";
  } else if (axisButton.innerText === "Vertical") {
    axisButton.innerText = "Horizontal";
    orientation = "horizontal";
  }
};
axisButton.addEventListener("click", changeAxis);
var Player = /*#__PURE__*/function () {
  function Player() {
    _classCallCheck(this, Player);
    this.myBoard = new Board();
    this.computerBoard = new Board();
    this.computerAttacks = [];
    this.playerTurn = true;
    this.compShipPlacement();
    this.currentShipIndex = 0;
  }
  _createClass(Player, [{
    key: "compShipPlacement",
    value: function compShipPlacement() {
      var flattenedBoard = this.computerBoard.board.flat();
      var stringsToCheck = ["Crr", "Bat", "Cru", "Sub", "Des"];
      var areAllStringsPresent = stringsToCheck.every(function (str) {
        return flattenedBoard.includes(str);
      });
      if (!areAllStringsPresent) {
        var ships = [this.computerBoard.carrier, this.computerBoard.battleship, this.computerBoard.cruiser, this.computerBoard.submarine, this.computerBoard.destroyer];
        for (var _i = 0, _ships = ships; _i < _ships.length; _i++) {
          var ship = _ships[_i];
          var placed = false;
          while (!placed) {
            var direction = this.randomDirection();
            var result = this.computerBoard.placeShip(ship, Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), direction);
            if (result) {
              placed = true;
            }
          }
        }
        this.renderComputerBoard(this.computerBoard.board);
      } else {
        return;
      }
    }
  }, {
    key: "randomDirection",
    value: function randomDirection() {
      var randomNumber = Math.random();
      if (randomNumber < 0.5) {
        return "horizontal";
      } else {
        return "vertical";
      }
    }
  }, {
    key: "myAttack",
    value: function myAttack(coord1, coord2) {
      var _this = this;
      if (!this.playerTurn) return;
      var result = this.computerBoard.receiveAttack(coord1, coord2);
      var coordValue = this.computerBoard.board[coord1][coord2];
      console.log("coordValue", coordValue);
      setTimeout(function () {
        _this.compAttack();
      }, 1000);
      this.playerTurn = false;
      return result;
    }
  }, {
    key: "compAttack",
    value: function compAttack() {
      var _this2 = this;
      var coord1, coord2, coordValue, result;
      var attackAfterOneSecond = function attackAfterOneSecond() {
        coord1 = Math.floor(Math.random() * 10);
        coord2 = Math.floor(Math.random() * 10);
        coordValue = _this2.myBoard.board[coord1][coord2];
        result = _this2.myBoard.receiveAttack(coord1, coord2);
        _this2.refreshMyBoardAfterCompAttack();
        console.log("compCordValue", coordValue);
        if (typeof coordValue === "number" || coordValue === "Crr" || coordValue === "Bat" || coordValue === "Cru" || coordValue === "Sub" || coordValue === "Des") {
          _this2.playerTurn = true;
        } else {
          setTimeout(attackAfterOneSecond, 1000);
        }
      };
      attackAfterOneSecond();
      return result;
    }
  }, {
    key: "refreshMyBoardAfterCompAttack",
    value: function refreshMyBoardAfterCompAttack() {
      this.renderMyBoard(this.myBoard.board);
    }
  }, {
    key: "renderMyBoard",
    value: function renderMyBoard(arr) {
      myBoardGrid.innerHTML = "";
      var flatArr = arr.flat();
      for (var i = 0; i <= 99; i++) {
        var item = document.createElement("div");
        item.innerText = flatArr[i];
        item.className = "square";
        this.myBoardSquares(item);
        myBoardGrid.appendChild(item);
        this.myBoardShipSelect(item, i, arr);
      }
    }
  }, {
    key: "myBoardSquares",
    value: function myBoardSquares(item) {
      var stringsToCheck = ["Crr", "Bat", "Cru", "Sub", "Des"];
      if (stringsToCheck.includes(item.innerText)) {
        item.style.backgroundColor = "black";
        item.style.color = "black";
      } else if (item.innerText === "Hit") {
        item.style.backgroundColor = "red";
        item.style.color = "red";
      } else if (item.innerText === "Miss") {
        item.style.backgroundColor = "green";
        item.style.color = "green";
      } else {
        item.style.color = "rgb(241, 240, 240)";
      }
    }

    // need to highlight where the ship will be placed
    // need to disable event listener if too close to the edge of the board
    // create a toggle button instead of a prompt - done!
    // hide then only reveal computer board once all ships have been selected - done!
    // change input to just enter input
    // Need a dialogue instruction box
    // Need to get rid of the extra turn since it is not a battleship rule
  }, {
    key: "myBoardShipSelect",
    value: function myBoardShipSelect(item, index, arr) {
      var _this3 = this;
      var row = Math.floor(index / 10);
      var column = index % 10;
      var clickHandler = function clickHandler() {
        var currentShip = _this3.getCurrentShipToPlace();
        var lcOrientation = orientation.toLowerCase();
        if (lcOrientation === "horizontal" || lcOrientation === "vertical") {
          playerObject.myBoard.placeShip(currentShip, row, column, lcOrientation);
          _this3.currentShipIndex++;
          _this3.renderMyBoard(arr);
        }
      };
      item.addEventListener("click", clickHandler);
      if (this.currentShipIndex === 5) {
        item.removeEventListener("click", clickHandler);
        computerBoardContainer.style.display = "block";
        axisButton.style.display = "none";
      }
    }
  }, {
    key: "getCurrentShipToPlace",
    value: function getCurrentShipToPlace() {
      var ships = [this.myBoard.carrier, this.myBoard.battleship, this.myBoard.cruiser, this.myBoard.submarine, this.myBoard.destroyer];
      return ships[this.currentShipIndex];
    }
  }, {
    key: "renderComputerBoard",
    value: function renderComputerBoard(arr) {
      var flatArr = arr.flat();
      for (var i = 0; i <= 99; i++) {
        var item = document.createElement("div");
        item.innerText = flatArr[i];
        item.className = "square";
        computerBoardGrid.appendChild(item);
        item.style.color = "rgb(241, 240, 240)";
        // This will make the text invisible again

        this.computerBoardSquares(item, i);
      }
    }
  }, {
    key: "computerBoardSquares",
    value: function computerBoardSquares(item, index) {
      var shipValues = ["Crr", "Bat", "Cru", "Sub", "Des"];
      var row = Math.floor(index / 10);
      var column = index % 10;
      item.addEventListener("click", function () {
        if (!playerObject.playerTurn) return;
        if (shipValues.includes(item.innerText)) {
          item.style.backgroundColor = "red";
          item.style.color = "red";
          item.style.pointerEvents = "none";
          playerObject.myAttack(row, column);
          // console.log("compboard", playerObject.computerBoard.board);
          // console.log("myboard", playerObject.myBoard.board);
        } else {
          item.style.backgroundColor = "green";
          item.style.color = "green";
          item.style.pointerEvents = "none";
          playerObject.myAttack(row, column);
          playerObject.playerTurn = false;
          // console.log("compboard", playerObject.computerBoard.board);
          // console.log("myboard", playerObject.myBoard.board);
        }
      });
    }
  }]);
  return Player;
}();
var playerObject;
playerNameButton.addEventListener("click", function (event) {
  event.preventDefault();
  playerObject = new Player();
  playerObject.renderMyBoard(playerObject.myBoard.board);
  myBoardTitle.innerText = "".concat(playerNameInput.value, "'s Board");
  boardsContainer.style.display = "flex";
  myBoardContainer.style.display = "block";
  formContainer.style.display = "none";
  playerNameInput.value = "";
  axisButton.style.display = "grid";
});
module.exports = Player;

/***/ }),

/***/ "./src/ships.js":
/*!**********************!*\
  !*** ./src/ships.js ***!
  \**********************/
/***/ ((module) => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Ships = /*#__PURE__*/function () {
  function Ships(length, timesHit, sunk, boardName, fullName) {
    _classCallCheck(this, Ships);
    this.length = length;
    this.timesHit = timesHit;
    this.sunk = sunk;
    this.boardName = boardName;
    this.fullName = fullName;
  }
  _createClass(Ships, [{
    key: "hit",
    value: function hit() {
      this.timesHit++;
      this.isSunk();
      return this;
    }
  }, {
    key: "isSunk",
    value: function isSunk() {
      if (this.timesHit === this.length) {
        this.sunk = true;
      }
      return this;
    }
  }]);
  return Ships;
}();
module.exports = Ships;

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `img {
  height: auto;
  width: 10px;
}

.form-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.player-name-button {
  width: 50px;
}

.boards-container {
  display: flex;
  gap: 100px;
  justify-content: center;
}

.grid-container {
  display: grid;
  grid-template-rows: repeat(10, 40px);
  grid-template-columns: repeat(10, 40px);
  background-color: rgb(241, 240, 240);
  border: 1px solid black;
}

.grid-container > div {
  border: 1px solid black;
}

.square {
  cursor: pointer;
}

.ship-buttons-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ship-select-item {
  background-color: rgb(241, 240, 240);
  border: 1px solid black;
}

.carrier-select-container {
  display: grid;
  grid-template-rows: repeat(1, 40px);
  grid-template-columns: repeat(5, 40px);
  cursor: pointer;
}

.carrier-select-container > div {
  border: 1px solid black;
}

.battleship-select-container {
  display: grid;
  grid-template-rows: repeat(1, 40px);
  grid-template-columns: repeat(4, 40px);
  cursor: pointer;
}

.battleship-select-container > div {
  border: 1px solid black;
}

.cruiser-select-container {
  display: grid;
  grid-template-rows: repeat(1, 40px);
  grid-template-columns: repeat(3, 40px);
  cursor: pointer;
}

.cruiser-select-container > div {
  border: 1px solid black;
}

.submarine-select-container {
  display: grid;
  grid-template-rows: repeat(1, 40px);
  grid-template-columns: repeat(3, 40px);
}

.submarine-select-container > div {
  border: 1px solid black;
  cursor: pointer;
}

.destroyer-select-container {
  display: grid;
  grid-template-rows: repeat(1, 40px);
  grid-template-columns: repeat(2, 40px);
  cursor: pointer;
}

.destroyer-select-container > div {
  border: 1px solid black;
}`, "",{"version":3,"sources":["webpack://./src/styles/main.scss"],"names":[],"mappings":"AAEA;EACE,YAAA;EACA,WAAA;AADF;;AAMA;EACE,aAAA;EACA,uBAAA;EACA,sBAAA;AAHF;;AAMA;EACE,WAAA;AAHF;;AAQA;EACE,aAAA;EACA,UAAA;EACA,uBAAA;AALF;;AAQA;EACE,aAAA;EACA,oCAAA;EACA,uCAAA;EACA,oCAAA;EACA,uBAAA;AALF;;AAQA;EACE,uBAAA;AALF;;AAQA;EACE,eAAA;AALF;;AAUA;EACE,aAAA;EACA,sBAAA;EACA,SAAA;AAPF;;AAUA;EACE,oCAAA;EACA,uBAAA;AAPF;;AAYA;EACE,aAAA;EACA,mCAAA;EACA,sCAAA;EACA,eAAA;AATF;;AAYA;EACE,uBAAA;AATF;;AAcA;EACE,aAAA;EACA,mCAAA;EACA,sCAAA;EACA,eAAA;AAXF;;AAcA;EACE,uBAAA;AAXF;;AAgBA;EACE,aAAA;EACA,mCAAA;EACA,sCAAA;EACA,eAAA;AAbF;;AAgBA;EACE,uBAAA;AAbF;;AAkBA;EACE,aAAA;EACA,mCAAA;EACA,sCAAA;AAfF;;AAkBA;EACE,uBAAA;EACA,eAAA;AAfF;;AAoBA;EACE,aAAA;EACA,mCAAA;EACA,sCAAA;EACA,eAAA;AAjBF;;AAoBA;EACE,uBAAA;AAjBF","sourcesContent":["// TITLE IMAGE\r\n\r\nimg {\r\n  height: auto;\r\n  width: 10px;\r\n}\r\n\r\n// FORM\r\n\r\n.form-container {\r\n  display: flex;\r\n  justify-content: center;\r\n  flex-direction: column;\r\n}\r\n\r\n.player-name-button {\r\n  width: 50px;\r\n}\r\n\r\n// BOARDS\r\n\r\n.boards-container {\r\n  display: flex;\r\n  gap: 100px;\r\n  justify-content: center;\r\n}\r\n\r\n.grid-container {\r\n  display: grid;\r\n  grid-template-rows: repeat(10, 40px);\r\n  grid-template-columns: repeat(10, 40px);\r\n  background-color: rgb(241, 240, 240);\r\n  border: 1px solid black;\r\n}\r\n\r\n.grid-container > div {\r\n  border: 1px solid black;\r\n}\r\n\r\n.square {\r\n  cursor: pointer;\r\n}\r\n\r\n// SHIP SELECT\r\n\r\n.ship-buttons-container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 10px;\r\n}\r\n\r\n.ship-select-item {\r\n  background-color: rgb(241, 240, 240);\r\n  border: 1px solid black;\r\n}\r\n\r\n/////////////////CARRIER\r\n\r\n.carrier-select-container {\r\n  display: grid;\r\n  grid-template-rows: repeat(1, 40px);\r\n  grid-template-columns: repeat(5, 40px);\r\n  cursor: pointer;\r\n}\r\n\r\n.carrier-select-container > div {\r\n  border: 1px solid black;\r\n}\r\n\r\n/////////////////BATTLESHIP\r\n\r\n.battleship-select-container {\r\n  display: grid;\r\n  grid-template-rows: repeat(1, 40px);\r\n  grid-template-columns: repeat(4, 40px);\r\n  cursor: pointer;\r\n}\r\n\r\n.battleship-select-container > div {\r\n  border: 1px solid black;\r\n}\r\n\r\n////////////////CRUISER\r\n\r\n.cruiser-select-container {\r\n  display: grid;\r\n  grid-template-rows: repeat(1, 40px);\r\n  grid-template-columns: repeat(3, 40px);\r\n  cursor: pointer;\r\n}\r\n\r\n.cruiser-select-container > div {\r\n  border: 1px solid black;\r\n}\r\n\r\n//////////////SUBMARINE\r\n\r\n.submarine-select-container {\r\n  display: grid;\r\n  grid-template-rows: repeat(1, 40px);\r\n  grid-template-columns: repeat(3, 40px);\r\n}\r\n\r\n.submarine-select-container > div {\r\n  border: 1px solid black;\r\n  cursor: pointer;\r\n}\r\n\r\n///////////////DESTROYER\r\n\r\n.destroyer-select-container {\r\n  display: grid;\r\n  grid-template-rows: repeat(1, 40px);\r\n  grid-template-columns: repeat(2, 40px);\r\n  cursor: pointer;\r\n}\r\n\r\n.destroyer-select-container > div {\r\n  border: 1px solid black;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/battleship-logo.jpg":
/*!****************************************!*\
  !*** ./src/assets/battleship-logo.jpg ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "battleship-logo.jpg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships */ "./src/ships.js");
/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ships__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./board */ "./src/board.js");
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_board__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles/main.scss */ "./src/styles/main.scss");






// Next Steps
// Recursion?? - if computer hits a previous Miss or achieves a Hit, it goes again? - Done!
// The player gets another turn it if achieves a Hit - Done!
// Player squares need to be deactivated until computer places hit - Done!
// Allow Player to input name (need to replace all stephens here) - Done!
// Stop Comp ships from intersecting - Done!
// Allow Player to place ships
// Apply ship images to the board
// Need to show once all of a ship as sunk, once whole length hit in Dom
// Add sound effects and maybe one second delay before player can click again (if they achieve a hit)
// Improve the computer AI
// Separate DOM from player class - figure out what the issue is with importing
// Player class needs major refactorin - figure out what the Player import bug is

// const shipSelectContainer = document.createElement("div");
// shipSelectContainer.className = "ship-select-container";

// ////////////////////////CARRIER///CAN GO BACK INTO PLAYER CLASS AFTER

// const carrierTitle = document.createElement("p");
// carrierTitle.innerText = "Carrier";
// let carrierSelect = document.createElement("div");
// carrierSelect.className = "carrier-select-container";

// for (let i = 0; i <= 4; i++) {
//   shipSelectItem = document.createElement("div");
//   shipSelectItem.innerText = "Crr";
//   shipSelectItem.className = "ship-select-item";
//   carrierSelect.appendChild(shipSelectItem);
// }

// //////////////////////BATTLESHIP

// const battleshipTitle = document.createElement("p");
// battleshipTitle.innerText = "Battleship";
// let battleshipSelect = document.createElement("div");
// battleshipSelect.className = "battleship-select-container";

// for (let i = 0; i <= 3; i++) {
//   shipSelectItem = document.createElement("div");
//   shipSelectItem.innerText = "Bat";
//   shipSelectItem.className = "ship-select-item";
//   battleshipSelect.appendChild(shipSelectItem);
// }

// ///////////////////////CRUISER

// const cruiserTitle = document.createElement("p");
// cruiserTitle.innerText = "Cruiser";
// let cruiserSelect = document.createElement("div");
// cruiserSelect.className = "cruiser-select-container";

// for (let i = 0; i <= 2; i++) {
//   shipSelectItem = document.createElement("div");
//   shipSelectItem.innerText = "Cru";
//   shipSelectItem.className = "ship-select-item";
//   cruiserSelect.appendChild(shipSelectItem);
// }

// /////////////////////SUBMARINE

// const submarineTitle = document.createElement("p");
// submarineTitle.innerText = "Submarine";
// let submarineSelect = document.createElement("div");
// submarineSelect.className = "submarine-select-container";

// for (let i = 0; i <= 2; i++) {
//   shipSelectItem = document.createElement("div");
//   shipSelectItem.innerText = "Sub";
//   shipSelectItem.className = "ship-select-item";
//   submarineSelect.appendChild(shipSelectItem);
// }

// /////////////////////DESTROYER

// const destroyerTitle = document.createElement("p");
// destroyerTitle.innerText = "Destroyer";
// let destroyerSelect = document.createElement("div");
// destroyerSelect.className = "destroyer-select-container";

// for (let i = 0; i <= 1; i++) {
//   shipSelectItem = document.createElement("div");
//   shipSelectItem.innerText = "Des";
//   shipSelectItem.className = "ship-select-item";
//   destroyerSelect.appendChild(shipSelectItem);
// }

// shipSelectContainer.appendChild(carrierTitle);
// shipSelectContainer.appendChild(carrierSelect);
// shipSelectContainer.appendChild(battleshipTitle);
// shipSelectContainer.appendChild(battleshipSelect);
// shipSelectContainer.appendChild(cruiserTitle);
// shipSelectContainer.appendChild(cruiserSelect);
// shipSelectContainer.appendChild(submarineTitle);
// shipSelectContainer.appendChild(submarineSelect);
// shipSelectContainer.appendChild(destroyerTitle);
// shipSelectContainer.appendChild(destroyerSelect);
// boardsContainer.appendChild(shipSelectContainer);
})();

/******/ })()
;
//# sourceMappingURL=bundle6bbaf74cf0356e074fda.js.map