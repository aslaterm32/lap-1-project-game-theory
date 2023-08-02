const resultSection = document.querySelector('.results-section')
const resultParent = document.querySelector('main')




// simple clone of the first section (works as long as all elements are present at loadtime)
function cloneResultSet() {
    const resultSetClone = resultSection.cloneNode(true)
    return resultSetClone
}

// reformatting timestamps (called within the makeNewResult function)
function processTimestamp(resultTS) {
  const year = resultTS.slice(0,4)
  const month = resultTS.slice(5,7)
  const day = resultTS.slice(8,10)
  const time = resultTS.slice(11,19)
  newTimestamp = day.concat("/", month, "/", year, "  ", time)
  return newTimestamp
}

function capitaliseFirst(word){
  // to be done later (presentation only, not imperative)
}

function formatMoveList(moveSet) {
  let stringedList = (moveSet.toString()).toUpperCase();
  return stringedList
}

function makeNewResult(dataFromFetch) {
  let formattedTimestamp = ""
  
  for (let i = 0; i < dataFromFetch.length; i++){
    if (resultSection.querySelector('.game-num').textContent != 'Game 1'){
      resultSection.querySelector('.game-num').textContent = `Game ${(dataFromFetch[i].id)+1}`;
      resultSection.querySelector('.completion-title').textContent = 'Completed: ';
      formattedTimestamp = processTimestamp(dataFromFetch[i].timestamp)
      resultSection.querySelector('.completion-date-time-data').textContent = formattedTimestamp

      //The expanded results section
      resultSection.querySelector('.strategy-row').textContent = `Strategy: ${dataFromFetch[i].strategy}`;
      resultSection.querySelector('.player-revenue').textContent = `Player Revenue: £${dataFromFetch[i].userScore}`;
      resultSection.querySelector('.player-moves').textContent = `Player Choices: ${formatMoveList(dataFromFetch[i].userChoice)}`;
      resultSection.querySelector('.ai-revenue').textContent = `AI Revenue: £${dataFromFetch[i].appScore}`;
      resultSection.querySelector('.ai-moves').textContent = `AI Choices: ${formatMoveList(dataFromFetch[i].appChoice)}`;

      resultSection.classList.remove('results-win', 'results-loss', 'results-draw');

      if (dataFromFetch[i].userWin === 'win') {
        resultSection.classList.add('results-win');
      } else if (dataFromFetch[i].userWin === 'loss') {
        resultSection.classList.add('results-loss');
      } else if (dataFromFetch[i].userWin === 'draw') {
        resultSection.classList.add('results-draw');
      }

    } else {
      let clonedData = cloneResultSet()
      clonedData.querySelector('.game-num').textContent = `Game ${(dataFromFetch[i].id)+1}`
      formattedTimestamp = processTimestamp(dataFromFetch[i].timestamp)
      clonedData.querySelector('.completion-date-time-data').textContent = formattedTimestamp
      
      //The expanded results section
      clonedData.querySelector('.strategy-row').textContent = `Strategy: ${dataFromFetch[i].strategy}`
      clonedData.querySelector('.player-revenue').textContent = `Player Revenue: £${dataFromFetch[i].userScore}`;
      clonedData.querySelector('.player-moves').textContent = `Player Choices: ${formatMoveList(dataFromFetch[i].userChoice)}`;
      clonedData.querySelector('.ai-revenue').textContent = `AI Revenue: £${dataFromFetch[i].appScore}`;
      clonedData.querySelector('.ai-moves').textContent = `AI Choices: ${formatMoveList(dataFromFetch[i].appChoice)}`;

      clonedData.classList.remove('results-win', 'results-loss', 'results-draw');

      if (dataFromFetch[i].userWin === 'win') {
        clonedData.classList.add('results-win');
      } else if (dataFromFetch[i].userWin === 'loss') {
        clonedData.classList.add('results-loss');
      } else if (dataFromFetch[i].userWin === 'draw') {
        clonedData.classList.add('results-draw');
      }

      resultParent.appendChild(clonedData)
    }
  }
}
// Expand or shrink a set of results called within adELs function
function expandShrink(ev) {
  const clickedResultSet = ev.currentTarget; 
  if (clickedResultSet.querySelector('.results-expanded').classList.contains('hidden')){
    clickedResultSet.querySelector('.results-expanded').classList.remove('hidden')
    clickedResultSet.querySelector('.results-expanded').classList.add('visible')
  } else {
    clickedResultSet.querySelector('.results-expanded').classList.remove('visible')
    clickedResultSet.querySelector('.results-expanded').classList.add('hidden')
  }
 
}
/* Function called within async function to ensure loading 
*WILL EXPERIMENT WITH MOVING IT OUT OF THE ASYNC TO IMPROVE SPEED* 
*/
function addELs() {
  const allResults = document.querySelectorAll('.results-section')
  allResults.forEach(resultSet => {
    resultSet.addEventListener('click', e => {
      expandShrink(e)
    });
  
  })
}

// Expand or shrink a set of results called within adELs function
function expandShrink(ev) {
  const clickedResultSet = ev.currentTarget;
  if (clickedResultSet.querySelector('.results-expanded').classList.contains('hidden')){
    clickedResultSet.querySelector('.results-expanded').classList.remove('hidden')
    clickedResultSet.querySelector('.results-expanded').classList.add('visible')
  } else {
    clickedResultSet.querySelector('.results-expanded').classList.remove('visible')
    clickedResultSet.querySelector('.results-expanded').classList.add('hidden')
  }
}
/* Function called within async function to ensure loading 
*WILL EXPERIMENT WITH MOVING IT OUT OF THE ASYNC TO IMPROVE SPEED* 
*/
function addELs() {
  const allResults = document.querySelectorAll('.results-section')
  allResults.forEach(resultSet => {
    resultSet.addEventListener('click', e => {
      expandShrink(e)
    });
  
  })
}

function noResultMsg(){
  const noResultMsg = document.createElement('strong');
  noResultMsg.setAttribute('id','no-result-msg');
  noResultMsg.textContent = "No Game History"
  noResultMsg.style.color = "darkred"
  return (resultParent.appendChild(noResultMsg))
  
}

//The starting function that links into the others.
async function getResults() {
  let newData = []
    try{
      const result = await fetch('http://localhost:3000/results')
      // const result = await fetch('https://game-theory-d7wp.onrender.com/results')
      const data = await result.json()
      for (const gameDataset of data) {
        newData.push(gameDataset)
      }

      resultSection.classList.remove('results-win', 'results-loss', 'results-draw');
      if (!newData.length) {
        //temporary message if there are no results
        const message = noResultMsg()
      } else {
        makeNewResult(newData)
        addELs()
      }

    } catch(e) {
      console.log(e)
    }
  }

getResults();
