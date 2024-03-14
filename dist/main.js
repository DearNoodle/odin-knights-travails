/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/KnightMoveTree.js":
/*!*******************************!*\
  !*** ./src/KnightMoveTree.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _KnightMoveTreeNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./KnightMoveTreeNode */ "./src/KnightMoveTreeNode.js");


class KnightMoveTree {
  constructor(start) {
    this.root = new _KnightMoveTreeNode__WEBPACK_IMPORTED_MODULE_0__["default"](start);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (KnightMoveTree);


/***/ }),

/***/ "./src/KnightMoveTreeNode.js":
/*!***********************************!*\
  !*** ./src/KnightMoveTreeNode.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _knightMoveGraph__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./knightMoveGraph */ "./src/knightMoveGraph.js");


class KnightMoveTreeNode {
  constructor([x, y]) {
    this.from = null;
    this.coord = [x, y];
    this.to = _knightMoveGraph__WEBPACK_IMPORTED_MODULE_0__["default"][y][x];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (KnightMoveTreeNode);


/***/ }),

/***/ "./src/Node.js":
/*!*********************!*\
  !*** ./src/Node.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Node);


/***/ }),

/***/ "./src/Queue.js":
/*!**********************!*\
  !*** ./src/Queue.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Node */ "./src/Node.js");


class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  enqueue(value) {
    const newNode = new _Node__WEBPACK_IMPORTED_MODULE_0__["default"](value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  dequeue() {
    if (!this.head) return null;
    let dequeueValue = this.head.value;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    return dequeueValue;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Queue);


/***/ }),

/***/ "./src/knightMove.js":
/*!***************************!*\
  !*** ./src/knightMove.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ knightMove)
/* harmony export */ });
/* harmony import */ var _KnightMoveTreeNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./KnightMoveTreeNode */ "./src/KnightMoveTreeNode.js");
/* harmony import */ var _KnightMoveTree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./KnightMoveTree */ "./src/KnightMoveTree.js");
/* harmony import */ var _Queue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Queue */ "./src/Queue.js");




function generatePath(movePath, curNode) {
  movePath.push(curNode.coord);
  while (curNode.from) {
    curNode = curNode.from;
    movePath.push(curNode.coord);
  }
  movePath.reverse();
  return movePath;
}

function isArrayEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

function levelOrderSearchShortestPath(end, moveSearchTree) {
  let movePath = [];
  let preventInfLoopIndex = 0;
  const queue = new _Queue__WEBPACK_IMPORTED_MODULE_2__["default"]();
  queue.enqueue(moveSearchTree.root);

  while (queue.head && preventInfLoopIndex < 100000) {
    let curNode = queue.dequeue();
    if (isArrayEqual(curNode.coord, end)) {
      return generatePath(movePath, curNode);
    }
    curNode.to.forEach((coord) => {
      const toNode = new _KnightMoveTreeNode__WEBPACK_IMPORTED_MODULE_0__["default"](coord);
      toNode.from = curNode;
      queue.enqueue(toNode);
    });
    preventInfLoopIndex++;
  }
  throw new Error("Looped too much");
}

function outputConsoleMsg(path) {
  console.log(`You made it in ${path.length} moves!  Here's your path:`);
  path.forEach((coord) => {
    console.log(JSON.stringify(coord));
  });
}

function knightMove(start, end) {
  const moveSearchTree = new _KnightMoveTree__WEBPACK_IMPORTED_MODULE_1__["default"](start);
  let path = levelOrderSearchShortestPath(end, moveSearchTree);
  outputConsoleMsg(path);
}


/***/ }),

