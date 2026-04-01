function Syllabus() {
  const items = [
    "Quantitative Aptitude",
    "Logical Reasoning",
    "Verbal Ability",
    "Programming Fundamentals",
    "Data Structures and Algorithms",
    "Database Management Systems",
    "Operating Systems",
    "Computer Networks",
    "Mock Interview Preparation",
    "Resume and HR Questions",
  ];

  return (
    <div>
      <h2 className="page-title">Training Syllabus</h2>

      <div className="info-list">
        {items.map((item, index) => (
          <div className="info-row" key={index}>
            <div className="info-row-left">
              <h4>Module {index + 1}</h4>
              <p>{item}</p>
            </div>
            <span className="badge">Planned</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Syllabus;