import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ventanaseriesdeportivas',
  templateUrl: './ventanaseriesdeportivas.component.html',
  styleUrls: ['./ventanaseriesdeportivas.component.css']
})
export class VentanaseriesdeportivasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

generado=false;
cantidad=1;
ph=0;
pr=0;
contenidoArchivo="";
tabla:number[][]=[];
listaCasa:boolean[]=[];

//Inicia matriz de probabilidades
public iniciar(n:number){
  for(var i=0;i<=n;i++){
    var fila=[]
    for(var j=0;j<=n;j++){
      fila.push(0);
    }
    this.tabla.push(fila);
  }
}

//Genera los valores de probabilidad de la tabla de probabilidades
public generar(){
  this.generado=true;
  this.cantidad= +(<HTMLInputElement>document.getElementById("juegosMax")).value;
  this.ph=+(<HTMLInputElement>document.getElementById("Ph")).value;
  this.pr=+(<HTMLInputElement>document.getElementById("Pr")).value;
  var checks= document.getElementById("botones").childNodes;
  this.listaCasa=[];
  checks.forEach((currentValue, currentIndex, listObj)=>{this.listaCasa.push((<HTMLInputElement>currentValue).checked);});
  this.iniciar((this.cantidad+1)/2);
  for (let i = 0; i <= (this.cantidad+1)/2; i++) {
    for (let j = 0; j <= (this.cantidad+1)/2; j++) {
      if(i==0 && j==0){
        continue;
      }else{
        if(i==0){
          this.tabla[i][j]=1;
        }else{
          if(j==0){
            this.tabla[i][j]=0;
          }else{
            
            if(this.listaCasa[Math.abs((i+j)-this.cantidad-1)]){
              var res=this.ph*this.tabla[i-1][j]+(1-this.ph)*this.tabla[i][j-1];
              this.tabla[i][j]= Math.round((res+Number.EPSILON)*10000)/10000;
            }else{
              var res=this.pr*this.tabla[i-1][j]+(1-this.pr)*this.tabla[i][j-1];
              this.tabla[i][j]=Math.round((res+Number.EPSILON)*10000)/10000;
            }
          }
        }
      }
    }
    
  }
  var contenido="<tr><th></th>";
  for (let i = 0; i <=(this.cantidad+1)/2; i++) {
    contenido+= `<th>${i}</th>`;
  }
  contenido+=`</tr>`;

  for (let i = 0; i <= (this.cantidad+1)/2; i++) {
    contenido+=`<tr><th>${i}</th>`
    for (let j = 0; j <= (this.cantidad+1)/2; j++) {
      contenido+=`<td>${this.tabla[i][j]}</td>`;
    }
    contenido+=`</tr>`;
  }
  
  
  document.getElementById("tablaRes").innerHTML+=contenido;
  

}

//Limpia los valores para hacer otra prueba
public reiniciar(){
  this.tabla=[];
  this.listaCasa=[];
  this.generado=false;
  this.contenidoArchivo="";
  document.getElementById("tablaRes").innerHTML="";
}

// Crea en la página la cantidad de checks iguales a los juegos
// ingresados por el usuario
public crearChecks(){
  var contenido="";
  var cantidad= +(<HTMLInputElement>document.getElementById("juegosMax")).value;
  for(var i=0;i<cantidad;i++){
    contenido+=`<input type="checkbox">`;
  }
  document.getElementById("botones").innerHTML=contenido;
}

// Lee el archivo especificado por el usuario
// para completar los valores de entrada del usuario
public lectorArchivos(event:Event){
			
  var file = (<HTMLInputElement>event.target).files[0];

  var reader = new FileReader();

  reader.onload= () => {
    this.contenidoArchivo = reader.result as string;
  }

  reader.readAsText(file);

}

// Lee los valores del archivo cargado por la función lectorArchivos
// y completa los inputs con esos valores
public cargarArchivo(){
  var lineas = this.contenidoArchivo.split("\n");
  (<HTMLInputElement>document.getElementById("juegosMax")).value=lineas[0];
  (<HTMLInputElement>document.getElementById("Ph")).value=lineas[1];
  (<HTMLInputElement>document.getElementById("Pr")).value=lineas[2];
  var lista = lineas[3].split(" ");
  var contenido=""; 
  lista.forEach(elemento => {
    if(!!+elemento){
      contenido+=`<input type="checkbox" checked>`;
    }else{
      contenido+=`<input type="checkbox">`;
    }
  });
  document.getElementById("botones").innerHTML=contenido;
}

// Genera un archivo con los valores ingresados por el usario para descargar como archivo txt
public crearArchivo(){
  this.cantidad= +(<HTMLInputElement>document.getElementById("juegosMax")).value;
  this.ph=+(<HTMLInputElement>document.getElementById("Ph")).value;
  this.pr=+(<HTMLInputElement>document.getElementById("Pr")).value;
  var checks= document.getElementById("botones").childNodes;
  this.listaCasa=[];
  checks.forEach((currentValue, currentIndex, listObj)=>{this.listaCasa.push((<HTMLInputElement>currentValue).checked);});
  var contenido=`${this.cantidad}\n${this.ph}\n${this.pr}\n`;
  var listaStr="";
  for(var i=0;i<this.listaCasa.length;i++){
    if(i+1==this.listaCasa.length){
      listaStr+=`${+ this.listaCasa[i]}`;
    }else{
      listaStr+=`${+ this.listaCasa[i]} `;
    }
  }
  contenido+=listaStr;
  this.tabla=[];
  this.listaCasa=[];
  this.generado=false;
  this.contenidoArchivo="";
  var elemento = document.createElement('a');
  elemento.setAttribute('href',`data:text/plain;charset=utf-8,${contenido}`);
  elemento.setAttribute('download', "Datos_Equipos");

  elemento.dispatchEvent(new MouseEvent("click"));
}

}
