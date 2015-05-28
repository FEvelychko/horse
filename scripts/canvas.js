/**
 * Created by Maksym on 5/28/2015.
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
        var xs = m[0];
        var ys = m[1];
        var xf = m[2];
        var yf = m[3];

        // creating of two-dimensional array
        var chess = new Array(N);
        for (var i=N; i--;) {
            chess[i] = new Array(N);
        };
        var path = []; // array for saving a path
        var count = 0,
            steps;
        var pathsteps = [];
        function potentialMoves(xs, ys) {
            var trash = [];
            var   moves = [
                [xs+2, ys+1],
                [xs+2, ys-1],
                [xs+1, ys+2],
                [xs+1, ys-2],
                [xs-1, ys+2],
                [xs-1, ys-2],
                [xs-2, ys+1],
                [xs-2, ys-1]
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
        potentialMoves(xs, ys);
        while (!chess[xf][yf]) {
            count+=1;
            var j=pathsteps.length;
            for (var i=j; i--;) {
                potentialMoves(pathsteps[i][0], pathsteps[i][1]);
            };
            pathsteps.splice(0,j);
        };
        steps = chess[xf][yf];
        path.push([xs,ys]);
        path[steps] = ([xf,yf]);
        while (steps !=1) {
            steps-=1;
            var trash=[];
            var    moves = [
                [xf+2, yf+1],
                [xf+2, yf-1],
                [xf+1, yf+2],
                [xf+1, yf-2],
                [xf-1, yf+2],
                [xf-1, yf-2],
                [xf-2, yf+1],
                [xf-2, yf-1]
            ];
            for (var j=moves.length; j--;) {
                if((moves[j][0]>=0) && (moves[j][0]<N) && (moves[j][1]>=0) && (moves[j][1]<N)) trash.push(moves[j]);
            };
            for (j=trash.length; j--;) {
                if(chess[trash[j][0]][trash[j][1]] === steps) {
                    path[steps]=[trash[j][0],trash[j][1]];
                    xf = trash[j][0];
                    yf = trash[j][1];};
            };
        };

        document.getElementById('way').innerHTML = "The quanity of steps: " + (path.length-1);
        context.strokeStyle = "#fff";
        for (i=path.length; i-=1;) {
            xs=path[i][0];
            ys=path[i][1];
            xf=path[i-1][0];
            yf=path[i-1][1];
            context.moveTo(50*xs+5,50*ys+5);
            context.lineTo(50*xf+5,50*ys+5);
            context.moveTo(50*xf+5,50*ys+5);
            context.lineTo(50*xf+5,50*yf+5);
            context.stroke();
        };
        context.stroke();
        m=[];
    };
};