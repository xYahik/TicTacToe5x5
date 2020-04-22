
class Cell{
        xc:number;
        yc:number;
    }
class Board{

    sizeX: number;
    sizeY: number;
    gameTable: number[][];
    isFirstPlayer: boolean = true;
    checkrule:number = 3;
    deathZoneCount:number = 0;
    playable:boolean = false;

    constructor() {
        let button = document.getElementById("makeboard");
        
        button.addEventListener("click", (e:Event) => this.createBoard());
    }
    createBoard(){
        let width = parseInt((<HTMLInputElement>document.getElementById("width")).value);
        let height = parseInt((<HTMLInputElement>document.getElementById("height")).value);
        let checkrule = parseInt((<HTMLInputElement>document.getElementById("checkrule")).value);
        let deathZoneCount = parseInt((<HTMLInputElement>document.getElementById("deathzone")).value);
        this.sizeX = width;
        this.sizeY = height;
        this.checkrule = checkrule;
        this.gameTable = [];
        this.playable = true;
        this.deathZoneCount = deathZoneCount;
        for(var i =0; i<height;i++){
            this.gameTable[i] = [];


            for(var j =0;j<width;j++){


                this.gameTable[i][j] = 0;
            }

        }
        for(let i:number = 0;i<this.deathZoneCount;i++){
            this.gameTable[this.getRandomInt(0,this.sizeX-1)][this.getRandomInt(0,this.sizeX-1)] = -1;
        }
        document.getElementById("content").innerHTML = '';
        document.getElementById("content").appendChild( this.buildTable(this.gameTable,this.sizeX,this.sizeY));
        
    }
    getRandomInt(min:number, max:number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }
    CheckTableIsFull(){
        let tmp:boolean = true;
        for(var i =0; i<this.sizeY;i++){


            for(var j =0;j<this.sizeX;j++){

                console.log(i+" "+j+" "+this.gameTable[i][j])
                if(this.gameTable[i][j] == 0)
                tmp = false;
            }

        }
        return tmp;
    }
    CheckWin(x:number,y:number){
        let tmp:boolean = this.CheckTableIsFull();
        console.log(tmp);
        if(this.CheckVertical(this.checkrule-1,x,y,0) ||
        this.CheckHorizontal(this.checkrule-1,x,y,0) ||
        this.CheckCrossLeft(this.checkrule-1,x,y,0) ||
        this.CheckCrossRight(this.checkrule-1,x,y,0) || tmp){
            
            this.playable = false;
            var winner = document.createElement("h3");
            if(tmp)
                winner.innerHTML = "Remis";
            else
                winner.innerHTML = (this.isFirstPlayer)?"Winner: Player2":"Winner: Player1";
                
            document.getElementById("winner").appendChild(winner);
            var resetb = document.createElement("button");
            resetb.innerText = "Reset"
            resetb.addEventListener("click", (e:Event) => this.ResetSettings(this.sizeX,this.sizeY,this.checkrule));
            document.getElementById("winner").appendChild(resetb);
        }
    }
    ResetSettings(width:number,height:number,checkrule:number){
        this.isFirstPlayer = true;
        document.getElementById("winner").innerHTML ='';
        var content = document.getElementById("content")
        content.innerHTML = `Wysokosc:<input id="height"  type="number" value="3" min="3" max="100"><br>
        Szerokosc:<input id="width"  type="number" value="3" min="3" max="100"><br>
        Marks to Win:<input id="checkrule" type="number" value="3" min="2" max="6"><br>
        DeathZones:<input id="deathzone" type="number" value="0" min="0" max="10"> (Remember that game have to be winable)<br>
            `;
        var button = document.createElement("button");
        button.innerText = "CreateBoard"
        button.id = "makeboard";
        button.addEventListener("click", (e:Event) => this.createBoard());
        content.appendChild(button)

    }
    CheckVertical(left:number,x:number,y:number,right:number){
        let list:Cell[]= new Array();

        //left
        
        for(var i = 1;i<=left;i++){
            let data =  {} as Cell;
            data.xc = x-1*i;
            data.yc = y;
            if(!(data.xc <0 || data.yc <0 || data.xc >= this.sizeX || data.yc >= this.sizeY))
                list.push(data);
        }
        //right
        for(var i = 1;i<=right;i++){
            let data =  {} as Cell;
            data.xc = x+1*i;
            data.yc = y;

            if(!(data.xc <0 || data.yc <0 || data.xc >= this.sizeX || data.yc >= this.sizeY))
                list.push(data);
        }
        let tt:boolean =true;
        if(list.length == left+right){
            for(var i =0;i<list.length;i++){

                tt = tt && (this.gameTable[list[i].xc][list[i].yc] == this.gameTable[x][y]);

            }
        
        if(tt)
            return true;
        }
        if(left<=0)
            return false;
        
        return this.CheckVertical(left -1,x,y,right+1);

    }
    CheckHorizontal(left:number,x:number,y:number,right:number){
        let list:Cell[]= new Array();
        //left
        for(var i = 1;i<=left;i++){
            let data =  {} as Cell;
            data.xc = x;
            data.yc = y-1*i;
            if(!(data.xc <0 || data.yc <0 || (data.xc >= this.sizeX && data.yc >= this.sizeY)))
            list.push(data);
        }
        //right
        for(var i = 1;i<=right;i++){
            let data =  {} as Cell;
            data.xc = x;
            data.yc = y+1*i;
            if(!(data.xc <0 || data.yc <0 || (data.xc >= this.sizeX && data.yc >= this.sizeY)))
            list.push(data);
        }
        let tt:boolean =true;
        if(list.length == left+right){
            for(var i =0;i<list.length;i++){

                tt = tt && (this.gameTable[list[i].xc][list[i].yc] == this.gameTable[x][y]);

            }
        
        if(tt)
            return true;
        }
        if(left<=0)
            return false;

        return this.CheckHorizontal(left -1,x,y,right+1);

    }
    CheckCrossLeft(left:number,x:number,y:number,right:number){
        let list:Cell[]= new Array();
        //left
        for(var i = 1;i<=left;i++){
            let data =  {} as Cell;
            data.xc = x+1*i;
            data.yc = y-1*i;
            if(!(data.xc <0 || data.yc <0 || data.xc >= this.sizeX || data.yc >= this.sizeY))
            list.push(data);
        }
        //right
        for(var i = 1;i<=right;i++){
            let data =  {} as Cell;
            data.xc = x-1*i;
            data.yc = y+1*i;
            if(!(data.xc <0 || data.yc <0 || data.xc >= this.sizeX || data.yc >= this.sizeY))
            list.push(data);
        }
        let tt:boolean =true;
        if(list.length == left+right){
            for(var i =0;i<list.length;i++){

                tt = tt && (this.gameTable[list[i].xc][list[i].yc] == this.gameTable[x][y]);

            }
        
        if(tt)
            return true;
        }
        if(left<=0)
            return false;

        return this.CheckCrossLeft(left -1,x,y,right+1);

    }
    CheckCrossRight(left:number,x:number,y:number,right:number){
        let list:Cell[]= new Array();
        //left
        for(var i = 1;i<=left;i++){
            let data =  {} as Cell;
            data.xc = x+1*i;
            data.yc = y+1*i;
            if(!(data.xc <0 || data.yc <0 || data.xc >= this.sizeX || data.yc >= this.sizeY))
            list.push(data);
        }
        //right
        for(var i = 1;i<=right;i++){
            let data =  {} as Cell;
            data.xc = x-1*i;
            data.yc = y-1*i;
            if(!(data.xc <0 || data.yc <0 || data.xc >= this.sizeX || data.yc >= this.sizeY))
            list.push(data);
        }
        let tt:boolean =true;
        if(list.length == left+right){
            for(var i =0;i<list.length;i++){

                tt = tt && (this.gameTable[list[i].xc][list[i].yc] == this.gameTable[x][y]);

            }
        
        if(tt)
            return true;
        }
        if(left<=0)
            return false;

        return this.CheckCrossRight(left -1,x,y,right+1);

    }
    SetCell(x:number,y:number){
        if(this.playable){
        let a = document.getElementById("c"+x+"-"+y);
        if(this.gameTable[x][y] == 0){
            if(this.isFirstPlayer){
                this.gameTable[x][y] = 1;
                a.innerHTML="X";
                a.style.color = "red";
                this.isFirstPlayer = false;
            }else{
                this.gameTable[x][y] = 2;
                a.innerHTML="O";
                
                a.style.color = "blue";
                this.isFirstPlayer = true;
            }
        }
        
        this.CheckWin(x,y);
    }
    }
    buildTable(data,width:number,height:number) {
        var table = document.createElement("table");
        table.className="gridtable";
        var tbody = document.createElement("tbody");
        for(let i:number = 0; i<height;i++){
            var tr = document.createElement("tr");
            for(let j:number = 0;j<width;j++){
                var td = document.createElement("td");
                if(this.gameTable[i][j] == -1){
                    td.setAttribute("style", "background:black;");
                }
                td.className = "cell";
                td.id = "c"+i+"-"+j;
                td.addEventListener("click", (e:Event) => this.SetCell(i,j));
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);             
        return table;
    }
}

  
  
 window.onload=function() {
    new Board();
 }