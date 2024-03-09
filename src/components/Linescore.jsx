import Table from './Table';

export const Linescore = ({ homeLinescore, awayLinescore }) => {
  const awayTeamTotals = awayLinescore.reduce((acc, score) => acc + score, 0);
  const homeTeamTotals = homeLinescore.reduce((acc, score) => acc + score, 0);

  const data = [
    {
      category: 'Away',
      ...Object.fromEntries(awayLinescore.map((score, i) => [`inning${i + 1}`, score])),
      teamTotalRuns: awayTeamTotals,
    },
    {
      category: 'Home',
      ...Object.fromEntries(homeLinescore.map((score, i) => [`inning${i + 1}`, score])),
      teamTotalRuns: homeTeamTotals,
    },
  ];

  // Dynamically generate columns based on the number of innings
  const inningColumns = [
    {
      accessorKey: `category`, // Unique ID for each inning
      header: () => 'INNING',
      cell: (info) => info.getValue(),
    },
    ...awayLinescore.map((_, index) => ({
      accessorKey: `inning${index + 1}`, // Unique ID for each inning
      header: () => index + 1,
      cell: (info) => info.getValue(),
      align: 'right',
    })),
    {
      accessorKey: `teamTotalRuns`, // Unique ID for each inning
      header: () => 'TOTAL',
      cell: (info) => <b>{info.getValue()}</b>,
      align: 'right',
    },
  ];

  // Add the initial column for the category label ("Inning", "Away", "Home")
  const columns = [...inningColumns];

  return (
    <div className='flex flex-col md:flex-row gap-4'>
      <div className='table-container w-full md:w-full'>
        <Table data={data} columns={columns} />
      </div>
    </div>
  );
};
