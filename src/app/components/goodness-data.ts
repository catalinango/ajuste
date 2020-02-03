declare interface LI {
  "x" :number;
  "y" : number;
  "y1" : number;
  "y2" : number;
  "y3" : number;
  "y4" : number;
}

export class GoodnessData {
  sy: number;
  sy1: number;
  sy3: number;
  sy4: number;
  sy5: number;
  rn: number;
  rd: number;
  r2: number;
  li: LI[];
  
  constructor() {
    this.sy = Number(0),
    this.sy1 = Number(0),
    this.sy3 = Number(0),
    this.sy4 = Number(0),
    this.sy5 = Number(0),
    this.rn = Number(0),
    this.rd = Number(0),
    this.r2 = Number(0),
    this.li = new Array<LI>()
  }
  
}
