// Drag start handler
function dragstartHandler(ev) {
    // Store the ID of the dragged element
    ev.dataTransfer.setData("text", ev.target.id);
    console.log("Drag started:", ev.target.id);
}

// Drag over handler
function dragoverHandler(ev) {
    // Prevent default to allow drop
    ev.preventDefault();
    console.log("Dragging over:", ev.target.id);
}

// Drop handler
function dropHandler(ev) {
    // Prevent default to allow drop
    ev.preventDefault();
    // Get the dragged data (element ID)
    const data = ev.dataTransfer.getData("text");
    const droppedCourse = document.getElementById(data);

    // Ensure the drop area is empty
    if (ev.target.classList.contains("drop-slot") && !ev.target.hasChildNodes()) {
        ev.target.appendChild(droppedCourse);
        console.log("Dropped:", data, "into", ev.target.id);
        alert(`Added ${droppedCourse.textContent} to ${ev.target.parentElement.id}`);
    } else {
        alert("This slot already contains a course!");
    }
}

// Initialize drag-and-drop for course items
function initializeDragAndDrop() {
    // Get all course items and add drag events
    const courseItems = document.querySelectorAll(".course");
    courseItems.forEach(item => {
        item.setAttribute("draggable", "true");
        item.ondragstart = dragstartHandler;
    });

    // Get all drop slots and make them drop targets
    const dropSlots = document.querySelectorAll(".drop-slot");
    dropSlots.forEach(slot => {
        slot.ondragover = dragoverHandler;
        slot.ondrop = dropHandler;
    });

}

// Run the initialization on page load
window.onload = initializeDragAndDrop;
