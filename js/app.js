document.getElementById("add-card").addEventListener("click", () => {
    CardModel.addCard();
    CardUI.render();
});

document.getElementById("export-json").addEventListener("click", () => {
    // This now opens the dialog instead of exporting directly
    CardExport.openExportDialog(); 
});

// Initial render
CardUI.render();