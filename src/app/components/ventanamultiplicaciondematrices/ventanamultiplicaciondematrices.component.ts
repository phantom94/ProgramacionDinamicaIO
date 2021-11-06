import { Component, OnInit } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-ventanamultiplicaciondematrices',
  templateUrl: './ventanamultiplicaciondematrices.component.html',
  styleUrls: ['./ventanamultiplicaciondematrices.component.css']
})
export class VentanamultiplicaciondematricesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  // A1 = (5 x 2)
  // A2 = (2 x 3)
  // A3 = (3 x 4)
  // A4 = (4 x 6)
  // A5 = (6 x 7)
  // A6 = (7 x 8)

tamMochila = 0;
cantObjetos = 0;
listaObjetos = [];
listaNodos = [];
listaPesosRutas = [];
listaPesos = [];
listaValores = [];
listaCantidad = [];
listaResultado = [];
res = 0;
cond = true;
tabla = [];
color = [];
tamañoTablaGlobal=0;
//
plazoproyecto=0;
vidautilequipo=0;
listavidautil= [];
costoinicial=0;
resultadoBusqueda=0;
resultadosGanteriores=[];
resultadoG=0;
listaComparacion=[];
resultadoComparacion=0;
MasPequeñoVar=0;
listaprueba=[];
//listaprueba=[["A1",5,2],["A2",2,3],["A3",3,4],["A4",4,6],["A5",6,7],["A6",7,8]];
bandera=0;
//
ListaNombreMatriz=[];
ListaDimension1=[];
ListaDimension2=[];
CantidadMatrices=0;


/////////////////////////////////////////////////////////////////////////7


public construirMatriz() {
  console.log("inicia aqui");
  var lista=this.listaprueba;
  console.log(lista);
  var cont=0;
  var listaRes=[];
  for(var x=0;x<lista.length;x++){
    var temp=[];
    for(var y=0;y<lista.length;y++){
      if(cont==y){
        temp.push("0");
      }
      if(cont!=y){
        temp.push("x");
      }
      
    }
    listaRes.push(temp);
    cont++;

  }
  console.log("matriz");
  console.log(listaRes);
  this.multiplicaciones(listaRes);
}

public multiplicaciones(lista){
  console.log(lista);
  var cont=1;
  var listaRes=[];
  for(var x=0;x<lista.length;x++){
    var temp=[];
    for(var y=0;y<lista.length;y++){
      if(cont==y){
        lista[x][y]=parseInt(this.listaprueba[cont-1][1])*parseInt(this.listaprueba[cont-1][2])*parseInt(this.listaprueba[cont][2]);
      }
    }
    cont++;
  }
  console.log("matriz dos");
  console.log(lista);
  //this.desarrollo(lista);
  this.resultadoMatriz(lista);
}

public desarrollo(lista){
  console.log("entra a desarrollo");
  console.log(lista);
  var cont=2;
  var cont2=2;
  for(var i=0;i<lista.length;i++){
    console.log("lista global");
    console.log(lista);
    var tempN=[];

    if(cont==lista[0].length+1){
      cont=cont2;
      i=0;
      cont2++;
    }
    if(cont<lista[0].length){
      if(cont+1<lista[0].length+1){
        var pos1=parseInt(lista[i][cont-2]);
      var pos2=parseInt(lista[i+1][cont]);
      var multi=parseInt(this.listaprueba[cont-2][1])*parseInt(this.listaprueba[cont+1][1])*parseInt(this.listaprueba[cont-1][1]);
      tempN.push(pos1+pos2+multi);

      var pos3=parseInt(lista[i][cont-1]);
      var pos4=parseInt(lista[i+2][cont]);

      var multi2=parseInt(this.listaprueba[cont-2][1])*parseInt(this.listaprueba[cont+1][1])*parseInt(this.listaprueba[cont-1][2]);
  
      tempN.push(pos3+pos4+multi2);
      this.MasPequeño(tempN)
      lista[i][cont]=this.MasPequeñoVar;
      }
    }
    cont++;
    console.log("lista");
    console.log(lista[i]);
    
  }
  
}

public MasPequeño(lista){
    this.MasPequeñoVar=parseFloat(Math.min.apply(null, lista));
}

