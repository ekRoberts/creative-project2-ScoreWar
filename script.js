let deckID = ""
let player1Score = 0;
let player2Score = 0; 
let playTo = 20

document.getElementById('generate').addEventListener("click", function(event){
    event.preventDefault();
    player1Score = 0;
    player2Score = 0; 
    document.getElementById('p1Score').innerHTML = 0;
    document.getElementById('p2Score').innerHTML = 0;
    document.getElementById('winner').style.display = "none";
    if(document.getElementById('winningScore').value != ''){
        playTo = document.getElementById('winningScore').value;        
        }
    console.log(playTo);
    const url =  "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    /*global fetch*/ fetch(url)
    .then(function(response){
        return response.json()
    }).then(function(json){
        document.getElementById('deal').style.display = "inline";
        deckID = json.deck_id;
        console.log(deckID)
    })
    })


document.getElementById('deal').addEventListener("click", function(event){
    const securl = "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=2";
        fetch(securl)
        .then(function(response){
        return response.json()
        })
        .then(function(json){
            console.log(json)
            let result1 = '';
            let result2 = '';
            
            if(json.remaining == 0){
                const url =  "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
            /*global fetch*/ fetch(url)
            .then(function(response){
                return response.json()
            }).then(function(json){
                document.getElementById('deal').style.display = "inline";
                deckID = json.deck_id;
                console.log(deckID)
            })
                
            }
            
            if(player1Score < playTo & player2Score < playTo){      
            result1 += '<img src="' + json.cards[0].image +'"/>';
            result2 += '<img src="' + json.cards[1].image +'"/>';
            let player1Card = getCardValue(json.cards[0].value)
            let player2Card = getCardValue(json.cards[1].value)
            if(player1Card == player2Card){
                let player1Suit = json.cards[0].suit;
                let player2Suit = json.cards[1].suit;
                
                if(player1Suit == "SPADES"){
                    player1Score +=player1Card;
                }else if(player2Card == "SPADES"){
                    player2Score += player2Card;
                }else if(player1Suit == "CLUBS"){
                    player2Score += player2Card;
                }else if(player2Suit == "CLUBS"){
                    player1Score +=player1Card;
                }else if(player1Suit == "HEARTS"){
                    player1Score +=player1Card;
                }else if(player2Suit == "HEARTS"){
                    player2Score += player2Card;
                }
            }else if(player1Card > player2Card){
                player1Score +=player1Card;
            }else{
                player2Score += player2Card;
            }
            
            if(player1Score >= playTo | player2Score >= playTo){
                                document.getElementById('deal').style.display = "none";
                
                if(player1Score > player2Score){
                    document.getElementById('winner').innerHTML = "Player 1 Wins!"
                    document.getElementById('winner').style.display = "inline";
                }else{
                    document.getElementById('winner').innerHTML = "Player 2 Wins!"
                    document.getElementById('winner').style.display = "inline";
                }
            }
            console.log(json.remaining)
            document.getElementById('card1').innerHTML = result1;
            document.getElementById('card2').innerHTML = result2;
            document.getElementById('p1Score').innerHTML = player1Score;
            document.getElementById('p2Score').innerHTML = player2Score;
            }else{
                document.getElementById('deal').style.display = "none";
                
                if(player1Score > player2Score){
                    document.getElementById('winner').innerHTML = "Player 1 Wins!"
                    document.getElementById('winner').style.display = "inline";
                }else{
                    document.getElementById('winner').innerHTML = "Player 2 Wins!"
                    document.getElementById('winner').style.display = "inline";
                }
            }
            
        })
})


function getCardValue(cardValue){
    if(cardValue != 'KING' & cardValue != 'QUEEN' & cardValue != 'JACK' & cardValue != 'ACE'){
        return parseInt(cardValue);
    }else if(cardValue === 'JACK'){
        return 10;
    }else if(cardValue === 'QUEEN'){
        return 11;
    }else if(cardValue === 'KING'){
        return 12;
    }else if(cardValue === 'ACE'){
        return 15;
    }
}
