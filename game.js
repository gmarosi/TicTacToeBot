let xTurn = true;
const xPositions = [false, false, false, false, false, false, false, false, false];
const oPositions = [false, false, false, false, false, false, false, false, false];
let gameOver = false;
let moveCount = 0;
const wins = [0, 0] // x, o

function move(id)
{
    if(gameOver)
    {
        alert("Game already over, please restart!");
        return;
    }

    if(document.getElementById(id).innerText != "")
    {
        alert("Illegal move!");
        return;
    }

    if(xTurn)
    {
        document.getElementById(id).innerHTML = 'X';
        xPositions[id] = true;
        xTurn = false;
    }
    else
    {
        document.getElementById(id).innerHTML = 'O';
        oPositions[id] = true;
        xTurn = true;
    }

    moveCount++;
    checkWin();
    if(!gameOver && !xTurn)
        think(id);
}

function checkWin()
{
    let mainDiag = xPositions[0] && xPositions[4] && xPositions[8] || oPositions[0] && oPositions[4] && oPositions[8];
    let sideDiag = xPositions[2] && xPositions[4] && xPositions[6] || oPositions[2] && oPositions[4] && oPositions[6];
    const columns = [false, false, false];
    const rows = [false, false, false];

    for(i = 0; i < 3; i++)
    {
        columns[i] = xPositions[i] && xPositions[i + 3] && xPositions[i + 6] || oPositions[i] && oPositions[i + 3] && oPositions[i + 6];
    }

    for(i = 0; i < 7; i += 3)
    {
        rows[i / 3] = xPositions[i] && xPositions[i + 1] && xPositions[i + 2] || oPositions[i] && oPositions[i + 1] && oPositions[i + 2];
    }

    if(mainDiag || sideDiag || columns[1] || rows[1])
    {
        alert(document.getElementById("4").innerHTML + " won!");
        gameOver = true;
        scoring(document.getElementById("4").innerHTML);
    }
    else if(columns[0] || rows[0])
    {
        alert(document.getElementById("0").innerHTML + " won!");
        gameOver = true;
        scoring(document.getElementById("0").innerHTML);
    }
    else if(columns[2] || rows[2])
    {
        alert(document.getElementById("8").innerHTML + " won!");
        gameOver = true;
        scoring(document.getElementById("8").innerHTML);
    }
}

