import UserManagement from "./UserManagement";
import { useEffect, useMemo, useState } from "react";
import Students from "./Students";
import Companies from "./Companies";
import Drives from "./Drives";
import TestReports from "./TestReports";
import Notifications from "./Notifications";
import ScheduleTraining from "./ScheduleTraining";
import Analytics from "./Analytics";
import StudentDrives from "./StudentDrives";
import StudentTests from "./StudentTests";
import StudentNotifications from "./StudentNotifications";
import Resume from "./Resume";
import Syllabus from "./Syllabus";
import TechTalk from "./TechTalk";
import {
  getStudents,
  getCompanies,
  getDrives,
  getTestReports,
  getNotifications,
} from "../services/api";

function Dashboard({ user, onLogout }) {
  const [activePage, setActivePage] = useState(
    user?.role === "Student" ? "std-dashboard" : "dashboard"
  );

  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [drives, setDrives] = useState([]);
  const [reports, setReports] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const isStudent = user?.role === "Student";

  const loadDashboardData = async () => {
    const [currentUser, setCurrentUser] = useState(user);
    const studentsData = await getStudents();
    const companiesData = await getCompanies();
    const drivesData = await getDrives();
    const reportsData = await getTestReports();
    const notificationsData = await getNotifications();

    setStudents(studentsData);
    setCompanies(companiesData);
    setDrives(drivesData);
    setReports(reportsData);
    setNotifications(notificationsData);
  };

  useEffect(() => {
    loadDashboardData();
  }, [activePage]);

  const navSections = useMemo(() => {
    if (isStudent) {
      return [
        {
          title: "Main",
          items: [
            { key: "std-dashboard", label: "Dashboard" },
            { key: "std-drives", label: "Drives" },
            { key: "std-tests", label: "My Test Scores" },
            { key: "syllabus", label: "Syllabus" },
            { key: "techtalk", label: "Tech Talk" },
          ],
        },
        {
          title: "Profile",
          items: [
            { key: "std-resume", label: "My Resume" },
            { key: "std-notifications", label: "Notifications" },
          ],
        },
      ];
    }

    return [
      {
        title: "Main",
        items: [
          { key: "dashboard", label: "Dashboard" },
          { key: "students", label: "Students" },
          { key: "companies", label: "Companies" },
          { key: "drives", label: "Placement Drives" },
          { key: "testreports", label: "Test Reports" },
        ],
      },
      {
        title: "Academic",
        items: [
          { key: "syllabus", label: "Syllabus" },
          { key: "techtalk", label: "Tech Talk" },
        ],
      },
      {
        title: "Manage",
        items: [
          { key: "users", label: "User Management" },
          { key: "postnotif", label: "Notifications" },
          { key: "schedule", label: "Schedule Training" },
          { key: "analytics", label: "Analytics" },
        ],
      },
    ];
  }, [isStudent]);

  const totalStudents = students.length;
  const totalCompanies = companies.length;
  const totalDrives = drives.length;
  const selectedStudents = students.filter(
    (student) => student.status === "Placed"
  ).length;

  const renderOverview = () => (
    <>
      <div className="cards-grid">
        <div className="stat-card">
          <h3>Total Students</h3>
          <div className="stat-number">{totalStudents}</div>
        </div>
        <div className="stat-card">
          <h3>Total Companies</h3>
          <div className="stat-number">{totalCompanies}</div>
        </div>
        <div className="stat-card">
          <h3>Placement Drives</h3>
          <div className="stat-number">{totalDrives}</div>
        </div>
        <div className="stat-card">
          <h3>Selected Students</h3>
          <div className="stat-number">{selectedStudents}</div>
        </div>
      </div>

      <div className="two-col">
        <div className="panel-card">
          <h2 className="page-title">Upcoming Drives</h2>
          <div className="info-list">
            {drives.length > 0 ? (
              drives.slice(0, 5).map((drive) => (
                <div className="info-row" key={drive._id}>
                  <div className="info-row-left">
                    <h4>{drive.company}</h4>
                    <p>
                      {drive.date} | {drive.venue}
                    </p>
                    <p>{drive.eligibility}</p>
                  </div>
                  <span className="badge">{drive.status}</span>
                </div>
              ))
            ) : (
              <div className="empty-card">No drives available</div>
            )}
          </div>
        </div>

        <div className="panel-card">
          <h2 className="page-title">Recent Notifications</h2>
          <div className="info-list">
            {notifications.length > 0 ? (
              notifications.slice(0, 5).map((item) => (
                <div className="info-row" key={item._id}>
                  <div className="info-row-left">
                    <h4>{item.title}</h4>
                    <p>{item.message}</p>
                  </div>
                  <span className="badge">{item.date}</span>
                </div>
              ))
            ) : (
              <div className="empty-card">No notifications available</div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  const renderStudentOverview = () => (
    <>
      <div className="cards-grid">
        <div className="stat-card">
          <h3>Eligible Drives</h3>
          <div className="stat-number">{drives.length}</div>
        </div>
        <div className="stat-card">
          <h3>My Test Reports</h3>
          <div className="stat-number">{reports.length}</div>
        </div>
        <div className="stat-card">
          <h3>Notifications</h3>
          <div className="stat-number">{notifications.length}</div>
        </div>
        <div className="stat-card">
          <h3>Placement Status</h3>
          <div className="stat-number">Open</div>
        </div>
      </div>

      <div className="two-col">
        <div className="panel-card">
          <h2 className="page-title">Available Drives</h2>
          <div className="info-list">
            {drives.slice(0, 4).map((drive) => (
              <div className="info-row" key={drive._id}>
                <div className="info-row-left">
                  <h4>{drive.company}</h4>
                  <p>
                    {drive.date} | {drive.venue}
                  </p>
                </div>
                <span className="badge">{drive.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-card">
          <h2 className="page-title">Latest Notifications</h2>
          <div className="info-list">
            {notifications.slice(0, 4).map((item) => (
              <div className="info-row" key={item._id}>
                <div className="info-row-left">
                  <h4>{item.title}</h4>
                  <p>{item.message}</p>
                </div>
                <span className="badge">New</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return renderOverview();

      case "students":
        return <Students />;

      case "companies":
        return <Companies />;

      case "drives":
        return <Drives />;

      case "testreports":
        return <TestReports />;

      case "syllabus":
        return <Syllabus />;

      case "techtalk":
        return <TechTalk />;

      case "postnotif":
        return <Notifications />;

      case "schedule":
        return <ScheduleTraining />;

      case "analytics":
        return (
          <Analytics
            students={students}
            companies={companies}
            drives={drives}
            reports={reports}
          />
        );

      case "std-dashboard":
        return renderStudentOverview();

      case "std-drives":
        return <StudentDrives drives={drives} />;

      case "std-tests":
        return <StudentTests reports={reports} />;

      case "std-resume":
        return <Resume user={currentUser} onUserUpdate={setCurrentUser} />;

      case "std-notifications":
        return <StudentNotifications notifications={notifications} />;

      default:
        return <div className="panel-card empty-card">Page coming soon</div>;
    }
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div>
          <div className="sidebar-brand">
            <div className="sidebar-logo">D</div>
            <div>
              <div className="sidebar-title">DAIT Portal</div>
              <div className="sidebar-subtitle">
                DHAANISH AHMED INSTITUTE OF TECHNOLOGY
              </div>
            </div>
          </div>

          {navSections.map((section) => (
            <div key={section.title}>
              <div className="sb-section">{section.title}</div>
              {section.items.map((item) => (
                <button
                  key={item.key}
                  className={`sb-item ${activePage === item.key ? "active" : ""}`}
                  onClick={() => setActivePage(item.key)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="sidebar-user">
          <div className="sidebar-user-name">{user?.name}</div>
          <div className="sidebar-user-role">
            {user?.email} · {user?.role}
          </div>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="main-panel">
        <div className="topbar">
          <div>
            <h1>DHAANISH AHMED INSTITUTE OF TECHNOLOGY</h1>
            <p>Placement Portal · Welcome back, {user?.name}</p>
          </div>
        </div>

        {renderContent()}
      </main>
    </div>
  );
}

export default Dashboard;