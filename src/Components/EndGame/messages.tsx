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
    if (playerHits > opponentHits) {
      if (playerHitRatio >= 40) {
        return "You're winning with a hit ratio of " + playerHitRatio.toFixed(2) + "%. Keep it up!";
      } else {
        return "You're winning with a surprisingly low hit ratio of " + playerHitRatio.toFixed(2) + "%. How did you manage to win with that accuracy?";
      }
    } else if (playerHits < opponentHits) {
      if (playerHitRatio >= 50) {
        return "You're losing with a hit ratio of " + playerHitRatio.toFixed(2) + "%. Time to step up your game!";
      } else {
        return "You're losing with a hit ratio of " + playerHitRatio.toFixed(2) + "%. You need a miracle to win with such accuracy.";
      }
    } else {
      return "You're tied with your opponent. Make your next move count!";
    }
  } else {
    if (opponentHits > playerHits) {
      if (opponentHitRatio >= 40) {
        return "Your opponent is winning with a hit ratio of " + opponentHitRatio.toFixed(2) + "%. Can you turn the tide?";
      } else {
        return "Your opponent is winning with a surprisingly low hit ratio of " + opponentHitRatio.toFixed(2) + "%. You're in a tough spot.";
      }
    } else if (opponentHits < playerHits) {
      if (opponentHitRatio >= 50) {
        return "You're winning with a hit ratio of " + playerHitRatio.toFixed(2) + "%. Hang in there!";
      } else {
        return "You're winning with a hit ratio of " + playerHitRatio.toFixed(2) + "%. Your accuracy is saving the day!";
      }
    } else {
      return "You're tied with your opponent. The battle is fierce!";
    }
  }
};