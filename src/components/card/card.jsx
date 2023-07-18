export function Card(props) {
  return (
    <div className="col-xl-3 col-md-6">
      {/* <div className="widget widget-stats bg-teal"> */}
      <div className={props.style}>
        <div className="stats-icon stats-icon-lg">
          {props.icon}
          <i className="fa fa-globe fa-fw"></i>
        </div>
        <div className="stats-content">
          <div className="stats-title">{props.title}</div>
          <div className="stats-number">{props.content}</div>
          <div className="stats-progress progress">
            <div className="progress-bar" style={{ width: '70.1%' }}></div>
          </div>
          <div className="stats-desc">Better than last week (70.1%)</div>
        </div>
      </div>
    </div>
  )
}