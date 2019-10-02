// A collection of usefull prototypes
// Copyright (c) 2014 -2016 Lucas Vogel & Fabian Moron Zirfas

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.


/**
 * This is Prototypes.jsx
 */

try {
	Object.defineProperty({}, 'a', {value: 0});
}
catch(err) {
	// failed: so we're in IE8
	(function() {
		var defineProperty = Object.defineProperty;
		Object.defineProperty = function (object, property, descriptor) {
			delete descriptor.configurable;
			delete descriptor.enumerable;
			delete descriptor.writable;
			try {
				return defineProperty(object, property, descriptor);
			}
			catch(err) {
				object[property] = descriptor.value;
			}
		};
	}());
}

Object.defineProperties || (Object.defineProperties=function defineProperties(object, descriptors) {
	var property;
	for (property in descriptors) {
		Object.defineProperty(object, property, descriptors[property]);
	}
	return object;
});

/**
 * https://gist.github.com/WebReflection/10404826
 */

try {
	Object.assign({}, {foo: 'bar'})
}
catch(err) {
	// failed: so we're in IE8
	(function() {
	  Object.assign = function(has){
	    'use strict';
	    return assign;
	    function assign(target, source) {
	      for (var i = 1; i < arguments.length; i++) {
	        copy(target, arguments[i]);
	      }
	      return target;
	    }
	    function copy(target, source) {
	      for (var key in source) {
	        if (has.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }
	  }({}.hasOwnProperty);
	}());
}

var lambda = function (l) {
	var fn = l.match(/\((.*)\)\s*=>\s*(.*)/);
	var p = [];
	var b = "";

	if (fn.length > 0) fn.shift();
	if (fn.length > 0) b = fn.pop();
	if (fn.length > 0) p = fn.pop()
		.replace(/^\s*|\s(?=\s)|\s*$|,/g, '')
		.split(' ');

	// prepend a return if not already there.
	fn = ((!/\s*return\s+/.test(b)) ? "return " : "") + b;

	p.push(fn);

	try {
		return Function.apply({}, p);
	} catch (e) {
		return null;
	}
};

/**
 * from here
 * http://www.paulfree.com/28/javascript-array-filtering/#more-28
 */
if (typeof (Array.prototype.where) === 'undefined') {
	Array.prototype.where = function (f) {
		var fn = f;
		// if type of parameter is string
		if (typeof f == "string")
		// try to make it into a function
			if ((fn = lambda(fn)) === null)
			// if fail, throw exception
				throw "Syntax error in lambda string: " + f;
			// initialize result array
		var res = [];
		var l = this.length;
		// set up parameters for filter function call
		var p = [0, 0, res];
		// append any pass-through parameters to parameter array
		for (var i = 1; i < arguments.length; i++) {
			p.push(arguments[i]);
		}
		// for each array element, pass to filter function
		for (var j = 0; j < l; j++) {
			// skip missing elements
			if (typeof this[j] == "undefined") continue;
			// param1 = array element
			p[0] = this[j];
			// param2 = current indeex
			p[1] = j;
			// call filter function. if return true, copy element to results
			if ( !! fn.apply(this, p)) res.push(this[j]);
		}
		// return filtered result
		return res;
	};
}
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

	Array.prototype.forEach = function(callback, thisArg) {

		var T, k;

		if (this === null) {
			throw new TypeError(' this is null or not defined');
		}

		// 1. Let O be the result of calling ToObject passing the |this| value as the argument.
		var O = Object(this);

		// 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
		// 3. Let len be ToUint32(lenValue).
		var len = O.length >>> 0;

		// 4. If IsCallable(callback) is false, throw a TypeError exception.
		// See: http://es5.github.com/#x9.11
		if (typeof callback !== "function") {
			throw new TypeError(callback + ' is not a function');
		}

		// 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
		if (arguments.length > 1) {
			T = thisArg;
		}

		// 6. Let k be 0
		k = 0;

		// 7. Repeat, while k < len
		while (k < len) {

			var kValue;

			// a. Let Pk be ToString(k).
			//   This is implicit for LHS operands of the in operator
			// b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
			//   This step can be combined with c
			// c. If kPresent is true, then
			if (k in O) {

				// i. Let kValue be the result of calling the Get internal method of O with argument Pk.
				kValue = O[k];

				// ii. Call the Call internal method of callback with T as the this value and
				// argument list containing kValue, k, and O.
				callback.call(T, kValue, k, O);
			}
			// d. Increase k by 1.
			k++;
		}
		// 8. return undefined
	};
}
if (!Array.prototype.filter) {
	Array.prototype.filter = function(fun/*, thisArg*/) {
		'use strict';

		if (this === void 0 || this === null) {
			throw new TypeError();
		}

		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== 'function') {
			throw new TypeError();
		}

		var res = [];
		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for (var i = 0; i < len; i++) {
			if (i in t) {
				var val = t[i];

				// NOTE: Technically this should Object.defineProperty at
				//       the next index, as push can be affected by
				//       properties on Object.prototype and Array.prototype.
				//       But that method's new, and collisions should be
				//       rare, so use the more-compatible alternative.
				if (fun.call(thisArg, val, i, t)) {
					res.push(val);
				}
			}
		}

		return res;
	};
}
// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.io/#x15.4.4.14
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(searchElement, fromIndex) {

		var k;

		// 1. Let O be the result of calling ToObject passing
		//    the this value as the argument.
		if (this === null) {
			throw new TypeError('"this" is null or not defined');
		}

		var O = Object(this);

		// 2. Let lenValue be the result of calling the Get
		//    internal method of O with the argument "length".
		// 3. Let len be ToUint32(lenValue).
		var len = O.length >>> 0;

		// 4. If len is 0, return -1.
		if (len === 0) {
			return -1;
		}

		// 5. If argument fromIndex was passed let n be
		//    ToInteger(fromIndex); else let n be 0.
		var n = +fromIndex || 0;

		if (Math.abs(n) === Infinity) {
			n = 0;
		}

		// 6. If n >= len, return -1.
		if (n >= len) {
			return -1;
		}

		// 7. If n >= 0, then Let k be n.
		// 8. Else, n<0, Let k be len - abs(n).
		//    If k is less than 0, then let k be 0.
		k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

		// 9. Repeat, while k < len
		while (k < len) {
			var kValue;
			// a. Let Pk be ToString(k).
			//   This is implicit for LHS operands of the in operator
			// b. Let kPresent be the result of calling the
			//    HasProperty internal method of O with argument Pk.
			//   This step can be combined with c
			// c. If kPresent is true, then
			//    i.  Let elementK be the result of calling the Get
			//        internal method of O with the argument ToString(k).
			//   ii.  Let same be the result of applying the
			//        Strict Equality Comparison Algorithm to
			//        searchElement and elementK.
			//  iii.  If same is true, return k.
			if (k in O && O[k] === searchElement) {
				return k;
			}
			k++;
		}
		return -1;
	};
}
// Production steps of ECMA-262, Edition 5, 15.4.4.21
// Reference: http://es5.github.io/#x15.4.4.21
if (!Array.prototype.reduce) {
	Array.prototype.reduce = function(callback /*, initialValue*/) {
		'use strict';
		if (this == null) {
			throw new TypeError('Array.prototype.reduce called on null or undefined');
		}
		if (typeof callback !== 'function') {
			throw new TypeError(callback + ' is not a function');
		}
		var t = Object(this), len = t.length >>> 0, k = 0, value;
		if (arguments.length == 2) {
			value = arguments[1];
		} else {
			while (k < len && !(k in t)) {
				k++; 
			}
			if (k >= len) {
				throw new TypeError('Reduce of empty array with no initial value');
			}
			value = t[k++];
		}
		for (; k < len; k++) {
			if (k in t) {
				value = callback(value, t[k], k, t);
			}
		}
		return value;
	};
}