public resultadoMatriz(matriz){
  var e = "<table border='1' style='width:100%'>"; 
  for (var i=0; i<matriz.length+1; i++){//titulos
    if(i==0){
      e += "<th bgcolor='white'> </th>";
    }
    if(i!=0){
      e += "<th bgcolor='gray'> " + i + "</th>";
    }
    
  }
  e += "<tr>";
  for (var j=0; j<=matriz.length-1; j++){
    e += "<tr>";
    for (var i=0; i<=matriz.length; i++){
       if(i==0){
        var numero=j+1;
        e += "<th bgcolor='gray'> " + numero + "</th>";
       }
       if(i!=0){
        var posMat=matriz[j][i-1];
        e += "<th bgcolor='white'> " + posMat + "</th>";
      }
       
    }
    e += "<tr>"
  }
  e += "</table>";
  // e += "<br>";
  // e += "<br>";
  // e+=e;
  document.getElementById("Soluc").innerHTML = e;
}

/////////////////////////////////////////////////////////////////////////7
public mochila() {
  if(this.listaObjetos.length != 0){
    this.cantObjetos = this.listaObjetos.length;
  this.listaResultado = Array(this.cantObjetos).fill(0);
  this.tabla = Array(this.cantObjetos+1).fill(null).map(() => Array(this.tamMochila+1).fill(0));
  this.color = Array(this.cantObjetos+1).fill(null).map(() => Array(this.tamMochila+1).fill(0));
	for(var i = 1; i <= this.cantObjetos; i ++){
    	for(var j = 1; j <= this.tamMochila; j++){
        this.tabla[i][j] = this.tabla[i-1][j];
        if(this.listaCantidad[i-1] == 1){
          for(var k = 1; k <= this.listaCantidad[i-1]; k++){
            if(k * this.listaPesos[i-1] > j) {
                    break;
               }
              var v = this.tabla[i-1][j - k * this.listaPesos[i-1]] + k * this.listaValores[i-1];
              if(v > this.tabla[i][j]){
              this.color[i][j] = 1;
              this.tabla[i][j] = v;
              }
          }
        }else{
        	for(var k = 1; k < this.listaCantidad[i-1]; k++){
            	if(k * this.listaPesos[i-1] > j) {
                    	break;
                 }
                var v = this.tabla[i-1][j - k * this.listaPesos[i-1]] + k * this.listaValores[i-1];
                if(v > this.tabla[i][j]){
					      this.color[i][j] = 1;
                this.tabla[i][j] = v;
                }
            }
          }
        }
    }
    for(var i=0; i<=this.tamMochila; i++){
      this.tabla[0][i] = i;
      this.color[0][i] = 2;
    }
    this.resultado();
  }else{
    alert("No tiene datos agregados");
  }
}


//Cantidad de Matrices Agregadas: </a> <input id="spinCantidad" 
  //       <dt class="font">Nombre Matriz: <input type="text" id="nObjeto" 
  //       <dt class="font">Dimension 1 de Matriz: <input type="number" id="pObjeto" 
  //       <dt class="font">Dimension 2 de Matriz: <input type="number" id="vObjeto"
  //       <dt class="font"><button (click)="setValores()" class="myButton">Agregar Matriz</button></dt>
  //       <br>
  //       <dt class="font"><a>Cargar Archivo:</a><input type="file" id="file-selector" (change)="cargar()" class="css-input"></dt>

public setValores(){
  var NombreMatriz = (<HTMLInputElement>document.getElementById("NombreMatriz")).value;
  var DimensionUno = parseInt((<HTMLInputElement>document.getElementById("DimensionUno")).value);
  var DimensionDos = parseInt((<HTMLInputElement>document.getElementById("DimensionDos")).value);
  if(NombreMatriz == "" || DimensionUno == 0 || DimensionDos == 0){
    alert("Espacios vacíos");
  }else{
    console.log(NombreMatriz);
    this.ListaNombreMatriz.push(NombreMatriz);
    this.ListaDimension1.push(DimensionUno);
    this.ListaDimension2.push(DimensionDos);
    this.CantidadMatrices=this.ListaNombreMatriz.length;

    (document.getElementById("NombreMatriz")as HTMLInputElement).value = "";
    (document.getElementById("DimensionUno")as HTMLInputElement).value = (0).toString();
    (document.getElementById("DimensionDos")as HTMLInputElement).value = (0).toString();
  }
  
}

