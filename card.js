var dragTracker =
{
	id: undefined
	, list: undefined
}

//this function will build the card node
function buildCardNode() {
	var node = document.createElement('div')
	node.draggable = true
	node.innerHTML =
		'<div class="card-title"></div>';
	return node
}

/*
 This function is constructor function for card
 */
function Card(list, title,description,priorityLevel,attachment,status, createdAt,id) {

	this.id = id ? id : list.board.getNextId()
	this.list = list
	this.title = title
	this.description = description
	this.priorityLevel = priorityLevel
	this.attachment = attachment
	this.status = status
	this.createdAt = createdAt
	this.node = buildCardNode()
	this.titleNode = this.node.getElementsByClassName('card-title')[0]

	this.node.classList.add('card')
	this.node.setAttribute('card-id', this.id)
	this.titleNode.appendChild(document.createTextNode(this.title));
	if(this.description!=='' && this.description!== 0){
		this.descriptonNode = document.createElement('p');
		this.descriptonNode.setAttribute('id','desc');
		this.descriptonNode.appendChild(document.createTextNode(this.description));
		this.titleNode.appendChild(this.descriptonNode);
	}
	if(this.priorityLevel!=='' && typeof this.priorityLevel!=='undefined'){
		this.priorityLevelNode = document.createElement('p');
		this.priorityLevelNode.setAttribute('id',this.priorityLevel);
		this.priorityLevelNode.appendChild(document.createTextNode(this.priorityLevel));
		this.titleNode.appendChild(this.priorityLevelNode);
		if(this.priorityLevel == 'High'){
			this.node.style.borderLeft = "2px solid"
			this.node.style.borderLeftColor = "red";
		}
		if(this.priorityLevel =='Medium'){
			this.node.style.borderLeft = "2px solid"
			this.node.style.borderLeftColor = "yellow";
		}
		if(this.priorityLevel =='Low'){
			this.node.style.borderLeft = "2px solid"
			this.node.style.borderLeftColor = "blue";
		}
	}
	
	if(this.attachment!=='' && typeof this.attachment !== 'undefined'){
		this.attachmentNode = document.createElement('p');
		this.attachmentNode.setAttribute('id','attach');
		this.attachmentNode.appendChild(document.createTextNode(this.attachment));
		this.titleNode.appendChild(this.attachmentNode);

	}
	if(this.status){
		this.statusNode = document.createElement('p');
		this.statusNode.setAttribute('id','status');
		this.statusNode.appendChild(document.createTextNode(this.status));
		this.titleNode.appendChild(this.statusNode);
	}
	if(this.createdAt){
		this.createdAtNode = document.createElement('p');
		this.createdAtNode.setAttribute('id','createdAt');
		this.createdAtNode.appendChild(document.createTextNode(this.createdAt.toLocaleString()));
		this.titleNode.appendChild(this.createdAtNode);
	}

	let trash = document.createElement('div');
    trash.classList.add('trash');
	trash.innerText = "X";
    this.titleNode.appendChild(trash);

	/*
	 These four function will work on drag and drop of the card on another list
	 */
	this.node.ondragstart = (function (id) {
		return function (evt) {
			dragTracker.id = id
			evt.dataTransfer.effectAllowed = 'move'
		}
	}(this.id))

	this.node.ondragover = function (evt) {
		if (dragTracker.id) {
			evt.preventDefault()
		}
	}

	this.node.ondrop = (function (board) {
		return function (evt) {
			var id = dragTracker.id
				, targetId = this.getAttribute('card-id') // 'this' is target of drop
				, source = board.cards[id]
				, target = board.cards[targetId]
			
			if (id === targetId) {
				return
			}

			source.list.cardsNode.removeChild(source.card.node)
			target.list.cardsNode.insertBefore(source.card.node, target.card.node)

			board.reregisterSubsequent(source.list, source.index + 1, -1)
			source.list.cards.splice(source.index, 1)

			board.reregisterSubsequent(target.list, target.index + 1, 1)
			target.list.cards.splice(target.index + 1, 0, source.card)

			source.card.list = target.list
			board.registerCard(source.card, target.index + 1)

				if(targetId == '_0'){
					source.card.statusNode.innerHTML = target.list.title;
				}
				else if(targetId == '_1'){
					source.card.statusNode.innerHTML = target.list.title;
				}		
				else if(targetId == '_2'){
					source.card.statusNode.innerHTML = target.list.title;
				}
				else if(targetId == '_3'){
					source.card.statusNode.innerHTML = target.list.title;
				}
				
			//board.registerCard(source.card, target.index + 1,target.list.title);
			evt.preventDefault()
	
		}
	}(list.board))

	this.node.ondragend = function () {
		dragTracker.id = undefined
	}

	
	// this function will be called once you click on the text to edit
	this.node.onclick = (function (card) {
		return function () {
			cardEdit.card = card
			cardEdit.titleNode.value = card.title;
			cardEdit.descriptionNode.value = card.description;
			cardEdit.priorityLevelNode.value = card.priorityLevel;
			cardEdit.card.statusNode.value = card.status;
			cardEdit.card.createdAtNode = card.createdAt;
			cardEdit.show();
		}
	}(this))
}