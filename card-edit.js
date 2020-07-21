// Code for the name of the file to appear on select
$(".custom-file-input").on("change", function() {
	var fileName = $(this).val().split("\\").pop();
	$(this).siblings(".custom-file-label").addClass("selected").html(fileName);
  });

var cardEdit =
{ node: document.getElementById('card-edit')
	, windowOverlay: document.getElementById('container-main')
	, titleNode: document.getElementById('card-edit-title')
	, descriptionNode: document.getElementById('description')
	,priorityLevelNode: document.getElementById('priorityLevel')
	,attachmentNode: document.getElementById('inputGroupFile01')
	,createdAtNode: new Date().toLocaleString()
	,statusNode: document.getElementById('status')
	, card: undefined
}

cardEdit.clearInputs = function () {
	cardEdit.titleNode.value = '';
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
	var attachment = cardEdit.attachmentNode.value.trim();
	var createdAt = cardEdit.createdAtNode;
	var status = cardEdit.card.status

	if(typeof cardEdit.card === 'undefined'){
		console.log('card is to be created');		
	}

	if (title) {
		cardEdit.card.title = title
		cardEdit.card.description = description
		cardEdit.card.priorityLevel = priorityLevel
		cardEdit.card.attachment = attachment
		cardEdit.card.createdAt = createdAt
		cardEdit.card.status = status
		cardEdit.card.titleNode.replaceChild(document.createTextNode(title),
		cardEdit.card.titleNode.childNodes[0]),
		/*cardEdit.card.descriptionNode = description;
		cardEdit.card.priorityLevelNode = priorityLevel;
		cardEdit.card.attachmentNode = attachment;
		cardEdit.card.createdAtNode = createdAt;
		cardEdit.card.statusNode = status;*/


		cardEdit.card.descriptionNode.replaceChild(document.createTextNode(description),
		cardEdit.card.descriptionNode.childNodes[0]),
		cardEdit.card.priorityLevelNode.replaceChild(document.createTextNode(priorityLevel),
		cardEdit.card.priorityLevelNode.childNodes[0]),
		cardEdit.card.attachmentNode.replaceChild(document.createTextNode(attachment),
		cardEdit.card.attachmentNode.childNodes[0]),
		cardEdit.card.createdAtNode.replaceChild(document.createTextNode(createdAt),
		cardEdit.card.createdAtNode.childNodes[0]),
		cardEdit.card.statusNode.replaceChild(document.createTextNode(status),
		cardEdit.card.statusNode.childNodes[0])

	}
	cardEdit.close()
}