import { Component, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-ventanarutasmascortas',
  templateUrl: './ventanarutasmascortas.component.html',
  styleUrls: ['./ventanarutasmascortas.component.css']
})
export class VentanarutasmascortasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



generado=false;
iniciado=false;
terminado=false;
numNodos=0;
tablaActual=0;
contenidoArchivo="";
listaNodos = [];
matrizPesos:number[][]=[];
matrizRutas:any[][]=[];
cambios:[number,number,number][]=[]

// Reinicia los valores de todas las variables globales.
public limpiar(){
  this.generado=false;
  this.iniciado=false;
  this.terminado=false;
  this.numNodos=0;
  this.tablaActual=0;
  this.contenidoArchivo="";
  this.listaNodos=[];
  this.matrizPesos=[];
  this.matrizRutas=[];
  this.cambios=[];
  document.getElementById("cuerpo").innerHTML=``;
  document.getElementById("cuerpoRutas").innerHTML= ``;
  (<HTMLInputElement>document.getElementById("file-selector")).value='';
}

//Crea la tabla inicial para que el usuario ingrese
// los datos de la tabla D(0)
public crearTablaInput(){
  var contenido= +(<HTMLInputElement>document.getElementById("contador")).value;
  if (0<contenido && contenido<11) {
    document.getElementById("cuerpo").innerHTML=``;
    var nombres:string=(<HTMLInputElement>document.getElementById("nombreNodos")).value;
    this.generado=true;
    var cuerpo = ``;
    var nombrenodos:string[];
    this.numNodos=contenido;
    if (nombres) {
      var listaNombre = (nombres.trim()).split(',');
      if(listaNombre.length>0 && listaNombre.length==contenido){
        nombrenodos=listaNombre;
      }else{
        alert("La cantidad de nombres no coincide con el número de nodos.");
        nombrenodos=["A","B","C","D","E","F","g","h","I","J"];
      }
    }else{
      nombrenodos=["A","B","C","D","E","F","G","H","I","J"];
    }
    this.listaNodos=nombrenodos;
    for (var i=0;i<contenido;i++){
      this.matrizPesos[i]=[];
      this.matrizRutas.push([]);
    }
    var nuevoContenido="<tr><th>tabla D(0)</th>";
    for (let i = 0; i < contenido; i++) {
      nuevoContenido+= `<th style="text-align: left;">${nombrenodos[i]}</th>`;
    }
    nuevoContenido+=`</tr>`;

    for (let i = 0; i < contenido; i++) {
      cuerpo+=`<tr><th>${nombrenodos[i]}</th>`
      for (let j = 0; j < contenido; j++) {
        if(i==j){
          cuerpo+=`<td><input size="10" type="text" value="0"></td>`;
        }else{
          cuerpo+=`<td><input size="10" type="text" value="-1"></td>`;
        }
        
      }
      cuerpo+=`</tr>`;
    }

    nuevoContenido+=cuerpo;

    document.getElementById("cuerpo").innerHTML+= nuevoContenido;
    
  }
}

// inicia el calculo de las rutas más cortas con los datos
// que fueron especificados por el usuario.
public iniciar(){

  this.getValues();

  document.getElementById("cuerpo").innerHTML=``;
  this.iniciado=true;
  this.dibujarTablaDi();
  this.dibujarTablaP();
}

// Obtiene los valores de la tabla input del usuario
public getValues(){
  var table = <HTMLTableElement>(document.getElementById("tablaInput"));
   for(var i= 1; i < table.rows.length; i++){
      var columnas = table.rows.item(i).cells;

      for(var j = 1; j < columnas.length; j++){
        var valor = parseInt((<HTMLInputElement>columnas.item(j).children[0]).value);
        if (valor == -1){
          this.matrizPesos[i-1][j-1]= Infinity;
        }else{
          this.matrizPesos[i-1][j-1]= valor;
        }
        this.matrizRutas[i-1][j-1]=0;
        
      }
   }
   
}

// Genera la nueva tabla D(k)
public generarTablaDi(){
  this.cambios=[];
  this.crearTablaDi();
  this.actualizarP();
  this.tablaActual++;
  this.dibujarTablaDi();
  this.dibujarTablaP();
  if(this.tablaActual==this.numNodos){
    this.terminado=true;
  }
}

// Dibuja en la interfaz la nueva tabla D(k)
public dibujarTablaDi(){
  var nuevoContenido=`<tr><th>Tabla D(${this.tablaActual})</th>`;
    for (let i = 1; i <= this.numNodos; i++) {
      nuevoContenido+= `<th style="width: 150px;text-align: center;">${this.listaNodos[i-1]}</th>`;
    }
    nuevoContenido+=`</tr>`;

    for (let i = 1; i < this.numNodos+1; i++) {
      nuevoContenido+=`<tr><th ">${this.listaNodos[i-1]}</th>`
      for (let j = 0; j < this.numNodos; j++) {
        var color=``;
        if(this.existe(this.cambios,i-1,j)){
          color=`color: black;font-weight: bolder;`;
        }
        var valor = this.matrizPesos[i-1][j]
        if(valor==Infinity){
          nuevoContenido+=`<td style="text-align: center;border:1px solid #fafafa;"><a style="${color}">${-1}</a></td>`; 
        }else{
          nuevoContenido+=`<td style="text-align: center;border:1px solid #fafafa;"><a style="${color}">${valor}</a></td>`; 
        }
      }
      nuevoContenido+=`</tr>`;
    }
    document.getElementById("cuerpo").innerHTML= nuevoContenido;
}

