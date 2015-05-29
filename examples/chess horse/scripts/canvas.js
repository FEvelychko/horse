/**
 * Created by Maksym on 5/29/2015.
 */


a_canvas.onclick = function(e) {

    debugger;
    m.push(e.offsetX==undefined?e.layerX:e.offsetX);
    m[m.length-1]=Math.floor((m[m.length-1])/50);
    m.push(e.offsetY==undefined?e.layerY:e.offsetY);
    m[m.length-1]=Math.floor(m[m.length-1]/50);
    if (m.length==2) { context.fillStyle = "#00ff00";
        context.fillRect(m[m.length-2]*50,m[m.length-1]*50,50,50)};
    if (m.length==4) { context.fillStyle = "#ff0000";
        context.fillRect(m[m.length-2]*50,m[m.length-1]*50,50,50);

        var N = 10;
        var x = m[0];
        var y = m[1];
        var xParent = m[2];
        var yParent = m[3];

        // creating of two-dimensional array
        var chess = new Array(N);
        for (var i=N; i--;) {
            chess[i] = new Array(N);
        };
        var path = []; // array for saving a path
        var count = 0,
            steps;
        var pathsteps = [];
        function potentialMoves(x, y) {
            var trash = [];
            var   moves = [
                [x+2, y+1],
                [x+2, y-1],
                [x+1, y+2],
                [x+1, y-2],
                [x-1, y+2],
                [x-1, y-2],
                [x-2, y+1],
                [x-2, y-1]
            ];
            for (var j=moves.length; j--;) {
                if((moves[j][0]>=0) && (moves[j][0]<N) && (moves[j][1]>=0) && (moves[j][1]<N)) trash.push(moves[j]);
            };
            for (j=trash.length; j--;) {
                {if (!chess[trash[j][0]][trash[j][1]]) {
                    chess[trash[j][0]][trash[j][1]] = count+1;
                    pathsteps.push([trash[j][0],trash[j][1]]);
                };
                };
            };
        };
        potentialMoves(x, y);
        while (!chess[xParent][yParent]) {
            count+=1;
            var j=pathsteps.length;
            for (var i=j; i--;) {
                potentialMoves(pathsteps[i][0], pathsteps[i][1]);
            };
            pathsteps.splice(0,j);
        };
        steps = chess[xParent][yParent];
        path.push([x,y]);
        path[steps] = ([xParent,yParent]);
        while (steps !=1) {
            steps-=1;
            var trash=[];
            var    moves = [
                [xParent+2, yParent+1],
                [xParent+2, yParent-1],
                [xParent+1, yParent+2],
                [xParent+1, yParent-2],
                [xParent-1, yParent+2],
                [xParent-1, yParent-2],
                [xParent-2, yParent+1],
                [xParent-2, yParent-1]
            ];
            for (var j=moves.length; j--;) {
                if((moves[j][0]>=0) && (moves[j][0]<N) && (moves[j][1]>=0) && (moves[j][1]<N)) trash.push(moves[j]);
            };
            for (j=trash.length; j--;) {
                if(chess[trash[j][0]][trash[j][1]] === steps) {
                    path[steps]=[trash[j][0],trash[j][1]];
                    xParent = trash[j][0];
                    yParent = trash[j][1]};
            };
        };

        document.getElementById('way').innerHTML = "The quanity of steps:" + (path.length-1);
        context.strokeStyle = "#fff";
        for (i=path.length; i-=1;) {
            x=path[i][0];
            y=path[i][1];
            xParent=path[i-1][0];
            yParent=path[i-1][1];
            context.moveTo(50*x+5,50*y+5);
            context.lineTo(50*xParent+5,50*y+5);
            context.moveTo(50*xParent+5,50*y+5);
            context.lineTo(50*xParent+5,50*yParent+5);
            context.stroke();
        };
        context.stroke();
        m=[];
    };
};