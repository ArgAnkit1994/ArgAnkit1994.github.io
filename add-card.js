/*
 This function will add the Card in the list
 */

function addCardTrello(list) {
	return function () {
		cardEdit.show();
		var title = document.getElementById('card-edit-title');
		var submitFormCard = document.getElementById('card-edit-submit');
		title.focus();


		submitFormCard.onclick = titleSubmit;		

		function titleSubmit(evt) {
			evt.preventDefault();
			var title = document.getElementById('card-edit-title').value.trim()
			var description = document.getElementById('description').value.trim()
			var priorityLevel = document.getElementById('priorityLevel').value.trim()
			var attachment =  document.getElementById('inputGroupFile01').value.trim()
			var status = list.title
			var createdAt = new Date().toLocaleString()
			, card;

			document.getElementById('card-edit-title').value = '';
			document.getElementById('description').value='';
			document.getElementById('inputGroupFile01').value='';
			if (!title) {
				return
			}
			
			 card = new Card(list, title,description,priorityLevel,attachment,status,createdAt);
			
			list.board.registerCard(card, list.cards.length, status);
			list.cardsNode.insertBefore(card.node, list.cards[list.cards.length - 1].node);
			list.cards.push(card);

			if(window.localStorage){
				var removeCycle = JSON.stringify(JSON.decycle(currentBoard));
				window.localStorage.myData = removeCycle;
				console.log('decycling cyclic object',window.localStorage.myData);
			}

			cardEdit.close();
		}
	}
}