// Production steps of ECMA-262, Edition 5, 15.4.4.17
// Reference: http://es5.github.io/#x15.4.4.17
if (!Array.prototype.some) {
	Array.prototype.some = function(fun/*, thisArg*/) {
		'use strict';

		if (this == null) {
			throw new TypeError('Array.prototype.some called on null or undefined');
		}

		if (typeof fun !== 'function') {
			throw new TypeError();
		}

		var t = Object(this);
		var len = t.length >>> 0;

		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for (var i = 0; i < len; i++) {
			if (i in t && fun.call(thisArg, t[i], i, t)) {
				return true;
			}
		}

		return false;
	};
}

if (typeof (String.prototype.localeCompare) === 'undefined') {
	String.prototype.localeCompare = function (str, locale, options) {
		return ((this == str) ? 0 : ((this > str) ? 1 : -1));
	};
}
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/*
 Author: Everistus Akpabio | Comphonia
 Licence: MIT License
 Version: 1.1.0
*/
// object holds all documents || open tabs
var docs = app.documents; // count of all open documents || tabs

var docCount = docs.length; // store initial layers by name

var layerNames = []; // array holds all map types as seen in the document

var mapTypes; // array holds the name of maps that will used to determine groups to merge

var mapNames = []; // array holds group of like maps in arrays

