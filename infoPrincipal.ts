import { Component } from '@angular/core';

import { NavController, AlertController, NavParams,Platform } from 'ionic-angular';
import { listadoBencinerasPage } from '../listadoBencineras/listadoBencineras';
import { detalleTiempoPage } from '../detalleTiempo/detalleTiempo';
import { InformacionAdicionalPage } from '../informacion-adicional/informacion-adicional';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2';
import { Device } from '@ionic-native/device';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-infoPrincipal',
  templateUrl: 'infoPrincipal.html'
})
export class infoPrincipalPage {  
    
r = [
    {idRegion:1, nombreRegion:'XVI Región de los Ríos'}
  ];
p = [
    {idProvincia:1,nombreProvincia:'Valdivia'},
    {idProvincia:2,nombreProvincia:'Del Ranco'}  
];

c = [
    {idCiudad:1,nombreCiudad:'Valdivia',idProvincia:1,idRegion:1},
    {idCiudad:2,nombreCiudad:'Corral',idProvincia:1,idRegion:1},
    {idCiudad:3,nombreCiudad:'Lanco',idProvincia:1,idRegion:1},
    {idCiudad:4,nombreCiudad:'Los Lagos',idProvincia:1,idRegion:1},
    {idCiudad:5,nombreCiudad:'Mafil',idProvincia:1,idRegion:1},
    {idCiudad:6,nombreCiudad:'Mariquina',idProvincia:1,idRegion:1},
    {idCiudad:7,nombreCiudad:'Panguipulli',idProvincia:1,idRegion:1},
    {idCiudad:8,nombreCiudad:'Futrono',idProvincia:2,idRegion:1},
    {idCiudad:9,nombreCiudad:'La Union',idProvincia:2,idRegion:1},
    {idCiudad:10,nombreCiudad:'Lago Ranco',idProvincia:2,idRegion:1},
    {idCiudad:11,nombreCiudad:'Rio Bueno',idProvincia:2,idRegion:1}
    ];


idCiudadGlobal:number;
idProvinciaGlobal:number;
idRegionGlobal:number;
    
//DATOS FARMACIA 
nombreCiudad:string;
nombreFarmacia:string;
ubicacionFarmacia:string;
telefonoFarmacia:string;
horariomanana:string;
horariotarde:string;
nameCiu:string;
    
//DATOS BENCINA
nombreBencinera:string;
precioBencina:number;
ubicacionBencinera:string;
tipoBencina:string;
promocion:string;    
e93menor = 9999;
e93mayor = 0;
    
  s95menor = 9999;
  s95mayor = 0;
    
  p97menor = 9999;
  p97mayor = 0;
    
  gplmenor;
  gplmayor;
    
  kmenor;
  kmayor;
    
  petmenor;
  petmayor;
    
//DATOS CLIMA
climaHoy;
temperatura;
rayosuv;
idTipoClimaHora;
idTipoClima;
rutaimgClima;    
    
