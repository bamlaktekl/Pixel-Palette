
const container = document.querySelector("#container");
const colorPicker = document.querySelector("#colorPicker");
const toggleButton = document.querySelector("#toggle");
const resizeButton = document.querySelector("#resize");
const eraserButton = document.querySelector("#eraser");

let drawingEnabled = false;
let eraserEnabled = false;
let isMouseDown = false;

// Set starting button labels
toggleButton.textContent = "Drawing: OFF";
eraserButton.textContent = "🧽 Eraser: OFF";

// Detect when the mouse is pressed
document.addEventListener("mousedown", (event) => {
    if (event.button === 0) {
        isMouseDown = true;
    }
});

// Detect when the mouse is released
document.addEventListener("mouseup", () => {
    isMouseDown = false;
});

// Stop drawing when the window loses focus
window.addEventListener("blur", () => {
    isMouseDown = false;
});

// Turn drawing ON or OFF
toggleButton.addEventListener("click", () => {
    drawingEnabled = !drawingEnabled;

    toggleButton.textContent = drawingEnabled
        ? "Drawing: ON"
        : "Drawing: OFF";
});

// Turn eraser ON or OFF
eraserButton.addEventListener("click", () => {
    eraserEnabled = !eraserEnabled;

    eraserButton.textContent = eraserEnabled
        ? "🧽 Eraser: ON"
        : "🧽 Eraser: OFF";
});

// Draw or erase a square
function paintSquare(square) {
    if (!drawingEnabled) {
        return;
    }

    if (eraserEnabled) {
        square.style.backgroundColor = "";
    } else {
        square.style.backgroundColor = colorPicker.value;
    }
}

// Create the grid
function createGrid(size) {
    container.innerHTML = "";

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement("div");

        square.classList.add("square");
        square.style.width = `${100 / size}%`;
        square.style.height = `${100 / size}%`;

        // Color or erase when clicking
        square.addEventListener("mousedown", (event) => {
            if (event.button === 0) {
                paintSquare(square);
            }
        });

        // Color or erase while dragging
        square.addEventListener("mouseover", () => {
            if (isMouseDown) {
                paintSquare(square);
            }
        });

        // Prevent unwanted dragging behavior
        square.addEventListener("dragstart", (event) => {
            event.preventDefault();
        });

        container.appendChild(square);
    }
}

// Create starting 16x16 grid
createGrid(16);

// Resize the grid
resizeButton.addEventListener("click", () => {
    const size = Number(prompt("Enter grid size (1-100):"));

    if (Number.isInteger(size) && size >= 1 && size <= 100) {
        createGrid(size);
    } else {
        alert("Please enter a whole number between 1 and 100.");
    }
});
