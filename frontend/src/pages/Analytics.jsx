function Analytics({ students = [], companies = [], drives = [], reports = [] }) {
  const totalStudents = students.length;
  const placedStudents = students.filter((s) => s.status === "Placed").length;
  const trainingStudents = students.filter((s) => s.status === "Training").length;
  const eligibleStudents = students.filter((s) => s.status === "Eligible").length;

  const totalCompanies = companies.length;
  const totalDrives = drives.length;

  const averageScore =
    reports.length > 0
      ? Math.round(
          reports.reduce((sum, item) => sum + Number(item.score || 0), 0) /
            reports.length
        )
      : 0;

  const maxStudentValue = Math.max(
    totalStudents,
    placedStudents,
    trainingStudents,
    eligibleStudents,
    1
  );

  const maxOtherValue = Math.max(totalCompanies, totalDrives, averageScore, 1);

  const getHeight = (value, max) => `${(value / max) * 180}px`;

  return (
    <div>
      <h2 className="page-title">Analytics</h2>

      <div className="cards-grid">
        <div className="stat-card">
          <h3>Total Students</h3>
          <div className="stat-number">{totalStudents}</div>
        </div>
        <div className="stat-card">
          <h3>Placed Students</h3>
          <div className="stat-number">{placedStudents}</div>
        </div>
        <div className="stat-card">
          <h3>Total Companies</h3>
          <div className="stat-number">{totalCompanies}</div>
        </div>
        <div className="stat-card">
          <h3>Average Test Score</h3>
          <div className="stat-number">{averageScore}</div>
        </div>
      </div>

      <div className="two-col">
        <div className="panel-card">
          <h2 className="page-title">Student Status Chart</h2>
          <div className="chart-wrap">
            <div className="chart-item">
              <div
                className="chart-bar"
                style={{ height: getHeight(totalStudents, maxStudentValue) }}
              />
              <span>Total</span>
              <strong>{totalStudents}</strong>
            </div>

            <div className="chart-item">
              <div
                className="chart-bar"
                style={{ height: getHeight(placedStudents, maxStudentValue) }}
              />
              <span>Placed</span>
              <strong>{placedStudents}</strong>
            </div>

            <div className="chart-item">
              <div
                className="chart-bar"
                style={{ height: getHeight(trainingStudents, maxStudentValue) }}
              />
              <span>Training</span>
              <strong>{trainingStudents}</strong>
            </div>

            <div className="chart-item">
              <div
                className="chart-bar"
                style={{ height: getHeight(eligibleStudents, maxStudentValue) }}
              />
              <span>Eligible</span>
              <strong>{eligibleStudents}</strong>
            </div>
          </div>
        </div>

        <div className="panel-card">
          <h2 className="page-title">Portal Performance</h2>
          <div className="chart-wrap">
            <div className="chart-item">
              <div
                className="chart-bar"
                style={{ height: getHeight(totalCompanies, maxOtherValue) }}
              />
              <span>Companies</span>
              <strong>{totalCompanies}</strong>
            </div>

            <div className="chart-item">
              <div
                className="chart-bar"
                style={{ height: getHeight(totalDrives, maxOtherValue) }}
              />
              <span>Drives</span>
              <strong>{totalDrives}</strong>
            </div>

            <div className="chart-item">
              <div
                className="chart-bar"
                style={{ height: getHeight(averageScore, maxOtherValue) }}
              />
              <span>Avg Score</span>
              <strong>{averageScore}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;