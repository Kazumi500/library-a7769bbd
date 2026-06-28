# My Library

"My Library" is a clean and modern web application for managing your personal book collection. Built with vanilla JavaScript and styled with Tailwind CSS, it provides a simple interface to add, view, and track the books you are reading or have finished.

## Features

*   **Add Books:** Easily add new books to your collection with a user-friendly modal form, including title, author, and number of pages.
*   **Dynamic Grid Display:** View your entire library on a responsive grid that updates in real-time.
*   **Track Reading Status:** Mark books as "Read" or "Unread" and toggle the status with a single click.
*   **Remove Books:** Clean up your collection by removing titles you no longer want to track.
*   **Modern UI:** A visually appealing interface built with Tailwind CSS, featuring custom fonts and smooth animations.
*   **Local Data:** All book data is managed within the browser session.

## Technologies Used

*   **Frontend:** HTML5, CSS3, Vanilla JavaScript
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Animations:** `tw-animate-css`
*   **Fonts:** Google Fonts (Manrope, Work Sans)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js and npm installed on your machine to build the project's CSS file.

*   [Node.js](https://nodejs.org/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/kazumi500/library-a7769bbd.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd library-a7769bbd
    ```

3.  **Install NPM packages:**
    ```sh
    npm install
    ```

4.  **Build the CSS:**
    This project uses Tailwind CSS. To compile the `src/input.css` file into the final stylesheet, run the following command.
    ```sh
    npx tailwindcss -i ./src/input.css -o ./assets/css/style.css
    ```
    For live reloading during development, you can use the `--watch` flag:
    ```sh
    npx tailwindcss -i ./src/input.css -o ./assets/css/style.css --watch
    ```

5.  **Run the application:**
    Open the `index.html` file in your web browser to view and interact with the library.

## Usage

*   Click the **"+ add book"** button to open the form modal.
*   Fill in the book's details: title, author, and number of pages.
*   Use the toggle to set the initial reading status ("Sudah Di Baca?" translates to "Already Read?").
*   Click **"Add Book"** to save it to your collection.
*   On the main page, each book is displayed as a card.
*   Click the **"Ganti Status"** (Change Status) button on a book card to update its reading status.
*   Click the **trash can icon** to permanently remove a book from your library.
