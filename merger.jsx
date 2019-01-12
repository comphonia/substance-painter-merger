
//Path the current document is located
var exportPath = app.documents[0].path.fsName;

var docs ="";
// Array of all layers
var docLayers = app.activeDocument.layers;

// Count of all the layers [using .length in the forloop to get the count, causes an infinite loop because it recounts every layer again]
var docLayerCount = docLayers.length;

// for-loop to duplicate will not work since the index changes as they get duplicated, so store inital layers and loop to duplicate
// store initial layers by name
var layerNames = [];
for(i=0; i<docLayerCount; i++)
{
   layerNames.push(docLayers[i].name);
}

//now duplicate by name instead of index
for(i=0; i<layerNames.length; i++)
{
    app.activeDocument.artLayers.getByName(layerNames[i]).duplicate();
}



// alert(docs);
//alert(layerNames[1]);


// var patt =/\w+_normal.psd/i;
// if (patt.test(snapshot.name)){
    //     alert(snapshot.name);
    // } else {
        //     alert("not");
        // }
        
        // // Count of all open documents || tabs XXX
        // var docCount = app.documents.length;
        

        
        // // Get the snapshot layer XXX
        // var snapshotLayer = app.activeDocument.artLayers.getByName("snapshot");
        
        // alert(docLayers[0]);
        
        // // Turn on the snapshot layer
        // snapshotLayer.visible = true;