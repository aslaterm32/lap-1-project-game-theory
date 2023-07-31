const buttonHigh = document.querySelector('#buttonHigh')
const buttonLow = document.querySelector('#buttonLow')
const infoSection = document.querySelector('#infoSection')
const scoreSection = document.querySelector('#scoreSection')
const gameObject = {
    revenue: 0,
    algorithm: 1,
    playerMoves: [],
    marketMoves: [],
}
let currentRound = 1
let profit = 0

gameObject.algorithm = getRandomAlgorithm()

buttonHigh.addEventListener('click', handleButtonPressed)
buttonLow.addEventListener('click', handleButtonPressed)
updateUI()

function handleButtonPressed(event) {
    let playerMove
    event.preventDefault()
    if (event.target.id === 'buttonHigh') {
        playerMove = 'h'
    } else if (event.target.id === 'buttonLow') {
        playerMove = 'l'
    }
    storeMove(playerMove, 'player')
    marketMove = getMarketMove(gameObject.algorithm)
    console.log(gameObject.algorithm)
    storeMove(marketMove, 'market')
    if (playerMove === 'h' && marketMove === 'h') {
        profit = 2000
        gameObject.revenue += profit
    } else if (playerMove === 'h' && marketMove === 'l') {
        profit = 0
        gameObject.revenue += profit
    } else if (playerMove === 'l' && marketMove === 'h') {
        profit = 3000
        gameObject.revenue += profit
    } else if (playerMove === 'l' && marketMove === 'l') {
        profit = 1000
        gameObject.revenue += profit
    }
    updateUI()
    currentRound++
    if (currentRound > 10) {
        postObject(gameObject)
        window.location.replace('./results.html')
    }
}

function formatMove(move) {
    if (move === 'l') {
        return 'Low'
    } else if (move === 'h') {
        return 'High'
    }
}

function storeMove(move, player) {
    if (player === 'player') {
        gameObject.playerMoves[currentRound] = move
    } else if (player === 'market') {
        gameObject.marketMoves[currentRound] = move
    }
}

function getRandomAlgorithm() {
    return (num = Math.floor(Math.random() * 3))
}

function getMarketMove(num) {
    if (num === 0) {
        // 0. Random
        let rand = Math.floor(Math.random() * 2)
        if (rand === 0) {
            return 'l'
        } else {
            return 'h'
        }
    } else if (num === 1) {
        // 1. Tit for tat
        if (currentRound === 1) {
            return 'h'
        }
        return gameObject.playerMoves[currentRound - 1]
    } else if (num === 2) {
        // 2. Alternate
        if (currentRound % 2 === 0) {
            return 'l'
        } else {
            return 'h'
        }
    }
}

function updateUI() {
    infoSection.children[0].textContent = `${currentRound}/10`
    if (currentRound > 0) {
        infoSection.children[1].textContent = `Previous Move: ${formatMove(
            gameObject.playerMoves[currentRound]
        )}`
        infoSection.children[2].textContent = `Market Previous Move: ${formatMove(
            gameObject.marketMoves[currentRound]
        )}`
    }
    scoreSection.children[0].textContent = `Profit: £${profit}`
    scoreSection.children[1].textContent = `Revenue: £${gameObject.revenue}`
}

async function postObject(obj) {}
