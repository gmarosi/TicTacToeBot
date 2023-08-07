let xTurn = true;

function move(id)
{
    if(document.getElementById(id).innerText != "")
    {
        alert("Illegal move!");
        return;
    }

    if(xTurn)
    {
        document.getElementById(id).innerHTML = 'X';
        gameState.set(id, "X");
        xTurn = false;
    }
    else
    {
        document.getElementById(id).innerHTML = 'O';
        gameState.set(id, "O");
        xTurn = true;
    }

    return;
}