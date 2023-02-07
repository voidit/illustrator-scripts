if (app.documents.length>0) {
    var document = app.activeDocument;
    var afile = document.fullName;
    var filename = afile.name.split('.')[0];
    var folder = afile.parent.selectDlg("Export as CVG Layers...");

    if(folder != null) {
        var activeABidx = document.artboards.getActiveArtboardIndex();
        var activeAB = document.artboards[activeABidx]; // get active AB
        var abBounds = activeAB.artboardRect;// left, top, right, bottom

        showAllLayers();
        var docBounds = document.visibleBounds;
        activeAB.artboardRect = docBounds;

        var exportOptions = new ExportOptionsSVG();
        exportOptions.embedRasterImages = true;
        exportOptions.embedAllFonts = false;
        exportOptions.compressed = true;
        exportOptions.fontSubsetting = SVGFontSubsetting.GLYPHSUSED;

        hideAllLayers ();
        for(var i=document.layers.length-1, k=0; i>=0; i--, k++) {
            var layer = document.layers[i];
            layer.visible = true;
            var file = new File(folder.fsName + '/' +filename+ '-' + k +".svg");
            document.exportFile(file, ExportType.SVG, exportOptions);
            layer.visible = false;
        }

        showAllLayers();
        activeAB.artboardRect = abBounds;
    }


    function hideAllLayers() {
        forEach(document.layers, function(layer) {
            layer.visible = false;
        });
    }


    function showAllLayers() {
        forEach(document.layers, function(layer) {
            layer.visible = true;
        });
    }


    function forEach(collection, fn) {
        var n = collection.length;
        for(var i=0; i<n; ++i)
        {
            fn(collection[i]);
        }
    }
}
