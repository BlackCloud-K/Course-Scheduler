async function getCourseById(id) {
    try {
        const response = await fetch('../data/course_list.json');
        if (!response.ok) {
            throw new Error('Cannot load JSON file');
        }
        const courses = await response.json();

        const course = courses.find(course => course.id === id);
        return course ? course : `${id} Course Not Found`;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

