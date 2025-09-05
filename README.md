Cards: A Simple Browser-Based Brainstorming Tool
================================================

This project is a lightweight, single-page web application for creating and organizing ideas on a digital canvas. It functions like a virtual corkboard, allowing users to create draggable "cards" for brainstorming, note-taking, or organizing thoughts.

* * *
**Try it live** [here](https://bertjerred.github.io/cards/)
* * *

Features
--------

* **Dynamic Card Creation**: Create new cards on the canvas with a single click.

* **In-place Editing**: Directly edit a card's title and blurb by clicking on the text.

* **Freeform Drag & Drop**: Reposition cards anywhere on the canvas by dragging them.

* **Categorization & Styling**:
  
  * Organize cards using custom
    **tags** that can be added or removed easily.
  
  * Assign
    **colors** from a predefined palette to visually group ideas.
  
  * Mark important cards as a "
    **nucleus**" with a double-click to make them stand out with a special border.

* **Advanced Exporting**:
  
  * Generate detailed reports from your cards using the export dialog.
  
  * **Filter** exports by specific tags or colors to create targeted summaries.
  
  * Export in multiple formats:
    **Markdown, HTML, or JSON**.

  * Save Session
 
  * Save Screenshot (thanks to [html2canvas](https://html2canvas.hertzen.com/))

* * *

How to Use
----------

No installation or build process is required. Simply open the `index.html` file in any modern web browser to start using the application.

* * *

File Structure
--------------

The project code is organized to separate concerns between data, user interface, and application logic.

* `index.html`: The main HTML document that structures the page and contains the containers for the toolbar, cards, and export modal.

* `css/style.css`: Contains all the styling for the application, including cards, tags, and the export modal.

* `js/app.js`: The main entry point for the JavaScript, which initializes the application and sets up the primary event listeners for adding cards and opening the export dialog.

* `js/model.js`: Manages the application's state, including the array of card data and functions to add or update cards.

* `js/ui/cards.js`: Handles all DOM manipulation related to displaying, creating, and interacting with the cards on the screen, including drag-and-drop, editing, and styling.

* `js/ui/export.js`: Contains all logic for the export modal, filtering cards based on user selection, and generating the report files in different formats.
