const prompt = require('prompt-sync')()
const moves = ['l', 'h']
let currentQuarter = 1
let profit
let playerMove
let revenue

// main game loop
do {
    console.log(`Q${currentQuarter}`)
    playerMove = getMove()
    marketMove = getRandomMove()
    console.log(`Market chose ${marketMove}`)
    profit = getProfit(playerMove, marketMove)
    revenue += profit
    console.log(`Profit: ${profit}`)
    currentQuarter++
    console.log('\n')
} while (currentQuarter < 5)

// prompts player for move and cleans input
function getMove() {
    let move
    do {
        move = prompt('Set price low (l) or high (h): ')
    } while (!moves.includes(move[0].toLowerCase()))
    return move
}

// returns market move (h(igh) or l(ow)) at random
function getRandomMove() {
    return moves[Math.floor(Math.random() * 2)]
}

// generates payout given player and market moves
function getProfit(playerMove, marketMove) {
    let payout
    if (playerMove === 'h' && marketMove === 'h') {
        payout = 2000
    } else if (playerMove === 'l' && marketMove === 'h') {
        payout = 3000
    } else if (playerMove === 'l' && marketMove === 'l') {
        payout = -1000
    } else {
        payout = 0
    }

    return payout
}
