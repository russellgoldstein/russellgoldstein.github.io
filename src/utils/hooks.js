import { useEffect, useState } from "react";

export function usePlateAppearances(game, refetch) {
    const [nextPlateAppearance, setNextPlateAppearance] = useState(null);
    const [hiddenPlateAppearance, setHiddenPlateAppearance] = useState(null);
    const [currentPlateAppearance, setCurrentPlateAppearance] = useState(null);
    const [playResult, setPlayResult] = useState(null);

    useEffect(() => {
      if (game) {
        const initialPlateAppearance = game.game.plateAppearances.find(
          pa => pa.id === game.game.gameState.currentPlateAppearanceId
        );

        // Check if there is a change in plate appearance to manage hiddenPlateAppearance
        if (initialPlateAppearance && currentPlateAppearance && initialPlateAppearance.id !== currentPlateAppearance.id) {
          const hiddenPA = game.game.plateAppearances.find(
            pa => pa.id === currentPlateAppearance.id
          );
          setHiddenPlateAppearance(hiddenPA);
        } else {
          setPlayResult({
            battedBallOutcome: initialPlateAppearance?.battedBallOutcome,
            hitQuality: initialPlateAppearance?.hitQuality,
            paOutcome: initialPlateAppearance?.paOutcome,
          });
          setCurrentPlateAppearance(initialPlateAppearance);
          setHiddenPlateAppearance(null); // Ensure hiddenPlateAppearance is reset when not needed
        }

        // Set nextPlateAppearance based on updated game data
        const nextPA = game.game.plateAppearances.find(
          pa => pa.id === game.game.gameState.nextPlateAppearanceId
        );
        setNextPlateAppearance(nextPA);
      }
    }, [game, currentPlateAppearance]);

    // Auto-refetch game state
    useEffect(() => {
      const interval = setInterval(() => {
        refetch();
      }, 10000);

      return () => clearInterval(interval);
    }, [refetch]);

    return { nextPlateAppearance, setNextPlateAppearance, hiddenPlateAppearance, setHiddenPlateAppearance, playResult, setPlayResult, currentPlateAppearance, setCurrentPlateAppearance};
}
