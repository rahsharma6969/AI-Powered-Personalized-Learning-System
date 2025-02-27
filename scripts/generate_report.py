#Purpose: Generates a PDF report of the student's performance.
#command: python scripts/generate_report.py

from fpdf import FPDF

# Define the report dictionary to avoid NameError
report = {
    "Total Marks": 45,  # Example total marks
    "Category Performance": {
        "Logical": 85.0,
        "Analytical": 70.0,
        "Calculation": 60.0
    },
    "Difficulty Performance": {
        "Easy": 90.0,
        "Medium": 80.0,
        "Hard": 50.0
    }
}

# Function to generate the PDF report
def generate_pdf_report(report):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    pdf.cell(200, 10, txt="Student Performance Report", ln=True, align='C')
    pdf.ln(10)

    # Total Marks
    pdf.cell(200, 10, txt=f"Total Marks: {report['Total Marks']} / 60", ln=True)

    # Category Performance
    pdf.ln(10)
    pdf.cell(200, 10, txt="Category Performance:", ln=True)
    for category, performance in report["Category Performance"].items():
        pdf.cell(200, 10, txt=f"{category}: {performance:.2f}%", ln=True)

    # Difficulty Performance
    pdf.ln(10)
    pdf.cell(200, 10, txt="Difficulty Level Performance:", ln=True)
    for difficulty, performance in report["Difficulty Performance"].items():
        pdf.cell(200, 10, txt=f"Level {difficulty}: {performance:.2f}%", ln=True)

    # Save PDF
    pdf.output("student_report.pdf")
    print("PDF Report has been generated successfully!")

# Generate the PDF report
generate_pdf_report(report)


def print_report_to_console(report):
    print("\n" + "=" * 50)
    print("STUDENT PERFORMANCE REPORT".center(50))
    print("=" * 50)

    # Total Marks
    print(f"\nTotal Marks: {report['Total Marks']} / 60")

    # Category Performance
    print("\nCategory Performance:")
    for category, performance in report["Category Performance"].items():
        print(f"  - {category}: {performance:.2f}%")

    # Difficulty Performance
    print("\nDifficulty Level Performance:")
    for difficulty, performance in report["Difficulty Performance"].items():
        print(f"  - {difficulty}: {performance:.2f}%")

    print("\n" + "=" * 50)

# Call the function to print the report on the console
print_report_to_console(report)