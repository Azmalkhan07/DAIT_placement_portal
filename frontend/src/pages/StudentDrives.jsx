function StudentDrives({ drives = [] }) {
  return (
    <div>
      <h2 className="page-title">Available Drives</h2>

      <div className="info-list">
        {drives.length > 0 ? (
          drives.map((drive) => (
            <div className="info-row" key={drive._id}>
              <div className="info-row-left">
                <h4>{drive.company}</h4>
                <p>
                  Date: {drive.date} | Venue: {drive.venue}
                </p>
                <p>
                  Eligibility: {drive.eligibility} | Status: {drive.status}
                </p>
              </div>
              <span className="badge">Apply</span>
            </div>
          ))
        ) : (
          <div className="panel-card empty-card">No drives available</div>
        )}
      </div>
    </div>
  );
}

export default StudentDrives;