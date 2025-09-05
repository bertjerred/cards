const CardUI = (() => {
    const container = document.getElementById("card-container");

    function createCardElement(card) {
        const div = document.createElement("div");
        div.classList.add("card");
        if (card.nucleus) div.classList.add("nucleus");
        div.style.left = card.x + "px";
        div.style.top = card.y + "px";
        div.style.backgroundColor = card.color; // Set initial card color

        // --- TITLE AND BLURB STRUCTURE ---
        const titleDiv = document.createElement("div");
        titleDiv.classList.add("card-title");
        titleDiv.textContent = card.title;
        div.appendChild(titleDiv);

        const blurbDiv = document.createElement("div");
        blurbDiv.classList.add("card-blurb");
        blurbDiv.textContent = card.blurb;
        div.appendChild(blurbDiv);

        // --- TOUCH-FRIENDLY EDITING LOGIC ---
        titleDiv.addEventListener("click", () => {
            const newTitle = prompt("Edit Title:", card.title);
            if (newTitle !== null && newTitle.trim() !== "") {
                card.title = newTitle;
                titleDiv.textContent = newTitle; // Update view immediately
            }
        });

        blurbDiv.addEventListener("click", () => {
            const newBlurb = prompt("Edit Blurb:", card.blurb);
            if (newBlurb !== null) {
                card.blurb = newBlurb;
                blurbDiv.textContent = newBlurb; // Update view immediately
            }
        });

        // --- NUCLEUS TOGGLE ---
        div.addEventListener("dblclick", (e) => {
            // Prevent dblclick from firing when interacting with child elements
            if (e.target === div) {
                card.nucleus = !card.nucleus;
                div.classList.toggle("nucleus");
            }
        });

        // --- COLOR PALETTE LOGIC ---
        const colors = ['#ffffff', '#fff0f0', '#f0faff', '#f5f5dc', '#f0fff0'];
        const palette = document.createElement('div');
        palette.classList.add('color-palette');

        colors.forEach(color => {
            const swatch = document.createElement('div');
            swatch.classList.add('color-swatch');
            swatch.style.backgroundColor = color;
            if (card.color === color) {
                swatch.classList.add('selected');
            }

            swatch.addEventListener('click', () => {
                card.color = color; // Update model
                div.style.backgroundColor = color; // Update view

                // Update 'selected' class on swatches
                palette.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
                swatch.classList.add('selected');
            });
            palette.appendChild(swatch);
        });
        div.appendChild(palette);


        // --- DRAGGING LOGIC ---
        let offsetX, offsetY, dragging = false;

        div.addEventListener("mousedown", e => {
            // Only allow dragging from the main card div, not its interactive children
            if (e.target === div) {
                dragging = true;
                offsetX = e.clientX - div.offsetLeft;
                offsetY = e.clientY - div.offsetTop;
                div.style.cursor = "grabbing";
            }
        });

        document.addEventListener("mousemove", e => {
            if (dragging) {
                card.x = e.clientX - offsetX;
                card.y = e.clientY - offsetY;
                div.style.left = card.x + "px";
                div.style.top = card.y + "px";
            }
        });

        document.addEventListener("mouseup", () => {
            if (dragging) {
                dragging = false;
                div.style.cursor = "grab";
            }
        });

        // --- TAGS LOGIC ---
        const tagContainer = document.createElement("div");
        tagContainer.classList.add("tags");
        updateTagDisplay();

        function updateTagDisplay() {
            tagContainer.innerHTML = "";
            card.tags.forEach((tag, index) => {
                const t = document.createElement("span");
                t.classList.add("tag");
                t.textContent = tag + ' ×';

                t.addEventListener("click", () => {
                    card.tags.splice(index, 1);
                    updateTagDisplay();
                });
                tagContainer.appendChild(t);
            });

            // --- NEW TOUCH-FRIENDLY TAG BUTTON ---
            const addTagButton = document.createElement("span");
            addTagButton.classList.add("tag", "add-tag-btn");
            addTagButton.textContent = "+ tag";

            addTagButton.addEventListener("click", () => {
                const newTag = prompt("Add a new tag:");
                if (newTag && newTag.trim() !== "") {
                    const trimmedTag = newTag.trim();
                    if (!card.tags.includes(trimmedTag)) {
                        card.tags.push(trimmedTag);
                        updateTagDisplay(); // Re-render this card's tags
                    } else {
                        alert("This tag already exists.");
                    }
                }
            });
            tagContainer.appendChild(addTagButton);
        }

        div.appendChild(tagContainer);
        container.appendChild(div);
    }

    function render() {
        container.innerHTML = "";
        CardModel.getCards().forEach(createCardElement);
    }

    return { render };
})();