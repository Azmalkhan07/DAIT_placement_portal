function TechTalk() {
  const talks = [
    {
      title: "Future of Artificial Intelligence",
      speaker: "Industry Expert",
      date: "2026-04-02",
    },
    {
      title: "Full Stack Development Roadmap",
      speaker: "Software Engineer",
      date: "2026-04-08",
    },
    {
      title: "Cracking Product Companies",
      speaker: "Placement Mentor",
      date: "2026-04-12",
    },
  ];

  return (
    <div>
      <h2 className="page-title">Tech Talk</h2>

      <div className="info-list">
        {talks.map((talk, index) => (
          <div className="info-row" key={index}>
            <div className="info-row-left">
              <h4>{talk.title}</h4>
              <p>
                Speaker: {talk.speaker} | Date: {talk.date}
              </p>
            </div>
            <span className="badge">Upcoming</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechTalk;