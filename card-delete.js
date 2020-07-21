/*
 This function deletes the card
 */
var cardDeleteTrello = {};
var currentBoard;

cardDeleteTrello.delete = function () {
	var index = currentBoard.cards[cardEdit.card.id].index

	currentBoard.unregisterCard(cardEdit.card)
	currentBoard.reregisterSubsequent(cardEdit.card.list, index + 1, -1)

	cardEdit.card.list.cardsNode.removeChild(cardEdit.card.node)
	cardEdit.card.list.cards.splice(index, 1)

	if(window.localStorage){
		var removeCycle = JSON.stringify(JSON.decycle(currentBoard));
		window.localStorage.myData = removeCycle;
		console.log('decycling cyclic object',window.localStorage.myData);
	}


	cardEdit.close()
	cardEdit.card = undefined
}

