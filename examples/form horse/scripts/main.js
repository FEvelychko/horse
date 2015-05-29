"use strict";

/* total data that's in logic */
var x, y, area, step, time, active;
var possiblePoints = [];
var visitedPoints = [];
var combinations = [];
var nextPoints = [];
var chessField = [];
var path = [];

runHorse.onclick  = function runHorse(){

    /* the values start and end coordinates */
    var x1 = parseInt(document.getElementById("beginx").value);
    var y1 = parseInt(document.getElementById("beginy").value);
    var x2 = parseInt(document.getElementById("endx").value);
    var y2 = parseInt(document.getElementById("endy").value);

    /* structure of matrix as chess of Filed */
    area = 1000;
    for(var i=0; i<=area; i++) {
        chessField[i] = [];
        for(var j=0; j<=area;j++){
            chessField[i][j] = -1;
        }
    }

    /* time, that's will be using for future difference between running and stopping horse */
    time = new Date();

    /* it's checking, are values(x,y) belongs the area.length */
    active = function() {
        if (x < area && x > 0 && y < area && y > 0) {
            if(chessField[x][y] == -1){
                return true;
            }
        }
    };

    /* this one, allows to find all possible ways for style walking horse */
    (function possibleWays() {
        nextPoints = {x:x1, y:y1};
        possiblePoints.push(nextPoints);
        while(possiblePoints.length>0){
            nextPoints = possiblePoints.shift();
            visitedPoints.push(nextPoints);
            if (nextPoints.x === x2 && nextPoints.y === y2 ){
                return nextPoints;
            }
            combinations = [[1,2],[1,-2],[-1,2],[-1,-2],[2,1],[2,-1],[-2,1],[-2,-1]];
            for (var i = 0; i < combinations.length; i++) {
                step = combinations[i];
                x = nextPoints.x + step[0];
                y = nextPoints.y + step[1];
                if (active()) {
                    possiblePoints.push({"x":x,"y":y,"xParent":nextPoints.x, "yParent":nextPoints.y});
                    chessField[x][y] = 1;
                }
            }
        }
    }());

    /* it let's to set a path that's horse walked */
    (function searchPath(){
        path.push(nextPoints);
        for (var i = visitedPoints.length - 1; i>=0; i--) {
            if  ( visitedPoints[i].x === nextPoints.xParent && visitedPoints[i].y === nextPoints.yParent) {
                path.push(visitedPoints[i]);
                nextPoints = visitedPoints[i];
            }
        }
        return path;
    }());

    /* difference in time, between starting and stopping of run horse */
    console.log(new Date() - time + "ms");

    /* it let's to show a path that's horse walked */
    (function showPath(){
        console.log("The quanity of steps: " + (path.length - 1));
        for (var i = path.length -1; i>=0; i--) {
            console.log(path[i].x, path[i].y)
        }
    }());
    document.getElementById("countWays").innerHTML = "The quanity of steps: " + (path.length - 1);
}