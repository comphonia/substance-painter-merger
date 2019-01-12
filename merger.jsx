//Path the current document is located
var exportPath = app.documents[0].path.fsName;
// object holds all documents || open tabs
var docs = app.documents;
// count of all open documents || tabs
var docCount = docs.length;
// array of all layers
var docLayers = app.activeDocument.layers;
// count of all the layers [using .length in the forloop to get the count, causes an infinite loop because it recounts every layer again]
var docLayerCount = docLayers.length;
// store initial layers by name
var layerNames = [];
// array holds the name of maps that will used to determine groups to merge
var mapNames = ["basecolor", "normal"];


//Start
if (app.documents.length > 0) {
    documentAlloc();
}

// gathers all documents, assigns a master [_mapSuffix] map and call methods to perform the duplicate and merge from others to master
function documentAlloc() {
    var map1 = [];
    var map2 = [];
    for (i = 0; i < docCount; i++) {
        
        //alert(mapNames[i])
        for (j = 0; j < mapNames.length; j++) {
         var patt = new RegExp("\\w+_" + mapNames[j] + ".psd", "i");
         //if document name contains the pattern add it to an array
            if (patt.test(docs[i].name)) {
                if(j === 0){
                    map1.push(docs[i].name);}
                else if(j === 1){
                    map2.push(docs[i].name);}
            }
        }
    }
    alert(map2)
}

// store layers in the current document in an array before duplicating
function gatherLayers() {
    for (i = 0; i < docLayerCount; i++) {
        layerNames.push(docLayers[i].name);
    }
}

// duplicate (by name instead of index) to 
function duplicateLayers() {
    for (i = 0; i < layerNames.length; i++) {
        //duplicate each layer to its [primary_map]
        app.activeDocument.artLayers.getByName(layerNames[i]).duplicate(docs[0], ElementPlacement.PLACEATBEGINNING);
    }
}




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