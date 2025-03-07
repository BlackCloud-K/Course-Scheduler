import { getCourseById } from './search.js';


function toTitleCase(str) {
    return str
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

async function loadRequiredCourses() {
    try {
        // Load major.json and course_list.json
        const majorResponse = await fetch("data/major.json");

        if (!majorResponse.ok) {
            throw new Error("Failed to fetch JSON data.");
        }

        const majorData = await majorResponse.json();

        // Extract CS major required courses
        const requiredCourses = majorData.cs_major[0].slice(1); // Skip first element "Mandatory"

        // Get the UL element to populate
        const requiredCoursesList = document.getElementById("required-courses-list");
        requiredCoursesList.innerHTML = ""; // Clear existing list

        // Loop through each required course
        for (const courseID of requiredCourses) {
            const courseInfo = await getCourseById(courseID);

            if (courseInfo) {

                const listItem = document.createElement("li");

                // Store additional details in dataset attributes
                listItem.innerText = toTitleCase(courseInfo.name);
                listItem.dataset.credit = courseInfo.credit;
                listItem.dataset.prerequisite = courseInfo.prerequisite.flat().join(", ") || "None";
                listItem.dataset.season = courseInfo.season.join(", ");
                listItem.dataset.conflict = courseInfo.conflict.join(", ") || "None";

                requiredCoursesList.appendChild(listItem);
            } else {
                console.warn(`Course ${courseID} not found in course_list.json`);
            }
        }

    } catch (error) {
        console.error("Error loading required courses:", error);
    }
}

// Load required courses when the page loads
window.onload = loadRequiredCourses;