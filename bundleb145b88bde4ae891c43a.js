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
        } else if (direction === "vertical") {
          for (var _i2 = 0; _i2 < ship.length; _i2++) {
            this.board[rowCoord + _i2].splice(colCoord, 1, ship.boardName);
          }
        }
        ship.startRow = rowCoord;
        ship.startColumn = colCoord;
        return this;
      }
      return false;
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
        this.areAllShipsSunk();
      }
      return this;
    }
  }, {
    key: "receiveMyAttack",
    value: function receiveMyAttack(rowCoord, colCoord) {
      var coordValue = this.board[rowCoord][colCoord];
      if (typeof coordValue == "number") {
        this.board[rowCoord].splice(colCoord, 1, "Miss");
        return this;
      } else if (coordValue.startsWith("Hit") || coordValue == "Miss" || coordValue == "Sunk") {
        console.log("You cannot hit the same place twice");
        return this;
      } else {
        var ship = this.findShipByName(coordValue);
        ship.hit();
        this.board[rowCoord].splice(colCoord, 1, "Hit ".concat(ship.boardName));
        this.areAllShipsSunk();
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
    key: "areAllShipsSunk",
    value: function areAllShipsSunk() {
      for (var _i3 = 0, _arr = [this.carrier, this.battleship, this.cruiser, this.submarine, this.destroyer]; _i3 < _arr.length; _i3++) {
        var ship = _arr[_i3];
        if (!ship || !ship.sunk) {
          return false;
        }
      }
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getShipImage: () => (/* binding */ getShipImage),
/* harmony export */   initializeDom: () => (/* binding */ initializeDom)
/* harmony export */ });
/* harmony import */ var _assets_battleship_logo_jpg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/battleship-logo.jpg */ "./src/assets/battleship-logo.jpg");
/* harmony import */ var _assets_battleship_PNG__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/battleship.PNG */ "./src/assets/battleship.PNG");
/* harmony import */ var _assets_carrier_PNG__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/carrier.PNG */ "./src/assets/carrier.PNG");
/* harmony import */ var _assets_cruiser_PNG__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/cruiser.PNG */ "./src/assets/cruiser.PNG");
/* harmony import */ var _assets_destroyer_PNG__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/destroyer.PNG */ "./src/assets/destroyer.PNG");
/* harmony import */ var _assets_submarine_PNG__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets/submarine.PNG */ "./src/assets/submarine.PNG");
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./styles/main.scss */ "./src/styles/main.scss");







var initializeDom = function initializeDom() {
  var content = document.querySelector(".content");
  var titleImage = document.createElement("img");
  titleImage.src = _assets_battleship_logo_jpg__WEBPACK_IMPORTED_MODULE_0__;
  titleImage.className = "title-image";
  var imageContainer = document.createElement("div");
  imageContainer.className = "image-container";
  imageContainer.appendChild(titleImage);
  content.appendChild(imageContainer);
  var formContainer = document.createElement("div");
  formContainer.className = "form-container";
  var playerNameLabel = document.createElement("label");
  playerNameLabel.className = "player-name-label";
  var playerNameForm = document.createElement("form");
  var playerNameInput = document.createElement("input");
  playerNameInput.className = "player-name-input";
  playerNameLabel.textContent = "Enter Your Name";
  playerNameForm.appendChild(playerNameInput);
  formContainer.appendChild(playerNameLabel);
  formContainer.appendChild(playerNameForm);
  content.appendChild(formContainer);
  var boardsOuterContainer = document.createElement("div");
  boardsOuterContainer.className = "boards-outer-container";
  content.appendChild(boardsOuterContainer);
  var display = document.createElement("p");
  display.className = "display";
  boardsOuterContainer.appendChild(display);
  display.style.display = "none";
  var axisButton = document.createElement("button");
  axisButton.innerText = "Horizontal";
  axisButton.className = "axis-button";
  boardsOuterContainer.appendChild(axisButton);
  var boardsContainer = document.createElement("div");
  boardsContainer.className = "boards-container";
  boardsOuterContainer.appendChild(boardsContainer);
  var myBoardContainer = document.createElement("div");
  var myBoardTitle = document.createElement("h2");
  myBoardTitle.className = "board-title";
  var myBoardGrid = document.createElement("div");
  myBoardGrid.className = "grid-container";
  var computerBoardGrid = document.createElement("div");
  computerBoardGrid.className = "grid-container";
  var computerBoardContainer = document.createElement("div");
  var computerBoardTitle = document.createElement("h2");
  computerBoardTitle.innerText = "Opponent Board";
  computerBoardTitle.className = "board-title";
  boardsContainer.appendChild(myBoardContainer);
  myBoardContainer.appendChild(myBoardTitle);
  myBoardContainer.appendChild(myBoardGrid);
  boardsContainer.appendChild(computerBoardContainer);
  computerBoardContainer.appendChild(computerBoardTitle);
  computerBoardContainer.appendChild(computerBoardGrid);
  boardsContainer.style.display = "none";
  myBoardContainer.style.display = "none";
  computerBoardContainer.style.display = "none";
  axisButton.style.display = "none";
  var winnerContainer = document.createElement("div");
  winnerContainer.className = "winner-container";
  var winnerDisplay = document.createElement("p");
  winnerDisplay.className = "winner-display";
  var playAgainButton = document.createElement("button");
  playAgainButton.className = "axis-button";
  playAgainButton.innerText = "Play Again";
  winnerContainer.appendChild(winnerDisplay);
  winnerContainer.appendChild(playAgainButton);
  content.appendChild(winnerContainer);
  winnerDisplay.innerText = "";
  winnerContainer.style.display = "none";
  return {
    content: content,
    titleImage: titleImage,
    imageContainer: imageContainer,
    formContainer: formContainer,
    playerNameLabel: playerNameLabel,
    playerNameForm: playerNameForm,
    playerNameInput: playerNameInput,
    boardsOuterContainer: boardsOuterContainer,
    display: display,
    axisButton: axisButton,
    boardsContainer: boardsContainer,
    myBoardContainer: myBoardContainer,
    myBoardTitle: myBoardTitle,
    myBoardGrid: myBoardGrid,
    computerBoardGrid: computerBoardGrid,
    computerBoardContainer: computerBoardContainer,
    computerBoardTitle: computerBoardTitle,
    winnerContainer: winnerContainer,
    winnerDisplay: winnerDisplay,
    playAgainButton: playAgainButton
  };
};
var getShipImage = function getShipImage(ship) {
  switch (ship.fullName) {
    case "Carrier":
      return _assets_carrier_PNG__WEBPACK_IMPORTED_MODULE_2__;
    case "Battleship":
      return _assets_battleship_PNG__WEBPACK_IMPORTED_MODULE_1__;
    case "Cruiser":
      return _assets_cruiser_PNG__WEBPACK_IMPORTED_MODULE_3__;
    case "Submarine":
      return _assets_submarine_PNG__WEBPACK_IMPORTED_MODULE_5__;
    case "Destroyer":
      return _assets_destroyer_PNG__WEBPACK_IMPORTED_MODULE_4__;
    default:
      return "";
  }
};

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./board */ "./src/board.js");
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_board__WEBPACK_IMPORTED_MODULE_1__);
/* module decorator */ module = __webpack_require__.hmd(module);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Remaining problems
// 1) shipImage vertical alignment - done!
// 2) computerBoard ship Images disappearing - done
// additonal - horizontal computer ships need realigning - done!
//additional - first click on shipImage always goes to the first child square! - done (made images only appear after ship sunk)
// 3) Improving computer AI
// 4) Refactor, if possible
// 5) Fine tune the display
// 6) Polish the design - add a sound to hit or miss?
// 7) Readme. Can check a video
// 8) Get it to display properly on Github pages
// make sure pointer isn't on myBoard



