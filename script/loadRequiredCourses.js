import { getCourseById } from './search.js';

function toTitleCase(str) {
    if (typeof str !== 'string') {
        console.warn("Invalid string:", str);
        return ""; // Return an empty string or a default value
    }
    return str
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

async function loadRequiredCourses() {
    try {
        const majorResponse = await fetch("data/major.json");

        if (!majorResponse.ok) {
            throw new Error("Failed to fetch JSON data.");
        }

        const majorData = await majorResponse.json();
        const requiredCourses = majorData.cs_major[0].slice(1);
        const requiredCoursesList = document.getElementById("required-courses-list");
        requiredCoursesList.innerHTML = "";

        for (const courseID of requiredCourses) {
            const courseInfo = await getCourseById(courseID);

            if (courseInfo) {
                const listItem = document.createElement("li");
                listItem.className = "course-item";
                
                const courseDiv = document.createElement("div");
                courseDiv.className = "course";
                courseDiv.id = courseID;
                courseDiv.setAttribute("draggable", "true");
                courseDiv.innerText = toTitleCase(courseInfo.name);

                listItem.appendChild(courseDiv);
                requiredCoursesList.appendChild(listItem);
            } else {
                console.warn(`Course ${courseID} not found in course_list.json`);
            }
        }

        // Emit a custom event to reinitialize drag-and-drop after loading
        const event = new Event("coursesLoaded");
        document.dispatchEvent(event);

    } catch (error) {
        console.error("Error loading required courses:", error);
    }
}

// Load required courses when the page loads
window.onload = loadRequiredCourses;