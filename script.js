// Dictionary to map grades to points
const gradePoints = {
    'O': 10,
    'A+': 9,
    'A': 8,
    'B+': 7,
    'B': 6,
    'C': 5
};

// Function to dynamically generate input fields for subjects
function generateSubjectFields() {
    const numSubjects = document.getElementById("numSubjects").value;
    const subjectDetails = document.getElementById("subjectDetails");
    
    // Clear previous fields
    subjectDetails.innerHTML = '';

    for (let i = 0; i < numSubjects; i++) {
        subjectDetails.innerHTML += `
            <div class="input-group">
                <label for="subject${i}">Subject ${i + 1} Name:</label>
                <input type="text" id="subject${i}" required>
            </div>
            <div class="input-group">
                <label for="grade${i}">Grade for Subject ${i + 1} (O, A+, A, B+, B, C):</label>
                <input type="text" id="grade${i}" required>
            </div>
            <div class="input-group">
                <label for="credits${i}">Credits for Subject ${i + 1}:</label>
                <input type="number" id="credits${i}" min="1" required>
            </div>
        `;
    }
}

// Function to calculate GPA
function calculateGPA() {
    const numSubjects = document.getElementById("numSubjects").value;
    let totalCredits = 0;
    let totalWeightedGradePoints = 0;

    for (let i = 0; i < numSubjects; i++) {
        const grade = document.getElementById(grade${i}).value.toUpperCase();
        const credits = parseInt(document.getElementById(credits${i}).value);

        // Check if the entered grade is valid
        if (!gradePoints[grade]) {
            document.getElementById("result").innerText = "Invalid grade entered. Please enter a valid grade (O, A+, A, B+, B, C).";
            return;
        }

        // Calculate weighted grade points
        const weightedGradePoints = gradePoints[grade] * credits;
        totalWeightedGradePoints += weightedGradePoints;
        totalCredits += credits;
    }

    // Calculate GPA
    if (totalCredits === 0) {
        document.getElementById("result").innerText = "No valid subjects were entered.";
    } else {
        const gpa = totalWeightedGradePoints / totalCredits;
        document.getElementById("result").innerText = Your GPA is: ${gpa.toFixed(2)};
    }
}