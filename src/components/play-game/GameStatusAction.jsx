import { PrimaryButtonWithIcon } from "../global/PrimaryButtonWithIcon"
import { Baseball } from "../icons/Baseball"

export default function GameStatusAction({gameStatus, waitingForOtherTeam, hiddenPlateAppearance, handleAdvanceGame, isLoading, revealPlateAppearance}){

    console.log({gameStatus, waitingForOtherTeam, hiddenPlateAppearance, isLoading})
    if(gameStatus === 'Final'){
        return <div>Game Over</div>
    }

    if(!waitingForOtherTeam){
        return (<PrimaryButtonWithIcon aria-controls='basic-modal' onClick={handleAdvanceGame} disabled={isLoading}>
        <Baseball />
        <span className='ml-2'>Submit Plate Appearance</span>
      </PrimaryButtonWithIcon>)
    }

    if(hiddenPlateAppearance !== null){
        return (<PrimaryButtonWithIcon aria-controls='basic-modal' onClick={revealPlateAppearance} disabled={isLoading}>
        <Baseball />
        <span className='ml-2'>Show New Plate Appearance</span>
      </PrimaryButtonWithIcon>)
    }

    if(waitingForOtherTeam){
        return <div>Waiting for other team</div>
    }
}