// Joseph P. Pasaoa
//

/* TODO
  toggle for classic font vs modern font
  hide pokemon cards until fully built
  X split async retrieval into simulta retrs
*/



/* DOM-Loaded executes */
document.addEventListener("DOMContentLoaded", () => {
  let historyLeft = [];
  let historyRight = [];

  document.querySelector('#button-chooser').addEventListener('click', () => {
      getPokemon();
  });
  document.querySelector('#button-battle').addEventListener('click', () => {

  });
});



const handleError = (error, msgStr, url, id) => {
  console.log(msgStr, error, ' Trying again');
}

const genRandomNum = (max) => { /* MIN: 1 inclusive, MAX: inclusive */
  return Math.floor(Math.random() * max) + 1;
}

const getAPIData = async (url, id) => {
  try {
    let response = await axios.get(`https://${url}${id}/`);
    return response.data;
  } catch (err) {
    handleError(err, 'getError: ', url, id);
  }
}

const get4RandomMoves = async (dataMon) => {

}

const getMovesData = async (linksArray) => {
  let getsArray = [
    axios.get(linksArray[0]),
    axios.get(linksArray[1]),
    axios.get(linksArray[2]),
    axios.get(linksArray[3])
  ];
  try {
    let responses = (await axios.all(getsArray))
      .map(res => {
          return res.data;
      });
    return responses;
  } catch (err) {
    handleError(err);
  }
}





const buildAPokemon = async () => {
    let monsterObj = {
      id: genRandomNum(151),
      moves: [],
      moveLinksObj: {}
    };
    let monsterData = await getAPIData('pokeapi.co/api/v2/pokemon/', monsterObj.id);
    console.log(monsterData);

    // monsterObj['name'] = response.data.name;
    // monsterObj['avatarURL'] = response.data.sprites.front_default;
    // monsterObj['baseHP'] = response.data.stats[5].base_stat;
    // while (Object.values(monsterObj.moveLinksObj).length < 4) {
    //   let thisMoveIndex = genRandomNum(response.data.moves.length - 1);
    //   monsterObj.moveLinksObj[thisMoveIndex] = response.data.moves[thisMoveIndex].move.url;
    // } 
    // monsterObj.moves = await getMovesData(Object.values(monsterObj.moveLinksObj));
    // return monsterObj;
}

const makeCard = async (side) => {
  let pokemonObj = await buildAPokemon();
  // debugger;
  let emptyDataDiv = document.querySelector('.data');

  let newCard = document.createElement('div');
    newCard.className = `pokemon-card ${side}`;
    let cardHeader = document.createElement('h3');
      cardHeader.innerText = pokemonObj.name;
    newCard.appendChild(cardHeader);
    let cardAvatar = document.createElement('img');
      cardAvatar.src = pokemonObj.avatarURL;
      cardAvatar.setAttribute('alt', `${pokemonObj.name} avatar`);
    newCard.appendChild(cardAvatar);
    let cardHp = document.createElement('p');
      cardHp.className = 'hp';
      cardHp.innerHTML = `<strong>HP:</strong> ${pokemonObj.baseHP}`;
    newCard.appendChild(cardHp);
    let cardMovesBox = document.createElement('div');
      cardMovesBox.className = 'moves-box';
      let cardMovesBoxH4 = document.createElement('h4');
        cardMovesBoxH4.innerText = 'Moves';
      cardMovesBox.appendChild(cardMovesBoxH4);
      let cardMovesBoxList = document.createElement('ul');
        for (let move of pokemonObj.moves) {
          let cardMovesBoxListItem = document.createElement('li');
            let moveItemHTML = `<strong>${move.name}</strong><span>PP: ${move.pp}/${move.pp}</span>`;
            cardMovesBoxListItem.innerHTML = moveItemHTML;
          cardMovesBoxList.appendChild(cardMovesBoxListItem);
        }
      cardMovesBox.appendChild(cardMovesBoxList);
      
    newCard.appendChild(cardMovesBox);

  emptyDataDiv.appendChild(newCard);
}

const clearStage = () => {
  const dataGrid = document.querySelector('.data');
  while (dataGrid.firstChild) {
    dataGrid.removeChild(dataGrid.lastChild);
  }
}

const getPokemon = async () => {
  clearStage();
  let start = Date.now();
  await makeCard('left');

  let hiddenDiv = document.createElement('div');
    hiddenDiv.id = "hiding-space";
  document.querySelector('.data').appendChild(hiddenDiv);

  await makeCard('right');
  console.log('drawTime: ', (Date.now() - start));
}

// const battlePokemon = () => {

// }