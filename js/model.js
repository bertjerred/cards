const CardModel = (() => {
    let cards = [];
    let idCounter = 1;

    function addCard(title = "New Title", blurb = "Click to edit...") {
        const card = {
            id: idCounter++,
            title,
            blurb,
            x: 50,
            y: 50,
            tags: [],
            nucleus: false,
            color: '#ffffff'
        };
        cards.push(card);
        return card;
    }

    function updateCard(id, data) {
        const card = cards.find(c => c.id === id);
        if (card) Object.assign(card, data);
    }

    function getCards() {
        return cards;
    }

        function loadCards(loadedData) {
        if (Array.isArray(loadedData)) {
            cards = loadedData;
            idCounter = Math.max(0, ...cards.map(c => c.id)) + 1;
        } else {
            console.error("Failed to load session: Data is not valid.");
        }
    }

        function deleteCard(id) {
        const cardIndex = cards.findIndex(c => c.id === id);
        if (cardIndex > -1) {
            cards.splice(cardIndex, 1);
        }
    }

    return { addCard, updateCard, getCards, loadCards, deleteCard };;
})();
