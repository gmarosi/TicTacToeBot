let xTurn = true;
const xPositions = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const oPositions = [0, 0, 0, 0, 0, 0, 0, 0, 0];

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
        xPositions[id] = 1;
        xTurn = false;
    }
    else
    {
        document.getElementById(id).innerHTML = 'O';
        oPositions[id] = 1;
        xTurn = true;
    }

    checkWin();
}

function checkWin()
{
    let mainDiag = xPositions[0] + xPositions[4] + xPositions[8] == 3 || oPositions[0] + oPositions[4] + oPositions[8] == 3;
    let sideDiag = xPositions[2] + xPositions[4] + xPositions[6] == 3 || oPositions[2] + oPositions[4] + oPositions[6] == 3;
    const columns = [false, false, false];
    const rows = [false, false, false];

    for(i = 0; i < 3; i++)
    {
        columns[i] = xPositions[i] + xPositions[i + 3] + xPositions[i + 6] == 3 || oPositions[i] + oPositions[i + 3] + oPositions[i + 6] == 3;
    }

    for(i = 0; i < 7; i += 3)
    {
        rows[i / 3] = xPositions[i] + xPositions[i + 1] + xPositions[i + 2] == 3 || oPositions[i] + oPositions[i + 1] + oPositions[i + 2] == 3
    }

    if(mainDiag || sideDiag || columns[1] || rows[1])
    {
        alert(document.getElementById("4").innerHTML + " won!");
    }
    else if(columns[0] || rows[0])
    {
        alert(document.getElementById("0").innerHTML + " won!");
    }
    else if(columns[2] || rows[2])
    {
        alert(document.getElementById("8").innerHTML + " won!");
    }
}