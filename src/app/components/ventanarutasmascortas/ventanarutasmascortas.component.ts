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


public setValores(){
  var nObjeto = (<HTMLInputElement>document.getElementById("nObjeto")).value;
  var pObjeto = parseInt((<HTMLInputElement>document.getElementById("pObjeto")).value);
  var vObjeto = parseInt((<HTMLInputElement>document.getElementById("vObjeto")).value);
  var cObjeto = parseInt((<HTMLInputElement>document.getElementById("cObjeto")).value);
  if(nObjeto == "" || pObjeto == 0 || vObjeto == 0 || cObjeto == 0){
    alert("Espacios vacíos");
  }else{
    this.listaObjetos.push(nObjeto);
    this.listaPesos.push(pObjeto);
    this.listaValores.push(vObjeto);
    this.listaCantidad.push(cObjeto);
    this.tamMochila = +(document.getElementById("spinCantidad") as HTMLInputElement).value;
    (document.getElementById("nObjeto")as HTMLInputElement).value = "";
    (document.getElementById("pObjeto")as HTMLInputElement).value = (0).toString();
    (document.getElementById("vObjeto")as HTMLInputElement).value = (0).toString();
    (document.getElementById("cObjeto")as HTMLInputElement).value = (0).toString();
  }
  
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
   if(this.listaNodos.length==0 && this.listaPesosRutas.length==0){
     console.log(listaTexto[0]); 
     var tamañotabla=parseInt(listaTexto[0])+1;
     console.log(tamañotabla); 
    for(var i=1;i<tamañotabla;i++){
      console.log(listaTexto[i]); 
      this.listaNodos.push(listaTexto[i]);//lista de los nodos de la tabla
    }
    console.log(this.listaNodos);
    for(var x=tamañotabla;x<listaTexto.length;x++){
      console.log(listaTexto[x]);
      this.listaPesosRutas.push(listaTexto[x]);//tabla de los pesos de las rutas 
    }
    
    }
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
}


}