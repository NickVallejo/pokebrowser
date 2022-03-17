import React from 'react';
import { useEffect } from 'react';

function Stat({stat}) {
  const percent = (stat.base_stat/255)*100
  return (
      <div className="stat">
          <span className="stat-name">{stat.stat.name}</span>
          <div className="stat-bar" >
            <div className="stat-thumb" style={{
                width: percent+'%'
            }}></div>
          </div>
      </div>
  )
}

export default Stat;
