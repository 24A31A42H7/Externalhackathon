import React from 'react'

const Leetcode = ({stats}) => {
  
    if (!stats) return <span>N/A</span>;
    if (stats.error) return <span>{stats.error}</span>;

  return (
    <div>
      <p>Total Solved: {stats.totalSolved}</p>
      <p>Easy: {stats.easySolved}</p>
      <p>Medium: {stats.mediumSolved}</p>
      <p>Hard: {stats.hardSolved}</p>
      <p>Ranking: {stats.ranking}</p>
    </div>
  );

      
    

}

export default Leetcode