function think(id)
{
    /*
    Near wins:
    first row:
    0,1; 0,2; 1,2

    first column:
    0,3; 0,6; 3,6

    main diagonal:
    0,4; 0,8; 4,8

    side diagonal:
    2,4; 2,6; 4,6

    second row:
    3,4; 3,5; 4,5

    second column:
    1,4; 1,7; 4,7

    third row:
    6,7; 6,8; 7,8

    third column:
    2,5; 2,8; 5,8
    */

    // Check for own near wins

    let checked = false;
    const goodFields = new Array();
    let i = 0;
    while(!checked)
    {
        let o = 0;
        while(i < 9 && !oPositions[i])
        {
            i++;
        }
        if(i >= 9)
        {
            checked = true;
            break;
        }

        for(num of rowOf(i))
        {
            if(oPositions[num])
            {
                o++;
            }
            else if(xPositions[num])
            {
                o = 0;
                break;
            }
            else
            {
                goodFields.push(num);
            }
        }

        if(o == 2)
        {
            move(goodFields[goodFields.length-1]);
            return;
        }

        o = 0;
        for(num of columnOf(i))
        {
            if(oPositions[num])
            {
                o++;
            }
            else if(xPositions[num])
            {
                o = 0;
                break;
            }
            else
            {
                goodFields.push(num);
            }
        }

        if(o == 2)
        {
            move(goodFields[goodFields.length-1]);
            return;
        }

        // main diagonal
        if(i % 4 == 0)
        {
            o = 0;
            for(num of [0, 4, 8])
            {
                if(oPositions[num])
                {
                    o++;
                }
                else if(xPositions[num])
                {
                    o = 0;
                    break;
                }
                else
                {
                    goodFields.push(num);
                }
            }

            if(o == 2)
            {
                move(goodFields[goodFields.length-1]);
                return;
            }
        }

        // side diagonal
        if(i % 4 == 2 || i == 4)
        {
            o = 0;
            for(num of [2, 4, 6])
            {
                if(oPositions[num])
                {
                    o++;
                }
                else if(xPositions[num])
                {
                    o = 0;
                    break;
                }
                else
                {
                    goodFields.push(num);
                }
            }

            if(o == 2)
            {
                move(goodFields[goodFields.length-1]);
                return;
            }
        }

        i++;
    }

    // Check if prev move caused near win
    const emptyFields = new Array();
    let x = 0;
    while(emptyFields.length > 0)
    {
        emptyFields.pop();
    }
    for(num of rowOf(id))
    {
        if(xPositions[num])
        {
            x++;
        }
        else if(oPositions[num])
        {
            x = 0;
            break;
        }
        else
        {
            emptyFields.push(num);
        }
    }

    if(x == 2)
    {
        move(emptyFields[0]);
        return;
    }

    x = 0;
    while(emptyFields.length > 0)
    {
        emptyFields.pop();
    }
    for(num of columnOf(id))
    {
        if(xPositions[num])
        {
            x++;
        }
        else if(oPositions[num])
        {
            x = 0;
            break;
        }
        else
        {
            emptyFields.push(num);
        }
    }

    if(x == 2)
    {
        move(emptyFields[0]);
        return;
    }

    if(id % 4 == 0)
    {
        x = 0;
        while(emptyFields.length > 0)
        {
            emptyFields.pop();
        }
        for(num of [0, 4, 8])
        {
            if(xPositions[num])
            {
                x++;
            }
            else if(oPositions[num])
            {
                x = 0;
                break;
            }
            else
            {
                emptyFields.push(num);
            }
        }

        if(x == 2)
        {
            move(emptyFields[0]);
            return;
        }
    }

    if(id % 4 == 2 || id == 4)
    {
        x = 0;
        while(emptyFields.length > 0)
        {
            emptyFields.pop();
        }
        for(num of [2, 4, 6])
        {
            if(xPositions[num])
            {
                x++;
            }
            else if(oPositions[num])
            {
                x = 0;
                break;
            }
            else
            {
                emptyFields.push(num);
            }
        }

        if(x == 2)
        {
            move(emptyFields[0]);
            return;
        }
    }

    // Place in row or column of existing own field
    if(goodFields.length > 0)
    {
        move(goodFields[0]);
        return;
    }

    // If possible, place center
    if(!xPositions[4] && !oPositions[4])
    {
        move(4);
        return;
    }

    // Place in corner field otherwise
    for(i of [0, 2, 6, 8])
    {
        if(!xPositions[i] && !oPositions[i])
        {
            move(i);
            return;
        }
    }

    // Place in any field left
    for(i of [1, 3, 5, 7])
    {
        if(!xPositions[i] && !oPositions[i])
        {
            move(i);
            return;
        }
    }
}

function rowOf(num)
{
    let rowStart = Math.floor(num/3) * 3;
    return [rowStart, rowStart + 1, rowStart + 2];
}

function columnOf(num)
{
    let colStart = num % 3;
    return [colStart, colStart + 3, colStart + 6];
}

function scoring(winner)
{
    if(winner == "X")
    {
        wins[0]++;
        document.getElementById("x-score").innerHTML = "X player score: " + wins[0];
    }
    else
    {
        wins[1]++;
        document.getElementById("o-score").innerHTML = "O player score: " + wins[1];
    }
}

function restart()
{
    for(i = 0; i < 9; i++)
    {
       document.getElementById(i).innerHTML = "";
       xPositions[i] = 0;
       oPositions[i] = 0;
    }
    xTurn = true;
    gameOver = false;
    moveCount = 0;
}

function reset()
{
    wins[0] = 0;
    wins[1] = 0;
    document.getElementById("x-score").innerHTML = "X player score: 0";
    document.getElementById("o-score").innerHTML = "O player score: 0";
}