$(document).ready(function() { 
  	console.log('ready');
	snakeGrid = new Grid(20,15); 
	snake = new Snake(10,5,"r");
	render(snakeGrid);
	renderSnake(snake);

	$(document).keydown(function(event){
    var keyMap = {left: 37, up: 38, right: 39, down: 40, space: 32 } ;
    switch (event.keyCode) {
      case keyMap.left:
      	if (snake.direction() != "r") { 

        snake.changeDirection("l");
        }
        break;
      case keyMap.right:
      	if (snake.direction() != "l") { 
        snake.changeDirection("r");   
        } 
        break;
      case keyMap.down:
      	if (snake.direction() != "u") { 
        	snake.changeDirection("d");
    	}
        break;
      case keyMap.up:
     	 if (snake.direction() != "d") { 
        	snake.changeDirection("u");   
        } 
        break;
       case keyMap.space:
       clearInterval(refreshIntervalId);
       break;
    }
  });

	refreshIntervalId = setInterval(function(){ 

		moveSnake(snake.direction());

	}, 200);
  
  });
  


	function Grid(sizeX,sizeY){ 
		this.sizeX = sizeX;
		this.sizeY = sizeY;
		
		var slotEmplacement = new Array(sizeY);
		for (var i = 0; i < sizeY; i++) {
  			slotEmplacement[i] = new Array(sizeX);
		}



		for (var y = 0; y < sizeY; y++) { 
			for (var x = 0; x < sizeX; x++ ) { 
				slotEmplacement[y][x] = new Slot(x,y);
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

	function Snake(initCoordX, initCoordY, initDirect) { 
		var headCoordX = initCoordX ; 
		var headCoordY = initCoordY ; 
		var direction = initDirect ; 

		
		var snakeEmplacement = new Array(10);
		for (var i = 0; i < 10; i++) { 
			var x = headCoordX - i ;
			snakeEmplacement[i] = [x,headCoordY];
		}

		this.changeDirection = function(directionGiven) { 
			direction = directionGiven ; 
		}

		this.getCoordSnake = function() { 
			return snakeEmplacement; 
		}

		this.headCoordX = function() { 
			return headCoordX;
		}

		this.headCoordY = function() { 
			return headCoordY;
		}

		this.direction = function() { 
			return direction;
		}

		this.updateSnakeEmplacement = function(se) { 

			snakeEmplacement = se ; 
		}


	}

	function moveSnake(direction) { 
		var snakeEmplacement = snake.getCoordSnake(); 
		j = snakeEmplacement.length - 1 ; 
		eraseSnakeOneCase(snakeEmplacement[j][0],snakeEmplacement[j][1]);
		
		for (j; j > 0; j--) { 

				snakeEmplacement[j][0]= snakeEmplacement[j - 1][0] ;
				snakeEmplacement[j][1]= snakeEmplacement[j - 1][1] ;
				
		}
		
		

		switch(direction) { 

			case "r":
		
			snakeEmplacement[0][0] += 1 ;
			
			break; 

			case "l": 
				snakeEmplacement[0][0] -= 1 ;
			break; 

			case "u": 
				snakeEmplacement[0][1] -= 1 ;
			break; 

			case "d": 
				snakeEmplacement[0][1] += 1 ;
			break; 

		}
		checkIfLost(snakeEmplacement);
		snake.updateSnakeEmplacement(snakeEmplacement);
		renderSnake(snake);
		



	}



  function renderSnake(snake) { 
  	var snakeEmplacement = snake.getCoordSnake(); 

  	for (var i = 0; i < snakeEmplacement.length; i++) { 
  		var x = snakeEmplacement[i][0];
  		var y = snakeEmplacement[i][1];
  		renderOneCaseSnake(x,y);
  	}


  }

  function renderOneCaseSnake(x,y) { 
  	var id = $("#squareX" + x + "Y"+ y) ;

  	id.css({backgroundColor: "red"});
  	
  	
  }

  function eraseSnakeOneCase(x,y) { 
  	$("#squareX" + x + "Y"+ y).css({backgroundColor: "white"});
  }

  function checkIfLost(snakeEmplacement) { 
  	
  		var x = snakeEmplacement[0][0];
  		var y = snakeEmplacement[0][1];
  		if (x > snakeGrid.sizeX || x < 0 || y > snakeGrid.sizeY || y < 0) { 
  			displayLost();

  		}

  		for (var i = 1; i < snakeEmplacement.length; i++) { 
  	
  			if (snakeEmplacement[0][0] == snakeEmplacement[i][0] && snakeEmplacement[0][1] == snakeEmplacement[i][1]) { 
  				displayLost();

  			}
  		}
  	
  }

  function displayLost() { 
  	clearInterval(refreshIntervalId);
  			console.log("LOST");
  }

  function render(grid){ 
  	var squareSizeX = $("#snake__container").width() / grid.sizeX;
  	var squareSizeY = $("#snake__container").height() / grid.sizeY;
	for (var y = 0; y < grid.sizeY; y++) { 
			for (var x = 0; x < grid.sizeX; x++ ) { 

				var $div = $("<div>", {id: "squareX" + x + "Y"+ y, class: "square"});
				$("#snake__container").append($div);
				$(".square").css({ 
					width: squareSizeX ,
					height: squareSizeY 
				});
			}
		
		}
  
  }  