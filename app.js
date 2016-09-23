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
        snake.changeDirection("l");
        break;
      case keyMap.right:
        snake.changeDirection("r");    
        break;
      case keyMap.down:
        snake.changeDirection("d");
        break;
      case keyMap.up:
        snake.changeDirection("u");    
        break;
    }
  });

	setInterval(function(){ 

		moveSnake(snake.direction());

	}, 1000);
  
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

	function Snake(initCoordX, initCoordY, initDirect) { 
		var headCoordX = initCoordX ; 
		var headCoordY = initCoordY ; 
		var direction = initDirect ; 

		
		var snakeEmplacement = new Array(4);
		for (var i = 0; i < 4; i++) { 
			var y = headCoordY - i ;
			snakeEmplacement[i] = [headCoordX,y];
		}

		this.changeDirection = function(direction) { 
			this.direction = direction ; 
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

		switch(direction) { 

			case "r": 

			for (var i = 0; i < snakeEmplacement.length; i++) { 
				snakeEmplacement[i][1] += 1 ;
				snake.updateSnakeEmplacement(snakeEmplacement);
			}
			break; 

			case "l": 

			for (var i = 0; i < snakeEmplacement.length; i++) { 
				snakeEmplacement[i][1] -= 1 ;
				snake.updateSnakeEmplacement(snakeEmplacement);
			}
			break; 

			case "u": 

			for (var i = 0; i < snakeEmplacement.length; i++) { 
				snakeEmplacement[i][0] -= 1 ;
				snake.updateSnakeEmplacement(snakeEmplacement);
			}
			break; 

			case "d": 

			for (var i = 0; i < snakeEmplacement.length; i++) { 
				snakeEmplacement[i][0] += 1 ;
				snake.updateSnakeEmplacement(snakeEmplacement);
			}
			break; 

		}

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
  	$("#square" + x + y).css({backgroundColor: "red"});
  }

  function eraseSnakeOneCase(x,y) { 
  	$("#square" + x + y).css({backgroundColor: "white"});
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