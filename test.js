const cardsContainer = document.querySelector(".cards");
// refers to cardsContainer div the individual cards will be added as nested divs using the JS Dom
const colors = ["red", "blue", "yellow", "green", "orange", "purple", "pink", "brown"];

const colorsPicklist = [...colors, ...colors];
// The JavaScript spread operator (...) allows us to quickly copy all or part
//  of an existing array or object into another array or object.
const cardCount = colorsPicklist.length;
// this will effectively give us a loop

// Game state--these variables will be updated as the game goes through
let revealedCount = 0;
// starts at 0 because none of the tile have been revealed yet
let activeCard = null;
// will be null until active tile is clicked on

let awaitingEndOfMove = false;
// will become true when two unmatched tiles are chosen 

function buildCard(color) {
	// this function will be used 16 times within the loop

	const element = document.createElement("div");
	// a div will be created for each card
	element.classList.add("card");
	// each of those tiles will have the class of 'card'
	element.setAttribute("data-color", color);
	// they will each get the data attribute that will be set to the color it takes randomly
	element.setAttribute("data-revealed", "false");
	// no cards have been revealed

	element.addEventListener("click", () => {

		const revealed = element.getAttribute("data-revealed");

		if (
			awaitingEndOfMove
			// period of time when two card are selected to compare
			|| revealed === "true"
			// element color has been revealed
			|| element == activeCard
			// cannot click on the same card twice
		) {
			return;
            // stops function execution
		}

		// if none of the conditions above are met then---reveal this color on the card
		element.style.backgroundColor = color;

		if (!activeCard) {
			activeCard = element;
// if there is no activeCard at the moment then the active card equals the element
			return;
            // stops function execution once we have an active card we need to cancel the move and find a card to match
		}

		const colorToMatch = activeCard.getAttribute("data-color");
		

		if (colorToMatch === color) {
			// if both seleted cards match
			element.setAttribute("data-revealed", "true");
			// leave the element revealed
			activeCard.setAttribute("data-revealed", "true");
			// leave the active card revealed

			activeCard = null;
			// if there is a match the reset active card
			awaitingEndOfMove = false;
			// if there is a match then we can click on two new cards
			revealedCount += 2;
			// if there is a match then the count of the cards revealed increases by 2

			if (revealedCount ===cardCount) {
				alert("Congrats! You've matched all the cards!");
			}
			// if all the tiles have been revealed you win the game

			return;
		}

		awaitingEndOfMove = true;

		setTimeout(() => {
			activeCard.style.backgroundColor = null;
			element.style.backgroundColor = null;

			awaitingEndOfMove = false;
			activeCard = null;
			// resets the function so can continue the game
		}, 1000);
	});

	return element;
}

// Build up tiles
for (let i = 0; i < cardCount; i++) {
	// loop will run until cardCount equals 16
	const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
	// picks a random color from color picklist
	const color = colorsPicklist[randomIndex];

	const card = buildCard(color);
	// the tile will be created using the function above

	colorsPicklist.splice(randomIndex, 1);
	// removes the color from the picklist after each loop
	cardsContainer.appendChild(card);
	// the div 'card' will be appended to the div already on the html document 'cardContainer'
}