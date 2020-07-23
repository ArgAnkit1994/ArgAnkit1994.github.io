// Code for the file to appear on card
var imgURL ='';
document.getElementById("inputGroupFile01").addEventListener("change", function() {
	imgURL = this				
});


function showUser(text){
	// Get the <datalist> and <input> elements.
	var dataList = document.getElementById('json-datalist');
	dataList.setAttribute('width','500px')
	var input = document.getElementById('ajax');
	// Create a new XMLHttpRequest.
	var request = new XMLHttpRequest();

	// Handle state changes for the request.
	request.onreadystatechange = function(response) {
	if (request.readyState === 4) {
		if (request.status === 200) {
		// Parse the JSON
		var jsonOptions = JSON.parse(request.responseText);
			if(typeof text !== 'undefined'){
			if(text.value !== ''){
				// Loop over the JSON array.
			jsonOptions.filter(function(item) {
			if(item.name.toLocaleLowerCase().match(text.value.toLocaleLowerCase())!==null){
				var datalistValue = []
				datalistValue.push(item.name);
				// Create a new <option> element.
			var optionFilter = document.createElement('option');
			// Set the value using the item in the JSON array.
			optionFilter.value = datalistValue;
				var child = dataList.lastElementChild;
				while(child){
					dataList.removeChild(child)
					child = dataList.lastElementChild;
				}
			// Add the <option> element to the <datalist>.
			dataList.append(optionFilter);
			}
			
			});
		}
		}
		else{
			jsonOptions.forEach(function(item) {
			// Create a new <option> element.
			var option = document.createElement('option');
			// Set the value using the item in the JSON array.
			option.value = item.name;
			// Add the <option> element to the <datalist>.
			dataList.appendChild(option);
			});

		}
		

		// Update the placeholder text.
		input.placeholder = "Assign To...";
		} else {
		// An error occured :(
		input.placeholder = "Couldn't load datalist options :(";
		}
	}
	};

	// Update the placeholder text.
	input.placeholder = "Loading options...";

	// Set up and make the request.
	request.open('GET', 'http://demo0143389.mockable.io/users', true);
	request.send();
}

/*
 This function will add the Card in the list
 */

function addCardTrello(list) {
	return function () {
		cardEdit.show();
		var title = document.getElementById('card-edit-title');
		var submitFormCard = document.getElementById('card-edit-submit');
		var storeLocal = false;
		title.focus();
		//function form dataList of users
		showUser();

		

		submitFormCard.onclick = titleSubmit;		

		function titleSubmit(evt) {
			evt.preventDefault();
			var title = document.getElementById('card-edit-title').value.trim()
			var description = document.getElementById('description').value.trim()
			var priorityLevel = document.getElementById('priorityLevel').value.trim()
			var attachment =  imgURL
			var assignTo = document.getElementById('ajax').value.trim();
			var status = list.title
			var createdAt = new Date().toDateString()
			, card;

			document.getElementById('card-edit-title').value = '';
			document.getElementById('description').value='';

			if (!title) {
				return
			}

			card = new Card(list, title,description,priorityLevel,attachment,status,createdAt,assignTo);

			if(typeof imgURL=== 'object'){
				readURL(imgURL);
			}
			
			//file reader to read and upload the attached image, also checking base 64 image
			function readURL(input) {			
				if (input.files && input.files[0]) {
					var reader = new FileReader();
					reader.onload = function (e) {
						card.attachmentNode.setAttribute('src', e.target.result);
						card.attachmentNode.setAttribute('alt',card.attachment.name);
						storeLocal =true;
						//converting image to base 64 to store in local storage
						card.attachment = e.target.result;

						if(storeLocal && window.localStorage){
							//registering card
							list.board.registerCard(card, list.cards.length, status);
							list.cardsNode.insertBefore(card.node, list.cards[list.cards.length - 1].node);
							list.cards.push(card);

							//decycling cicular JSON and storing in local storage
							var removeCycle = JSON.stringify(JSON.decycle(currentBoard));
							window.localStorage.myData = removeCycle;
						}
					}		        
					reader.readAsDataURL(input.files[0]);				
				}					
			}			

			//list.board.registerCard(card, list.cards.length, status);
			//list.cardsNode.insertBefore(card.node, list.cards[list.cards.length - 1].node);
			//list.cards.push(card);		
			
			cardEdit.close();

			if(window.localStorage){
				var removeCycle = JSON.stringify(JSON.decycle(currentBoard));
				window.localStorage.myData = removeCycle;
			}
		}
	}
}