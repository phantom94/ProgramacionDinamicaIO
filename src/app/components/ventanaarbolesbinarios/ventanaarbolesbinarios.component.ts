import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ventanaarbolesbinarios',
  templateUrl: './ventanaarbolesbinarios.component.html',
  styleUrls: ['./ventanaarbolesbinarios.component.css']
})
export class VentanaarbolesbinariosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  iniciado=false;
  listaLlaves:[string,number][] = [];
  listaPesos: number[]=[];
  tablaA: number[][]=[];
  tablaR: string[][]=[];
  suma: number;

  public crearListaLlavez(){
    var nombreLlaves: string[] = (<HTMLInputElement>document.getElementById("nombreLlaves")).value.trim().split(",");
    var pesoLlavesString: string[] = (<HTMLInputElement>document.getElementById("pesoLlaves")).value.trim().split(",");
    pesoLlavesString.forEach((x)=>{this.listaPesos.push(+x)});
    this.listaPesos.forEach((x)=>{this.suma+=x});
    if ( nombreLlaves.length === pesoLlavesString.length){
      for (let i = 0; i < nombreLlaves.length; i++) {
       // this.listaLlaves.push([nombreLlaves[i],this.listaPesos[i]/this.suma]);
       this.listaLlaves.push([nombreLlaves[i],this.listaPesos[i]]);

      }
      this.listaLlaves.sort((a,b)=>{ return (a[0].localeCompare(b[0]))});

      this.crearTablaA();

    }else{
      alert("Debe haber la misma cantidad de llaves y pesos...");
    }
  }

  public crearTablaA(){
    //Se inicializa la tabla
    for(let i=0;i<=this.listaLlaves.length;i++){
      this.tablaA.push([]);
      this.tablaR.push([]);
      for(let j=0;j<=this.listaLlaves.length;j++){
        if(i+1===j){
          this.tablaA[i].push(this.listaLlaves[i][1]);
          this.tablaR[i].push(this.listaLlaves[i][0]);
        }else{
          this.tablaA[i].push(0);
          this.tablaR[i].push("0");
        }
      }
    }

    //console.log(this.listaLlaves);
    for(let i=1; i<=this.listaLlaves.length+1;i++){
      var i2=0;
      for(let j = i+1; j<=this.listaLlaves.length;j++){
        console.log(i,i2,j);
        var probAso=this.probAsoc(i2,j-1);
        //console.log(probAso);
        var ki=this.getK(i2+1,j);
        console.log(`ki: ${ki}`);
        var kval:[number,number][]=[];
        for(let w=0;w<ki.length;w++){
          kval.push([w,Math.round(((this.tablaA[i2][ki[w]-1]+this.tablaA[ki[w]][j]+probAso)+Number.EPSILON)*10000)/10000]);
        }
        console.log(kval);
        var minimo = this.minK(kval);
        console.log(`minimo: ${minimo}`);
        this.tablaA[i2][j]=minimo[1];
        //console.log(ki[minimo[0]]);
        this.tablaR[i2][j]=this.listaLlaves[ki[minimo[0]]-1][0];
        i2++;
      }
    }

    /* for(let i=1;i<=this.listaLlaves.length+1;i++){
      for(let j=i+1;j<=this.listaLlaves.length;j++){
        console.log(i,j);
        var probAso=this.probAsoc(i-1,j-1);
        var ki:number = this.tablaA[i-1][i-1]+this.tablaA[i+1][j]+probAso;
        var kj:number = this.tablaA[i-1][j-1]+this.tablaA[j+1][j]+probAso;
        var minimo=this.minK([[i-1,ki],[j,kj]]);
        this.tablaA[i][j]=minimo[1];
        this.tablaR[i][j]=this.listaLlaves[minimo[0]][0];
        
      }
    } */
    
    console.log(this.tablaA);
    console.log(this.tablaR);


  }

  private minK(listaValores:[number,number][]){
    var menor = listaValores[0];
    for(let i=1;i<listaValores.length;i++){
      if(listaValores[i][1]<menor[1]){
        menor=listaValores[i];
      }
    }
    return menor;
  }

  private probAsoc(i:number,j:number){
    var sum=0;
    for(let x=i;x<=j;x++){
      sum+=this.listaLlaves[x][1];
    }
    return sum;
  }

  private getK(i,j){
    var l=[]
    for(let x=i;x<=j;x++){
      l.push(x);
    }
    return l;
  }

  public crearTablaR(){

  }



}
