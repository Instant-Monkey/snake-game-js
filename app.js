$(document).ready(function() { 
  	console.log('ready');
	testGrid = new Grid(20,15); 
	render(testGrid);
  
  });
  


	function Grid(sizeX,sizeY){ 
		this.sizeX = sizeX;
		this.sizeY = sizeY;
		
		var slotEmplacement = new Array(sizeX);
		for (var i = 0; i < sizeX; i++) {
  			slotEmplacement[i] = new Array(sizeY);
		}



		for (var x = 0; x < sizeX; x++) { 
			for (var y = 0; y < sizeY; y++ ) { 
				slotEmplacement[x][y] = new Slot(x,y);
			}
		
		}

		this.readSlot = function (x,y) { 
			return slotEmplacement[x][y];
		}
	}

	function Slot(x,y) { 
		this.x = x ; 
		this.y = y ;
		this.content=" ";
	}


  
  function render(grid){ 
  	var squareSizeX = $("#snake__container").width() / grid.sizeX;
  	var squareSizeY = $("#snake__container").height() / grid.sizeY;
	for (x = 0; x < grid.sizeX; x++) { 
			for (y = 0; y < grid.sizeY; y++ ) { 

				var $div = $("<div>", {id: "square" + x + y, class: "square"});
				$("#snake__container").append($div);
				$(".square").css({ 
					width: squareSizeX ,
					height: squareSizeY 
				});
			}
		
		}
  
  }  