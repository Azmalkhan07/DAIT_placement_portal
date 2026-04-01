function StudentNotifications({ notifications = [] }) {
  return (
    <div>
      <h2 className="page-title">My Notifications</h2>

      <div className="info-list">
        {notifications.length > 0 ? (
          notifications.map((item) => (
            <div className="info-row" key={item._id}>
              <div className="info-row-left">
                <h4>{item.title}</h4>
                <p>{item.message}</p>
                <p>
                  Audience: {item.audience} | Date: {item.date}
                </p>
              </div>
              <span className="badge">New</span>
            </div>
          ))
        ) : (
          <div className="panel-card empty-card">No notifications found</div>
        )}
      </div>
    </div>
  );
}

export default StudentNotifications;