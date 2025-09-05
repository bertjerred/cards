const CardUI = (() => {
    const container = document.getElementById("card-container");

    function createCardElement(card) {
        const div = document.createElement("div");
        div.classList.add("card");
        if (card.nucleus) div.classList.add("nucleus");
        div.style.left = card.x + "px";
        div.style.top = card.y + "px";
        div.style.backgroundColor = card.color;

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
                titleDiv.textContent = newTitle;
            }
        });

        blurbDiv.addEventListener("click", () => {
            const newBlurb = prompt("Edit Blurb:", card.blurb);
            if (newBlurb !== null) {
                card.blurb = newBlurb;
                blurbDiv.textContent = newBlurb;
            }
        });

        // --- NUCLEUS TOGGLE ---
        div.addEventListener("dblclick", (e) => {
            if (e.target === div) {
                card.nucleus = !card.nucleus;
                div.classList.toggle("nucleus");
            }
        });

        // --- DRAG HANDLE ---
        const dragHandle = document.createElement("div");
        dragHandle.classList.add("drag-handle");
        dragHandle.innerHTML = "⠿";
        div.appendChild(dragHandle);

        // --- DELETE BUTTON ---
        const deleteBtn = document.createElement("div");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerHTML = "&times;";
        div.appendChild(deleteBtn);

        deleteBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to permanently delete this card?")) {
                CardModel.deleteCard(card.id);
                CardUI.render();
            }
        });

// --- UNIFIED DRAGGING LOGIC (TOUCH & MOUSE COMPATIBLE) ---
        let offsetX, offsetY, dragging = false;

        function dragStart(e) {
            dragging = true;
            // Prevent default touch action (like scrolling the page)
            if (e.type === 'touchstart') {
                e.preventDefault();
            }

            // Get coordinates for either mouse or touch
            const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
            const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
            
            const cardRect = div.getBoundingClientRect();
            offsetX = clientX - cardRect.left;
            offsetY = clientY - cardRect.top;
            
            div.style.cursor = "grabbing";
            e.stopPropagation();
        }

        function dragMove(e) {
            if (dragging) {
                // Get coordinates for either mouse or touch
                const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
                const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

                card.x = clientX - offsetX;
                card.y = clientY - offsetY;
                div.style.left = card.x + "px";
                div.style.top = card.y + "px";
            }
        }

        function dragEnd() {
            if (dragging) {
                dragging = false;
                div.style.cursor = "grab";
            }
        }

        // Attach both mouse and touch listeners
        dragHandle.addEventListener("mousedown", dragStart);
        dragHandle.addEventListener("touchstart", dragStart, { passive: false });

        document.addEventListener("mousemove", dragMove);
        document.addEventListener("touchmove", dragMove);

        document.addEventListener("mouseup", dragEnd);
        document.addEventListener("touchend", dragEnd);

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
                card.color = color;
                div.style.backgroundColor = color;

                palette.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
                swatch.classList.add('selected');
            });
            palette.appendChild(swatch);
        });
        div.appendChild(palette);

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

            const addTagButton = document.createElement("span");
            addTagButton.classList.add("tag", "add-tag-btn");
            addTagButton.textContent = "+ tag";

            addTagButton.addEventListener("click", () => {
                const newTag = prompt("Add a new tag:");
                if (newTag && newTag.trim() !== "") {
                    const trimmedTag = newTag.trim();
                    if (!card.tags.includes(trimmedTag)) {
                        card.tags.push(trimmedTag);
                        updateTagDisplay();
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
