"use strict";

const paletteGrid = document.getElementById("paletteGrid");
const generateButton = document.getElementById("generateButton");
const statusMessage = document.getElementById("statusMessage");

function generateRandomHex() {
    const characters = "0123456789ABCDEF";
    let hex = "#";

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(
            Math.random() * characters.length
        );

        hex += characters[randomIndex];
    }

    return hex;
}

function createColorCard(color) {
    const card = document.createElement("article");

    card.className = "color-card";

    card.setAttribute(
        "aria-label",
        `Copy color ${color}`
    );

    card.innerHTML = `
        <div
            class="color-preview"
            style="background-color: ${color};"
        ></div>

        <div class="color-details">
            <span>HEX COLOR</span>
            <strong class="hex-code">${color}</strong>
        </div>
    `;

    card.addEventListener("click", function () {
        copyColor(color);
    });

    return card;
}

function generatePalette() {
    paletteGrid.innerHTML = "";

    statusMessage.textContent = "";

    for (let i = 0; i < 5; i++) {
        const color = generateRandomHex();

        const card = createColorCard(color);

        paletteGrid.appendChild(card);
    }
}

async function copyColor(color) {
    try {
        await navigator.clipboard.writeText(color);

        statusMessage.textContent =
            `${color} copied to clipboard.`;

    } catch (error) {
        statusMessage.textContent =
            "Unable to copy the color.";
    }
}

generateButton.addEventListener(
    "click",
    generatePalette
);

generatePalette();