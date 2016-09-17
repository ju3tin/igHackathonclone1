var dataArray = []

var gridDataSource = new DevExpress.data.ArrayStore({
	data: dataArray
})

$(function(){
	$("#myModal").modal("show");



	$.ajax({
	    url: "http://globalmaster.xignite.com/xglobalmaster.json/GetMasterByExchange?Exchange=XNAS&StartSymbol=A&EndSymbol=B&InstrumentClass=Stock&AsOfDate=9/15/2016&_callback=callbackFn",
	 
	    // The name of the callback parameter, as specified by the YQL service
	    jsonp: "callbackFn",
	 
	    // Tell jQuery we're expecting JSONP
	    dataType: "jsonp",
	 
	    // Work with the response
	    success: function( response ) {
	        console.log( response ); // server response
	    }
	});

	$("#gridContainer").dxDataGrid({
	    dataSource: gridDataSource,
	    paging: {
	        pageSize: 10
	    },
	    pager: {
	        showPageSizeSelector: true,
	        allowedPageSizes: [5, 10, 20],
	        showInfo: true
	    },
	    columns: ["Symbol", "ISIN",
            {
                dataField: "trade",
                cellTemplate: function (container, options) {
                    createLink(container, options.data.SEDOL, "/trade?SEDOL=" + options.data.SEDOL);
                    container.append("-" + options.value);
                },
            }

	    ]
	});

});

    function createLink(container, text, hyperlink) {
        return $("<a/>")
            .addClass("dx-link")
            .text(text)
            .attr("href", hyperlink)
            .appendTo(container);
    }

function callbackFn(data){
	dataArray.length =0;
	dataArray.push.apply(dataArray, data);

	$("#gridContainer").dxDataGrid("instance").refresh();
	console.log(data);
}


// Using YQL and JSONP
function jasonp(){
	$.ajax({
	    url: "http://globalmaster.xignite.com/xglobalmaster.json/GetMasterByExchange?Exchange=XNAS&StartSymbol=A&EndSymbol=B&InstrumentClass=Stock&AsOfDate=9/15/2016&_callback=callbackFn",
	 
	    // The name of the callback parameter, as specified by the YQL service
	    jsonp: "callbackFn",
	 
	    // Tell jQuery we're expecting JSONP
	    dataType: "jsonp",
	 
	    // Work with the response
	    success: function( response ) {
	        console.log( response ); // server response
	    }
	});
}
