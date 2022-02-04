var playerInfo1 = document.getElementById("player1");
var playerInfo2 = document.getElementById("player2");

function onSubmit(e) {
    e.preventDefault();

    if (playerInfo1 != null && playerInfo1.value != "") {
        localStorage.setItem("player1", playerInfo1.value);
    }else{
        localStorage.setItem("player1", "Player 1")
    }
    if (playerInfo2 != null && playerInfo2.value != "") {
        localStorage.setItem("player2", playerInfo2.value);
    } else{
        localStorage.setItem("player2", "Player 2")
    }
    window.location.href = "./index.html";
}