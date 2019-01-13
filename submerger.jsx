/*
 Author: Everistus Akpabio | Comphonia
 Licence: MIT License
 Version: 1.0
*/

// object holds all documents || open tabs
var docs = app.documents;
// count of all open documents || tabs
var docCount = docs.length;
// store initial layers by name
var layerNames = [];
// array holds all map types as seen in the document
var mapTypes
// array holds the name of maps that will used to determine groups to merge
var mapNames = [];
// array holds group of like maps in arrays
var mapSet = [];

//Start
if (app.documents.length > 0) {
    buildMapNames();
    gatherMaps();
    mergeMaps();
}

// creates the mapNames array based on the _mapSuffix in every open document || tab
function buildMapNames() {
    for (i = 0; i < docCount; i++) {
        var patt = new RegExp("\\w+_\\w+.psd", "i");
        //if document name contains the pattern add it to an array
        if (patt.test(docs[i].name)) {
            //grab just the map name and push to array
            var regex = new RegExp("(\\w+_)(?=([a-z]+)(.psd))", "i");
            var map = docs[i].name.replace(regex, "");
            regex = new RegExp(".psd")
            map = map.replace(regex, "");
            mapNames.push(map);
        }
    }
    //cant use includes so for-loop to check & make unique mapnames
    for (j = 0; j < mapNames.length; j++) {
        for (k = 1; k < mapNames.length - 1; k++) {
            if (mapNames[k] === mapNames[j]) {
                mapNames.pop();
            }
        }
    }

    // build a mapSET with objects based on the available maps, this will be used to group multiple map types
    for (j = 0; j < mapNames.length; j++) {
        mapSet.push([]);
    }

}

// gathers all documents, assigns a master [_mapSuffix] map type and call methods to perform the duplicate and merge from others to master
function gatherMaps(){
        for (i = 0; i < docCount; i++) {
            //alert(mapNames[i])
            for (j = 0; j < mapNames.length; j++) {
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

// duplicate maps from like documents to the first
function mergeMaps() {
    // Keep the first document with that prefix out of the loop and gather each layer
    for (a = 0; a < mapSet.length; a++) {
        var map1 = mapSet[a];
        for (i = 1; i < map1.length; i++) {
            for (j = 0; j < map1[i].layers.length; j++) {
                layerNames.push(map1[i].layers[j].name);
            }
            //duplicate each layer to its [primary_map]
            for (k = 0; k < layerNames.length; k++) {
                app.activeDocument = map1[i];
                app.activeDocument.artLayers.getByName(layerNames[k]).duplicate(map1[0], ElementPlacement.PLACEATBEGINNING);
                //turn off snapshot layer
                app.activeDocument = map1[0];
                app.activeDocument.artLayers.getByName("snapshot").visible = false;
            }
            // normal maps need to have the background turned off after duplicating
            var patt = new RegExp("\\w+_normal.psd", "i");
            if (patt.test(app.activeDocument.name)) {
                var bg = app.activeDocument.artLayers;
                bg[0].visible = false; //hard coded since duplication is stacked top-bottom
            }

            //reset layer obj when done
            layerNames = [];
        }
    }
  
    //prompt to save
    var prompt = confirm("Do you want to save changes to disk ?");
    if(prompt){
        saveDocuments();
    }
}

function saveDocuments() {
    var exportPath = app.documents[0].path;

    for (k = 0; k < mapSet.length; k++) {
        var map1 = mapSet[k];
        app.activeDocument = map1[0];
        app.activeDocument.flatten();
        var fileName = map1[0].name;
        var fileLocation = File(exportPath + "/" + fileName);
        app.activeDocument.saveAs(fileLocation, PNGSaveOptions, true, Extension.LOWERCASE);
    }

    alert("Merge completed, files saved in "+ exportPath);
}