// Grade to point mapping
const gradePoints = {
    'O': 10,
    'A+': 9,
    'A': 8,
    'B+': 7,
    'B': 6,
    'C': 5
};

// Function to add a new subject input row
function addSubject() {
    const subjectsDiv = document.getElementById('subjects');
    const newSubject = document.createElement('div');
    newSubject.classList.add('subject');
    newSubject.innerHTML = `
        <input type="text" name="subject_name" placeholder="Enter subject name" required>
        <select name="grade" required>
            <option value="">Select Grade</option>
            <option value="O">O</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="C">C</option>
        </select>
        <input type="number" name="credits" placeholder="Enter credits" required>
    `;
    subjectsDiv.appendChild(newSubject);
}

// GPA calculation
document.getElementById('gpaForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let totalCredits = 0;
    let totalWeightedGradePoints = 0;
    let valid = true;

    const subjects = document.querySelectorAll('.subject');
    subjects.forEach(subject => {
        const grade = subject.querySelector('select').value;
        const credits = parseInt(subject.querySelector('input[name="credits"]').value);

        if (grade && credits) {
            totalCredits += credits;
            totalWeightedGradePoints += gradePoints[grade] * credits;
        } else {
            valid = false;
            alert('Please fill in all fields correctly.');
        }
    });

    if (valid && totalCredits > 0) {
        const gpa = totalWeightedGradePoints / totalCredits;
        document.getElementById('gpaResult').textContent = `Your GPA is: ${gpa.toFixed(2)}`;
        document.getElementById('downloadPdf').style.display = 'block';

        // Attach download PDF event
        document.getElementById('downloadPdf').onclick = function() {
            generatePDF(gpa.toFixed(2), subjects);
        };
    } else {
        document.getElementById('gpaResult').textContent = 'No valid subjects were entered.';
        document.getElementById('downloadPdf').style.display = 'none';
    }
});

// Function to generate and download PDF using jsPDF
function generatePDF(gpa, subjects) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('GPA Report', 90, 20);

    let y = 40; // Starting Y position for subjects

    subjects.forEach(subject => {
        const subjectName = subject.querySelector('input[name="subject_name"]').value;
        const grade = subject.querySelector('select').value;
        const credits = subject.querySelector('input[name="credits"]').value;
        doc.text(`Subject: ${subjectName} | Grade: ${grade} | Credits: ${credits}`, 20, y);
        y += 10;
    });

    doc.text(`Total GPA: ${gpa}`, 20, y + 10);

    // Download the PDF
    doc.save('gpa_report.pdf');
}