document.addEventListener("DOMContentLoaded", function () {
  var dom = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.initializeDom)();
  var axisButton = dom.axisButton;
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
      this.myBoard = new (_board__WEBPACK_IMPORTED_MODULE_1___default())();
      this.computerBoard = new (_board__WEBPACK_IMPORTED_MODULE_1___default())();
      this.computerAttacks = [];
      this.playerTurn = true;
      this.currentShipIndex = 0;
      this.currentDisplayIndex = 0;
      this.previousHitArr = [];
      this.shipPositions = [];
      this.computerShipPositions = [];
      this.compShipPlacement();
      this.renderComputerBoard(this.computerBoard.board);
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
                this.recordComputerShipPosition(ship, ship.startRow, ship.startColumn, direction);
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
        this.allShipsSunk();
        this.compShipSunk();
        setTimeout(function () {
          _this.compAttack();
          _this.myShipSunk();
        }, 100);
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
          _this2.previousHitArr.push(coordValue);
          console.log(_this2.previousHitArr);
          if (typeof _this2.previousHitArr[_this2.previousHitArr.length - 1] === "string") {
            console.log("this is a string");
            result = _this2.myBoard.receiveMyAttack(coord1, coord2);
          } else if (typeof _this2.previousHitArr[_this2.previousHitArr.length - 1] === "number" || _typeof(_this2.previousHitArr[_this2.previousHitArr.length - 1]) === undefined) {
            console.log("this is a number");
            result = _this2.myBoard.receiveMyAttack(coord1, coord2);
          }
          if (typeof coordValue === "number" || coordValue === "Crr" || coordValue === "Bat" || coordValue === "Cru" || coordValue === "Sub" || coordValue === "Des") {
            _this2.playerTurn = true;
            _this2.refreshMyBoardAfterCompAttack();
            _this2.myShipSunk();
            _this2.allShipsSunk();
          } else {
            setTimeout(attackAfterOneSecond, 0);
          }
        };
        attackAfterOneSecond();
        this.refreshMyBoardAfterCompAttack();
        return result;
      }
    }, {
      key: "compAdjacentTargets",
      value: function compAdjacentTargets(row, col) {
        var _this3 = this;
        var adjacentTargets = [[row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]];
        adjacentTargets.forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            row = _ref2[0],
            column = _ref2[1];
          if (row >= 10 && row < 10 && column >= 10 && column < 10 && typeof _this3.myBoard.board[row][column] === "number") {
            _this3.previousHitArr.push([row, column]);
            _this3.myBoard.receiveMyAttack(row, column);
          }
        });
      }
    }, {
      key: "refreshMyBoardAfterCompAttack",
      value: function refreshMyBoardAfterCompAttack() {
        this.renderMyBoard(this.myBoard.board);
      }
    }, {
      key: "renderMyBoard",
      value: function renderMyBoard(arr) {
        dom.myBoardGrid.innerHTML = "";
        var flatArr = arr.flat();
        for (var i = 0; i <= 99; i++) {
          var item = document.createElement("div");
          item.innerText = flatArr[i];
          item.className = "square";
          this.myBoardSquares(item);
          dom.myBoardGrid.appendChild(item);
          this.myBoardShipSelect(item, i, arr);
        }
        this.shipPositions.forEach(function (_ref3, index) {
          var ship = _ref3.ship,
            row = _ref3.row,
            column = _ref3.column,
            orientation = _ref3.orientation;
          var startSquare = dom.myBoardGrid.children[row * 10 + column];
          var squareContent = document.createElement("div");
          startSquare.appendChild(squareContent);
          var shipImage = document.createElement("img");
          shipImage.className = "ship-image";
          shipImage.id = "ship".concat(index + 1);
          shipImage.src = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.getShipImage)(ship);
          if (orientation === "vertical") {
            shipImage.classList.add("vertical");
          }
          squareContent.appendChild(shipImage);
          if (orientation === "horizontal") {
            shipImage.style.width = "".concat(ship.length * 42, "px");
            shipImage.style.height = "40px";
          } else if (orientation === "vertical") {
            shipImage.style.width = "".concat(ship.length * 42, "px");
            shipImage.style.height = "40px";
            shipImage.style.transform = "rotate(90deg)";
          }
        });
      }
    }, {
      key: "myBoardSquares",
      value: function myBoardSquares(item) {
        var stringsToCheck = ["Crr", "Bat", "Cru", "Sub", "Des"];
        if (stringsToCheck.includes(item.innerText)) {
          item.style.color = "transparent";
        } else if (item.innerText === "Sunk") {
          item.style.backgroundColor = "purple";
          item.style.border = "2px solid black";
        } else if (item.innerText.startsWith("Hit")) {
          item.innerHTML = '<div class="dot red-dot"></div>';
          dom.display.innerText = "The opponent has hit your ship";
        } else if (item.innerText === "Miss") {
          item.innerHTML = '<div class="dot black-dot"></div>';
          dom.display.innerText = "The opponent has missed";
        } else {
          // item.style.color = "rgb(241, 240, 240)";
        }
      }
    }, {
      key: "myBoardShipSelect",
      value: function myBoardShipSelect(item, index, arr) {
        var _this4 = this;
        var row = Math.floor(index / 10);
        var column = index % 10;
        var currentShip = this.getCurrentShipToPlace();
        var nextDisplay = this.getCurrentShipToDisplay();
        var isPlacementValid = function isPlacementValid(row, column, ship, orientation) {
          for (var i = 0; i < ship.length; i++) {
            var newRow = void 0,
              newColumn = void 0;
            if (orientation === "horizontal") {
              newRow = row;
              newColumn = column + i;
            } else if (orientation === "vertical") {
              newRow = row + i;
              newColumn = column;
            }
            if (newRow >= 10 || newColumn >= 10) {
              return false;
            }
            if (typeof arr[newRow][newColumn] !== "number") {
              return false;
            }
          }
          return true;
        };
        var highlightSquares = function highlightSquares() {
          if (!isPlacementValid(row, column, currentShip, orientation)) {
            return;
          }
          for (var i = 0; i < currentShip.length; i++) {
            var newRow = void 0,
              newColumn = void 0;
            if (orientation === "horizontal") {
              newRow = row;
              newColumn = column + i;
            } else if (orientation === "vertical") {
              newRow = row + i;
              newColumn = column;
            }
            if (newRow >= 0 && newRow < 10 && newColumn >= 0 && newColumn < 10) {
              var squareIndex = newRow * 10 + newColumn;
              var square = dom.myBoardGrid.children[squareIndex];
              square.classList.add("highlight");
            }
          }
        };
        var removeHighlight = function removeHighlight() {
          var highlightSquares = dom.myBoardGrid.querySelectorAll(".highlight");
          highlightSquares.forEach(function (square) {
            square.classList.remove("highlight");
          });
        };
        var clickHandler = function clickHandler() {
          if (isPlacementValid(row, column, currentShip, orientation)) {
            playerObject.myBoard.placeShip(currentShip, row, column, orientation);
            playerObject.recordShipPosition(currentShip, row, column, orientation);
            _this4.currentShipIndex++;
            _this4.currentDisplayIndex++;
            _this4.renderMyBoard(arr);
            dom.display.innerText = "".concat(nextDisplay);
            removeHighlight();
            item.removeEventListener("mouseenter", highlightSquares);
            item.removeEventListener("mouseleave", removeHighlight);
          } else {
            dom.display.innerText = "Invalid placement for ".concat(currentShip.fullName, ". Try again");
          }
        };
        item.addEventListener("mouseenter", highlightSquares);
        item.addEventListener("mouseleave", removeHighlight);
        item.addEventListener("click", clickHandler);
        if (this.currentShipIndex === 5) {
          item.removeEventListener("mouseenter", highlightSquares);
          item.removeEventListener("mouseleave", removeHighlight);
          item.removeEventListener("click", clickHandler);
          dom.computerBoardContainer.style.display = "block";
          axisButton.style.display = "none";
        }
      }
    }, {
      key: "recordShipPosition",
      value: function recordShipPosition(ship, row, column, orientation) {
        this.shipPositions.push({
          ship: ship,
          row: row,
          column: column,
          orientation: orientation
        });
      }
    }, {
      key: "recordComputerShipPosition",
      value: function recordComputerShipPosition(ship, row, column, orientation) {
        this.computerShipPositions.push({
          ship: ship,
          row: row,
          column: column,
          orientation: orientation
        });
      }
    }, {
      key: "getCurrentShipToPlace",
      value: function getCurrentShipToPlace() {
        var ships = [this.myBoard.carrier, this.myBoard.battleship, this.myBoard.cruiser, this.myBoard.submarine, this.myBoard.destroyer];
        return ships[this.currentShipIndex];
      }
    }, {
      key: "getCurrentShipToDisplay",
      value: function getCurrentShipToDisplay() {
        var ships = ["Place the Battleship", "Place the Cruiser", "Place the Submarine", "Place the Destroyer", "".concat(playerName, "'s Turn.  Place a hit on your Opponent's Board. Good Luck!!")];
        return ships[this.currentDisplayIndex];
      }
    }, {
      key: "renderComputerBoard",
      value: function renderComputerBoard(arr) {
        dom.computerBoardGrid.innerHTML = "";
        var flatArr = arr.flat();
        for (var i = 0; i <= 99; i++) {
          var item = document.createElement("div");
          item.innerText = flatArr[i];
          item.className = "square";
          dom.computerBoardGrid.appendChild(item);
          this.computerBoardSquares(item, i, arr);
        }
        this.renderComputerShipImages();
      }

      // Combine this with with the myBoard Image rendering
    }, {
      key: "renderComputerShipImages",
      value: function renderComputerShipImages() {
        this.computerShipPositions.forEach(function (_ref4, index) {
          var ship = _ref4.ship,
            row = _ref4.row,
            column = _ref4.column,
            orientation = _ref4.orientation;
          var startSquareIndex = row * 10 + column;
          var startSquare = dom.computerBoardGrid.children[startSquareIndex];
          var shipImage = document.createElement("img");
          shipImage.className = "ship-image computer-ship hidden";
          shipImage.src = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.getShipImage)(ship);
          if (orientation === "vertical") {
            shipImage.classList.add("vertical");
            shipImage.style.tranform = "rotate(90deg)";
            // shipImage.id = `ship${index + 1}`;
          } else {
            shipImage.classList.add("horizontal");
            shipImage.classList.add("computer-horizontal-ship");
          }
          shipImage.id = "ship".concat(index + 1);
          startSquare.appendChild(shipImage);
          if (orientation === "horizontal") {
            shipImage.style.width = "".concat(ship.length * 42, "px");
            shipImage.style.height = "40px";
          } else {
            shipImage.style.width = "".concat(ship.length * 42, "px");
            shipImage.style.height = "40px";
          }
        });
      }
    }, {
      key: "computerBoardSquares",
      value: function computerBoardSquares(item, index) {
        var shipValues = ["Crr", "Bat", "Cru", "Sub", "Des"];
        var row = Math.floor(index / 10);
        var column = index % 10;
        item.addEventListener("click", function () {
          if (!playerObject.playerTurn) return;
          var coordValue = playerObject.computerBoard.board[row][column];
          var isShip = shipValues.includes(coordValue);
          var hitMarker = document.createElement("div");
          hitMarker.classList.add("dot");
          hitMarker.id = "computer-dot";
          if (isShip) {
            hitMarker.classList.add("red-dot");
            dom.display.innerText = "".concat(playerName, " has hit a ship!");
          } else {
            hitMarker.classList.add("black-dot");
            dom.display.innerText = "".concat(playerName, " has missed");
          }
          item.appendChild(hitMarker);
          item.style.pointerEvents = "none";
          playerObject.myAttack(row, column);
          playerObject.playerTurn = false;
        });
      }
    }, {
      key: "compShipSunk",
      value: function compShipSunk() {
        var ships = [this.computerBoard.carrier, this.computerBoard.battleship, this.computerBoard.cruiser, this.computerBoard.submarine, this.computerBoard.destroyer];
        ships.forEach(function (ship) {
          if (ship.sunk === true) {
            dom.computerBoardGrid.querySelectorAll(".square").forEach(function (square) {
              if (square.innerText === ship.boardName) {
                // square.style.backgroundColor = "purple";
                square.style.border = "2px solid black";
              }
            });
            var shipImage = dom.computerBoardGrid.querySelector("#ship".concat(ships.indexOf(ship) + 1));
            if (shipImage) {
              shipImage.classList.remove("hidden");
            }
          }
        });
      }
    }, {
      key: "myShipSunk",
      value: function myShipSunk() {
        var _this5 = this;
        var ships = [this.myBoard.carrier, this.myBoard.battleship, this.myBoard.cruiser, this.myBoard.submarine, this.myBoard.destroyer];
        var sunkShipUpdated = false;
        ships.forEach(function (ship) {
          if (ship.sunk === true) {
            _this5.myBoard.board.forEach(function (row, rowIndex) {
              row.forEach(function (value, colIndex) {
                if (value === "Hit ".concat(ship.boardName)) {
                  _this5.myBoard.board[rowIndex][colIndex] = "Sunk";
                  sunkShipUpdated = true;
                }
              });
            });
          }
        });
        if (sunkShipUpdated) {
          this.refreshMyBoardAfterCompAttack();
        }
      }
    }, {
      key: "allShipsSunk",
      value: function allShipsSunk() {
        var allComputerShipsSunk = this.computerBoard.areAllShipsSunk();
        var allMyShipsSunk = this.myBoard.areAllShipsSunk();
        if (allComputerShipsSunk) {
          dom.winnerContainer.style.display = "flex";
          dom.display.style.display = "none";
          dom.winnerDisplay.innerText = "".concat(playerName, " is the winner!!!! Well done! Play again?");
        } else if (allMyShipsSunk) {
          dom.winnerContainer.style.display = "flex";
          dom.display.style.display = "none";
          dom.winnerDisplay.innerText = "Sorry ".concat(playerName, " you lose. Play again?");
        }
      }
    }]);
    return Player;
  }();
  var playerObject;
  var playerName = dom.playerNameInput.value;
  dom.playerNameInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      playerObject = new Player();
      playerObject.renderMyBoard(playerObject.myBoard.board);
      dom.myBoardTitle.innerText = "".concat(dom.playerNameInput.value, "'s Board");
      playerName = dom.playerNameInput.value;
      dom.display.innerText = "".concat(playerName, ", place the Carrier.  Use Axis button to change direction");
      dom.boardsContainer.style.display = "flex";
      dom.myBoardContainer.style.display = "block";
      dom.formContainer.style.display = "none";
      dom.playerNameInput.value = "";
      axisButton.style.display = "grid";
      dom.titleImage.style.width = "500px";
      dom.display.style.display = "block";
    }
  });
  dom.playAgainButton.addEventListener("click", function (event) {
    event.preventDefault();
    dom.myBoardGrid.innerText = "";
    dom.computerBoardGrid.innerText = "";
    dom.computerBoardContainer.style.display = "none";
    dom.winnerContainer.style.display = "none";
    playerObject = new Player();
    playerObject.renderMyBoard(playerObject.myBoard.board);
    dom.myBoardTitle.innerText = "".concat(playerName, "'s Board");
    dom.display.innerText = "".concat(playerName, ", place the Carrier.  Use Axis button to change direction");
    dom.boardsContainer.style.display = "flex";
    dom.myBoardContainer.style.display = "block";
    dom.formContainer.style.display = "none";
    dom.playerNameInput.value = "";
    dom.axisButton.style.display = "grid";
    dom.titleImage.style.width = "500px";
    dom.display.style.display = "block";
  });
  module.exports = Player;
});

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
___CSS_LOADER_EXPORT___.push([module.id, `.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-image {
  height: auto;
  width: 1000px;
}

.form-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.player-name-input {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid gray;
  outline: 0;
  font-size: 1.3rem;
  color: black;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
}
.player-name-input::placeholder {
  color: transparent;
}
.player-name-input:placeholder-shown ~ .player-name-label {
  font-size: 1.3rem;
  cursor: text;
  top: 20px;
}

.player-name-input:focus {
  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, primary, secondary);
  border-image-slice: 1;
}
.player-name-input:focus ~ .player-name-label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: primary;
  font-weight: 700;
}

.player-name-input:required, .player-name-input:invalid {
  box-shadow: none;
}

body {
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  font-size: 1.5rem;
  background-color: white;
}

.player-name-button {
  width: 50px;
}

.display {
  background: linear-gradient(to right, #456961, #92b59d);
  font-family: "Digital-7 Mono", monospace;
  height: 80px;
  width: 1000px;
  border-radius: 10px;
  line-height: 80px;
  padding-left: 20px;
  border: 2px solid black;
  font-size: 20px;
  color: blanchedalmond;
}

.boards-outer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.boards-container {
  display: flex;
  gap: 100px;
  justify-content: center;
  font-size: 1rem;
}

.board-title {
  background: linear-gradient(to right, #456961, #92b59d);
  font-family: "Digital-7 Mono", monospace;
  text-align: center;
  border: 1px solid black;
  border-radius: 5px;
}

.grid-container {
  display: grid;
  grid-template-rows: repeat(10, 40px);
  grid-template-columns: repeat(10, 40px);
  background-color: white;
  border: 1px solid black;
  position: relative;
}

.grid-container > div {
  border: 1px solid black;
  position: relative;
}

.square {
  cursor: pointer;
  color: transparent;
  position: relative;
}

.dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-top: 10px;
  margin-left: 9px;
  position: absolute;
  z-index: 20;
}

.red-dot {
  background-color: red;
}

.black-dot {
  background-color: black;
}

#computer-dot {
  left: -2px;
  bottom: 8px;
}

.axis-button {
  background: #fff;
  backface-visibility: hidden;
  border-radius: 0.375rem;
  border-style: solid;
  border-width: 0.125rem;
  box-sizing: border-box;
  color: #212121;
  cursor: pointer;
  display: inline-block;
  font-family: Circular, Helvetica, sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.3;
  padding: 0.875rem 1.125rem;
  position: relative;
  text-align: left;
  text-decoration: none;
  transform: translateZ(0) scale(1);
  transition: transform 0.2s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.axis-button:not(:disabled):hover {
  transform: scale(1.05);
}

.axis-button:not(:disabled):hover:active {
  transform: scale(1.05) translateY(0.125rem);
}

.axis-button:focus {
  outline: 0 solid transparent;
}

.axis-button:focus:before {
  content: "";
  left: -0.375rem;
  pointer-events: none;
  position: absolute;
  top: -0.375rem;
  transition: border-radius;
  user-select: none;
}

.axis-button:focus:not(:focus-visible) {
  outline: 0 solid transparent;
}

.axis-button:focus:not(:focus-visible):before {
  border-width: 0;
}

.axis-button:not(:disabled):active {
  transform: translateY(0.125rem);
}

.winner-container {
  position: absolute;
  background-color: rgb(228, 195, 195);
  border: 2px solid black;
  height: 300px;
  width: 1000px;
  border-radius: 10px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 300px;
}

.winner-display {
  background-color: rgb(113, 187, 126);
  height: 80px;
  width: 800px;
  border-radius: 10px;
  padding-left: 20px;
  border: 2px solid black;
  line-height: 80px;
}

.highlight {
  background-color: rgba(0, 0, 255, 0.5);
}

.ship-image {
  position: absolute;
  z-index: 1;
  width: 100px;
  height: auto;
  opacity: 0.4;
  top: -2px;
}

.vertical {
  transform: rotate(90deg);
  transform-origin: top left;
}

#ship1.vertical {
  left: 50px;
  bottom: 40px;
}

#ship2.vertical {
  left: 50px;
  bottom: 40px;
}

#ship3.vertical {
  left: 50px;
  bottom: 40px;
}

#ship4.vertical {
  left: 50px;
  bottom: 40px;
}

#ship5.vertical {
  left: 50px;
  bottom: 40px;
}

.computer-horizontal-ship {
  transform: translateX(-30px);
}

.hidden {
  display: none;
}`, "",{"version":3,"sources":["webpack://./src/styles/main.scss"],"names":[],"mappings":"AAAA;EACE,aAAA;EACA,sBAAA;EACA,mBAAA;AACF;;AAQA;EACE,YAAA;EACA,aAAA;AALF;;AAUA;EACE,aAAA;EACA,uBAAA;EACA,sBAAA;AAPF;;AAUA;EACE,oBAAA;EACA,WAAA;EACA,SAAA;EACA,6BAAA;EACA,UAAA;EACA,iBAAA;EACA,YAAA;EACA,cAAA;EACA,uBAAA;EACA,6BAAA;AAPF;AASE;EACE,kBAAA;AAPJ;AAUE;EACE,iBAAA;EACA,YAAA;EACA,SAAA;AARJ;;AAYA;EAUE,mBAAA;EACA,gBAAA;EACA,iBAAA;EACA,2DAAA;EACA,qBAAA;AAlBF;AAKE;EACE,kBAAA;EACA,MAAA;EACA,cAAA;EACA,gBAAA;EACA,eAAA;EACA,cAAA;EACA,gBAAA;AAHJ;;AAaE;EAEE,gBAAA;AAXJ;;AAeA;EACE,kCAAA;EACA,aAAA;EACA,sBAAA;EAEA,mBAAA;EACA,iBAAA;EACA,iBAAA;EACA,uBAAA;AAbF;;AAgBA;EACE,WAAA;AAbF;;AAkBA;EACE,uDAAA;EACA,wCAAA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;EACA,iBAAA;EACA,kBAAA;EACA,uBAAA;EACA,eAAA;EACA,qBAAA;AAfF;;AAoBA;EACE,aAAA;EACA,sBAAA;EACA,mBAAA;AAjBF;;AAoBA;EACE,aAAA;EACA,UAAA;EACA,uBAAA;EACA,eAAA;AAjBF;;AAoBA;EACE,uDAAA;EACA,wCAAA;EACA,kBAAA;EACA,uBAAA;EACA,kBAAA;AAjBF;;AAoBA;EACE,aAAA;EACA,oCAAA;EACA,uCAAA;EAEA,uBAAA;EACA,uBAAA;EACA,kBAAA;AAlBF;;AAqBA;EACE,uBAAA;EACA,kBAAA;AAlBF;;AAqBA;EACE,eAAA;EACA,kBAAA;EACA,kBAAA;AAlBF;;AAqBA;EACE,WAAA;EACA,YAAA;EACA,kBAAA;EACA,gBAAA;EACA,gBAAA;EACA,kBAAA;EACA,WAAA;AAlBF;;AAqBA;EACE,qBAAA;AAlBF;;AAqBA;EACE,uBAAA;AAlBF;;AAqBA;EACE,UAAA;EACA,WAAA;AAlBF;;AAqBA;EACE,gBAAA;EACA,2BAAA;EACA,uBAAA;EACA,mBAAA;EACA,sBAAA;EACA,sBAAA;EACA,cAAA;EACA,eAAA;EACA,qBAAA;EACA,4CAAA;EACA,mBAAA;EACA,gBAAA;EACA,uBAAA;EACA,gBAAA;EACA,0BAAA;EACA,kBAAA;EACA,gBAAA;EACA,qBAAA;EACA,iCAAA;EACA,0BAAA;EACA,iBAAA;EACA,yBAAA;EACA,0BAAA;AAlBF;;AAqBA;EACE,sBAAA;AAlBF;;AAqBA;EACE,2CAAA;AAlBF;;AAqBA;EACE,4BAAA;AAlBF;;AAqBA;EACE,WAAA;EACA,eAAA;EACA,oBAAA;EACA,kBAAA;EACA,cAAA;EACA,yBAAA;EACA,iBAAA;AAlBF;;AAqBA;EACE,4BAAA;AAlBF;;AAqBA;EACE,eAAA;AAlBF;;AAqBA;EACE,+BAAA;AAlBF;;AAuBA;EACE,kBAAA;EACA,oCAAA;EACA,uBAAA;EACA,aAAA;EACA,aAAA;EACA,mBAAA;EACA,mBAAA;EACA,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,iBAAA;AApBF;;AAuBA;EACE,oCAAA;EACA,YAAA;EACA,YAAA;EACA,mBAAA;EACA,kBAAA;EACA,uBAAA;EACA,iBAAA;AApBF;;AAuBA;EACE,sCAAA;AApBF;;AAuBA;EACE,kBAAA;EACA,UAAA;EACA,YAAA;EACA,YAAA;EACA,YAAA;EACA,SAAA;AApBF;;AAuBA;EACE,wBAAA;EACA,0BAAA;AApBF;;AAuBA;EACE,UAAA;EACA,YAAA;AApBF;;AAuBA;EACE,UAAA;EACA,YAAA;AApBF;;AAuBA;EACE,UAAA;EACA,YAAA;AApBF;;AAuBA;EACE,UAAA;EACA,YAAA;AApBF;;AAuBA;EACE,UAAA;EACA,YAAA;AApBF;;AAuBA;EACE,4BAAA;AApBF;;AAuBA;EACE,aAAA;AApBF","sourcesContent":[".content {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n}\r\n\r\n// TITLE IMAGE\r\n\r\n// .image-container {\r\n//   text-align: center;\r\n// }\r\n\r\n.title-image {\r\n  height: auto;\r\n  width: 1000px;\r\n}\r\n\r\n// FORM\r\n\r\n.form-container {\r\n  display: flex;\r\n  justify-content: center;\r\n  flex-direction: column;\r\n}\r\n\r\n.player-name-input {\r\n  font-family: inherit;\r\n  width: 100%;\r\n  border: 0;\r\n  border-bottom: 2px solid gray;\r\n  outline: 0;\r\n  font-size: 1.3rem;\r\n  color: black;\r\n  padding: 7px 0;\r\n  background: transparent;\r\n  transition: border-color 0.2s;\r\n\r\n  &::placeholder {\r\n    color: transparent;\r\n  }\r\n\r\n  &:placeholder-shown ~ .player-name-label {\r\n    font-size: 1.3rem;\r\n    cursor: text;\r\n    top: 20px;\r\n  }\r\n}\r\n\r\n.player-name-input:focus {\r\n  ~ .player-name-label {\r\n    position: absolute;\r\n    top: 0;\r\n    display: block;\r\n    transition: 0.2s;\r\n    font-size: 1rem;\r\n    color: primary;\r\n    font-weight: 700;\r\n  }\r\n  padding-bottom: 6px;\r\n  font-weight: 700;\r\n  border-width: 3px;\r\n  border-image: linear-gradient(to right, primary, secondary);\r\n  border-image-slice: 1;\r\n}\r\n\r\n.player-name-input {\r\n  &:required,\r\n  &:invalid {\r\n    box-shadow: none;\r\n  }\r\n}\r\n\r\nbody {\r\n  font-family: \"Poppins\", sans-serif;\r\n  display: flex;\r\n  flex-direction: column;\r\n  // justify-content: center;\r\n  align-items: center;\r\n  min-height: 100vh;\r\n  font-size: 1.5rem;\r\n  background-color: white;\r\n}\r\n\r\n.player-name-button {\r\n  width: 50px;\r\n}\r\n\r\n// DISPLAY\r\n\r\n.display {\r\n  background: linear-gradient(to right, #456961, #92b59d);\r\n  font-family: \"Digital-7 Mono\", monospace;\r\n  height: 80px;\r\n  width: 1000px;\r\n  border-radius: 10px;\r\n  line-height: 80px;\r\n  padding-left: 20px;\r\n  border: 2px solid black;\r\n  font-size: 20px;\r\n  color: blanchedalmond;\r\n}\r\n\r\n// BOARDS\r\n\r\n.boards-outer-container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n}\r\n\r\n.boards-container {\r\n  display: flex;\r\n  gap: 100px;\r\n  justify-content: center;\r\n  font-size: 1rem;\r\n}\r\n\r\n.board-title {\r\n  background: linear-gradient(to right, #456961, #92b59d);\r\n  font-family: \"Digital-7 Mono\", monospace;\r\n  text-align: center;\r\n  border: 1px solid black;\r\n  border-radius: 5px;\r\n}\r\n\r\n.grid-container {\r\n  display: grid;\r\n  grid-template-rows: repeat(10, 40px);\r\n  grid-template-columns: repeat(10, 40px);\r\n  // background-color: rgb(241, 240, 240);\r\n  background-color: white;\r\n  border: 1px solid black;\r\n  position: relative;\r\n}\r\n\r\n.grid-container > div {\r\n  border: 1px solid black;\r\n  position: relative;\r\n}\r\n\r\n.square {\r\n  cursor: pointer;\r\n  color: transparent;\r\n  position: relative;\r\n}\r\n\r\n.dot {\r\n  width: 20px;\r\n  height: 20px;\r\n  border-radius: 50%;\r\n  margin-top: 10px;\r\n  margin-left: 9px;\r\n  position: absolute;\r\n  z-index: 20;\r\n}\r\n\r\n.red-dot {\r\n  background-color: red;\r\n}\r\n\r\n.black-dot {\r\n  background-color: black;\r\n}\r\n\r\n#computer-dot {\r\n  left: -2px;\r\n  bottom: 8px;\r\n}\r\n\r\n.axis-button {\r\n  background: #fff;\r\n  backface-visibility: hidden;\r\n  border-radius: 0.375rem;\r\n  border-style: solid;\r\n  border-width: 0.125rem;\r\n  box-sizing: border-box;\r\n  color: #212121;\r\n  cursor: pointer;\r\n  display: inline-block;\r\n  font-family: Circular, Helvetica, sans-serif;\r\n  font-size: 1.125rem;\r\n  font-weight: 700;\r\n  letter-spacing: -0.01em;\r\n  line-height: 1.3;\r\n  padding: 0.875rem 1.125rem;\r\n  position: relative;\r\n  text-align: left;\r\n  text-decoration: none;\r\n  transform: translateZ(0) scale(1);\r\n  transition: transform 0.2s;\r\n  user-select: none;\r\n  -webkit-user-select: none;\r\n  touch-action: manipulation;\r\n}\r\n\r\n.axis-button:not(:disabled):hover {\r\n  transform: scale(1.05);\r\n}\r\n\r\n.axis-button:not(:disabled):hover:active {\r\n  transform: scale(1.05) translateY(0.125rem);\r\n}\r\n\r\n.axis-button:focus {\r\n  outline: 0 solid transparent;\r\n}\r\n\r\n.axis-button:focus:before {\r\n  content: \"\";\r\n  left: calc(-1 * 0.375rem);\r\n  pointer-events: none;\r\n  position: absolute;\r\n  top: calc(-1 * 0.375rem);\r\n  transition: border-radius;\r\n  user-select: none;\r\n}\r\n\r\n.axis-button:focus:not(:focus-visible) {\r\n  outline: 0 solid transparent;\r\n}\r\n\r\n.axis-button:focus:not(:focus-visible):before {\r\n  border-width: 0;\r\n}\r\n\r\n.axis-button:not(:disabled):active {\r\n  transform: translateY(0.125rem);\r\n}\r\n\r\n// WINNER CONTAINER\r\n\r\n.winner-container {\r\n  position: absolute;\r\n  background-color: rgb(228, 195, 195);\r\n  border: 2px solid black;\r\n  height: 300px;\r\n  width: 1000px;\r\n  border-radius: 10px;\r\n  align-items: center;\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  margin-top: 300px;\r\n}\r\n\r\n.winner-display {\r\n  background-color: rgb(113, 187, 126);\r\n  height: 80px;\r\n  width: 800px;\r\n  border-radius: 10px;\r\n  padding-left: 20px;\r\n  border: 2px solid black;\r\n  line-height: 80px;\r\n}\r\n\r\n.highlight {\r\n  background-color: rgba(0, 0, 255, 0.5);\r\n}\r\n\r\n.ship-image {\r\n  position: absolute;\r\n  z-index: 1;\r\n  width: 100px;\r\n  height: auto;\r\n  opacity: 0.4;\r\n  top: -2px;\r\n}\r\n\r\n.vertical {\r\n  transform: rotate(90deg);\r\n  transform-origin: top left;\r\n}\r\n\r\n#ship1.vertical {\r\n  left: 50px;\r\n  bottom: 40px;\r\n}\r\n\r\n#ship2.vertical {\r\n  left: 50px;\r\n  bottom: 40px;\r\n}\r\n\r\n#ship3.vertical {\r\n  left: 50px;\r\n  bottom: 40px;\r\n}\r\n\r\n#ship4.vertical {\r\n  left: 50px;\r\n  bottom: 40px;\r\n}\r\n\r\n#ship5.vertical {\r\n  left: 50px;\r\n  bottom: 40px;\r\n}\r\n\r\n.computer-horizontal-ship {\r\n  transform: translateX(-30px);\r\n}\r\n\r\n.hidden {\r\n  display: none;\r\n}\r\n"],"sourceRoot":""}]);
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

/***/ }),

/***/ "./src/assets/battleship.PNG":
/*!***********************************!*\
  !*** ./src/assets/battleship.PNG ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "battleship.PNG";

/***/ }),

/***/ "./src/assets/carrier.PNG":
/*!********************************!*\
  !*** ./src/assets/carrier.PNG ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "carrier.PNG";

/***/ }),

/***/ "./src/assets/cruiser.PNG":
/*!********************************!*\
  !*** ./src/assets/cruiser.PNG ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "cruiser.PNG";

/***/ }),

/***/ "./src/assets/destroyer.PNG":
/*!**********************************!*\
  !*** ./src/assets/destroyer.PNG ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "destroyer.PNG";

/***/ }),

/***/ "./src/assets/submarine.PNG":
/*!**********************************!*\
  !*** ./src/assets/submarine.PNG ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "submarine.PNG";

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
//# sourceMappingURL=bundleb145b88bde4ae891c43a.js.map