/***/ "./src/knightMoveGraph.js":
/*!********************************!*\
  !*** ./src/knightMoveGraph.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const knightMoveGraph = [];
const boardSize = 8;

const checkMoveSpace = ([j, i], [moveX, moveY]) => {
  let coordX = j + moveX;
  let coordY = i + moveY;
  if (coordY >= 0 && coordY < 8 && coordX >= 0 && coordX < 8) {
    knightMoveGraph[i][j].push([coordX, coordY]);
  }
};

for (let i = 0; i < boardSize; i++) {
  knightMoveGraph.push([]);
  for (let j = 0; j < boardSize; j++) {
    knightMoveGraph[i].push([]);
    checkMoveSpace([j, i], [1, 2]);
    checkMoveSpace([j, i], [2, 1]);
    checkMoveSpace([j, i], [1, -2]);
    checkMoveSpace([j, i], [-2, 1]);
    checkMoveSpace([j, i], [-1, 2]);
    checkMoveSpace([j, i], [2, -1]);
    checkMoveSpace([j, i], [-1, -2]);
    checkMoveSpace([j, i], [-2, -1]);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (knightMoveGraph);


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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _knightMove__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./knightMove */ "./src/knightMove.js");


(0,_knightMove__WEBPACK_IMPORTED_MODULE_0__["default"])([0, 0], [7, 7]);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0Q7O0FBRXREO0FBQ0E7QUFDQSxvQkFBb0IsMkRBQWtCO0FBQ3RDO0FBQ0E7QUFDQSxpRUFBZSxjQUFjLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQa0I7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyx3REFBZTtBQUM3QjtBQUNBOztBQUVBLGlFQUFlLGtCQUFrQixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNWbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLElBQUksRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ1BNOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLDZDQUFJO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLEtBQUssRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUJpQztBQUNSO0FBQ2xCOztBQUU1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw4Q0FBSztBQUN6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsMkRBQWtCO0FBQzNDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQ0FBZ0MsYUFBYTtBQUM3QztBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVlO0FBQ2YsNkJBQTZCLHVEQUFjO0FBQzNDO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbERBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCLGVBQWU7QUFDL0I7QUFDQSxrQkFBa0IsZUFBZTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLGVBQWUsRUFBQzs7Ozs7OztVQzFCL0I7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05zQzs7QUFFdEMsdURBQVUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZW1wbGF0ZS8uL3NyYy9LbmlnaHRNb3ZlVHJlZS5qcyIsIndlYnBhY2s6Ly90ZW1wbGF0ZS8uL3NyYy9LbmlnaHRNb3ZlVHJlZU5vZGUuanMiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUvLi9zcmMvTm9kZS5qcyIsIndlYnBhY2s6Ly90ZW1wbGF0ZS8uL3NyYy9RdWV1ZS5qcyIsIndlYnBhY2s6Ly90ZW1wbGF0ZS8uL3NyYy9rbmlnaHRNb3ZlLmpzIiwid2VicGFjazovL3RlbXBsYXRlLy4vc3JjL2tuaWdodE1vdmVHcmFwaC5qcyIsIndlYnBhY2s6Ly90ZW1wbGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RlbXBsYXRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBLbmlnaHRNb3ZlVHJlZU5vZGUgZnJvbSBcIi4vS25pZ2h0TW92ZVRyZWVOb2RlXCI7XG5cbmNsYXNzIEtuaWdodE1vdmVUcmVlIHtcbiAgY29uc3RydWN0b3Ioc3RhcnQpIHtcbiAgICB0aGlzLnJvb3QgPSBuZXcgS25pZ2h0TW92ZVRyZWVOb2RlKHN0YXJ0KTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgS25pZ2h0TW92ZVRyZWU7XG4iLCJpbXBvcnQga25pZ2h0TW92ZUdyYXBoIGZyb20gXCIuL2tuaWdodE1vdmVHcmFwaFwiO1xuXG5jbGFzcyBLbmlnaHRNb3ZlVHJlZU5vZGUge1xuICBjb25zdHJ1Y3RvcihbeCwgeV0pIHtcbiAgICB0aGlzLmZyb20gPSBudWxsO1xuICAgIHRoaXMuY29vcmQgPSBbeCwgeV07XG4gICAgdGhpcy50byA9IGtuaWdodE1vdmVHcmFwaFt5XVt4XTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBLbmlnaHRNb3ZlVHJlZU5vZGU7XG4iLCJjbGFzcyBOb2RlIHtcbiAgY29uc3RydWN0b3IodmFsdWUpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5uZXh0ID0gbnVsbDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOb2RlO1xuIiwiaW1wb3J0IE5vZGUgZnJvbSBcIi4vTm9kZVwiO1xuXG5jbGFzcyBRdWV1ZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaGVhZCA9IG51bGw7XG4gICAgdGhpcy50YWlsID0gbnVsbDtcbiAgfVxuXG4gIGVucXVldWUodmFsdWUpIHtcbiAgICBjb25zdCBuZXdOb2RlID0gbmV3IE5vZGUodmFsdWUpO1xuICAgIGlmICghdGhpcy5oZWFkKSB7XG4gICAgICB0aGlzLmhlYWQgPSBuZXdOb2RlO1xuICAgICAgdGhpcy50YWlsID0gbmV3Tm9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50YWlsLm5leHQgPSBuZXdOb2RlO1xuICAgICAgdGhpcy50YWlsID0gbmV3Tm9kZTtcbiAgICB9XG4gIH1cblxuICBkZXF1ZXVlKCkge1xuICAgIGlmICghdGhpcy5oZWFkKSByZXR1cm4gbnVsbDtcbiAgICBsZXQgZGVxdWV1ZVZhbHVlID0gdGhpcy5oZWFkLnZhbHVlO1xuICAgIHRoaXMuaGVhZCA9IHRoaXMuaGVhZC5uZXh0O1xuICAgIGlmICghdGhpcy5oZWFkKSB0aGlzLnRhaWwgPSBudWxsO1xuICAgIHJldHVybiBkZXF1ZXVlVmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUXVldWU7XG4iLCJpbXBvcnQgS25pZ2h0TW92ZVRyZWVOb2RlIGZyb20gXCIuL0tuaWdodE1vdmVUcmVlTm9kZVwiO1xuaW1wb3J0IEtuaWdodE1vdmVUcmVlIGZyb20gXCIuL0tuaWdodE1vdmVUcmVlXCI7XG5pbXBvcnQgUXVldWUgZnJvbSBcIi4vUXVldWVcIjtcblxuZnVuY3Rpb24gZ2VuZXJhdGVQYXRoKG1vdmVQYXRoLCBjdXJOb2RlKSB7XG4gIG1vdmVQYXRoLnB1c2goY3VyTm9kZS5jb29yZCk7XG4gIHdoaWxlIChjdXJOb2RlLmZyb20pIHtcbiAgICBjdXJOb2RlID0gY3VyTm9kZS5mcm9tO1xuICAgIG1vdmVQYXRoLnB1c2goY3VyTm9kZS5jb29yZCk7XG4gIH1cbiAgbW92ZVBhdGgucmV2ZXJzZSgpO1xuICByZXR1cm4gbW92ZVBhdGg7XG59XG5cbmZ1bmN0aW9uIGlzQXJyYXlFcXVhbChhcnIxLCBhcnIyKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShhcnIxKSA9PT0gSlNPTi5zdHJpbmdpZnkoYXJyMik7XG59XG5cbmZ1bmN0aW9uIGxldmVsT3JkZXJTZWFyY2hTaG9ydGVzdFBhdGgoZW5kLCBtb3ZlU2VhcmNoVHJlZSkge1xuICBsZXQgbW92ZVBhdGggPSBbXTtcbiAgbGV0IHByZXZlbnRJbmZMb29wSW5kZXggPSAwO1xuICBjb25zdCBxdWV1ZSA9IG5ldyBRdWV1ZSgpO1xuICBxdWV1ZS5lbnF1ZXVlKG1vdmVTZWFyY2hUcmVlLnJvb3QpO1xuXG4gIHdoaWxlIChxdWV1ZS5oZWFkICYmIHByZXZlbnRJbmZMb29wSW5kZXggPCAxMDAwMDApIHtcbiAgICBsZXQgY3VyTm9kZSA9IHF1ZXVlLmRlcXVldWUoKTtcbiAgICBpZiAoaXNBcnJheUVxdWFsKGN1ck5vZGUuY29vcmQsIGVuZCkpIHtcbiAgICAgIHJldHVybiBnZW5lcmF0ZVBhdGgobW92ZVBhdGgsIGN1ck5vZGUpO1xuICAgIH1cbiAgICBjdXJOb2RlLnRvLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBjb25zdCB0b05vZGUgPSBuZXcgS25pZ2h0TW92ZVRyZWVOb2RlKGNvb3JkKTtcbiAgICAgIHRvTm9kZS5mcm9tID0gY3VyTm9kZTtcbiAgICAgIHF1ZXVlLmVucXVldWUodG9Ob2RlKTtcbiAgICB9KTtcbiAgICBwcmV2ZW50SW5mTG9vcEluZGV4Kys7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKFwiTG9vcGVkIHRvbyBtdWNoXCIpO1xufVxuXG5mdW5jdGlvbiBvdXRwdXRDb25zb2xlTXNnKHBhdGgpIHtcbiAgY29uc29sZS5sb2coYFlvdSBtYWRlIGl0IGluICR7cGF0aC5sZW5ndGh9IG1vdmVzISAgSGVyZSdzIHlvdXIgcGF0aDpgKTtcbiAgcGF0aC5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGNvb3JkKSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBrbmlnaHRNb3ZlKHN0YXJ0LCBlbmQpIHtcbiAgY29uc3QgbW92ZVNlYXJjaFRyZWUgPSBuZXcgS25pZ2h0TW92ZVRyZWUoc3RhcnQpO1xuICBsZXQgcGF0aCA9IGxldmVsT3JkZXJTZWFyY2hTaG9ydGVzdFBhdGgoZW5kLCBtb3ZlU2VhcmNoVHJlZSk7XG4gIG91dHB1dENvbnNvbGVNc2cocGF0aCk7XG59XG4iLCJjb25zdCBrbmlnaHRNb3ZlR3JhcGggPSBbXTtcbmNvbnN0IGJvYXJkU2l6ZSA9IDg7XG5cbmNvbnN0IGNoZWNrTW92ZVNwYWNlID0gKFtqLCBpXSwgW21vdmVYLCBtb3ZlWV0pID0+IHtcbiAgbGV0IGNvb3JkWCA9IGogKyBtb3ZlWDtcbiAgbGV0IGNvb3JkWSA9IGkgKyBtb3ZlWTtcbiAgaWYgKGNvb3JkWSA+PSAwICYmIGNvb3JkWSA8IDggJiYgY29vcmRYID49IDAgJiYgY29vcmRYIDwgOCkge1xuICAgIGtuaWdodE1vdmVHcmFwaFtpXVtqXS5wdXNoKFtjb29yZFgsIGNvb3JkWV0pO1xuICB9XG59O1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkU2l6ZTsgaSsrKSB7XG4gIGtuaWdodE1vdmVHcmFwaC5wdXNoKFtdKTtcbiAgZm9yIChsZXQgaiA9IDA7IGogPCBib2FyZFNpemU7IGorKykge1xuICAgIGtuaWdodE1vdmVHcmFwaFtpXS5wdXNoKFtdKTtcbiAgICBjaGVja01vdmVTcGFjZShbaiwgaV0sIFsxLCAyXSk7XG4gICAgY2hlY2tNb3ZlU3BhY2UoW2osIGldLCBbMiwgMV0pO1xuICAgIGNoZWNrTW92ZVNwYWNlKFtqLCBpXSwgWzEsIC0yXSk7XG4gICAgY2hlY2tNb3ZlU3BhY2UoW2osIGldLCBbLTIsIDFdKTtcbiAgICBjaGVja01vdmVTcGFjZShbaiwgaV0sIFstMSwgMl0pO1xuICAgIGNoZWNrTW92ZVNwYWNlKFtqLCBpXSwgWzIsIC0xXSk7XG4gICAgY2hlY2tNb3ZlU3BhY2UoW2osIGldLCBbLTEsIC0yXSk7XG4gICAgY2hlY2tNb3ZlU3BhY2UoW2osIGldLCBbLTIsIC0xXSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQga25pZ2h0TW92ZUdyYXBoO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQga25pZ2h0TW92ZSBmcm9tIFwiLi9rbmlnaHRNb3ZlXCI7XG5cbmtuaWdodE1vdmUoWzAsIDBdLCBbNywgN10pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9