import React from 'react';

const splitBadgeDescriptionByLine = desc => {
  return desc.split('\n');
}

const contentClass = ['square', 'circle', 'badge'];

const avgUserStats = (
  badgeList, 
  badgeDescriptions, 
  stats
) => {

  return (
    <div className="row">
      {badgeList.map((badge, i) => {
        const badgeDescSplit = splitBadgeDescriptionByLine(badgeDescriptions[i]);
        console.log("BDS", badgeDescSplit);
        console.log("BDL", badgeList);
        return (
          <div className="column badge" key={i}>
            <div className="badge-content" id={contentClass[i]}>
              <h1>{stats[i]}</h1>
            </div>
            <div className="badge-description" align="left">
              <h3 className="badge-name">{badge}</h3>
              <p>
                {badgeDescSplit.map(desc => {
                  return <span key={desc}>{desc}<br></br></span>
                })}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default avgUserStats;
