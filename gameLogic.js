$(document).ready()
    //array of drawn cards for each match, draw all 52 then choose from array to avoid multiple api calls?
let newDeck = [];
let p1Card = [];
let p2Card = [];
let score = [];
let score1 = 0;
let score2 = 0;
const p1NameEl = $('#p1-name-input');
const p2NameEl = $('#p2-name-input');
//let winnerName
let p1Name
let p2Name
$('#submit-start').click(function() {
    p1Name = p1NameEl.val()
    p2Name = p2NameEl.val()
    $('#p1-name').html(p1Name);
    $('#p2-name').html(p2Name);

})
$('#deal-btn').click(function() {


    $.ajax({
            url: "https://deckofcardsapi.com/api/deck/new/draw/?count=52",
            method: "GET"
        })
        .then(function(response) {
            console.log(response)

            let newDeck = response.cards;
            console.log(newDeck)

            for (var i = 0; i < newDeck.length; i++) {
                if (newDeck[i].value === "JACK") {
                    newDeck[i].value = 11;
                }
                if (newDeck[i].value === "QUEEN") {
                    newDeck[i].value = 12;
                }
                if (newDeck[i].value === "KING") {
                    newDeck[i].value = 13;
                }
                if (newDeck[i].value === "ACE") {
                    newDeck[i].value = 14;
                }
                if (newDeck[i].value != "KING" && newDeck[i].value != "QUEEN" && newDeck[i].value != "JACK" && newDeck[i].value != "ACE") {
                    newDeck[i].value = parseInt(newDeck[i].value);
                }
            }

            p1Card.length = 0
            p1Card.push(newDeck[0])
            p2Card.length = 0
            p2Card.push(newDeck[1])

            $("#p1-card").attr("src", p1Card[0].image);
            $("#p2-card").attr("src", p2Card[0].image);

            if (p1Card[0].value > p2Card[0].value) {
                score1++;

            } else if (p1Card[0].value < p2Card[0].value) {
                score2++;

            }
            $("#p1-score").html(score1.toString());
            $("#p2-score").html(score2.toString());
            if (score1 === 5) {
                console.log(score1)
                winnerName = p1Name;
                endgame();
            } else if (score2 === 5) {
                console.log(score2)
                winnerName = p2Name;
                endgame();
            }

            function endgame() {
                $('#search-div').removeClass('hide');
                $('#game-div').addClass('hide');
                $('#winner-name').text(winnerName);
            }

        })
})