//draw cards for each player using the deck of cards api
//${selectSixCards}
let deckId = ''
let firstDeckId = ''
let newDeckId = ''
let val1 = ''
let val2 = ''
let a = 0
let b = 0

document.querySelector('#playerScore').innerText = a
document.querySelector('#botScore').innerText = b
document.querySelector('#cardWar').disabled = true




fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
   .then(res => res.json())
   .then(data => {
      console.log(data)
      firstDeckId = data.deck_id
   })
   .catch(err => {
      console.log(`error${err}`)
   })


document.querySelector('#newDeck').addEventListener('click', addNewDeck)

function addNewDeck() {

   document.querySelector('#player1a').style.display = 'none'
   document.querySelector('#player1b').style.display = 'none'
   document.querySelector('#player2a').style.display = 'none'
   document.querySelector('#player2b').style.display = 'none'
   

   document.querySelector('#cardWar').disabled=true
   document.querySelector('body').style.backgroundColor = ' rgb(72, 72, 227)'
   document.querySelector('#play1').style.color = 'black'
   document.querySelector('#play2').style.color = 'black'
   fetch(`https://www.deckofcardsapi.com/api/deck/new/`)
      .then(res => res.json())
      .then(data => {
         console.log(data)
         newDeckId = data.deck_id
        
      })
      .catch(err => {
         console.log(`error${err}`)
      })
     
      document.querySelector('#player1').src="img/myImage.png"
      document.querySelector('#player2').src="img/myImage.png"
      document.querySelector('#playerScore').innerText = 0
      document.querySelector('#botScore').innerText = 0
      a=0
      b=0
     
      document.querySelector('#play').disabled=false;
      document.querySelector('#play').innerText="Play";
      document.querySelector('h3').innerText = 'Score Board';
   }
     
  


document.querySelector('#play').addEventListener('click', getTwoCard)


function getTwoCard() {

   document.querySelector('.hidden').style.display= 'none'

   if(firstDeckId!=null && newDeckId== ""){
      deckId=firstDeckId
   }
   else if(firstDeckId!=true && newDeckId!=true){
      deckId=newDeckId
   }
      

   
   fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
      .then(res => res.json())
      .then(data => {
         console.log(data)
         document.querySelector('#player1').src = data.cards[0].image;
         document.querySelector('#player2').src = data.cards[1].image;
         val1 = convertValueToNum((data.cards[0].value))
         val2 = convertValueToNum((data.cards[1].value))
         if (val1 > val2) {
            document.querySelector('h3').innerText = 'player 1 wins';
            document.querySelector('#playerScore').innerText = a += 1
         }
         else if (val1 < val2) {
            document.querySelector('h3').innerText = 'player 2 wins'
            document.querySelector('#botScore').innerText = b += 1

         }
         else {
            document.querySelector('body').style.backgroundColor='red';
            document.querySelector('h3').style.color='white'
            document.querySelector('h3').style.fontSize='3rem'
            document.querySelector('h3').innerText = 'War!'
            /*let war=document.querySelector('h3').textContent;
            let sayWar=new SpeechSynthesisUtterance(war);
            window.speechSynthesis.speak(sayWar);*/
            document.querySelector('#play').disabled = true
            document.querySelector('#cardWar').disabled = false
          


         }

         if (data.remaining === 0) {
            document.querySelector('#play').innerText = 'No more cards'
            document.querySelector('#play').disabled = true;
            document.querySelector('body').style.backgroundColor = 'red'
            document.querySelector('h3').innerText='Game over!'
            a > b?document.querySelector('p').innerText= 'player1 wins':document.querySelector('p').innerText= 'player2 wins'


         }

      })
      .catch(err => {
         console.log(`error${err}`)
      })
}


document.querySelector('#shuffle').addEventListener('click', shuffleCards)

function shuffleCards() {
   fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/shuffle/?remaining=true`)
      .then(res => res.json())
      .then(data => {
         console.log(data)
      })
      .catch(err => {
         console.log(`error${err}`)
      })


}

document.querySelector('#cardWar').addEventListener('click', war)


function war() {
   
   fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=6`)
      .then(res => res.json())
      .then(data => {
         console.log(data)
         document.querySelector('#cardWar').disabled=true;
         document.querySelector('#player1a').style.display = 'inline'
         document.querySelector('#player1b').style.display = 'inline'
         document.querySelector('#player2a').style.display = 'inline'
         document.querySelector('#player2b').style.display = 'inline'
         if(data.remaining< 6){
            document.querySelector('h3').innerText='Insufficient cards for a war'
         }
         
         
         else if(data.remaining> 6) {
         document.querySelector('#player1').src = data.cards[0].image;
         document.querySelector('#player2').src = data.cards[1].image;
         document.querySelector('#player1a').src = data.cards[2].image;
         document.querySelector('#player2a').src = data.cards[3].image;
         document.querySelector('#player1b').src = data.cards[4].image;
         document.querySelector('#player2b').src = data.cards[5].image;
         let warPlayer1 = convertValueToNum(data.cards[0].value) + convertValueToNum(data.cards[2].value) + convertValueToNum(data.cards[4].value);
         let warPlayer2 = convertValueToNum(data.cards[1].value) + convertValueToNum(data.cards[3].value) + convertValueToNum(data.cards[5].value);
         document.querySelector('#playerScore').innerText = Number(warPlayer1);
         document.querySelector('#botScore').innerText = Number(warPlayer2);
         warPlayer1 > warPlayer2 ? document.querySelector('h3').innerText = 'Game Over! Player1 wins' : document.querySelector('h3').innerText = 'Game Over!Player2 wins'
         warPlayer1 > warPlayer2 ? document.querySelector('#play1').style.color = 'white' : document.querySelector('#play2').style.color = 'white'
      }
      
  })
      .catch(err => {
         console.log(`error ${err}`)
      })

}


function convertValueToNum(cardValue) {
   if (cardValue === "ACE") {
      return 1
   }
   else if (cardValue === "KING") {
      return 14
   }
   else if (cardValue === "QUEEN") {
      return 13
   }
   else if (cardValue === "JACK") {
      return 12
   }
   else {
      return Number(cardValue)
   }
}

