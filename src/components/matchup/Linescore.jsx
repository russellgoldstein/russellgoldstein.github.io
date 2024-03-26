import Table from '../global/Table';

export const Linescore = ({ homeLinescore, awayLinescore }) => {
  const awayTeamTotals = awayLinescore.reduce((acc, score) => acc + score.runs, 0);
  const homeTeamTotals = homeLinescore.reduce((acc, score) => acc + score.runs, 0);

  const awayTeamHits = awayLinescore.reduce((acc, score) => acc + score.hits, 0);
  const homeTeamHits = homeLinescore.reduce((acc, score) => acc + score.hits, 0);

  const awayTeamErrors = awayLinescore.reduce((acc, score) => acc + score.errors, 0);
  const homeTeamErrors = homeLinescore.reduce((acc, score) => acc + score.errors, 0);

  for (let i = 0; i < 9; i++) {
    if (!awayLinescore[i]) {
      awayLinescore.push({ runs: 0, hits: 0, errors: 0 });
    }
    if (!homeLinescore[i]) {
      homeLinescore.push({ runs: 0, hits: 0, errors: 0 });
    }
  }
  const data = [
    {
      category: 'Away',
      ...Object.fromEntries(awayLinescore.map((score, i) => [`inning${i + 1}`, score.runs])),
      teamTotalRuns: awayTeamTotals,
      teamTotalHits: awayTeamHits,
      teamTotalErrors: awayTeamErrors,
    },
    {
      category: 'Home',
      ...Object.fromEntries(homeLinescore.map((score, i) => [`inning${i + 1}`, score.runs])),
      teamTotalRuns: homeTeamTotals,
      teamTotalHits: homeTeamHits,
      teamTotalErrors: homeTeamErrors,
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
      header: () => 'R',
      cell: (info) => <b>{info.getValue()}</b>,
      align: 'right',
    },
    {
      accessorKey: `teamTotalHits`, // Unique ID for each inning
      header: () => 'H',
      cell: (info) => <b>{info.getValue()}</b>,
      align: 'right',
    },
    {
      accessorKey: `teamTotalErrors`, // Unique ID for each inning
      header: () => 'E',
      cell: (info) => <b>{info.getValue()}</b>,
      align: 'right',
    },
  ];

  console.log({ data });
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
