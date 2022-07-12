let buttonDiv = document.getElementById("buttonDiv")
let button = document.createElement("button")
button.innerHTML = "Clear All Saved Notepads"
buttonDiv.appendChild(button)

function clearStorage() {
    if (confirm("Are you sure you want to clear all saved notepads?")) {
        chrome.storage.local.clear()
        alert("All saved notepads have been cleared.")
    }
}

button.onclick = clearStorage