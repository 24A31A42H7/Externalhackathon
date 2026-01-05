export const calculateStats = (students, presentRollNumbers) => {
  const boys = students.filter(s => s.gender === 'Male');
  const girls = students.filter(s => s.gender === 'Female');

  return {
    totalStrength: students.length,
    totalPresent: presentRollNumbers.size,
    boysTotal: boys.length,
    boysPresent: boys.filter(s => presentRollNumbers.has(s.rollNo)).length,
    girlsTotal: girls.length,
    girlsPresent: girls.filter(s => presentRollNumbers.has(s.rollNo)).length,
  };
};
