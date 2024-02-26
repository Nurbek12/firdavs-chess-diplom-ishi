const users = new Array(32).fill().map((_,i)=>i+1)
const games = []
const dates = []
const currentDate = new Date()

function matchsWithUsers(array) {
    const next = []
    let k = 0
    const date = new Date(array[array.length-1].date)

    for(let i = 0; i < array.length/2; i++) {
        const random = Math.floor(Math.random()*2)
        next.push({
            users: [array[2*i].users[random], array[2*i+1].users[random]],
            date: date.toLocaleDateString()
        })

        k++
        if(k > 4) {
            k=0
            date.setDate(date.getDate() + 1)
        }
    }
    return next
}

module.exports = function shuffleArrayApplyData(array, tournament) {
    const colors = ['white','black']
    const games = []
    const level = array.length/2
    let k = 0
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }

    for(let i = 0; i < array.length/2; i++) {
        const shuffledColors = colors.sort(() => Math.random() - 0.5);
        games.push({
            users: [array[2*i], array[2*i+1]],
            date: currentDate,
            level,
            tournament,
            colors: {
                [array[2*i]]: shuffledColors[0],
                [array[2*i+1]]: shuffledColors[1]
            }
        })
        
        k++
        if(k > 4) {
            k=0
            currentDate.setDate(currentDate.getDate() + 1)
        }
    }

    return games
}

// const l16 = shuffleArrayApplyData(users)
// console.log('1/16',l16)
// const l8 = matchsWithUsers(l16)
// console.log('1/8', l8)
// // need fix dates !!!