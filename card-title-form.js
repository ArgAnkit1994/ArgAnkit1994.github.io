/*
 This function is called to build the card form
 */
function buildCardTitleForm() {
	var node = document.createElement('form')
	node.innerHTML =
		'<div class="newitem-title-wrapper">' +
		'<textarea class="trello-new-card-title-input" type="text"></textarea>' +
		'</div>'
		node.style.display = 'none'
	return node
}