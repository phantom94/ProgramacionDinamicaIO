import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-ventanareemplazodeequipos',
  templateUrl: './ventanareemplazodeequipos.component.html',
  styleUrls: ['./ventanareemplazodeequipos.component.css']
})
export class VentanareemplazodeequiposComponent implements OnInit {

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
tamanoTablaGlobal=0;
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
tempparasaberlista=0;
largoresultados=0;
//

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
    alert("Espacios vaci­os");
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
    e += "<h1> SoluciÃ³n </h1><br><dl><a>Maximizar:</a><br><li>Z = ";
    e2 += "<dl><a>Sujeto a:</a><br><li>";
    e3 += "<a>SoluciÃ³n Ã“ptima</a><br><dl><li>Z = " + this.res + "</li></dl>";
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
  if(this.listavidautil.length==0){
     var tamanotabla=parseInt(listaTexto[0]);
     this.vidautilequipo=parseInt(listaTexto[0]);
     this.costoinicial= parseInt(listaTexto[1]);
     this.plazoproyecto=parseInt(listaTexto[2]);
   
     var contador=0;
     var temporal=[];
     for(var i=3;i<listaTexto.length;i++){
      if(contador!=3){
        temporal.push(listaTexto[i]);
        contador=contador+1;
      }
      if(contador==3){
        this.listavidautil.push(temporal);//lista tabla
        temporal=[];
        contador=0;
      }
     }
  }
}

public reemplazodeequipos(){
    var e = "";
    var e2 = "";
    var e3 = "";
    e += "<h1> Solucion </h1>";
    e += "</li> G("+ this.plazoproyecto+ ") = 0</li><h1></h1>";
    
  if(this.listavidautil.length!=0){
    var temp=0;
    var plazo=parseInt(this.plazoproyecto.toString());
    var vidatemp = 3;
    for(var y=0;y<plazo;y++){
      this.plazoproyecto=parseInt(this.plazoproyecto.toString())-1;
      this.largoresultados= this.resultadosGanteriores.length;
      if(y==0){
        temp=this.costoinicial+parseInt(this.listavidautil[1][1])-parseInt(this.listavidautil[1][2]);
        e += "</li> G("+ this.plazoproyecto+ ") = "+temp+ " + "+ 0 + " = "+temp+"</li><h1></h1>";
        this.resultadosGanteriores.push(parseInt("0"));
        this.resultadosGanteriores.push(parseInt(temp.toString()));
      }
      if(y!=0){
        e += "</li> G("+ this.plazoproyecto+") = Minimo Entre: </li><h1></h1>";
        var PlazoProyectoTemp= this.plazoproyecto;
        for(var x=1;x<vidatemp;x++){
          this.buscarEnLista(x);
          this.tempparasaberlista=1;
          this.buscarGLista();
          PlazoProyectoTemp= PlazoProyectoTemp+1;
          temp=parseInt(this.resultadoBusqueda.toString())+ parseInt(this.resultadoG.toString());
          this.listaComparacion.push(parseInt(temp.toString()));

          e += "</li> &nbsp;&nbsp;&nbsp;&nbsp; G("+ PlazoProyectoTemp+ ") = "+ this.resultadoBusqueda.toString() + " + "+ this.resultadoG + " = "+ temp+"</li><h1></h1>"
        }
        
        this.tempparasaberlista=0;
      this.comparacionNumeros(this.listaComparacion);
      e += "</li> &nbsp;&nbsp;&nbsp; El Minimo de la ecuacion es: " +this.resultadoComparacion + "</li><h1></h1>"
      this.listaComparacion=[];
      this.resultadosGanteriores.push(parseInt(this.resultadoComparacion.toString()));

      if(vidatemp!=this.vidautilequipo+1){
          vidatemp++;
      }
       
      }
       
  }
   e+= "</li>&nbsp;&nbsp;&nbsp;&nbsp;</li><h1></h1>"
   document.getElementById("Soluc").innerHTML = e;
 }  
}

public comparacionNumeros(lista){
  this.resultadoComparacion=parseInt(Math.min.apply(null, lista));
}

public buscarGLista(){

  if(this.tempparasaberlista==1){
    console.log("ooooooooooooooooooo"); 
    console.log("valor unico de largo resultado g anteriores");
    console.log(this.resultadosGanteriores[this.largoresultados-1]); 
    console.log("ooooooooooooooooooo");
     this.resultadoG=parseInt(this.resultadosGanteriores[this.largoresultados-1])
     this.largoresultados= parseInt(this.largoresultados.toString())-1;
  }

}

public buscarvidautil(){
  var e = "";
  for(var x=1;x<this.vidautilequipo+1;x++){
    this.buscarEnLista(x);
    e += "</li> "+x+" aÃ±o = "+this.resultadoBusqueda+"</li><h1></h1>"
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
  temp+=parseInt(this.costoinicial.toString());
 // console.log(temp);
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
  this.tamanoTablaGlobal=0;
  this.plazoproyecto=0;
  this.vidautilequipo=0;
  this.listavidautil= [];
  this.costoinicial=0;
  this.resultadoBusqueda=0;
  this.tempparasaberlista=0;
  this.largoresultados=0;
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
  this.tamanoTablaGlobal=0;
  this.plazoproyecto=0;
  this.vidautilequipo=0;
  this.listavidautil= [];
  this.costoinicial=0;
  this.resultadoBusqueda=0;
  this.tempparasaberlista=0;
  this.largoresultados=0;
}


}
