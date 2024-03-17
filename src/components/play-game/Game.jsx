export default function Game() {
  // get the query param "code" from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const gameCode = urlParams.get('code');
  console.log(gameCode);
  return (
    <div>
      <h1>Game</h1>
    </div>
  );
}
