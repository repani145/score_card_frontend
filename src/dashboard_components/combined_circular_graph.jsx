import React, { useState } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CombinedCircularGraph = ({ productivity, quality, timeliness, onRefresh }) => {
  const [hovered, setHovered] = useState(null);

  // Individual category scores
  const total = (productivity * 0.4) + (quality * 0.3) + (timeliness * 0.3);
  
  // Normalize percentages to ensure full circular filling
  const productivityPercentage = ((productivity * 0.4) / total) * 100;
  const qualityPercentage = ((quality * 0.3) / total) * 100;
  const timelinessPercentage = ((timeliness * 0.3) / total) * 100;
  console.log(productivityPercentage,qualityPercentage,timelinessPercentage)

  return (
    <div 
      className="text-center position-relative" 
      style={{ padding: '20px', width: '250px', margin: '0 auto', position: 'relative' }}
    >
      {/* Refresh Button */}
      <button
        className="btn btn-light btn-sm position-absolute"
        style={{
          top: '10px',
          right: '10px',
          background: '#6c757d',
          border: 'none',
          color: 'white',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
        onClick={onRefresh}
      >
        🔄
      </button>

      <h5 style={{ marginBottom: '20px', color: '#244888' }}>Performance Overview</h5>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <CircularProgressbarWithChildren
          value={100} // Outer Circle
          styles={buildStyles({
            pathColor: hovered === 'productivity' ? '#1B4F72' : '#2980b9',
            trailColor: '#f0f0f0',
          })}
          onMouseEnter={() => setHovered('productivity')}
          onMouseLeave={() => setHovered(null)}
        >
          <CircularProgressbarWithChildren
            value={qualityPercentage} // Middle Circle
            styles={buildStyles({
              pathColor: hovered === 'quality' ? '#145A32' : '#27ae60',
              trailColor: 'transparent',
            })}
            onMouseEnter={() => setHovered('quality')}
            onMouseLeave={() => setHovered(null)}
          >
            <CircularProgressbarWithChildren
              value={timelinessPercentage} // Inner Circle
              styles={buildStyles({
                pathColor: hovered === 'timeliness' ? '#7D6608' : '#f39c12',
                trailColor: 'transparent',
              })}
              onMouseEnter={() => setHovered('timeliness')}
              onMouseLeave={() => setHovered(null)}
            >
              {/* <div style={{ textAlign: 'center', color: '#244888' }}>
                <h6>Total Score</h6>
                <p>{totalScore.toFixed(2)}</p>
              </div> */}
            </CircularProgressbarWithChildren>
          </CircularProgressbarWithChildren>
        </CircularProgressbarWithChildren>
      </div>
      
      {/* Legend */}
      <div style={{ position: 'absolute', bottom: '10px', right: '-60px', textAlign: 'right' }}>
        <p style={{ color: '#2980b9', fontSize: '12px', margin: '2px 0' }}>⬤ Productivity</p>
        <p style={{ color: '#27ae60', fontSize: '12px', margin: '2px 0' }}>⬤ Quality</p>
        <p style={{ color: '#f39c12', fontSize: '12px', margin: '2px 0' }}>⬤ Timeliness</p>
      </div>
    </div>
  );
};

export default CombinedCircularGraph;
