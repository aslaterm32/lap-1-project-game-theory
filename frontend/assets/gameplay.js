const buttonHigh = document.querySelector('#buttonHigh')
const buttonLow = document.querySelector('#buttonLow')
const infoSection = document.querySelector('#infoSection')
const scoreSection = document.querySelector('#scoreSection')
const gameObject = {
    strategy: '',
    userScore: [0],
    userChoice: [],
    appScore: [0],
    appChoice: [],
    duration: [0],
    userWin: "",
}

const startTime = new Date()

let currentRound = 0
let userProfit = 0
let appProfit = 0

gameObject.strategy = getRandomStrategy()

buttonHigh.addEventListener('click', handleButtonPressed)
buttonLow.addEventListener('click', handleButtonPressed)
updateUI()

function handleButtonPressed(event) {
    event.preventDefault()
    let playerMove
    if (event.target.id === 'buttonHigh') {
        playerMove = 'h'
    } else if (event.target.id === 'buttonLow') {
        playerMove = 'l'
    }
    storeMove(playerMove, 'player')
    marketMove = getMarketMove(gameObject.strategy)
    storeMove(marketMove, 'market')
    if (playerMove === 'h' && marketMove === 'h') {
        userProfit = 2000
        appProfit = 2000
        gameObject.userScore[0] += userProfit
        gameObject.appScore[0] += appProfit
    } else if (playerMove === 'h' && marketMove === 'l') {
        userProfit = 0
        appProfit = 3000
        gameObject.userScore[0] += userProfit
        gameObject.appScore[0] += appProfit
    } else if (playerMove === 'l' && marketMove === 'h') {
        userProfit = 3000
        appProfit = 0
        gameObject.userScore[0] += userProfit
        gameObject.appScore[0] += appProfit
    } else if (playerMove === 'l' && marketMove === 'l') {
        userProfit = 1000
        appProfit = 1000
        gameObject.userScore[0] += userProfit
        gameObject.appScore[0] += appProfit
    }
    currentRound++
    if (currentRound < 10) {
        updateUI()
    }
    if (currentRound >= 10) {
        if (gameObject.userScore[0] == gameObject.appScore[0]){
            gameObject.userWin = 'draw';
        } else if (gameObject.userScore[0] < gameObject.appScore[0]){
            gameObject.userWin = 'loss';
        } else {
            gameObject.userWin = 'win'
        }
        const endTime = new Date()
        resultDuration = endTime - startTime
        resultDuration = resultDuration / 1000
        gameObject.duration = resultDuration
        postObject(gameObject)
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
        gameObject.userChoice.push(move)
    } else if (player === 'market') {
        gameObject.appChoice.push(move)
    }
}

function getRandomStrategy() {
    let num = Math.floor(Math.random() * 3)
    if (num === 0) {
        return 'random'
    } else if (num === 1) {
        return 'tit-for-tat'
    } else if (num === 2) {
        return 'alternate'
    }
}

function getMarketMove(str) {
    if (str === 'random') {
        // 0. Random
        let rand = Math.floor(Math.random() * 2)
        if (rand === 0) {
            return 'l'
        } else {
            return 'h'
        }
    } else if (str === 'tit-for-tat') {
        // 1. Tit for tat
        if (currentRound === 0) {
            return 'h'
        }
        return gameObject.userChoice[currentRound - 1]
    } else if (str === 'alternate') {
        // 2. Alternate
        if (currentRound % 2 === 0) {
            return 'l'
        } else {
            return 'h'
        }
    }
}

function updateUI() {
    infoSection.children[0].textContent = `${currentRound + 1}/10`
    if (currentRound > 0) {
        infoSection.children[1].textContent = `Previous Move: ${formatMove(
            gameObject.userChoice[currentRound - 1]
        )}`
        infoSection.children[2].textContent = `Market Previous Move: ${formatMove(
            gameObject.appChoice[currentRound - 1]
        )}`
    }
    scoreSection.children[0].textContent = `Profit: +£${userProfit}`
    scoreSection.children[1].textContent = `Revenue: £${gameObject.userScore[0]}`
}

async function postObject(obj) {
    const data = JSON.stringify(obj)
    console.log(data)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data,
    }
    console.log(data)
    await fetch('http://localhost:3000/results', options)
    window.location.replace('./results.html')
}
