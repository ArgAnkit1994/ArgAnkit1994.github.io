(function () {
	'use strict'

	//Board constructor object and assign some properties to its prototype
	function Board(title) {
		var nextId = 0

		this.title = title
		this.lists = []
		this.cards = {}

		this.node = document.createElement('div')
		this.titleNode = document.createElement('div')
		this.listsNode = document.createElement('div')

		this.node.id = 'board'
		this.titleNode.id = 'trello-title-board'
		this.listsNode.id = 'trello-canvas-board'

		// new list title form
		this.titleFormNode = buildListTitleForm()
		this.titleNode.appendChild(document.createTextNode(this.title))

		this.getNextId = function () {
			return '_' + (nextId++).toString()
		}
            
	}

	Board.prototype.render = function () {
			this.lists.push(new List(this, 'Todo', 0, true))
			this.lists.push(new List(this, 'In Progress', 1, true))
			this.lists.push(new List(this, 'In Review', 2, true))
			this.lists.push(new List(this, 'Done', 3, true))

			for (var i = 0; i < this.lists.length; ++i) {
				this.listsNode.appendChild(this.lists[i].node)
			}
				this.lists[this.lists.length - 1].node.appendChild(this.titleFormNode)
				this.node.appendChild(this.titleNode)
				this.node.appendChild(this.listsNode)
	}

	Board.prototype.registerCard = function (card, index, status) {
		this.cards[card.id] =
		{
			card: card
			, list: card.list
			, index: index
			,status: status
		}
	}

	Board.prototype.reregisterSubsequent = function (list, index, shift) {
		for (var i = index; i < list.cards.length; ++i) {
			this.registerCard(list.cards[i], i + shift)
		}
		
	}

	Board.prototype.unregisterCard = function (card) {
		delete this.cards[card.id]
	}


	document.getElementById('card-edit-close').onclick = cardEdit.close

	document.getElementById('card-edit-submit').onclick = cardEdit.submit

	document.getElementById('card-edit-delete').onclick = cardDeleteTrello.delete

	cardEdit.windowOverlay.onclick = cardEdit.close

	//if you click on escape then also the edit window will get closed
	window.onkeydown = function (evt) {
		if (evt.keyCode === 27) {
			cardEdit.close()
		}
	}
	
	//Prevent enter on form action
	document.getElementById("card-form").onkeypress = function(e){
		var title = document.getElementById('card-edit-title').value;
		var description = document.getElementById('description').value;
		var priorityLevel = document.getElementById('priorityLevel').value;;
		var key = e.charCode || e.keyCode || 0; 
		if(title =='' || description.trim() =='' || priorityLevel == ''){
			if (key == 13 ) {
				e.preventDefault();
			  }
		}    
  		
	}

	

	//Onloading the document render the board.The code starts from here
	document.body.onload = function () {
		var title ='Task Manager'
		var nextId = 0;
		if(window.localStorage.myData !== 'undefined'){
			var restoredObject = JSON.retrocycle(JSON.parse(window.localStorage.myData));
			
			//Board level changes
			restoredObject.getNextId = function(){ return '_' + (nextId++).toString()}
			restoredObject.listsNode = document.createElement('div')
			restoredObject.node = document.createElement('div')
			restoredObject.titleFormNode = buildListTitleForm()
			restoredObject.titleNode = document.createElement('div')
			restoredObject.node.id = 'board'
			restoredObject.titleNode.id = 'trello-title-board'
			restoredObject.listsNode.id = 'trello-canvas-board'
			restoredObject.titleNode.appendChild(document.createTextNode(title))
			restoredObject.registerCard = Board.prototype.registerCard;
			restoredObject.reregisterSubsequent = Board.prototype.reregisterSubsequent;
			restoredObject.unregisterCard = Board.prototype.unregisterCard;
			
			restoredObject.render = function(){
				for(var i=0; i < restoredObject.lists.length; i++){
					restoredObject.lists[i] = (new List(restoredObject,restoredObject.lists[i].title, i, true,restoredObject.lists[i].cards));
					restoredObject.listsNode.appendChild(restoredObject.lists[i].node);
				}		
				
				restoredObject.lists[restoredObject.lists.length - 1].node.appendChild(restoredObject.titleFormNode)
				restoredObject.node.appendChild(restoredObject.titleNode)
				restoredObject.node.appendChild(restoredObject.listsNode)
			}

			
			restoredObject.render();
			document.getElementById('container').appendChild(restoredObject.node)
			currentBoard = restoredObject
			console.log('This is restore object with additions',restoredObject);
			
		}
		else{
			var title ='Task Manager'					 
			, board = new Board(title)
			board.render()
			document.getElementById('container').appendChild(board.node)
			currentBoard = board
			console.log('this is board',board);
		}

	}
}())
