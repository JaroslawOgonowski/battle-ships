export const loseMsg = [
  "Your opponent smeared you across the board.",
  "You have been completely destroyed.",
  "Your strategy has failed.",
  "Your resistance was pointless.",
  "Your ships will serve as a coral reef.",
  "This ship has already sailed...",
  "It wasn't friendShip...",
  "Your fleet has been annihilated. Better luck next time!",
  "Defeat is bitter, but it's a chance to learn and come back stronger.",
  "Your opponent's cunning strategy led to your downfall.",
  "It's a tough loss, but remember, every great captain faces setbacks.",
  "The sea can be unforgiving. Your ships lie in ruins.",
];

export const winMsg = [
  "You sank all of your opponent's ships! Congratulations, you win!",
  "Victory is yours! You've outsmarted your opponent and won the game.",
  "A stellar performance! Your strategic brilliance leads you to victory!",
  "You're the captain of the high seas! You've won the battle and the war.",
  "Your naval expertise shines through. You've emerged victorious!",
  "It's a triumph! You've achieved a decisive victory in this naval clash.",
  "You've conquered the seas and emerged as the ultimate naval commander.",
  "A resounding victory! Your opponent's ships are nothing but debris now.",
  "It's a clear win! Your opponent's fleet is no match for your skill.",
  "You've proven yourself as the master of the ocean. Victory is yours!",
];

export const summary = (yourTurn: boolean, stats: {
  playerHits: number;
  playerMissed: number;
  opponentHits: number;
  opponentMissed: number;
}) => {
 
  const {playerHits, playerMissed, opponentHits, opponentMissed} = stats
  const playerTotalShots = playerHits + playerMissed;
  const opponentTotalShots = opponentHits + opponentMissed;

  const playerHitRatio = (playerHits / playerTotalShots) * 100;
  const opponentHitRatio = (opponentHits / opponentTotalShots) * 100;

  if (!yourTurn) {
      if (playerHitRatio >= 80) {
        return "You're winning with an incredible hit ratio of " + playerHitRatio.toFixed(2) + "%. It's almost impossible. I hope you play fair...";
      } else if (playerHitRatio >= 60 && playerHitRatio < 80){
        return "You're winning with a really good hit ratio of " + playerHitRatio.toFixed(2) + "%. The opponent simply had no chance...";
      } else if (playerHitRatio >= 40 && playerHitRatio < 60){
        return "The result is similar to flipping a coin. You're accuracy: " + playerHitRatio.toFixed(2) + "%. You were very lucky this time...";
      } else if (playerHitRatio >= 20 && playerHitRatio < 40){
        return "Did you really win with accuracy: " + playerHitRatio.toFixed(2) + "%? But... how?";
      } else if (playerHitRatio < 20){
        return "No... Hit ratio: " + playerHitRatio.toFixed(2) + "% and win? No... NO... Just... No.";
      }
  } else {
    if (opponentHitRatio >= 80) {
      return "The algorithm is truly random and yet it has achieved accuracy:" + opponentHitRatio.toFixed(2) + "%. AI will destroy us all...";
    } else if (opponentHitRatio >= 60 && opponentHitRatio < 80){
      return "Luck favors... but not to you. Your opponent achieved accuracy:" + opponentHitRatio.toFixed(2) + "%. You just had no chance...";
    } else if (opponentHitRatio >= 40 && opponentHitRatio < 60){
      return "The result is similar to flipping a coin. AI accuracy: " + opponentHitRatio.toFixed(2) + "%. You were out of luck...";
    } else if (opponentHitRatio >= 20 && opponentHitRatio < 40){
      return "Did you really lose with AI accuracy: " + opponentHitRatio.toFixed(2) + "%? But... how?";
    } else if (opponentHitRatio < 20){
      return "No... AI Hit ratio: " + opponentHitRatio.toFixed(2) + "% and win? No... NO... Just... No.";
    }
  }
};