public CrearArchivo(){
    var contenido=`${this.CantidadMatrices}\n`;
    var listaStr="";
    for(var i=0;i<this.CantidadMatrices;i++){
      if(i+1==this.CantidadMatrices){
        //listaStr+=`${+ this.ListaNombreMatriz[i]}`;
        listaStr+=`${ this.ListaNombreMatriz[i]}`;
      }else{
        //listaStr+=`${+ this.ListaNombreMatriz[i]} `;
        listaStr+=`${ this.ListaNombreMatriz[i]}    `;
      }
    }
    console.log("Prueba:" + listaStr);
    contenido+=listaStr;
    var elemento = document.createElement('a');
    elemento.setAttribute('href',`data:text/plain;charset=utf-8,${contenido}`);
    elemento.setAttribute('download', "Datos_Equipos");
    elemento.dispatchEvent(new MouseEvent("click"));
  
}

public resultado(){
  this.tamMochila = parseInt((<HTMLInputElement>document.getElementById("spinCantidad")).value);
  if(this.tamMochila != 0){
    var e = "<table border='1' style='width:100%'>";   
    e += "<tr><th> Capacidad </th>";
    for (var i=0; i<this.listaObjetos.length; i++){
      e += "<th bgcolor='gray'> " + this.listaObjetos[i] + "</th>";
    }
    e += "<tr>";
    for (var j=0; j<=this.tamMochila; j++){
      e += "<tr>";
      for (var i=0; i<=this.listaObjetos.length; i++){
        if(this.color[i][j] == 1){
          e += "<th bgcolor='green'>" + this.tabla[i][j] + "</th>";
        }else if(this.color[i][j] == 0){
          e += "<th bgcolor='red'> " + this.tabla[i][j] + "</th>";
        }else{
          e += "<th bgcolor='white'> " + this.tabla[i][j] + "</th>";
        }
      }
      e += "<tr>"
    }
    e += "</table>";
    document.getElementById("Result").innerHTML = e;

    this.solucion();

    e = "";
    var e2 = "";
    var e3 = "";
    e += "<h1> Solución </h1><br><dl><a>Maximizar:</a><br><li>Z = ";
    e2 += "<dl><a>Sujeto a:</a><br><li>";
    e3 += "<a>Solución Óptima</a><br><dl><li>Z = " + this.res + "</li></dl>";
    for(var i=0;i<this.listaObjetos.length;i++){
      if(i == this.listaObjetos.length-1){
        e += this.listaValores[i] + "X" + (i+1);
        e2 += this.listaPesos[i] + "X" + (i+1) + " <= " + this.tamMochila;
      }else{
        e += this.listaValores[i] + "X" + (i+1) + " + ";
        e2 += this.listaPesos[i] + "X" + (i+1) + " + ";
      }
      e3 += "<dl><li>X" + (i+1) + " = " + this.listaResultado[i] + "</li></dl>";
    }
    e += "</li></dl>";
    e2 += "</li><li>Xi >= 0</li></dl>";
    e += e2 + e3;
    document.getElementById("Soluc").innerHTML = e;
  }else{
    alert("No tiene datos agregados");
  }
  
}

