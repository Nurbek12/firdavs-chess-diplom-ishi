// const users = [1,2,3,4,5,6,7,8]
// const games = []
// const dates = []

// for (let i = 0; i < users.length - 1; i++) {
//   for (let j = i + 1; j < users.length; j++) {
//     const game = { users: [users[i], users[j]] }
//     dates.push({ date: currentDate.toLocaleDateString() })
//     games.push(game);
//     currentDate.setDate(currentDate.getDate() + 2)
//   }
// }


// console.log(shuffleArrayApplyData(games));

function shuffleArrayApplyData(array, tournament) {
  const currentDate = new Date();
  const colors = ['white','black']
  const games = []
  const dates = []
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      const shuffledColors = colors.sort(() => Math.random() - 0.5);
      const game = {
        tournament,
        users: [array[i], array[j]],
        colors: {
          [array[i]]: shuffledColors[0],
          [array[j]]: shuffledColors[1]
        }
      }
      dates.push({ date: currentDate.toLocaleDateString() })
      games.push(game);
      currentDate.setDate(currentDate.getDate() + 2)
    }
  }

  for (let i = games.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [games[i], games[j]] = [games[j], games[i]];
  }

  for (let i = 0; i < games.length; i++) {
    games[i].data = dates[i].date
  }

  return games
}
// console.log(shuffleArrayApplyData([1,2,3,4,5,6,7,8,9,10], 'asdf'));
module.exports = shuffleArrayApplyData