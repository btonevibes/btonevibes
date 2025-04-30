# Simple Static Calculator

A simple, offline-first calculator web application designed for high-school students, built with static HTML, CSS, and JavaScript. It mimics basic Android calculator design principles.

## Features

*   Basic Arithmetic Operations (+, -, *, /)
*   Clear (C) and All Clear (AC) functionality (Combined in 'C')
*   Decimal point support
*   Responsive Design (Adapts to different screen sizes)
*   Android-inspired User Interface
*   Works completely offline (once loaded or added to home screen)
*   No backend, database, or user accounts required. Runs entirely in the browser.

## How to Use

1.  Clone or download this repository.
2.  Open the `index.html` file in your web browser.
3.  Use the on-screen buttons to perform calculations.

## Technology Stack

*   HTML5
*   CSS3 (Flexbox/Grid for layout)
*   Vanilla JavaScript (ES6+)

## Offline Usage

This app uses a `manifest.json` file, allowing browsers that support it (like Chrome on Android) to offer an "Add to Home Screen" option. Once added, it can be launched like a native app and will work offline. Even without adding to the home screen, once the page (`index.html`, `style.css`, `script.js`) is loaded, it will function offline as long as it remains in the browser cache or tab.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.