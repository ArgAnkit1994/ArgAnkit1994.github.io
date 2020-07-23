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
function Card(list, title,description,priorityLevel,attachment,status, createdAt,assignTo) { //,id

	this.id = list.board.getNextId()  //id ? id : 
	this.list = list
	this.title = title
	this.description = description
	this.priorityLevel = typeof priorityLevel!=='undefined'?priorityLevel:undefined
	this.attachment = typeof attachment!=='undefined'? attachment : undefined  // attachment.files[0]   : undefined  
	this.status = typeof status!=='undefined'?status : undefined
	this.createdAt = typeof createdAt!=='undefined'?createdAt : undefined
	this.assignTo = typeof assignTo!=='undefined'?assignTo : undefined
	this.node = buildCardNode()
	this.titleNode = this.node.getElementsByClassName('card-title')[0]

	this.node.classList.add('card')
	this.node.setAttribute('card-id', this.id)
	this.node.setAttribute('title','Title:'+this.title+'\n'+'Description:'+this.description);
	this.surroundStrongTag = document.createElement('strong');
	this.surroundStrongTag.cssText = 'fontWeight: 600; display: block; padding : 5px;'
	this.surroundStrongTag.appendChild(document.createTextNode(this.title));
	this.titleNode.appendChild(this.surroundStrongTag);
	//this.titleNode.appendChild(document.createTextNode(this.title));


	if(this.description!== 0){
		this.descriptonNode = document.createElement('p');
		this.descriptonNode.setAttribute('id','desc');
		this.descriptonNode.appendChild(document.createTextNode(this.description));
		this.titleNode.appendChild(this.descriptonNode);
		this.descriptonNode.style.display ='none';
	}
	if(typeof this.priorityLevel!=='undefined'){
		this.priorityLevelNode = document.createElement('p');
		this.priorityLevelNode.setAttribute('id',this.priorityLevel);
		this.priorityLevelNode.appendChild(document.createTextNode(this.priorityLevel));
		this.titleNode.appendChild(this.priorityLevelNode);
			
		this.node.style.borderLeft = "6px solid"
		this.node.style.borderRadius ='30px'
		
		if(this.priorityLevel == 'High'){				
			this.node.style.borderLeftColor = "red";		
		}
		if(this.priorityLevel =='Medium'){
			this.node.style.borderLeftColor = "yellow";
			
		}
		if(this.priorityLevel =='Low'){
			this.node.style.borderLeftColor = "blue";
		}
		this.priorityLevelNode.style.display = 'none';
	}
	
	if(typeof this.attachment !== 'undefined'){
		this.attachmentNode = document.createElement('IMG');
		this.attachmentNode.setAttribute('width','100%');
		this.attachmentNode.setAttribute('height','100%');
		this.attachmentNode.style.padding = '20px'
		this.attachmentNode.setAttribute('id','img'+this.id)
		this.attachmentNode.setAttribute('src',this.attachment);
		this.titleNode.appendChild(this.attachmentNode);

	}
	if(typeof this.status!== 'undefined'){
		this.statusNode = document.createElement('p');
		this.statusNode.setAttribute('id',this.status);
		this.statusNode.appendChild(document.createTextNode(this.status));
		this.titleNode.appendChild(this.statusNode);
		this.statusNode.style.display = 'none';
	}
	if(typeof this.createdAt!== 'undefined'){
		this.createdAtNode = document.createElement('p');		
		this.createdAtNode.setAttribute('id','createdAt');
		this.surroundDateTag = document.createElement('span');
		if(this.status == 'Done'){
			this.createdAtNode.style.cssText =`width:45%; background-color:#1bd28ae6; box-sizing:border-box; color:white; min-height:25px;
			margin: 0px 0px 0px 0px; padding: 0px; border-radius: 5px; text-align: center; display:inline-block; padding-top:2px`
			this.surroundDateTag.innerHTML = "<i class='fa fa-check' aria-hidden='true'></i>"+' '+this.createdAt.slice(0,-5);
		}
		else{
			this.createdAtNode.style.cssText = `width:45%; background-color:rgba(211, 211, 211, 0.39); box-sizing:border-box;min-height:25px;
			margin: 0px 0px 0px 0px; padding: 0px; border-radius: 5px; text-align: center; display:inline-block;padding-top:2px;`
			this.surroundDateTag.innerHTML = '<i class="fa fa-bell-o" aria-hidden="true"></i>'+' '+this.createdAt.slice(0,-5);
		}
				
		this.createdAtNode.appendChild(this.surroundDateTag);
		this.titleNode.appendChild(this.createdAtNode);
	}
	if(typeof this.assignTo!=='undefined'){
		this.assignToNode = document.createElement('span');
		this.assignToNode.setAttribute('id','assignTo');
		this.assignToNode.appendChild(document.createTextNode(this.assignTo));
		this.titleNode.appendChild(this.assignToNode);
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

				if(target.list.index == 0){
					source.card.statusNode.innerHTML = target.list.title;
					source.card.status = target.list.title
				}
				else if(target.list.index == 1){
					source.card.statusNode.innerHTML = target.list.title;
					source.card.status = target.list.title
				}		
				else if(target.list.index == 2){
					source.card.statusNode.innerHTML = target.list.title;
					source.card.status = target.list.title
				}
				else if(target.list.index == 3){
					source.card.statusNode.innerHTML = target.list.title;
					source.card.status = target.list.title
				}

				source.card.statusNode.setAttribute('id',source.card.statusNode.innerHTML);
				

				source.card.createdAt = new Date().toDateString();				
				if(source.card.status == 'Done'){
					source.card.createdAtNode.style.cssText = `width:45%; background-color:#1bd28ae6; box-sizing:border-box;color:white;min-height:25px; 
					margin: 0px 0px 0px 0px; padding: 0px; border-radius: 5px; text-align: center; display:inline-block;padding-top:2px`
					source.card.surroundDateTag.innerHTML = "<i class='fa fa-check' aria-hidden='true'></i>"+' '+source.card.createdAt.slice(0,-5);
					
				}
				else{
					source.card.createdAtNode.style.cssText =`width:45%; background-color:rgba(211, 211, 211, 0.39); box-sizing:border-box;min-height:25px;
					margin:0px 0px 0px 0px; padding: 0px; border-radius: 5px; text-align: center; display:inline-block;padding-top:2px`
					source.card.surroundDateTag.innerHTML = '<i class="fa fa-bell-o" aria-hidden="true"></i>'+' '+source.card.createdAt.slice(0,-5);
				}
				
			//board.registerCard(source.card, target.index + 1,target.list.title);
			if(window.localStorage){
				var removeCycle = JSON.stringify(JSON.decycle(currentBoard));
				window.localStorage.myData = removeCycle;
			}
			evt.preventDefault()
	
		}
	}(list.board))

	this.node.ondragend = function () {
		dragTracker.id = undefined
	}

	// this function will be called once you click on the card to edit
	this.node.onclick = (function (card) {
		return function () {
			cardEdit.card = card
			cardEdit.titleNode.value = card.title;
			cardEdit.descriptionNode.value = card.description;
			cardEdit.priorityLevelNode.value = card.priorityLevel;
			//cardEdit.statusNode.innerText = card.status;
			cardEdit.attachmentNode.innerText = card.attachment;
			cardEdit.assignToNode.innerText = card.assignTo;
			//cardEdit.createdAtNode = card.createdAt;
			cardEdit.show();
		}
	}(this))
}