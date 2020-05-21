var Cell = /** @class */ (function () {
    function Cell() {
    }
    return Cell;
}());
//let scores:ScoreBoard[];
var scores = new Array();
var ScoreBoard = /** @class */ (function () {
    function ScoreBoard(par1, par2) {
        this.winner = par1;
        this.date = par2;
    }
    return ScoreBoard;
}());
var Board = /** @class */ (function () {
    function Board() {
        var _this = this;
        this.isFirstPlayer = true;
        this.checkrule = 3;
        this.deathZoneCount = 0;
        this.playable = false;
        this.time = 150;
        this.deathzones = new Array();
        this.deathzonescounter = 3;
        this.counter = 150;
        this.intervalId = 0;
        var button = document.getElementById("makeboard");
        button.addEventListener("click", function (e) { return _this.createBoard(); });
    }
    Board.prototype.createBoard = function () {
        var width = parseInt(document.getElementById("width").value);
        var height = parseInt(document.getElementById("height").value);
        var checkrule = parseInt(document.getElementById("checkrule").value);
        var deathZoneCount = parseInt(document.getElementById("deathzone").value);
        var time = parseInt(document.getElementById("time").value);
        this.sizeX = width;
        this.sizeY = height;
        this.checkrule = checkrule;
        this.gameTable = [];
        this.playable = true;
        this.time = time * 10;
        this.counter = this.time;
        this.deathZoneCount = deathZoneCount;
        for (var i = 0; i < height; i++) {
            this.gameTable[i] = [];
            for (var j = 0; j < width; j++) {
                this.gameTable[i][j] = 0;
            }
        }
        for (var i_1 = 0; i_1 < this.deathZoneCount; i_1++) {
            var x = this.getRandomInt(0, this.sizeX - 1);
            var y = this.getRandomInt(0, this.sizeX - 1);
            var c = new Cell();
            c.xc = x;
            c.yc = y;
            this.deathzones.push(c);
            this.gameTable[x][y] = -1;
        }
        document.getElementById("content").innerHTML = '';
        document.getElementById("scores").innerHTML = '';
        document.getElementById("content").appendChild(this.buildTable(this.gameTable, this.sizeX, this.sizeY));
        this.start();
    };
    Board.prototype.getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };
    Board.prototype.CheckTableIsFull = function () {
        var tmp = true;
        for (var i = 0; i < this.sizeY; i++) {
            for (var j = 0; j < this.sizeX; j++) {
                console.log(i + " " + j + " " + this.gameTable[i][j]);
                if (this.gameTable[i][j] == 0)
                    tmp = false;
            }
        }
        return tmp;
    };
    Board.prototype.CheckWin = function (x, y) {
        var _this = this;
        var tmp = this.CheckTableIsFull();
        if (this.CheckVertical(this.checkrule - 1, x, y, 0) ||
            this.CheckHorizontal(this.checkrule - 1, x, y, 0) ||
            this.CheckCrossLeft(this.checkrule - 1, x, y, 0) ||
            this.CheckCrossRight(this.checkrule - 1, x, y, 0) || tmp) {
            this.playable = false;
            var winner = document.createElement("h3");
            if (tmp)
                winner.innerHTML = "Remis";
            else
                winner.innerHTML = (this.isFirstPlayer) ? "Winner: Player2" : "Winner: Player1";
            scores.push(new ScoreBoard(winner.innerHTML, Date.now()));
            document.getElementById("winner").appendChild(winner);
            var resetb = document.createElement("button");
            resetb.innerText = "Reset";
            resetb.addEventListener("click", function (e) { return _this.ResetSettings(_this.sizeX, _this.sizeY, _this.checkrule); });
            document.getElementById("winner").appendChild(resetb);
            clearInterval(this.intervalId);
            var timerhtml = document.getElementById("timer");
            timerhtml.innerHTML = '';
        }
    };
    Board.prototype.ResetSettings = function (width, height, checkrule) {
        var _this = this;
        this.isFirstPlayer = true;
        document.getElementById("winner").innerHTML = '';
        var content = document.getElementById("content");
        content.innerHTML = "Wysokosc:<input id=\"height\"  type=\"number\" value=\"3\" min=\"3\" max=\"100\"><br>\n        Szerokosc:<input id=\"width\"  type=\"number\" value=\"3\" min=\"3\" max=\"100\"><br>\n        Marks to Win:<input id=\"checkrule\" type=\"number\" value=\"3\" min=\"2\" max=\"6\"><br>\n        DeathZones:<input id=\"deathzone\" type=\"number\" value=\"0\" min=\"0\" max=\"10\"> (Remember that game have to be winable)<br>\n        Time:<input id=\"time\" type=\"number\" value=\"15\" min=\"5\" max=\"30\"> [5-30]<br>    ";
        var button = document.createElement("button");
        button.innerText = "CreateBoard";
        button.id = "makeboard";
        button.addEventListener("click", function (e) { return _this.createBoard(); });
        content.appendChild(button);
        var scoreslist = document.getElementById("scores");
        var scoress = "";
        for (var i = 0; i < scores.length; i++) {
            var d = new Date(scores[i].date);
            scoress += scores[i].winner + " " + d + "<br>";
        }
        scoreslist.innerHTML = scoress;
    };
    Board.prototype.CheckVertical = function (left, x, y, right) {
        var list = new Array();
        //left
        for (var i = 1; i <= left; i++) {
            var data = {};
            data.xc = x - 1 * i;
            data.yc = y;
            if (!(data.xc < 0 || data.yc < 0 || data.xc >= this.sizeX || data.yc >= this.sizeY))
                list.push(data);
        }
        //right
        for (var i = 1; i <= right; i++) {
            var data = {};
            data.xc = x + 1 * i;
            data.yc = y;
            if (!(data.xc < 0 || data.yc < 0 || data.xc >= this.sizeX || data.yc >= this.sizeY))
                list.push(data);
        }
        var tt = true;
        if (list.length == left + right) {
            for (var i = 0; i < list.length; i++) {
                tt = tt && (this.gameTable[list[i].xc][list[i].yc] == this.gameTable[x][y]);
            }
            if (tt)
                return true;
        }
        if (left <= 0)
            return false;
        return this.CheckVertical(left - 1, x, y, right + 1);
    };
    Board.prototype.CheckHorizontal = function (left, x, y, right) {
        var list = new Array();
        //left
        for (var i = 1; i <= left; i++) {
            var data = {};
            data.xc = x;
            data.yc = y - 1 * i;
            if (!(data.xc < 0 || data.yc < 0 || (data.xc >= this.sizeX && data.yc >= this.sizeY)))
                list.push(data);
        }
        //right
        for (var i = 1; i <= right; i++) {
            var data = {};
            data.xc = x;
            data.yc = y + 1 * i;
            if (!(data.xc < 0 || data.yc < 0 || (data.xc >= this.sizeX && data.yc >= this.sizeY)))
                list.push(data);
        }
        var tt = true;
        if (list.length == left + right) {
            for (var i = 0; i < list.length; i++) {
                tt = tt && (this.gameTable[list[i].xc][list[i].yc] == this.gameTable[x][y]);
            }
            if (tt)
                return true;
        }
        if (left <= 0)
            return false;
        return this.CheckHorizontal(left - 1, x, y, right + 1);
    };
    Board.prototype.CheckCrossLeft = function (left, x, y, right) {
        var list = new Array();
        //left
        for (var i = 1; i <= left; i++) {
            var data = {};
            data.xc = x + 1 * i;
            data.yc = y - 1 * i;
            if (!(data.xc < 0 || data.yc < 0 || data.xc >= this.sizeX || data.yc >= this.sizeY))
                list.push(data);
        }
        //right
        for (var i = 1; i <= right; i++) {
            var data = {};
            data.xc = x - 1 * i;
            data.yc = y + 1 * i;
            if (!(data.xc < 0 || data.yc < 0 || data.xc >= this.sizeX || data.yc >= this.sizeY))
                list.push(data);
        }
        var tt = true;
        if (list.length == left + right) {
            for (var i = 0; i < list.length; i++) {
                tt = tt && (this.gameTable[list[i].xc][list[i].yc] == this.gameTable[x][y]);
            }
            if (tt)
                return true;
        }
        if (left <= 0)
            return false;
        return this.CheckCrossLeft(left - 1, x, y, right + 1);
    };
    Board.prototype.CheckCrossRight = function (left, x, y, right) {
        var list = new Array();
        //left
        for (var i = 1; i <= left; i++) {
            var data = {};
            data.xc = x + 1 * i;
            data.yc = y + 1 * i;
            if (!(data.xc < 0 || data.yc < 0 || data.xc >= this.sizeX || data.yc >= this.sizeY))
                list.push(data);
        }
        //right
        for (var i = 1; i <= right; i++) {
            var data = {};
            data.xc = x - 1 * i;
            data.yc = y - 1 * i;
            if (!(data.xc < 0 || data.yc < 0 || data.xc >= this.sizeX || data.yc >= this.sizeY))
                list.push(data);
        }
        var tt = true;
        if (list.length == left + right) {
            for (var i = 0; i < list.length; i++) {
                tt = tt && (this.gameTable[list[i].xc][list[i].yc] == this.gameTable[x][y]);
            }
            if (tt)
                return true;
        }
        if (left <= 0)
            return false;
        return this.CheckCrossRight(left - 1, x, y, right + 1);
    };
    Board.prototype.SetCell = function (x, y) {
        if (this.playable) {
            var a = document.getElementById("c" + x + "-" + y);
            if (this.gameTable[x][y] == 0) {
                if (this.isFirstPlayer) {
                    this.gameTable[x][y] = 1;
                    a.innerHTML = "X";
                    a.style.color = "red";
                    this.isFirstPlayer = false;
                }
                else {
                    this.gameTable[x][y] = 2;
                    a.innerHTML = "O";
                    a.style.color = "blue";
                    this.isFirstPlayer = true;
                }
                this.reset();
            }
            if (this.deathzones.length > 0) {
                this.deathzonescounter--;
                if (this.deathzonescounter <= 0) {
                    shuffle(this.deathzones);
                    this.gameTable[this.deathzones[0].xc][this.deathzones[0].yc] = 0;
                    var td = document.getElementById("c" + this.deathzones[0].xc + "-" + this.deathzones[0].yc);
                    td.removeAttribute("style");
                    this.deathzones.shift();
                    this.deathzonescounter = 3;
                }
            }
            this.CheckWin(x, y);
        }
        function shuffle(a) {
            var j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
            return a;
        }
    };
    Board.prototype.buildTable = function (data, width, height) {
        var _this = this;
        var table = document.createElement("table");
        table.className = "gridtable";
        var tbody = document.createElement("tbody");
        var _loop_1 = function (i) {
            tr = document.createElement("tr");
            var _loop_2 = function (j) {
                td = document.createElement("td");
                if (this_1.gameTable[i][j] == -1) {
                    td.setAttribute("style", "background:black;");
                }
                td.className = "cell";
                td.id = "c" + i + "-" + j;
                td.addEventListener("click", function (e) { return _this.SetCell(i, j); });
                tr.appendChild(td);
            };
            for (var j = 0; j < width; j++) {
                _loop_2(j);
            }
            tbody.appendChild(tr);
        };
        var this_1 = this, tr, td;
        for (var i = 0; i < height; i++) {
            _loop_1(i);
        }
        table.appendChild(tbody);
        return table;
    };
    Board.prototype.start = function () {
        var _this = this;
        clearInterval(this.intervalId);
        this.intervalId = 0;
        this.intervalId = setInterval(function () {
            _this.counter = _this.counter - 1;
            var timerhtml = document.getElementById("timer");
            var test = (_this.isFirstPlayer) ? " Player1" : " Player2";
            timerhtml.innerHTML = Math.floor(_this.counter / 10) + ":" + _this.counter % 10 + test; //+" " + (this.isFirstPlayer)?"Player2":"Player1";
            if (_this.counter <= 0) {
                clearInterval(_this.intervalId);
                if (_this.isFirstPlayer)
                    _this.isFirstPlayer = false;
                else
                    _this.isFirstPlayer = true;
                _this.reset();
            }
        }, 100);
    };
    Board.prototype.reset = function () {
        clearInterval(this.intervalId);
        this.counter = this.time;
        this.start();
    };
    return Board;
}());
var Timer = /** @class */ (function () {
    function Timer() {
    }
    return Timer;
}());
window.onload = function () {
    new Board();
};
