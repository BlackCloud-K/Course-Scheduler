export async function getCourseById(id) {
    try {
        const response = await fetch('../data/course_list.json');
        if (!response.ok) {
            throw new Error('Cannot load JSON file');
        }
        const courses = await response.json();

        if (courses.hasOwnProperty(id)) {
            return courses[id];  
        } else {
            return `${id} not found`;
        }
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}