var mapSet = []; //Start

if (app.documents.length > 0) {
  mergeLayers();
  buildMapNames();
  gatherMaps();
  mergeMaps();
} // creates the mapNames array based on the _mapSuffix(.normal, .height etc.) in every open document || tab


function buildMapNames() {
  for (var i = 0; i < docCount; i++) {
    var patt = new RegExp("\\w+_\\w+.psd", "i"); //if document name contains the pattern add it to an array

    if (patt.test(docs[i].name)) {
      //grab just the map name and push to array
      var regex = new RegExp("(\\w+_)(?=([a-z]+)(.psd))", "i");
      var map = docs[i].name.replace(regex, "");
      regex = new RegExp(".psd");
      map = map.replace(regex, "");
      mapNames.push(map);
    }
  } //can't use 'set' et al. so for-loop to check & make unique mapnames


  for (var j = 0; j < mapNames.length; j++) {
    for (var k = 1; k < mapNames.length - 1; k++) {
      if (mapNames[k] === mapNames[j]) {
        mapNames.pop();
      }
    }
  } // build a mapSET with objects based on the available maps, this will be used to group multiple map types


  for (var p = 0; p < mapNames.length; p++) {
    mapSet.push([]);
  }
} // gathers all documents with the same suffix to a single array


function gatherMaps() {
  for (var i = 0; i < docCount; i++) {
    //alert(mapNames[i])
    for (var j = 0; j < mapNames.length; j++) {
      var patt = new RegExp("\\w+_" + mapNames[j] + ".psd", "i"); //if document name contains the pattern add it to an array

      if (patt.test(docs[i].name)) {
        if (j === 0) {
          mapSet[j].push(docs[i]);
        } else {
          mapSet[j].push(docs[i]);
        }
      }
    }
  }
}
/* merge all the maps first to accomodate irregular layer count in the mergeMaps() loop
-- BUG FIX for v1.0.0
-- issue raised and patch approach suggested by TOAD. Thanks TOAD.
*/


function mergeLayers() {
  for (var k = 0; k < app.documents.length; k++) {
    app.activeDocument = app.documents[k]; // discard hidden layers and merge visible ones

    var layerCount = app.activeDocument.artLayers.length;
    var layerSetCount = app.activeDocument.layerSets.length;

    if (layerCount + layerSetCount > 1) {
      // normal maps need to have the background removed so the don't overlay others when stacked
      var patt = new RegExp("\\w+_normal.psd", "i");

      if (patt.test(app.activeDocument.name)) {
        try {
          var bg = app.activeDocument.artLayers.getByName("Background");
          if (bg !== null && bg !== undefined) bg.remove();
        } catch (error) {// alert("not found")
        }
      } //remove snapshot


      try {
        var snap = app.activeDocument.artLayers.getByName("snapshot");
        if (snap !== null && snap !== undefined) snap.remove();
      } catch (error) {} // alert("not found")
      // merge layers


      app.activeDocument.mergeVisibleLayers();

      for (var i = 0; i < app.activeDocument.artLayers.length; i++) {
        if (app.activeDocument.artLayers[i].visible == false) app.activeDocument.artLayers[i].remove();
      }
    }
  }
} // merges maps in array with the same suffix to the first ([primary_map]) of their type


function mergeMaps() {
  // Keep the first document with that prefix out of the loop and gather each layer
  for (var a = 0; a < mapSet.length; a++) {
    var map1 = mapSet[a];

    for (var i = 1; i < map1.length; i++) {
      for (var j = 0; j < map1[i].layers.length; j++) {
        layerNames.push(map1[i].layers[j].name);
      } //duplicate each layer to its [primary_map]


      for (var k = 0; k < layerNames.length; k++) {
        app.activeDocument = map1[i];
        app.activeDocument.artLayers.getByName(layerNames[k]).duplicate(map1[0], ElementPlacement.PLACEATBEGINNING);
      } //reset layer obj when done


      layerNames = [];
    }
  } //prompt to save


  var prompt = confirm("Do you want to save changes to disk ?");

  if (prompt) {
    saveDocuments();
  }
}

function saveDocuments() {
  var exportPath = app.documents[0].path;

  for (var k = 0; k < mapSet.length; k++) {
    var map1 = mapSet[k];
    app.activeDocument = map1[0];
    app.activeDocument.flatten();
    var fileName = map1[0].name;
    var fileLocation = File(exportPath + "/" + fileName);
    app.activeDocument.saveAs(fileLocation, PNGSaveOptions, true, Extension.LOWERCASE);
  }

  alert("Merge completed, files saved in " + exportPath);
}

},{}]},{},[1]);