    rutaGift;

//FECHA LOCAL
d = new Date();
fecharecibida;
hora;
idHorario; 
//info_adicional
informacionAdicional;
   
//RUTA BANNER
rutabanner;

    
    
clima: FirebaseListObservable<any>;
bencinas: FirebaseListObservable<any>;
farmacias: FirebaseListObservable<any>;
ciudades: FirebaseListObservable<any>;
tiposClima: FirebaseListObservable<any>;
infoAdicional: FirebaseListObservable<any>;
bannerInicio: FirebaseListObservable<any>;
giftTiempo: FirebaseListObservable<any>;
gas: FirebaseListObservable<any>;
datosUsuarios:FirebaseListObservable<any>;
clickAllBencinas:FirebaseListObservable<any>;
gasmenos = 9999;
gasmayor = 0;

    
//DATOS DEL USUARIO
idUsuario;
serie;
idPoligono;
idZonaPoligono;  
    
    
idrpc;
UserIDRPC;
okey;
    
bs;
usuarioid;
one;
one_id;
    
idOS;
contador;
constructor(
            public navCtrl: NavController,
            public alertCtrl: AlertController,
            public plt: Platform,
            public database: AngularFireDatabase,
            public navParams:NavParams,
            private device: Device,
            private storage: Storage,
            ) 
{

    
    
   
                this.ciudades = this.database.list('/ciudades');
                this.bencinas = this.database.list('/Bencina');
                this.farmacias = this.database.list('/Farmacias');
                this.clima = this.database.list('/Clima');
                this.tiposClima = this.database.list('/tiposClima');
                this.infoAdicional = this.database.list('/informacion_Adicional');
                this.gas = this.database.list('/gas');
            
                this.idCiudadGlobal = this.navParams.get('idCiudad');
                this.idProvinciaGlobal = this.navParams.get('idProvincia');
                this.idRegionGlobal = this.navParams.get('idRegion');
                this.fecharecibida = this.navParams.get('fecha');
                this.idHorario = this.navParams.get('idHorario');
                //this.idUsuario = this.navParams.get('idUsuario');
                //this.serie = this.navParams.get('serie');
    
                /********* TRATAMIENOT DE POLIGONOS ****/
                this.idPoligono = this.navParams.get('idPoligono');
                this.idZonaPoligono = this.navParams.get('idZonaPoligono');
                console.log('idpoligono'+this.idPoligono)
                if(typeof this.idPoligono === 'undefined' ||  typeof this.idPoligono === ''){
                     this.idPoligono = '0';  
                }
                if(typeof this.idZonaPoligono === 'undefined' ||  typeof this.idZonaPoligono === ''){
                    this.idZonaPoligono = '0';    
                }
                //console.log('idpoligono'+this.idZonaPoligono)
                this.giftTiempo = this.database.list('/imgClimas');
                //this.nombreCiudad = ciud'iad;
                
    this.hora = this.d.getHours()+":"+this.d.getMinutes()+":"+this.d.getSeconds();
    //console.log('id Horario:'+this.idHorario);
    
 //ID ORIGINAL CREADO   
 this.idrpc = this.idRegionGlobal+''+this.idProvinciaGlobal+''+this.idCiudadGlobal+''+this.idPoligono+''+this.idZonaPoligono;
   
 if(this.plt.is('cordova')){
    //AQUI COMIENZA ESCRIPT PARA OBTENER DATOS DEL DISPOSITIVO MÓVIL    
// SI NO DETECTA UN DISPOSITIVO MOVIL    
if(this.device.uuid == null){
    //ASIGNAMOS UN ID POR DEFECTO
    this.idUsuario  = 'DAGGDEVELOPER';
 
    //CREAMOS EL NODO CONTADOR EN FIREBASE EL CUAL SE LE PASA LA DIRECCIÓN Y EL ID DEL DISPOSITIVO ENTREGADO POR ONESIGNAL
    this.contador = this.database.list('/Contador/ClickIngreso/'+this.idrpc+'/'+this.idUsuario);
    this.contador.push({ 
            idUsuario:this.idUsuario,
            modeloCelu:'AAAAA',
            SO:'BBBB',
            version:'CCCCC',
            manufacturer:'DDDD',
            fecha:this.fecharecibida,
            idHorario: this.idHorario,
            hora: this.hora
    });

    //Y CREAMOS UN NODO CON EL EL ID DEL USUARIO POR DEFECTO DONDE SE ALMACENARA LA INFORMACION DE ESTE USUARIO EN FIREBASE
    this.UserIDRPC = this.database.list('/Usuarios/'+this.idrpc+'/'+this.idUsuario);
    //AGREGAMOS LOS DATOS A LA BASE DE DATOS DE FIREBASE
    this.UserIDRPC.push({ 
            idUsuario:this.idUsuario,
            modeloCelu:'aaaa',
            SO:'bbb',
            version:'cccc',
            manufacturer:'ddd',
            idCiudad:this.idCiudadGlobal,
            idProvincia:this.idProvinciaGlobal,
            idRegion: this.idRegionGlobal,
            fecha:this.fecharecibida,
            idHorario: this.idHorario,
            hora: this.hora
    });
    //Y CREAMOS UN NODO CON EL EL ID DEL USUARIO POR DEFECTO DONDE SE ALMACENARA LA INFORMACION DE ESTE USUARIO EN FIREBASE
    
    this.datosUsuarios = this.database.list('/datosUsuarios/ClickIngreso/'+this.idUsuario );
    //AGREGAMOS LOS DATOS A LA BASE DE DATOS DE FIREBASE
    this.datosUsuarios.push({ 
            idUsuario:this.idUsuario,
             modeloCelu:'aaaa',
             SO:'bbb',
             version:'cccc',
             manufacturer:'ddd',
             idCiudad:this.idCiudadGlobal,
            idProvincia:this.idProvinciaGlobal,
            idRegion: this.idRegionGlobal,
            fecha:this.fecharecibida,
            idHorario: this.idHorario,
             hora: this.hora,
             idPoligono:this.idPoligono,
             idZonaPoligono:this.idZonaPoligono
    });
    //alert('null')
}else{
            //SI ENCONTRAMOS UN ID DE UN DIPOSITIVO MOVIL
             storage.get('idonesignal').then((val) => {
                    //ALMECENAMOS EL VALOR DE LA VARIBLE EXTRAIDA DESDE LOCALSTORAGE
                    this.idOS = val;
                    //alert(this.idOS)
                 //CREAMOS UNA ALMACEN DE DATOS 
                 this.okey = this.database.list('UON/'+this.idOS);
                 this.okey.push({ 
                    direccion:this.idrpc,
                    fecha:this.fecharecibida,
                    idHorario: this.idHorario
                });
                 //CREAMOS EL NODO CONTADOR EN FIREBASE EL CUAL SE LE PASA LA DIRECCIÓN Y EL ID DEL DISPOSITIVO ENTREGADO POR ONESIGNAL
                 this.contador = this.database.list('/Contador/ClickIngreso/'+this.idrpc+'/'+this.idOS );
                     this.contador.push({ 
                    direccion:this.idrpc,
                     fecha:this.fecharecibida,
                    idHorario: this.idHorario
                 
                });
                 
                     this.UserIDRPC = this.database.list('/Usuarios/'+this.idrpc+'/'+this.idOS);
                     this.UserIDRPC.push({ 
                     idUsuario:this.device.uuid,
                     modeloCelu:this.device.model,
                     SO:this.device.platform,
                     version:this.device.version,
                     manufacturer:this.device.manufacturer,
                     serial:this.device.serial,
                     idCiudad:this.idCiudadGlobal,
                     idProvincia:this.idProvinciaGlobal,
                     idRegion: this.idRegionGlobal,
                     fecha:this.fecharecibida,
                     idHorario: this.idHorario,
                     hora: this.hora,
                     idPoligono:this.idPoligono,
                     idZonaPoligono:this.idZonaPoligono
                });
            });
    
   
    //CREAMOS UN NODO CON ESTE ID DEL USUARIO
     this.datosUsuarios = this.database.list('/datosUsuarios/ClickIngreso/'+this.device.uuid );
    //ALMACENAMOS LOS DATOS CON EL NODO DE ESTE USUARIO
    this.datosUsuarios.push({ 
        idUsuario:this.device.uuid,
         modeloCelu:this.device.model,
         SO:this.device.platform,
         version:this.device.version,
         manufacturer:this.device.manufacturer,
         serial:this.device.serial,
         idCiudad:this.idCiudadGlobal,
        idProvincia:this.idProvinciaGlobal,
        idRegion: this.idRegionGlobal,
        fecha:this.fecharecibida,
        idHorario: this.idHorario,
         hora: this.hora,
         idPoligono:this.idPoligono,
         idZonaPoligono:this.idZonaPoligono
    });
     //alert(' no null')
}
   // console.log('si cordova ctm')
}else{
    
    //ASIGNAMOS UN ID POR DEFECTO
    this.idUsuario  = 'DAGGDEVELOPER';
 
this.okey = this.database.list('UON/'+this.idUsuario);
this.okey.push({
        direccion:this.idrpc
    });
     this.contador = this.database.list('/Contador/ClickIngreso/'+this.idrpc+'/'+this.idUsuario );
    this.contador.push({ 
            idUsuario:this.idUsuario,
            modeloCelu:'AAAAA',
            SO:'BBBB',
            version:'CCCCC',
            manufacturer:'DDDD',
            fecha:this.fecharecibida,
            idHorario: this.idHorario,
            hora: this.hora
    });
                 
    //Y CREAMOS UN NODO CON EL EL ID DEL USUARIO POR DEFECTO DONDE SE ALMACENARA LA INFORMACION DE ESTE USUARIO EN FIREBASE
    this.UserIDRPC = this.database.list('/Usuarios/'+this.idrpc+'/'+this.idUsuario);
    //AGREGAMOS LOS DATOS A LA BASE DE DATOS DE FIREBASE
    this.UserIDRPC.push({ 
          aqui:this.idrpc
    });
    //Y CREAMOS UN NODO CON EL EL ID DEL USUARIO POR DEFECTO DONDE SE ALMACENARA LA INFORMACION DE ESTE USUARIO EN FIREBASE
    this.datosUsuarios = this.database.list('/datosUsuarios/ClickIngreso/'+this.idUsuario );
    //AGREGAMOS LOS DATOS A LA BASE DE DATOS DE FIREBASE
    this.datosUsuarios.push({ 
            idUsuario:this.idUsuario,
         modeloCelu:'aaaa',
         SO:'bbb',
         version:'cccc',
         manufacturer:'ddd',
         idCiudad:this.idCiudadGlobal,
        idProvincia:this.idProvinciaGlobal,
        idRegion: this.idRegionGlobal,
        fecha:this.fecharecibida,
        idHorario: this.idHorario,
         hora: this.hora,
         idPoligono:this.idPoligono,
         idZonaPoligono:this.idZonaPoligono
    });
    console.log('no cordova ctm')
}
  

   
    
//OBTENEMOS EL VALOR DEL GAS MAS BARATO SEGUN LA CIUDAD
this.gas.forEach(ele =>{
    ele.forEach(data =>{
        if(this.idCiudadGlobal == data.idCiudad){
            console.log(data.promocion); 
if(data.promocion == 'si'){
    this.promocion = 'Si hay Promocion'
}else{
    this.promocion = 'No hay promocion';
}
            
            /*if(data.idTamanoGas == 2){
                if(parseInt(data.precioGas) < this.gasmenos){
                    this.gasmenos = data.precioGas;
                }
                if(parseInt(data.precioGas) > this.gasmayor){
                    this.gasmayor = data.precioGas;
                    //console.log('e93'+this.e93mayor);
                }
            }*/
}else{
    this.promocion = 'No hay promocion';
}

    })
})
    
//CARGAMOS EL BANNER SEGUN LA CIUDAD QUE CORRSPONDA
this.bannerInicio = this.database.list('/bannerTwo', { preserveSnapshot: true });
    this.bannerInicio
    .subscribe(snapshots => {
        snapshots.forEach(snapshot => {

            if(this.idCiudadGlobal == snapshot.key){
                //console.log(snapshot.val().rutaimg)
                this.rutabanner = snapshot.val().rutaimg;
            }   

        });
})
   
//OBTENERMOS LA HORA ACTUAL
this.hora = this.d.getHours();
    
//DATOS INFORMACION ADICIONAL
this.infoAdicional.forEach(ele => {
ele.forEach(info =>{
        if(this.idCiudadGlobal == info.idCiudad){
                this.informacionAdicional = info.informacionAdicional;
        }

    })   
})
    
//DATOS PARA CLIMA POR FECHA
    this.clima.forEach(ele =>{
        ele.forEach(olo =>{
            //VALIDAMOS QUE LA CIUDAD ELEGIDA Y EL TIEMPO SEA DE ESTA CIUDAD
                if(olo.idCiudad == this.idCiudadGlobal){
                    //CALIDAMOS QUE LOS DATOS ELEGIDOS SEAN DE LA FECHA DE HOY
                                if(this.fecharecibida == olo.fecha_clima){
                                    //console.log(olo);
                                    //CARGAMOS LOS TIPOS DE CLIMAS
if(this.idHorario == 1){
//MADRUGADA
this.climaHoy =  olo.nameTipoClima1;
this.temperatura = olo.grados1;

//CARGAMOS LAS IMAGESN DEL CLIMA
this.giftTiempo.forEach(ele =>{
    // console.log(ele);
    ele.forEach(datos => {
    // console.log(datos)
            if(olo.tipoClima1 == datos.idTipoClima){
                console.log(olo.tipoClima1+"-"+datos.idTipoClima);
                    this.rutaimgClima = datos.rutaimg;
                   // console.log(this.rutaimgClima)
            }
        })
    })
}
                                    
                                    
if(this.idHorario == 2){
    this.climaHoy =  olo.nameTipoClima2;
    this.temperatura = olo.grados2;
    //CARGAMOS LAS IMAGESN DEL CLIMA
    this.giftTiempo.forEach(ele =>{
    // console.log(ele);
        ele.forEach(datos => {
    // console.log(datos)
                if(olo.tipoClima2 == datos.idTipoClima){
                    // console.log(olo.tipoClima2+"-"+datos.idTipoClima);
                    this.rutaimgClima = datos.rutaimg;
                   // console.log(this.rutaimgClima)
                }
            })
    })
}
                                    
if(this.idHorario == 3){
    this.climaHoy =  olo.nameTipoClima3;
    this.temperatura = olo.grados3;
    //CARGAMOS LAS IMAGESN DEL CLIMA
    this.giftTiempo.forEach(ele =>{
   // console.log(ele);
    ele.forEach(datos => {
    // console.log(datos)
                if(olo.tipoClima3 == datos.idTipoClima){
                    //console.log(olo.tipoClima3+"-"+datos.idTipoClima);
                        this.rutaimgClima = datos.rutaimg;
                       // console.log(this.rutaimgClima)
                }

            })

    })
}
if(this.idHorario == 4){
    this.climaHoy =  olo.nameTipoClima4;
    this.temperatura = olo.grados4;
    //CARGAMOS LAS IMAGESN DEL CLIMA
    this.giftTiempo.forEach(ele =>{
// console.log(ele);
    ele.forEach(datos => {
// console.log(datos)
            if(olo.tipoClima4 == datos.idTipoClima){
                //console.log(olo.tipoClima4+"-"+datos.idTipoClima);
                    this.rutaimgClima = datos.rutaimg;
                    //console.log(this.rutaimgClima)
            }

        })

    })
}
                                                             
            this.rayosuv = olo.rayos_uv_clima;
            this.idTipoClima = olo.idtipoclima;
        }
    }

 })

})
    

//OBTENGO EL NOMBRE DE LA CIUDAD 
this.ciudades.forEach(element =>{
    //console.log(element);
    element.forEach(ele =>{
    //console.log(ele.idCiudad)
            if(ele.idCiudad == this.idCiudadGlobal){
                this.nombreCiudad = ele.nombreCiudad;
            }
        })
})
    
  
    

//OBTENGO LOS DATOS DE LA FARMACIA SEGUN LA CIUDAD
this.farmacias.forEach(element =>{
    //console.log(element);
    element.forEach(ele =>{
    //console.log(ele)
            if(ele.idCiudad == this.idCiudadGlobal){
                //console.log(ele)
                this.farmacias = ele.nombreFarmacia;
                this.ubicacionFarmacia = ele.ubicacionFarmacia;
                this.telefonoFarmacia=ele.telefonoFarmacia;
                this.horariomanana=ele.horarioManana;
                this.horariotarde=ele.horarioTarde;
            }
        })
})
    
    
    


//*******OBTENERMOS LAS BECINERAS MAS BARATAS SEGÚN CIUDAD************//
    this.bencinas.forEach(element =>{
                    element.forEach(ele =>{
                            if(ele.idCiudad == this.idCiudadGlobal){
                           // console.log(ele)
                            if(ele.idTipoBencina == 1){
                                
                                this.nombreBencinera= ele.nombreBencinera;
                                this.precioBencina=ele.precioBencina;
                                this.ubicacionBencinera = ele.calleBencinera;
                                this.tipoBencina = ele.nombreTipoBencina;
                                    if(ele.precioBencina < this.e93menor){
                                        this.e93menor = ele.precioBencina;
                                        //console.log('e93'+this.e93menor);
                                    }
                                if(ele.precioBencina > this.e93mayor){
                                    this.e93mayor = ele.precioBencina;
                                    //console.log('e93'+this.e93mayor);
                                }
                            }
                                
                            if(ele.idTipoBencina == 2){
                                
                                this.nombreBencinera= ele.nombreBencinera;
                                this.precioBencina=ele.precioBencina;
                                this.ubicacionBencinera = ele.calleBencinera;
                                this.tipoBencina = ele.nombreTipoBencina;
                                
                                    if(ele.precioBencina < this.s95menor){
                                        this.s95menor = ele.precioBencina;
                                        //console.log('s95'+this.s95menor);
                                    }
                                if(ele.precioBencina > this.s95mayor){
                                    this.s95mayor = ele.precioBencina;
                                    //console.log('s95'+this.s95mayor);
                                }
                            }
                                
                            if(ele.idTipoBencina == 3){
                                
                                this.nombreBencinera= ele.nombreBencinera;
                                this.precioBencina=ele.precioBencina;
                                this.ubicacionBencinera = ele.calleBencinera;
                                this.tipoBencina = ele.nombreTipoBencina;
                                
                                    if(ele.precioBencina < this.p97menor){
                                        this.p97menor = ele.precioBencina;
                                        //console.log('p97'+this.p97menor);
                                    }
                                if(ele.precioBencina > this.p97mayor){
                                    this.p97mayor = ele.precioBencina;
                                    //console.log('p97'+this.p97mayor);
                                }
                            }
                                
                            }
                        })
                })
    
    
   
}

    

//ENVIAMOS LOS IDS DE LA REGION,PROVINCIA,CIUDAD A LA PAGINA DE EL LISTADO DE TIPOS DE BENCINERAS   
getListadoBencineras(){
    this.navCtrl.push(listadoBencinerasPage,{
        idCiudad:this.idCiudadGlobal,
        idProvincia:this.idProvinciaGlobal,
        idRegion:this.idRegionGlobal
    });
    
    
//AL HACER CLICK EN EL BOTON DE BENCINAS SE OBTIENES DATOS DEL USUARIO PARA UN CONTADOR DE CLICK
if(this.device.uuid == null){
     this.idUsuario  = 'DAGGDEVELOPER';
   this.datosUsuarios = this.database.list('/datosUsuarios/clickAllBencinas/'+this.idUsuario );
    this.datosUsuarios.push({ 
        idUsuario:this.idUsuario,
        modeloCelu:'aaaa',
        SO:'bbb',
        version:'cccc',
        manufacturer:'ddd',
        idCiudad:this.idCiudadGlobal,
        idProvincia:this.idProvinciaGlobal,
        idRegion: this.idRegionGlobal,
        fecha:this.fecharecibida,
        idHorario: this.idHorario,
        hora: this.hora,
        idPoligono:this.idPoligono,
        idZonaPoligono:this.idZonaPoligono
    });
    this.contador = this.database.list('/Contador/clickAllBencinas/'+this.idrpc+'/'+this.idUsuario );
    this.contador.push({ 
            idUsuario:this.idUsuario,
            modeloCelu:'AAAAA',
            SO:'BBBB',
            version:'CCCCC',
            manufacturer:'DDDD',
            fecha:this.fecharecibida,
            idHorario: this.idHorario,
            hora: this.hora
    });
}else{
    this.clickAllBencinas = this.database.list('/datosUsuarios/clickAllBencinas/'+this.device.uuid);
    this.clickAllBencinas.push({ 
        idUsuario:this.device.uuid,
        idosingal:this.idOS,
         modeloCelu:this.device.model,
         SO:this.device.platform,
         version:this.device.version,
         manufacturer:this.device.manufacturer,
         serial:this.device.serial,
         idCiudad:this.idCiudadGlobal,
        idProvincia:this.idProvinciaGlobal,
        idRegion: this.idRegionGlobal,
        fecha:this.fecharecibida,
        idHorario: this.idHorario,
         hora: this.hora,
         idPoligono:this.idPoligono,
         idZonaPoligono:this.idZonaPoligono
    });
    this.contador = this.database.list('/Contador/clickAllBencinas/'+this.idrpc+'/'+this.idOS );
                     this.contador.push({ 
                    direccion:this.idrpc,
                     fecha:this.fecharecibida,
                    idHorario: this.idHorario
                 
                });
}
    
}
//ENVIAMOS LOS IDS DE LA REGION,PROVINCIA,CIUDAD A LA PAGINA DE DETALLE DE TIEMPO
getPronosticoDelTiempo(){
    this.navCtrl.push(detalleTiempoPage,{
        idCiudad:this.idCiudadGlobal,
        nombreCiudad:this.nombreCiudad,
        idProvincia:this.idProvinciaGlobal,
        idRegion:this.idRegionGlobal,
        fechaHoy:this.fecharecibida
    });
    
    
    if(this.device.uuid == null){
     this.idUsuario  = 'DAGGDEVELOPER';
   this.datosUsuarios = this.database.list('/datosUsuarios/clickPronosticoTiempo/'+this.idUsuario );
    this.datosUsuarios.push({ 
        idUsuario:this.idUsuario,
        modeloCelu:'aaaa',
        SO:'bbb',
        version:'cccc',
        manufacturer:'ddd',
        idCiudad:this.idCiudadGlobal,
        idProvincia:this.idProvinciaGlobal,
        idRegion: this.idRegionGlobal,
        fecha:this.fecharecibida,
        idHorario: this.idHorario,
        hora: this.hora,
        idPoligono:this.idPoligono,
        idZonaPoligono:this.idZonaPoligono
    });
        this.contador = this.database.list('/Contador/clickPronosticoTiempo/'+this.idrpc );
    this.contador.push({ 
            idUsuario:this.idUsuario,
            modeloCelu:'AAAAA',
            SO:'BBBB',
            version:'CCCCC',
            manufacturer:'DDDD',
            fecha:this.fecharecibida,
            idHorario: this.idHorario,
            hora: this.hora
    });
}else{
    this.clickAllBencinas = this.database.list('/datosUsuarios/clickPronosticoTiempo/'+this.device.uuid );
    this.clickAllBencinas.push({ 
        idUsuario:this.device.uuid,
        idosingal:this.idOS,
         modeloCelu:this.device.model,
         SO:this.device.platform,
         version:this.device.version,
         manufacturer:this.device.manufacturer,
         serial:this.device.serial,
         idCiudad:this.idCiudadGlobal,
        idProvincia:this.idProvinciaGlobal,
        idRegion: this.idRegionGlobal,
        fecha:this.fecharecibida,
        idHorario: this.idHorario,
         hora: this.hora,
         idPoligono:this.idPoligono,
         idZonaPoligono:this.idZonaPoligono
    });
    this.contador = this.database.list('/Contador/clickPronosticoTiempo/'+this.idrpc+'/'+this.idOS);
                     this.contador.push({ 
                    direccion:this.idrpc,
                     fecha:this.fecharecibida,
                    idHorario: this.idHorario
                 
                });
}
    
}
tuCiudadAlDia(){
    this.navCtrl.push(InformacionAdicionalPage,{
        idCiudad:this.idCiudadGlobal,
        idProvincia:this.idProvinciaGlobal,
        idRegion:this.idRegionGlobal,
        nombreCiudad:this.nombreCiudad,
    });
    
if(this.device.uuid == null){
    this.idUsuario  = 'DAGGDEVELOPER';
    this.datosUsuarios = this.database.list('/datosUsuarios/tuCiudadAlDia/'+this.idUsuario );
    this.datosUsuarios.push({ 
        idUsuario:this.idUsuario,
        modeloCelu:'aaaa',
        SO:'bbb',
        version:'cccc',
        manufacturer:'ddd',
        idCiudad:this.idCiudadGlobal,
        idProvincia:this.idProvinciaGlobal,
        idRegion: this.idRegionGlobal,
        fecha:this.fecharecibida,
        idHorario: this.idHorario,
        hora: this.hora,
        idPoligono:this.idPoligono,
        idZonaPoligono:this.idZonaPoligono
    });
        this.contador = this.database.list('/Contador/tuCiudadAlDia/'+this.idrpc );
    this.contador.push({ 
            idUsuario:this.idUsuario,
            modeloCelu:'AAAAA',
            SO:'BBBB',
            version:'CCCCC',
            manufacturer:'DDDD',
            fecha:this.fecharecibida,
            idHorario: this.idHorario,
            hora: this.hora
    });
}else{
    this.clickAllBencinas = this.database.list('/datosUsuarios/tuCiudadAlDia/'+this.device.uuid );
    this.clickAllBencinas.push({ 
        idUsuario:this.device.uuid,
        idosingal:this.idOS,
         modeloCelu:this.device.model,
         SO:this.device.platform,
         version:this.device.version,
         manufacturer:this.device.manufacturer,
         serial:this.device.serial,
         idCiudad:this.idCiudadGlobal,
        idProvincia:this.idProvinciaGlobal,
        idRegion: this.idRegionGlobal,
        fecha:this.fecharecibida,
        idHorario: this.idHorario,
         hora: this.hora,
         idPoligono:this.idPoligono,
         idZonaPoligono:this.idZonaPoligono
    });
    this.contador = this.database.list('/Contador/tuCiudadAlDia/'+this.idrpc+'/'+this.idOS );
                     this.contador.push({ 
                    direccion:this.idrpc,
                     fecha:this.fecharecibida,
                    idHorario: this.idHorario
                 
                });
}
}
ionViewDidLoad(){


}
    
   

}