public solucion(){
  if(this.listaCantidad[0] != 1){
    for(var j=this.tamMochila; j>=0; j--){
      var max=0;
      var posicion=0;
      for(var i=1; i<=this.cantObjetos; i++){
        if(max < this.tabla[i][j] && this.color[i][j] == 1){
          max = this.tabla[i][j];
          posicion = i;
        }
      }
      if(j == this.tamMochila){
        this.res = max;
      }
      this.listaResultado[posicion-1] = this.listaResultado[posicion-1] + 1;
      j = j-this.listaPesos[posicion-1]+1
    }
  }else{
    for(var j=this.tamMochila; j>=0; j--){
      var max=0;
      var posicion=0;
      for(var i=1; i<=this.cantObjetos; i++){
        if(max < this.tabla[i][j] && this.color[i][j] == 1 && this.listaResultado[i-1] == 0){
          max = this.tabla[i][j];
          posicion = i;
        }
      }
      if(j == this.tamMochila){
        this.res = max;
      }
      this.listaResultado[posicion-1] = this.listaResultado[posicion-1] + 1;
      j = j-this.listaPesos[posicion-1]+1
    }
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
public cargar(){
  document.getElementById("output").style.display = "none";
  document.getElementById('file-selector').addEventListener('change', function() { 
			var fr=new FileReader(); 
			fr.onload=function(){
        document.getElementById('output').textContent = fr.result as string;
      }
      fr.readAsText((<HTMLInputElement>this).files[0]);
    });
    this.leer();
}

public leer(){
  this.limpiar2();
  var texto = document.getElementById('output').textContent;
  var listaTexto = texto.split(/\s+/g);
  var contador=0;
  var tamaño=parseInt(listaTexto[0]);
   var temp=[];
   for(var x=1;x<tamaño+1;x++){
     temp.push([listaTexto[x]]);
   }
   for(var y=tamaño+1;y<listaTexto.length-1;y++){
     if(contador!=tamaño){
       temp[contador].push(listaTexto[y]);
       contador++;
     }
     if(contador==tamaño){
      contador=0;
    }

   }
   //console.log("luego");
   //console.log(temp);
   this.listaprueba=temp;
}


public comparacionNumeros(lista){
  this.resultadoComparacion=parseInt(Math.min.apply(null, lista));
}

public buscarGLista(numero){
  this.resultadoG=parseInt(this.resultadosGanteriores[numero]);
}

public buscarvidautil(){
  var e = "";
  console.log(this.vidautilequipo);
  for(var x=1;x<this.vidautilequipo+1;x++){
    this.buscarEnLista(x);
    e += "</li> "+x+" año = "+this.resultadoBusqueda+"</li><h1></h1>"
  }
  document.getElementById("Soluc").innerHTML = e;
}

public buscarEnLista(numero){
  var temp=0;
   for(var x=1;x<this.listavidautil.length;x++){
     if(x<numero){
      temp+=parseInt(this.listavidautil[x][1]);
     } 
     if(x==numero){
      temp+=parseInt(this.listavidautil[x][1])-parseInt(this.listavidautil[x][2]);
     } 
  }
  temp+=this.costoinicial;
  console.log(temp);
  this.resultadoBusqueda=temp;
}
  
//////////////////////////////////////////////////////////////////////////////////////////////////////

public verificar(){
  if(document.getElementById('output').textContent != ""){
    this.leer();
  }
}

public inicio(){
  if(this.cond){
    this.cargar();
    this.cond = false;
  }
}

public limpiar(){
  this.cantObjetos = 0;
  this.res = 0;
  this.listaObjetos = [];
  this.listaPesos = [];
  this.listaValores = [];
  this.listaCantidad = [];
  this.listaResultado = [];
  this.tabla = [];
  this.color = [];
  this.tamMochila = 0;
  this.listaNodos = [];
  this.listaPesosRutas = [];
  this.cond = true;
  this.tabla = [];
  this.color = [];
  this.tamañoTablaGlobal=0;
  this.plazoproyecto=0;
  this.vidautilequipo=0;
  this.listavidautil= [];
  this.costoinicial=0;
  this.resultadoBusqueda=0;
  this.resultadoG=0;
  this.listaComparacion=[]; 
  this.resultadoComparacion=0;
  this.MasPequeñoVar=0;
  this.listaprueba=[];
  //listaprueba=[["A1",5,2],["A2",2,3],["A3",3,4],["A4",4,6],["A5",6,7],["A6",7,8]];
  this.bandera=0;
  document.getElementById("Result").innerHTML = "";
  document.getElementById("Soluc").innerHTML = "";
  (document.getElementById('file-selector')as HTMLInputElement).value = "";
  document.getElementById('output').textContent = "";
}

public limpiar2(){
  this.cantObjetos = 0;
  this.res = 0;
  this.listaObjetos = [];
  this.listaPesos = [];
  this.listaValores = [];
  this.listaCantidad = [];
  this.listaResultado = [];
  this.tabla = [];
  this.color = [];
  this.tamMochila = 0;
  this.listaNodos = [];
  this.listaPesosRutas = [];
  this.cond = true;
  this.tabla = [];
  this.color = [];
  this.tamañoTablaGlobal=0;
  this.plazoproyecto=0;
  this.vidautilequipo=0;
  this.listavidautil= [];
  this.costoinicial=0;
  this.resultadoBusqueda=0;
  this.resultadoG=0;
  this.listaComparacion=[]; 
  this.resultadoComparacion=0;
  this.MasPequeñoVar=0;
  this.listaprueba=[];
  this.bandera=0;

}

}
function CreateObject(arg0: string) {
  throw new Error('Function not implemented.');
}

