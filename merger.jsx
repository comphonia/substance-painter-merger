//Path the current document is located
var exportPath = app.documents[0].path.fsName;
// object holds all documents || open tabs
var docs = app.documents;
// count of all open documents || tabs
var docCount = docs.length;
// // array of all layers
// var docLayers = app.activeDocument.layers;
// // count of all the layers [using .length in the forloop to get the count, causes an infinite loop because it recounts every layer again]
// var docLayerCount = docLayers.length;
// store initial layers by name
var layerNames = [];
// array holds all map types as seen in the document
var mapTypes
// array holds the name of maps that will used to determine groups to merge
var mapNames = [];
var mapSet = [];


//alert(docs[0].layers[1].name)

//Start
if (app.documents.length > 0) {
    buildMapNames();
    documentAlloc();
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
        for (k = 1; k < mapNames.length; k++) {
            if (mapNames[j] === mapNames[k]) {
                mapNames.pop()
            }
        }
    }
    // build a mapSET with objects based on the available maps, this will be used to group multiple map types
    for (j = 0; j < mapNames.length; j++) {
        mapSet.push([]);

    }

}

// gathers all documents, assigns a master [_mapSuffix] map type and call methods to perform the duplicate and merge from others to master
function documentAlloc() {
    // var map1 = [] ;
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

                // if (j === 0) {
                //     map1.push(docs[i]);
                // } else if (j === 1) {
                //    // map2.push(docs[i]);
                // }
            }
        }
    }

    //alert(map1)
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

            //reset layer obj when done
            layerNames = [];
        }
    }
}

// // store layers in the current document in an array before duplicating
// function gatherLayers() {
//     for (i = 0; i < docLayerCount; i++) {
//         layerNames.push(docLayers[i].name);
//     }
// }

// // duplicate (by name instead of index) to 
// function duplicateLayers() {
//     for (i = 0; i < layerNames.length; i++) {
//         //duplicate each layer to its [primary_map]
//         app.activeDocument.artLayers.getByName(layerNames[i]).duplicate(docs[0], ElementPlacement.PLACEATBEGINNING);
//     }
// }




// alert(docs);
//alert(layerNames[1]);


// var patt =/\w+_normal.psd/i;
// if (patt.test(snapshot.name)){
//     alert(snapshot.name);
// } else {
//     alert("not");
// }





// // Get the snapshot layer XXX
// var snapshotLayer = app.activeDocument.artLayers.getByName("snapshot");

// alert(docLayers[0]);

// // Turn on the snapshot layer
// snapshotLayer.visible = true;