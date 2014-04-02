// Go Fish!~

function Deck() {
    this.cards = [];
    var suits = ["C", "D", "H", "S"];
    for(var i = 0; i < suits.length; i++) {
        for(var j = 1; j <= 13; j++) {
            this.cards.push(new Card(suits[i], j));
        }
    }
    this.shuffle = function() {
        var newArr = [];
        var index;
        for(var j = 51; j >= 0; j--) {
            index = randBetween(0, j);
            newArr.push(this.cards[index]);
            this.cards.splice(index, 1);
        }
        this.cards = newArr;
    }
    this.draw = function() {
        if(this.cards.length > 0) {
            return this.cards.pop();
        } else {
            return -1;
        }
    }
}

function Card(suit, value) {
    this.value = value;
    this.suit = suit;
    this.rank = valueToRank(value);
}

function Book(value) {
    this.value = value;
    switch(value) {
        case 1:
            this.score = 3;
            break;
        case 11:
            this.score = 2;
            break;
        case 12:
            this.score = 2;
            break;
        case 13:
            this.score = 2;
            break;
        default:
            this.score = 1;
    }
}

function Player(name, playerType) {
    this.name = name;
    this.playerType = playerType;
    this.hand = [];
    this.books = [];

    function isValidRank(card) {
        if(card === "A" || card === "J" || card === "Q" || card === "K" || (card >= 2 && card <= 10)) {
            return true;
        } else {
            return false;
        }
    }
    this.chooseCard = function() {
        var opponent;
        var card;
        while(players.doesExist(opponent) === false && this.name === opponent) {
            opponent = prompt("Which player would you like to ask?");
        }
        while(isValidRank(card) === false && this.hasCard(card) === false) {
            card = prompt("What card are you looking for?");
            card.toUpperCase();
        }
        opponent = players.getPlayer(opponent);
        var fishCards = opponent.hasCard(card);
        if(fishCards) {
            var cardsInTransit = opponent.getCards(fishCards);
        } else {
            var cardsInTransit = deck.draw();
        }
        this.addCards(cardsInTransit);
    };
    this.hasCard = function(query) {
        var numCards;
        var startPos;
        var top = this.hand.length - 1;
        var bottom = 0;
        var range = top - bottom + 1;
        while(range >= 1) {
            var pos = Math.floor(bottom + range / 2);
            var card = this.hand[pos];
            if(card < query) {
                bottom = pos + 1;
                range = top - bottom + 1;
            } else if(card > query) {
                top = pos - 1;
                range = top - bottom + 1;
            } else {
                numCards = 1;
                startPos = pos;
                for(var i = 1; i <= 2; i++) {
                    if(this.hand[pos + i] === query) {
                        numCards++;
                    }
                    if(this.hand[pos - i] === query) {
                        numCards++;
                        startPos = pos - i;
                    }
                }
                var fishCards = {};
                fishCards.numCards = numCards;
                fishCards.startPos = startPos;
                return fishCards;
            }
        }
        return false;
    };
    this.printHand = function() {
        var x = "";
        for(var i = 0; i < this.hand.length; i++) {
            x += this.hand[i].rank;
            switch(this.hand[i].suit) {
                case "C":
                    x += "♣";
                    break;
                case "D":
                    x += "♦";
                    break;
                case "S":
                    x += "♠";
                    break;
                case "H":
                    x += "♥";
                    break;
            }
            x += " ";
        }
        console.log(x);
    };
}

function randBetween(min, max) {
    var number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number;
}

function rankToValue(rank) { //Mike
    
    
    
    
    return value; // int
}

function valueToRank(value) {
    var rank;
    switch(value) {
        case 1:
            rank = "A";
            break;
        case 11:
            rank = "J";
            break;
        case 12:
            rank = "Q";
            break;
        case 13:
            rank = "K";
            break;
        default:
            rank = value;
    }
    return rank; 
}
var deck = new Deck();