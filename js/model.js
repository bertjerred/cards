const CardModel = (() => {
    let cards = [];
    let idCounter = 1;

    function addCard(title = "New Title", blurb = "Click to edit...") {
        const card = {
            id: idCounter++,
            title, // Replaces 'text'
            blurb, // New field for the body content
            x: 50,
            y: 50,
            tags: [],
            nucleus: false,
            color: '#ffffff' // New field for card color, defaults to white
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

    return { addCard, updateCard, getCards };
})();