/*
 Author: Everistus Akpabio | Comphonia
 Licence: MIT License
 Version: 1.1.1
*/

// object holds all documents || open tabs
var docs = app.documents;
// count of all open documents || tabs
var docCount = docs.length;
// store initial layers by name
var layerNames = [];
// array holds all map types as seen in the document
var mapTypes;
// array holds the name of maps that will used to determine groups to merge
var mapNames = [];
// array holds group of like maps in arrays
var mapSet = [];

//Start
if (app.documents.length > 0) {
  mergeLayers();
  buildMapNames();
  gatherMaps();
  mergeMaps();
}

// creates the mapNames array based on the _mapSuffix(.normal, .height etc.) in every open document || tab
function buildMapNames() {
  for (var i = 0; i < docCount; i++) {
    var patt = new RegExp("\\w+_\\w+.psd", "i");
    //if document name contains the pattern add it to an array
    if (patt.test(docs[i].name)) {
      //grab just the map name and push to array
      var regex = new RegExp("(\\w+_)(?=([a-z]+)(.psd))", "i");
      var map = docs[i].name.replace(regex, "");
      regex = new RegExp(".psd");
      map = map.replace(regex, "");
      mapNames.push(map);
    }
  }
  //can't use 'set' et al. so for-loop to check & make unique mapnames
  for (var j = 0; j < mapNames.length; j++) {
    for (var k = 1; k < mapNames.length - 1; k++) {
      if (mapNames[k] === mapNames[j]) {
        mapNames.pop();
      }
    }
  }

  // build a mapSET with objects based on the available maps, this will be used to group multiple map types
  for (var p = 0; p < mapNames.length; p++) {
    mapSet.push([]);
  }
}

// gathers all documents with the same suffix to a single array
function gatherMaps() {
  for (var i = 0; i < docCount; i++) {
    //alert(mapNames[i])
    for (var j = 0; j < mapNames.length; j++) {
      var patt = new RegExp("\\w+_" + mapNames[j] + ".psd", "i");
      //if document name contains the pattern add it to an array
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
    app.activeDocument = app.documents[k];

    // discard hidden layers and merge visible ones
    var layerCount = app.activeDocument.artLayers.length;
    var layerSetCount = app.activeDocument.layerSets.length;

    if (layerCount + layerSetCount > 1) {
      // normal maps need to have the background removed so the don't overlay others when stacked
      var patt = new RegExp("\\w+_normal.psd", "i");
      if (patt.test(app.activeDocument.name)) {
        try {
          var bg = app.activeDocument.artLayers.getByName("Background");
          if (bg !== null && bg !== undefined) bg.remove();
        } catch (error) {
         // alert(error)
        }
      }

      //remove snapshot
      try {
        var snap = app.activeDocument.artLayers.getByName("snapshot");
        if (snap !== null && snap !== undefined) snap.remove();
      } catch (error) {
       // alert(error)
      }

      // merge layers
    try {
             app.activeDocument.mergeVisibleLayers();
      } catch (error) {
       // alert(error)
      }

      for (var i = 0; i < app.activeDocument.artLayers.length; i++) {
        if (app.activeDocument.artLayers[i].visible == false)
          app.activeDocument.artLayers[i].remove();
      }
    }
  }
}

// merges maps in array with the same suffix to the first ([primary_map]) of their type
function mergeMaps() {
  // Keep the first document with that prefix out of the loop and gather each layer
  for (var a = 0; a < mapSet.length; a++) {
    var map1 = mapSet[a];
    for (var i = 1; i < map1.length; i++) {
      for (var j = 0; j < map1[i].layers.length; j++) {
        layerNames.push(map1[i].layers[j].name);
      }

      //duplicate each layer to its [primary_map]
      for (var k = 0; k < layerNames.length; k++) {
        app.activeDocument = map1[i];
        app.activeDocument.artLayers
          .getByName(layerNames[k])
          .duplicate(map1[0], ElementPlacement.PLACEATBEGINNING);
      }

      //reset layer obj when done
      layerNames = [];
    }
  }

  //prompt to save
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
    app.activeDocument.saveAs(
      fileLocation,
      PNGSaveOptions,
      true,
      Extension.LOWERCASE
    );
  }

  alert("Merge completed, files saved in " + exportPath);
}
