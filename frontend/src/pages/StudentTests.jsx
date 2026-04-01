function StudentTests({ reports = [] }) {
  return (
    <div>
      <h2 className="page-title">My Test Scores</h2>

      <div className="table-card">
        <div className="table-wrap">
          <table className="students-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Test</th>
                <th>Score</th>
                <th>Department</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map((report) => (
                  <tr key={report._id}>
                    <td>{report.studentName}</td>
                    <td>{report.testName}</td>
                    <td>{report.score}</td>
                    <td>{report.department}</td>
                    <td>{report.result}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No test scores found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentTests;