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


  generado=false;
  contenidoArchivo="";
  listaLlaves:[string,number][] = [];
  listaPesos: number[]=[];
  tablaA: number[][]=[];
  tablaR: string[][]=[];
  suma: number=0;

  public crearListaLlaves(){
    this.generado=true;
    var nombreLlaves: string[] = (<HTMLInputElement>document.getElementById("nombreLlaves")).value.trim().split(",");
    var pesoLlavesString: string[] = (<HTMLInputElement>document.getElementById("pesoLlaves")).value.trim().split(",");
    pesoLlavesString.forEach((x)=>{this.listaPesos.push(+x)});
    this.listaPesos.forEach((x)=>{this.suma+=x});
    if ( nombreLlaves.length === pesoLlavesString.length){
      for (let i = 0; i < nombreLlaves.length; i++) {
       this.listaLlaves.push([nombreLlaves[i],this.listaPesos[i]/this.suma]);

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

    for(let i=1; i<=this.listaLlaves.length+1;i++){
      var i2=0;
      for(let j = i+1; j<=this.listaLlaves.length;j++){
        var probAso=this.probAsoc(i2,j-1);
        var ki=this.getK(i2+1,j);
        var kval:[number,number][]=[];
        for(let w=0;w<ki.length;w++){
          kval.push([w,Math.round(((this.tablaA[i2][ki[w]-1]+this.tablaA[ki[w]][j]+probAso)+Number.EPSILON)*10000)/10000]);
        }
        var minimo = this.minK(kval);
        this.tablaA[i2][j]=minimo[1];
        this.tablaR[i2][j]=this.listaLlaves[ki[minimo[0]]-1][0];
        i2++;
      }
    }

    this.dibujarTablas();


  }

  private dibujarTablas(){
    var contenidoA:string="";
    var contenidoR:string="";
    contenidoA=`<tr><th> A </th><th> - </th>`;
    for (let i = 0; i <this.listaLlaves.length; i++) {
      contenidoA+= `<th>${this.listaLlaves[i][0]}</th>`;
    }
    contenidoA+=`</tr>`;

    for (let i = 0; i <=this.listaLlaves.length; i++) {
      if (i<this.listaLlaves.length){
        contenidoA+=`<tr><th>${this.listaLlaves[i][0]}</th>`;
      }else{
        contenidoA+=`<tr><th> - </th>`;
      }
      for (let j = 0; j <=this.listaLlaves.length; j++) {
        contenidoA+=`<td>${this.tablaA[i][j]}</td>`;
      }
      contenidoA+=`</tr>`;
    }

    contenidoR=`<tr><th> R </th><th> - </th>`;
    for (let i = 0; i <this.listaLlaves.length; i++) {
      contenidoR+= `<th>${this.listaLlaves[i][0]}</th>`;
    }
    contenidoR+=`</tr>`;

    for (let i = 0; i <=this.listaLlaves.length; i++) {
      if (i<this.listaLlaves.length){
        contenidoR+=`<tr><th>${this.listaLlaves[i][0]}</th>`;
      }else{
        contenidoR+=`<tr><th> - </th>`;
      }
      for (let j = 0; j <=this.listaLlaves.length; j++) {
        contenidoR+=`<td>${this.tablaR[i][j]}</td>`;
      }
      contenidoR+=`</tr>`;
    }

    document.getElementById("TablaA").innerHTML+= contenidoA;
    document.getElementById("TablaR").innerHTML+= contenidoR;

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

  public reiniciar(){
    this.generado=false;
    this.contenidoArchivo="";
    this.listaLlaves=[];
    this.listaPesos=[];
    this.tablaA=[];
    this.tablaR=[];
    this.suma=0;
    (<HTMLInputElement>document.getElementById("file-selector")).value='';
    document.getElementById("TablaA").innerHTML= "";
    document.getElementById("TablaR").innerHTML= "";
  }

  // Lee el archivo especificado por el usuario
  // para completar la tabla de entrada del usuario
  public lectorArchivos(event:Event){
        
    var file = (<HTMLInputElement>event.target).files[0];

    var reader = new FileReader();

    reader.onload= () => {
      this.contenidoArchivo = reader.result as string;
    }

    reader.readAsText(file);

  }

  public cargarArchivo(){
    var linea:string[]= this.contenidoArchivo.split("\n");
    (<HTMLInputElement>document.getElementById("nombreLlaves")).value=linea[0];
    (<HTMLInputElement>document.getElementById("pesoLlaves")).value=linea[1];
  }

  public crearArchivo(){
    var contenido = "";
    contenido += (<HTMLInputElement>document.getElementById("nombreLlaves")).value;
    contenido+="\n";
    contenido += (<HTMLInputElement>document.getElementById("pesoLlaves")).value;

    var elemento = document.createElement('a');
    elemento.setAttribute('href',`data:text/plain;charset=utf-8,${contenido}`);
    elemento.setAttribute('download', "Datos_arbol_binario");

    elemento.dispatchEvent(new MouseEvent("click"));
  }


}
