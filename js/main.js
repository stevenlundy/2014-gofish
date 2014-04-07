// Go Fish!~

function Players() {
    this.numPlayers = getNumOfPlayers();
    this.players = makePlayers(this.numPlayers);
    this.getPlayer = function(name) {
        var index = this.players.indexOf(name);
        return this.players[index];
    }
    //from this.players[]
    this.doesExist = function(name) {
        if(this.players.indexOf(name) > -1) {
            return true;
        } else {
            return false;
        }
    }
    this.getRandomPlayer = function() {
        var bottom = 0;
        var top = numPlayers - 1
        return players[randBetween(bottom, top)].name;
    }

    function getNumOfPlayers() {
        var numPlayers = parseInt(prompt("How many players are there?"));
        while(numPlayers > 6 && numPlayers < 2) {
            numPlayers = parseInt(prompt("How many players are there? Please no fewer than 2 or greater than 6!"));
        }
        return numPlayers;
    }

    function makePlayers(numOfPlayers) {
        var players = [];
        var name = "";
        var type;
        for(var i = 0; i < numOfPlayers; i++) {
            name = "";
            type = "";
            while(players.indexOf(name) !== -1 || name === "" || name.length > 12 || name === undefined) {
                name = prompt("Player "+(i+1)+", what is your name?");
            }
            while(type !== "human".toUpperCase() && type !== "computer".toUpperCase()) {
                type = prompt("What are you? Human or Computer?");
                type = type.toUpperCase();
            }
            players.push(new Player(name, type));
        }
        return players;
    }
}

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
    };
    this.draw = function() {
        if(this.cards.length > 0) {
            return [this.cards.pop()];
        } else {
            return -1;
        }
    };
    this.shuffle();
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
    this.books = [];
    this.hand = [];

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
        if(this.playerType === "HUMAN") {
            alert("Got here");
            while(players.doesExist(opponent) === false && this.name === opponent) {//Mike fix this
                opponent = prompt("Which player would you like to ask?");
            }
            while(isValidRank(card) === false && this.hasCard(card) === false) {//Tomas fix this
                card = prompt("What card are you looking for?");
                card.toUpperCase();
            }
        } else {
            alert("Got here");
            opponent = players.getRandomPlayer();
            while(opponent.name === this.name) {
                opponent = players.getRandomPlayer();
            }
            var cardIndex = randBetween(0, this.hand.length - 1)
            card = this.hand[cardIndex].rank;
        }
        opponent = players.getPlayer(opponent);
        var fishCards = opponent.hasCard(card);
        var cardsInTransit;
        if(fishCards) {
            cardsInTransit = opponent.getCards(fishCards);
        } else {
            cardsInTransit = deck.draw();
        }
        if(cardsInTransit !== -1) {
            this.addCards(cardsInTransit);
        }
    };
    this.hasCard = function(query) {
        query = rankToValue(query);
        var numCards;
        var startPos;
        var top = this.hand.length - 1;
        var bottom = 0;
        var range = top - bottom + 1;
        while(range >= 1) {
            var pos = Math.floor(bottom + range / 2);
            var card = this.hand[pos].value;
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
                    if(this.hand[pos + i] !== undefined) {
                        if(this.hand[pos + i].value === query) {
                            numCards++;
                        }
                    }
                    if(this.hand[pos - i] !== undefined) {
                        if(this.hand[pos - i].value === query) {
                            numCards++;
                            startPos = pos - i;
                        }
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
    this.addCards = function(cardArr) {
        for(i = 0; i < cardArr.length; i++) {
            this.hand.push(cardArr[i]);
        }
    };
    this.getCards = function(cardInfo) {
        var cardArray = [];
        cardArray = this.hand.splice(cardInfo.startPos, cardInfo.numCards);
        return cardArray;
    };
    this.removeBooks = function() {
        for(var j = 0; j < this.hand.length; j++) {
            if(this.hand[j] === this.hand[j + 3]) {
                this.books.push(new Book(this.hand[j].value));
                this.hand.splice(j, 4);
            }
        }
    };
    this.sortHand = function() {
        for(var i = 1; i < this.hand.length; i++) {
            var j = i;
            while(this.hand[j].value < this.hand[j - 1].value) {
                var temp = this.hand[j - 1];
                this.hand[j - 1] = this.hand[j];
                this.hand[j] = temp;
                j--;
                if(j===0){
                    break;
                }
            }
        }
    }
    this.getScore = function() {
        var scoreTotal = 0;
        for(var i = 0; i < this.books.length; i++) {
            scoreTotal = this.books[i].score + scoreTotal;
        }
        return scoreTotal;
    }
    
    for(var k = 0; k < 8; k++) {
        this.addCards(deck.draw());
    }
    this.sortHand();
}

function randBetween(min, max) {
    var number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number;
}

function rankToValue(rank) { //Mike
    var value;
    switch(rank) {
        case "A":
            value = 1;
            break;
        case "K":
            value = 13;
            break;
        case "Q":
            value = 12;
            break;
        case "J":
            value = 11;
            break;
        default:
            value = parseInt(rank, 10);
            break;
    }
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
var players = new Players();
var gameOn = true;
while(gameOn){
    for(var i=0;i<players.numPlayers;i++){
        players.players[i].printHand();
        players.players[i].chooseCard();
        players.players[i].removeBooks();
        players.players[i].sortHand();
    }
    gameOn = confirm("Keep playing?");
}