// Dibuja en la interfaz la nueva iteración de la tabla P(k)
public dibujarTablaP(){
  var nuevoContenido=`<tr><th>Tabla P(${this.tablaActual})</th>`;
    for (let i = 1; i <= this.numNodos; i++) {
      nuevoContenido+= `<th style="width: 150px;text-align: center;">${this.listaNodos[i-1]}</th>`;
    }
    nuevoContenido+=`</tr>`;

    for (let i = 1; i < this.numNodos+1; i++) {
      nuevoContenido+=`<tr><th>${this.listaNodos[i-1]}</th>`
      for (let j = 0; j < this.numNodos; j++) {
        var valor = this.matrizRutas[i-1][j]
        if(valor==Infinity){
          nuevoContenido+=`<td style="text-align: center;border:1px solid #fafafa;"><a>${0}</a></td>`; 
        }else{
          nuevoContenido+=`<td style="text-align: center;border:1px solid #fafafa;"><a>${valor}</a></td>`; 
        }
      }
      nuevoContenido+=`</tr>`;
    }
    document.getElementById("cuerpoRutas").innerHTML= nuevoContenido;
}


// Actualiza la tabla P(k) con los nuevos cambios generados por
// D(k)
public actualizarP(){
  
  this.cambios.forEach(element => {
    
    this.matrizRutas[element[0]][element[1]]=element[2];
    
  });

}

// Genera la nueva tabla D(k)
public crearTablaDi(){
  var nuevaMatriz:number[][]=[]
  this.cambios=[]
  for(var i=0; i<this.numNodos; i++){
    nuevaMatriz.push([]);
    for (let j = 0; j < this.numNodos; j++) {
      var min= Math.min(this.matrizPesos[i][j],(this.matrizPesos[i][this.tablaActual]+this.matrizPesos[this.tablaActual][j]))
      if(this.matrizPesos[i][j]!==min){
        this.cambios.push([i,j,this.tablaActual+1]);
      }
      nuevaMatriz[i][j]= min;
    }
  }
  this.matrizPesos=nuevaMatriz;
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

// Genera un archivo que guarda la representación de la 
// tabla creada por el usuario
public guardarTabla(){
  this.getValues();
  var contenido:string=((this.listaNodos.splice(0,this.numNodos)).join(" ")).concat("\n");
  for(var i=0;i<this.numNodos;i++){

    var valores=[];
    for(var j=0;j<this.numNodos;j++){

      valores.push(`${(this.matrizPesos[i][j])===Infinity ? -1 : this.matrizPesos[i][j]}`);

    }

    contenido+=(valores.join(" ")).concat("\n");
  }
  this.matrizPesos=[];
  this.matrizRutas=[];
  var elemento = document.createElement('a');
  elemento.setAttribute('href',`data:text/plain;charset=utf-8,${contenido}`);
  elemento.setAttribute('download', "Tabla D0");

  elemento.dispatchEvent(new MouseEvent("click"));
}

// Crea una tabla de entrada con los datos de un archivo subido por el usuario
public cargarArchivo(){
  document.getElementById("cuerpo").innerHTML= ``;
  var lineas = this.contenidoArchivo.split("\n");
  this.listaNodos=lineas[0].split(" ");
  this.numNodos=this.listaNodos.length;
  var contenidoMatriz=lineas.slice(1);
  this.matrizPesos=[];
  var cuerpo="";
  var nuevoContenido="<tr><th>tabla D(0)</th>";
    for (let i = 0; i < this.numNodos; i++) {
      nuevoContenido+= `<th style="text-align: left;">${this.listaNodos[i]}</th>`;
      this.matrizPesos.push([]);
      this.matrizRutas.push([]);
    }
    nuevoContenido+=`</tr>`;

    for (let i = 0; i < this.numNodos; i++) {
      cuerpo+=`<tr><th>${this.listaNodos[i]}</th>`;
      var valores=contenidoMatriz[i].split(" ");
      for (let j = 0; j < this.numNodos; j++) {

        cuerpo+=`<td><input size="10" type="text" value="${valores[j]}"></td>`;
        
      }
      cuerpo+=`</tr>`;
    }

    nuevoContenido+=cuerpo;

    document.getElementById("cuerpo").innerHTML+= nuevoContenido;

    this.generado=true;
}

// Calcula la ruta entre dos nodos especificados
// por el usuario
public calcularRuta(){
  var inicio=this.listaNodos.indexOf((<HTMLInputElement>document.getElementById("origen")).value);
  var destino=this.listaNodos.indexOf((<HTMLInputElement>document.getElementById("destino")).value);
  var array=[];
  document.getElementById("res").innerHTML=this.getRuta(array,inicio,destino,0).join(" --> ");

}

// Permite obtener todas las rutas entre dos nodos
private getRuta(array:number[],x:number,y:number,z:number): number[]{
  if(this.matrizRutas[x][y]==0){
    if(z==0){
      array.push(this.listaNodos[x]);
      array.push(this.listaNodos[y]); 
    }else{
      if(z==1){
        array.push(this.listaNodos[x]);
      }
      
    }
    return array;
  }else{
    var nuevoArray=this.getRuta(array,x,(this.matrizRutas[x][y])-1,1);
    return this.getRuta(nuevoArray,(this.matrizRutas[x][y])-1,y,0);
  }

}

private existe(array:number[][],x:number,y:number){
  for (let i = 0; i < array.length; i++) {
    if(array[i][0]===x && array[i][1]===y){
      return true;
    }
    
  }
  return false;
}

}