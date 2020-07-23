// Code for the file to appear on card
var imgURL ='';
document.getElementById("inputGroupFile01").addEventListener("change", function() {
	imgURL = this				
});

var cardEdit =
{ node: document.getElementById('card-edit')
	, windowOverlay: document.getElementById('container-main')
	, titleNode: document.getElementById('card-edit-title')
	, descriptionNode: document.getElementById('description')
	,priorityLevelNode: document.getElementById('priorityLevel')
	,attachmentNode: document.getElementById('inputGroupFile01')
	,assignToNode: document.getElementById('ajax')
	,createdAtNode: new Date().toLocaleString()
	//,statusNode: !document.getElementById('status') ? undefined : document.getElementById('status')
	, card: undefined
}

cardEdit.clearInputs = function () {
	cardEdit.titleNode.value = '';
	cardEdit.descriptionNode.value = ''
	cardEdit.attachmentNode.value = ''
	cardEdit.attachmentNode.innerHTML ='';
	cardEdit.assignToNode.innerHTML ='';
}

//This will called on the close button
cardEdit.close = function() {
	cardEdit.card = undefined
	cardEdit.clearInputs()
	cardEdit.node.style.display = 'none'
	cardEdit.windowOverlay.style.display = 'none'
}

//This function will show the edited text on the card on submit
cardEdit.show = function () {
	cardEdit.windowOverlay.style.display = 'block'
	cardEdit.node.style.display = 'block'
}

//This function will submit the edited text
cardEdit.submit = function (evt) {
	evt.preventDefault()
	var title = cardEdit.titleNode.value.trim();
	var description = cardEdit.descriptionNode.value.trim();
	var priorityLevel = cardEdit.priorityLevelNode.value.trim();
	//var attachment = imgURL//cardEdit.attachmentNode.value.trim();
	var assignTo = cardEdit.assignToNode.value
	var createdAt = cardEdit.createdAtNode;
	var status = cardEdit.card.status

	if(typeof cardEdit.card === 'undefined'){
		console.log('card is to be created');		
	}

	if (title) {
		cardEdit.card.title = title
		cardEdit.card.description = description
		cardEdit.card.priorityLevel = priorityLevel
		//cardEdit.card.attachment = attachment
		cardEdit.card.assignTo = assignTo
		cardEdit.card.createdAt = createdAt
		cardEdit.card.status = status
		cardEdit.card.titleNode.innerText = title;
		cardEdit.card.descriptonNode.innerText = description;
		cardEdit.card.priorityLevelNode.innerText = priorityLevel;
		//cardEdit.card.attachmentNode.innerText = attachment;
		cardEdit.card.assignToNode.innerText = assignTo;
		cardEdit.card.createdAtNode.innerText = createdAt;
		cardEdit.card.statusNode.innerText = status;
		var storeLocal = false;

		if(typeof imgURL === 'object'){
			readURL(imgURL);
		}
		
			function readURL(input) {			
				if (input.files && input.files[0]) {
					var reader = new FileReader();
					reader.onload = function (e) {
						cardEdit.card.attachmentNode.setAttribute('src', e.target.result);
						cardEdit.card.attachmentNode.setAttribute('alt',cardEdit.card.attachment.name);
						cardEdit.card.attachmentNode.setAttribute('display','block');
						cardEdit.card.attachmentNode.setAttribute('width','100%');
						cardEdit.card.attachmentNode.setAttribute('height','100%');
						//converting image to base 64 to store in local storage
						cardEdit.card.attachment = e.target.result;
						storeLocal =true;
						if(storeLocal && window.localStorage){
							var removeCycle = JSON.stringify(JSON.decycle(currentBoard));
							window.localStorage.myData = removeCycle;
						}
					}		        
					reader.readAsDataURL(input.files[0]);				
				}					
			}
	}
	cardEdit.close()
}