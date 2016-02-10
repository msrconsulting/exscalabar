!function(){angular.module("main",["ngRoute","ui.bootstrap","ui.bootstrap.contextMenu","dygraph","cirrus.ui.ibutton","cirrus.ui.inumeric","cirrus.ui.string","ngSanitize","ui.bootstrap.dropdownToggle"])}(),function(){angular.module("main").factory("net",function(){return localStorage.ip||(localStorage.ip="192.168.0.73"),localStorage.port||(localStorage.port="8001"),{ip:localStorage.ip,port:localStorage.port,getNetworkParams:function(){return{ip:this.ip,port:this._port}},setNetworkParams:function(t,a){this._ip=t,this.port=a,localStorage.ip=t,localStorage.port=a},setIP:function(t){this.ip=t,localStorage.ip=t},setPort:function(t){this.port=t,localStorage.port=t},address:function(){return"http://"+this.ip+":"+this.port+"/xService/"}}})}(),function(){function t(t,a){for(var e in t)if(t[e].id===a)return!0;return!1}function a(t,a,e,n,i,s){this.label=t,this.id=a,this.ctlr=e,this.sn=n,this.sp=i,this.address=s}function e(t,a){var e=t,n=a;this.net=n,this.fred=1e3,this.dcred=50,this.fblue=2e3,this.dcblue=50,this.kred=1,this.kblue=1,this.kpmt=[0,0,0,0,0],this.eblue=!0,this.ered=!0,this.setLaserRate=function(t,a){var i="CRDS_CMD/fblue?Rate="+a;t?(i="CRDS_CMD/fred?Rate="+a,this.fred=a):this.fblue=a,e.get(n.address()+i)},this.setEnable=function(t){this.eblue=t[0],this.ered=t[1];var a=this.ered?1:0,i=this.eblue?1:0,s="CRDS_CMD/LaserEnable?Red="+a+"&Blue="+i;e.get(n.address()+s)},this.setGain=function(t){this.kpmt=t,e.get(n.address()+"CRDS_CMD/Vpmt?V="+t.toString())},this.setLaserGain=function(t){this.kred=t[1],this.kblue=t[0],e.get(n.address()+"CRDS_CMD/LaserGain?B1=0&B0="+t[0]+"&R="+t[1])}}function n(t,a){var e=t,n=a;this.spk={vrange:5,voffset:0,f0:1350,df:100,pos:!0,auto:!1,period:360,length:30},this.las={vr:[5,5,5,5,5],voffset:[1,2,3,4,5],f0:[1351,1352,1353,1354,1355],modulation:[!1,!1,!1,!1,!1],enable:[!1,!1,!1,!1,!1]},this.las.setf0=function(t){this.f0=t,e.get(n.address()+"PAS_CMD/UpdateFr?f0="+t.join(","))},this.las.setVr=function(t){this.las.vr=t,e.get(n.address()+"PAS_CMD/UpdateVrange?Vrange="+t.join(","))},this.las.setVo=function(t){this.las.vr=vr,e.get(n.address()+"PAS_CMD/UpdateVoffset?Voffset="+t.join(","))},this.las.updateMod=function(t){this.moduldation=t;var a=[];for(i=0;i<t.length;i++)a.push(t?1:0)},this.las.updateEnable=function(t){this.enable=t},this.spk.updateCtl=function(t){var a=t.pos?1:0;e.get(n.address()+"PAS_CMD/SpkSw?SpkSw="+a),e.get(n.address()+"PAS_CMD/Spk?df="+this.df+"&f0="+this.f0),e.get(n.address()+"PAS_CMD/UpdateSpkVparams?Voffset="+this.voffset+"&Vrange="+this.vrange)},this.spk.updateCycle=function(t,a,i){this.auto=t,this.length=i,this.period=a;var s=t?1:0;e.get(n.address()+"PAS_CMD/UpdateSpkCycle?Length="+i+"&Period="+a+"&Cycle="+s)}}function s(t){for(var a in t)if(t.hasOwnProperty(a))return!1;return!0}angular.module("main").factory("cvt",["$http","net","$rootScope",function(i,r,o){function l(t,a,e,n,i,s){this.p=t,this.i=a,this.d=e,this.sp=n,this.en=i,this.updateEn=function(){},this.updateParams=function(t){},this.name=s}var c={save:!0,ozone:!1,filter_pos:!0,first_call:1,fctl:[],power:{Pump:!1,O3Gen:!1,Denuder:!1,Laser:!1,TEC:!1},purge:{setSw:function(t){this.pos=t;var a=t?1:0;i.get(r.address()+"General/PurgeSwitch?val="+a)},pos:!0},alicat:[],vaisala:[],mTEC:[],TEC:{},ppt:[]};return c.humidifier=[new l(.75,1,0,90,!1,"Medium"),new l(.75,1,0,80,!1,"High")],c.pas=new n(i,r),c.crd=new e(i,r),c.filter={cycle:{period:360,length:20,auto:!1},position:!0,updateCycle:function(t){this.cycle=t;var a=this.cycle.auto?1:0;i.get(r.address()+"General/FilterCycle?Length="+this.cycle.length+"&Period="+this.cycle.period+"&auto="+a)},updatePos:function(t){this.position=t;var a=this.position?1:0;i.get(r.address()+"General/UpdateFilter?State="+a)}},c.checkCvt=function(){promise=i.get(r.address()+"General/cvt?force="+c.first_call).then(function(e){if(first_Call=0,!s(e.data)){var n=e.data.crd,i=e.data.pas,r=e.data.device;for(var l in r){var u=r[l];switch(u.type){case"alicat":c.alicat.length>0&&!t(c.alicat,l)?c.alicat.push(new a(u.label,l,u.controller,u.sn,u.sp,u.address)):c.alicat=[new a(u.label,l,u.controller,u.sn,u.sp,u.address)];break;case"mTEC":c.mTEC.length>0&&!t(c.mTEC,l)?c.mTEC.push(new a(u.label,l,u.controller,u.sn,u.sp,u.address)):c.mTEC=[new a(u.label,l,u.controller,u.sn,u.sp,u.address)];break;case"vaisala":c.vaisala.length>0&&!t(c.vaisala,l)?c.vaisala.push(new a(u.label,l,u.controller,u.sn,u.sp,u.address)):c.vaisala=[new a(u.label,l,u.controller,u.sn,u.sp,u.address)];break;case"ppt":c.ppt.length>0&&!t(c.ppt,l)?c.ppt.push(new a(u.label,l,u.controller,u.sn,u.sp,u.address)):c.ppt=[new a(u.label,l,u.controller,u.sn,u.sp,u.address)];break;default:console.log("Unexpected device found...")}o.$broadcast("deviceListRefresh")}var d=e.data.Humidifier;c.humidifier[0].p=d.Med.p,c.humidifier[0].i=d.Med.i,c.humidifier[0].d=d.Med.d,c.humidifier[0].en=d.Med.ctl,c.humidifier[0].sp=d.Med.rhsp,c.humidifier[1].p=d.High.p,c.humidifier[1].i=d.High.i,c.humidifier[1].d=d.High.d,c.humidifier[1].en=d.High.ctl,c.humidifier[1].sp=d.High.rhsp,c.crd.fred=n.red.f,c.crd.fblue=n.blue.f,c.crd.dcred=n.red.dc,c.crd.dcblue=n.blue.dc,c.crd.kpmt=n.kpmt,c.pas.las.f0=i.las.f0,c.pas.las.vrange=i.las.vrange,c.pas.las.voffset=i.las.voffset,c.pas.las.enable=i.las.enabled,c.pas.spk.f0=i.spk.fcenter,c.pas.spk.df=i.spk.df,c.pas.spk.vrange=i.spk.vrange,c.pas.spk.voffset=i.spk.voffset,c.pas.spk.auto=i.spk.cycle,c.pas.spk.length=i.spk.length,c.pas.spk.period=i.spk.period,c.pas.spk.pos=i.spk.enabled,c.filter.cycle.period=e.data.Filter.period,c.filter.cycle.length=e.data.Filter.length,c.filter.cycle.auto=e.data.Filter.auto,c.filter.position=e.data.general.filter_pos;for(var p=Number(e.data.general.power).toString(2);p.length<5;)p+="0";c.power.Pump="1"==p[4],c.power.O3Gen="1"==p[3],c.power.Denuder="1"==p[2],c.power.Laser="1"==p[1],c.power.TEC="1"==p[0],o.$broadcast("cvtUpdated")}})},c.flows={},c.flows.updateSP=function(t,a){c.flows[t]=a,i.get(r.address()+"General/DevSP?SP="+a+"&DevID="+t)},c.updatePS=function(t){i.get(r.address()+"General/PowerSupply?val="+t)},c}])}(),function(){angular.module("main").config(["$routeProvider",function(t){t.when("/CRDS",{templateUrl:"crd/crds.html"}).when("/PAS",{templateUrl:"pas/pas.html"}).when("/O3",{templateUrl:"o3/ozone.html"}).when("/",{templateUrl:"main/main.html"}).when("/Flows",{templateUrl:"alicat/flows.html"}).when("/Temperature",{templateUrl:"views/temperature.html"}).when("/Humidifier",{templateUrl:"humidity/humidifier.html"}).when("/Common",{templateUrl:"views/common.html"}).when("/Config",{templateUrl:"config/config.html"}).when("/msg",{templateUrl:"msgs/msg.html"})}])}(),function(){function t(t,a,e){var n={name:"",version:"",pas:{},crd:{},flow:{},main_path:""},i=a.$$absUrl,s=i.search("#/");i=i.slice(0,s);var r="/"===i.slice(-1)?"":"/";n.main_path=i+r;var o=n.main_path+"ui.json";return t.get(o).then(function(t){n.name=t.data.name,n.version=t.data.version,n.pas=t.data.pasplot,n.crd=t.data.crdplot,n.flow=t.data.flowplot,e.$broadcast("CfgUpdated")},function(){console.log("Configuration file not found."),n.name="EXSCALABAR",n.version="0.1.0"})["finally"](function(){}),n}angular.module("main").factory("ExReadCfgSvc",t),t.$inject=["$http","$location","$rootScope"]}(),function(){angular.module("main").controller("ExMainCtl",["Data","$scope","$rootScope","$interval","cvt","ExReadCfgSvc",function(t,a,e,n,i,s){a.name=s.name,a.ver=s.version,n(function(){t.getData(),i.checkCvt()},1e3),a.$on("CfgUpdated",function(){a.name=s.name,a.ver=s.version})}])}(),function(){function t(t){var a=new Date(1904,0,1);return a.setSeconds(t),a}angular.module("main").factory("Data",["$rootScope","$http","net","cvt",function(a,e,n){var i=["pDryBlue"],s=["vDryRed","vDryBlue"],r={cTime:null,tObj:new Date,save:!0,o3cal:!1,Cabin:!1,time:[],msg:[],date:{}},o=300,l=!1;r.filter={state:!0,tremain:0};var c=!1;return r.getData=function(){c||(c=!0,promise=e.get(n.address()+"General/Data").then(function(e){r.filter.state=e.data.Filter;var n=e.data.fcycle.tt-e.data.fcycle.te;for(r.filter.tremain=n>0?n:0,u=0;u<i.length;u++)i[u]in e.data&&(r[i[u]]=e.data[i[u]]);for(var u=0;u<s.length;u++)s[u]in e.data&&(r[s[u]]=e.data[s[u]]);r.time.length-1>=o&&(l=!0),r.tObj=t(Number(e.data.Time)),r.Cabin=e.data.Cabin,r.msg=e.data.Msg,r.data=e.data,a.$broadcast("dataAvailable"),c=!1},function(){a.$broadcast("dataNotAvailable")})["finally"](function(){c=!1}))},r}])}(),function(){function t(t,a){function e(){if(a.msg.length>0){var e="<span>";for(i=0;i<a.msg.length;i++)e=a.msg[i].search("ERROR")>0?'<span class="cui-msg-error">':(a.msg[i].search("WARNING")>0,'<span class="cui-msg-info">'),n.msgs+=e+a.msg[i]+"</span><br>";for(i=0;i<a.msg.length;i++)a.msg[i].search("ERROR")>0?n.numType[2]+=1:a.msg[i].search("WARNING")>0?n.numType[1]+=1:n.numType[0]+=1;t.$broadcast("msgAvailable")}}var n={numType:[0,0,0],msgs:"",clearMsgArray:function(){this.msgs="",this.numType=[0,0,0],t.$broadcast("countCleared")},resetCount:function(){this.numType=[0,0,0]}};return t.$on("dataAvailable",e),n}angular.module("main").factory("ExMsgSvc",t),t.$inject=["$rootScope","Data"]}(),function(){function t(){return{restrict:"E",scope:{},templateUrl:"app/Messages/msg.html"}}angular.module("main").directive("exMsgDirective",t)}(),function(){angular.module("main").controller("ExMsgCtl",["$scope","ExMsgSvc",function(t,a){t.msgs=a.msgs,t.$on("msgAvailable",function(){t.msgs=a.msgs}),t.clrMsgs=function(){t.msgs="",a.clearMsgArray()}}])}(),function(){angular.module("main").controller("Sidebar",["$scope","$http","Data","net","cvt",function(t,a,e,n,i){t.save=1,t.filter=e.filter.state,t.time="Not connected",t.connected=!1,t.o3On=!1,t.cabin=!1,t.pumpBlocked=!1,t.impBlocked=!1,t.interlock=!1,t.time="Not Connected",t.connected=!1,t.$on("dataAvailable",function(){t.filter=e.filter.state,t.cabin=e.Cabin,t.connected=!0}),t.$on("cvtUpdated",function(){}),t.$on("dataNotAvailable",function(){t.connected=!1}),t.saveData=function(){t.save=!t.save;var e=t.save?1:0;a.get(n.address()+"General/Save?save="+e.toString())},t.setFilter=function(){t.filter=!t.filter;var e=t.filter?1:0;a.get(n.address()+"General/UpdateFilter?State="+e)},t.setCabin=function(){t.cabin=!t.cabin;var e=t.cabin?1:0;a.get(n.address()+"General/Cabin?Cabin="+e)},t.stop=function(){a.get(n.address()+"General/Stop")}}])}(),function(){angular.module("main").controller("mrAlicatConfigCtlr",["$scope",function(t){function a(t,a){this.address=t,this.id=a}t.entry=new a("A","default"),t.devices=[],t.addDevice=function(){t.devices.push(new a(t.entry.address,t.entry.id))},t.rmDevice=function(){}}])}(),function(){function t(t,a,e){function n(){this.IDs=[],this.Q=[],this.P=[],this.T=[],this.Q0=[],this.data={},this.Qsp=[],this.clear_data=function(){this.Q=[],this.P=[],this.T=[],this.Q0=[]}}function i(){this.Q=0,this.P=0,this.T=0,this.Q0=0,this.isController=!1,this.Qsp=0,this.label=""}function s(t,e){var n=t.id;e?(o.push(d.data[n].P),l.push(d.data[n].T),c.push(d.data[n].Q),u.push(d.data[n].Q0)):(o=[a.tObj,d.data[n].P],l=[a.tObj,d.data[n].T],c=[a.tObj,d.data[n].Q],u=[a.tObj,d.data[n].Q0])}function r(){for(var e="",n=0;n<m.length;n++)m[n].id in a.data&&(e=m[n].id,e in d.data||(d.data[e]=new i,0===d.IDs.length?d.IDs=[e]:d.IDs.push(e),a.data[e].Type.search("C")>=0&&(d.data[e].isController=!0,d.data[e].Qsp=a.data[e].Qsp)),d.data[e].P=a.data[e].P,d.data[e].T=a.data[e].T,d.data[e].Q=a.data[e].Q,d.data[e].label=m[n].label);m.forEach(s),f?(d.P.shift(),d.T.shift(),d.Q.shift(),d.Q0.shift()):h+=1,d.P.push(o),d.T.push(l),d.Q.push(c),d.Q0.push(u),f=h>=p,t.$broadcast("FlowDataAvailable")}var o,l,c,u,d=new n,p=300,f=!1,h=0,m=e.alicat;return t.$on("dataAvailable",r),t.$on("deviceListRefresh",function(){m=e.alicat}),d}angular.module("main").factory("ExFlowSvc",t),t.$inject=["$rootScope","Data","cvt"]}(),function(){angular.module("main").controller("ExFooterCtl",["$scope","ExMsgSvc","Data","ExCrdSvc",function(t,a,e,n){t.filter=!0,t.time="Not connected",t.connected=!1,t.o3On=!1,t.cabin=!1,t.pumpBlocked=!1,t.impBlocked=!1,t.interlock=!1,t.num_codes=[0,0,0],t.time="Not Connected",t.$on("dataAvailable",function(){t.time=e.tObj.toLocaleTimeString("en-US",{hour12:!1}),t.filter=e.filter,t.cabin=e.Cabin,t.connected=!0}),t.$on("msgAvailable",function(){t.num_codes=a.numType}),t.$on("countCleared",function(){t.num_codes=a.numType}),t.$on("dataNotAvailable",function(){t.connected=!1})}])}(),function(){angular.module("main").controller("ExPowerCtl",["$scope","cvt",function(t,a){t.power=a.power,t.order=["Pump","O3Gen","Denuder","Laser","TEC"],a.first_call=1,t.toggle=function(e){t.power[e]=!t.power[e];for(var n=0,i=0,s=0;s<t.order.length;s++)t.power.hasOwnProperty(t.order[s])&&(i=t.power[t.order[s]]?1:0,n+=Math.pow(2,s)*i);a.updatePS(n)}}])}(),function(){angular.module("main").controller("mrConfigCtlr",["$scope","$http","Data","net","cvt",function(t,a,e,n,i){i.first_call=1,t.network={ip:n.ip,port:n.port},t.changeIP=function(){n.setIP(t.network.ip)},t.changePort=function(){n.setPort(t.network.port)},t.filter={pos:!0,auto:!0,len:30,per:360,updatePos:function(){this.pos=!this.pos,console.log("updating filter position")},updateAuto:function(){auto=!auto,console.log("update filter auto")}},t.file={folder:"exscalabar\\data",main:"u:\\",mirror:"v:\\",prefix:"ex_",ext:".txt",max:10,save:!0}}])}(),function(){angular.module("main").controller("ExFilterCtl",["$scope","net","$http","cvt","Data",function(t,a,e,n,i){n.first_call=1,t.filter={cycle:n.filter.cycle,position:n.filter.position,updateCycle:function(){n.filter.updateCycle(this.cycle)},updateAuto:function(){this.cycle.auto=!this.cycle.auto,this.updateCycle()},updatePos:function(){n.filter.updatePos(this.position)}},t.tremain=i.filter.tremain,t.state=i.filter.state,t.updateAuto=function(){t.cycle.auto=!t.cycle.auto,t.updateCycle()},t.$on("dataAvailable",function(){t.tremain=i.filter.tremain,t.state=i.filter.state}),t.$on("cvtUpdated",function(){t.filter.cycle=n.filter.cycle})}])}(),function(){function t(t,n){function i(){s=e(n,s),t.$broadcast("crdDataAvaliable")}var s=new a;return t.$on("dataAvailable",i),s}function a(){this.tau=[],this.tau0=[],this.taucorr=[],this.tau0corr=[],this.ext=[],this.extcorr=[],this.stdevtau=[],this.etau=[],this.max=[],this.avg_rd=[],this.fit_rd=[],this.set_history=function(t){if(this.tau.length>t){var a=this.tau.length-t;this.tau.splice(0,a),this.tau.splice(0,a),this.tau0.splice(0,a),this.taucorr.splice(0,a),this.tau0corr.splice(0,a),this.ext.splice(0,a),this.extcorr.splice(0,a),this.stdevtau.splice(0,a),this.etau.splice(0,a),this.max.splice(0,a),n=!0}else n=!1;i=t},this.clear_history=function(){n=!1,this.tau=[],this.tau0=[],this.taucorr=[],this.tau0corr=[],this.ext=[],this.extcorr=[],this.stdevtau=[],this.etau=[],this.max=[]}}function e(t,a){var e=[t.tObj],s=[t.tObj],r=[t.tObj],o=[t.tObj],l=[t.tObj],c=[t.tObj],u=[t.tObj],d=[t.tObj],p=[t.tObj];n?(a.tau.shift(),a.tau0.shift(),a.taucorr.shift(),a.tau0corr.shift(),a.ext.shift(),a.extcorr.shift(),a.stdevtau.shift(),a.etau.shift(),a.max.shift()):n=a.tau.length>=i?!0:!1;for(var f in t.data.CellData)e.push(t.data.CellData[f].extParam.Tau),s.push(t.data.CellData[f].extParam.Tau0),l.push(t.data.CellData[f].extParam.Tau0cor),o.push(t.data.CellData[f].extParam.taucorr),c.push(t.data.CellData[f].extParam.ext),u.push(t.data.CellData[f].extParam.extCorr),r.push(t.data.CellData[f].extParam.stdevTau),d.push(t.data.CellData[f].extParam.eTau),p.push(t.data.CellData[f].extParam.max);a.avg_rd=[];for(var h=0;h<t.data.CellData[0].Ringdowns[0].length;h++){for(var m=[h],v=0;v<t.data.CellData.length;v++)m.push(t.data.CellData[v].Ringdowns[0][h]);a.avg_rd.push(m)}return a.tau.push(e),a.tau0.push(s),a.tau0corr.push(l),a.taucorr.push(o),a.extcorr.push(u),a.ext.push(c),a.stdevtau.push(r),a.etau.push(d),a.max.push(p),a}angular.module("main").factory("ExCrdSvc",t);var n=!1,i=300;t.$inject=["$rootScope","Data"]}(),function(){angular.module("main").controller("ExCrdCtl",["$scope","cvt","ExCrdSvc",function(t,a,e){a.firstcall=1;var n=function(t,a,e,n,i){this.rate=t,this.DC=a,this.k=e,this.en=n,this.id=i};t.setRate=function(){var t=arguments[0],e=arguments[1];a.crd.setLaserRate(t,e)},t.setEn=function(){var e=arguments[0];t.laser_ctl[e].en=!t.laser_ctl[e].en,a.crd.setEnable([t.laser_ctl[0].en,t.laser_ctl[1].en])},t.laser_ctl=[new n(a.crd.fblue,a.crd.dcblue,a.crd.kblue,a.crd.eblue,"Blue Laser"),new n(a.crd.fred,a.crd.dcred,a.crd.kred,a.crd.ered,"Red Laser")],t.pmt=a.crd.kpmt,t.setGain=function(){a.crd.setGain(t.pmt)},t.setLaserGain=function(){a.crd.setLaserGain([t.laser_ctl[0].k,t.laser_ctl[1].k])},t.purge={pos:!1,flow:.16,setValve:function(){this.pos=!this.pos,a.purge.setSw(this.pos)},setFlow:function(){}},t.data=e,t.setEnable=function(e){t.laser_ctl[e].en=!t.laser_ctl[e].en;var n=t.laser_ctl[e].en;switch(e){case 0:a.crd.eblue=n;break;case 1:a.crd.ered=n}},t.ringdownAvg=[[0,0/0,0/0,0/0,0/0,0/0]],t.options={title:"Ringdown Data",ylabel:"Ringdown Magnitude (au)",labels:["t","Cell 1","Cell 2","Cell 3","Cell 4","Cell 5"],legend:"always"},t.$on("crdDataAvaliable",function(){t.data=e,t.ringdownAvg=e.avg_rd}),t.$on("cvtUpdated",function(){t.laser_ctl[0].rate=a.crd.fblue,t.laser_ctl[0].DC=a.crd.dcblue,t.laser_ctl[0].k=a.crd.kblue,t.laser_ctl[0].enabled=a.crd.eblue,t.laser_ctl[1].rate=a.crd.fred,t.laser_ctl[1].DC=a.crd.dcred,t.laser_ctl[1].k=a.crd.kred,t.laser_ctl[1].enabled=a.crd.ered,t.pmt=a.crd.kpmt})}])}(),function(){function t(){var t=function(t,a,e){function n(){i.data=a[s]}var i=this,s="tau";i.cm=[["<em>&tau;</em>",function(){s="tau",i.options.ylabel="<em>&tau;</em> (&mu;s)"}],["<em>&tau;'</em>",function(){s="taucorr",i.options.ylabel="<em>&tau;'</em> (&mu;s)"}],["<em>&sigma;<sub>&tau;</sub></em>",function(){s="stdevtau",i.options.ylabel="<em>&sigma;<sub>&tau;</sub></em> (us)"}],["Max",function(){s="max",i.options.ylabel="Max (a.u.)"}],null,["Clear Data",function(){a.clear_history()}],["Length",null,[["30",function(){a.set_history(30)}],["60",function(){a.set_history(60)}],["120",function(){a.set_history(120)}],["150",function(){a.set_history(150)}],["300",function(){a.set_history(300)}]]]];var r=e.crd,o=["t"].concat(r.names);i.options={ylabel:"<em>&tau;</em> (&mu;s)",labels:o,legend:"always",axes:{y:{axisLabelWidth:70,drawGrid:r.yGrid},x:{drawAxis:!0,drawGrid:r.yGrid,axisLabelFormatter:function(t){return Dygraph.zeropad(t.getHours())+":"+Dygraph.zeropad(t.getMinutes())+":"+Dygraph.zeropad(t.getSeconds())}}},series:{}};for(var l=r.color.length,c=r.pattern.length,u=r.strokeWidth.length,d=0;d<r.names.length;d++){var p=null===r.pattern[d%c]?null:Dygraph[r.pattern[d%c]];i.options.series[r.names[d]]={color:r.color[d%l],strokeWidth:r.strokeWidth[d%u],strokePattern:p,drawPoints:!0}}void 0!==i.title&&(i.options.title=i.title),i.data=[[0,0/0,0/0,0/0,0/0,0/0]],t.$on("crdDataAvaliable",n)};return t.$inject=["$rootScope","ExCrdSvc","ExReadCfgSvc"],{restrict:"E",require:"contextMenu",scope:{title:"@?"},controller:t,controllerAs:"vm",bindToController:!0,template:'<context-menu menu-options="vm.cm"><dy-graph options="vm.options" data="vm.data" ></dy-graph></context-menu>'}}angular.module("main").directive("exCrdplot",t)}(),function(){function t(t,a,e){function n(){t.data=e}t.data=e,t.$on("pasDataAvailable",n),a.first_call=1}angular.module("main").controller("ExPasCtl",t),t.$inject=["$scope","cvt","ExPasSvc"]}(),function(){function t(t,n){var i=new a;return t.$on("dataAvailable",function(){i=e(n,i),t.$broadcast("pasDataAvaliable")}),i}function a(){this.f0=[],this.IA=[],this.Q=[],this.p=[],this.abs=[],this.wvfm={micf:[],mict:[],pd:[]},this.drive=!1,this.set_history=function(t){},this.clear=function(){this.f0=[],this.IA=[],this.Q=[],this.p=[],this.abs=[],n=!1}}function e(t,a){var e=[t.tObj],s=[t.tObj],r=[t.tObj],o=[t.tObj],l=[t.tObj];n?(a.f0.shift(),a.IA.shift(),a.Q.shift(),a.p.shift(),a.abs.shift()):n=a.f0.length>=i?!0:!1;for(var c in t.data.PAS.CellData)e.push(t.data.PAS.CellData[c].derived.f0),s.push(t.data.PAS.CellData[c].derived.IA),r.push(t.data.PAS.CellData[c].derived.Q),o.push(t.data.PAS.CellData[c].derived.noiseLim),l.push(t.data.PAS.CellData[c].derived.ext);for(a.f0.push(e),a.IA.push(s),a.Q.push(r),a.p.push(o),a.abs.push(l),a.drive=t.data.PAS.Drive,a.wvfm.mict=[],a.wvfm.micf=[],a.wvfm.pd=[],k=0;k<t.data.PAS.CellData[0].MicFreq.Y.length;k++){var u=[k],d=[k],p=[k];for(j=0;j<t.pas.CellData.length;j++)u.push(t.data.PAS.CellData[j].MicFreq.Y[j]),d.push(t.data.PAS.CellData[j].MicTime.Y[j]),p.push(t.data.PAS.CellData[c].PhotoDiode.Y[j]);a.wvfm.micf.push(u),a.wvfm.mict.push(d),a.wvfm.pd.push(p)}return a}angular.module("main").factory("ExPasSvc",t);var n=!1,i=300;t.$inject=["$rootScope","Data"]}(),function(){angular.module("main").controller("pasSpk",["$scope","cvt","Data",function(t,a,e){var n=10,i=5;t.speaker=a.pas.spk;var s={high:3e3,low:500};t.$on("cvtUpdated",function(){t.speaker=a.pas.spk}),t.setPos=function(){t.speaker.pos=!t.speaker.pos,a.pas.spk.updateCtl(t.speaker)},t.updateSpkV=function(){t.speaker.vrange>n?t.speaker.vrange=n:t.speaker.vrange<0&&(t.speaker.vrange=0),t.speaker.voffset>i?t.speaker.voffset=i:t.speaker.voffset<0&&(t.speaker.voffset=0),a.pas.spk.updateCtl(t.speaker)},t.updateSpkF=function(){t.speaker.f0>s.high?t.speaker.f0=s.high:t.speaker.f0<s.low&&(t.speaker.f0=s.low),a.pas.spk.updateCtl(t.speaker)},t.updateCycle=function(){a.pas.spk.updateCycle(t.speaker.auto,t.speaker.period,t.speaker.length)},t.updateAuto=function(){t.speaker.auto=!t.speaker.auto,t.updateCycle()}}])}(),function(){function t(t,a,e,n,i){this.Vrange=t,this.Voffset=a,this.f0=e,this.modulation=n,this.lasEn=!1}angular.module("main").controller("pasLas",["$scope","cvt","Data",function(a,e,n){for(a.lasCtl=[],a.testVal="hello",i=0;i<e.pas.las.vr.length;i++)a.lasCtl.push(new t(e.pas.las.vr[i],e.pas.las.voffset[i],e.pas.las.f0[i],e.pas.las.modulation[i],e.pas.las.enable[i]));a.$on("dataAvailable",function(){if(n.pas.drive)for(i=0;i<n.pas.cell.length;i++)a.lasCtl[i].f0=a.data.cell[i].f0[0].y}),a.$on("cvtUpdated",function(){for(i=0;i<e.pas.las.vr.length;i++)a.lasCtl[i].vr=e.pas.las.vr[i],a.lasCtl[i].vo=e.pas.las.voffset[i],a.lasCtl[i].f0=e.pas.las.f0[i],a.lasCtl[i].mod=e.pas.las.modulation[i],a.lasCtl[i].en=e.pas.las.enable[i]}),a.updateMod=function(t){a.lasCtl[t].modulation=!a.lasCtl[t].modulation;var n=[];for(j=0;j<a.lasCtl.length;j++)n.push(a.lasCtl[j].modulation);e.pas.las.updateMod(n)},a.updateVr=function(){var t=[];for(i=0;i<a.lasCtl.length;i++)t.push(a.lasCtl[i].Vrange);e.pas.las.setVr(t)},a.updateVo=function(){var t=[];for(i=0;i<a.lasCtl.length;i++)t.push(a.lasCtl[i].Voffset);e.pas.las.setVo(t)},a.updatef0=function(){var t=[];for(i=0;i<a.lasCtl.length;i++)t.push(a.lasCtl[i].f0);e.pas.las.setf0(t)},a.updateEnable=function(t){a.lasCtl[t].lasEn=!a.lasCtl[t].lasEn;var n=[];for(t=0;t<a.lasCtl.length;t++)n.push(a.lasCtl[t].lasEn);e.pas.las.updateEnable(n)}}])}(),function(){function t(t){var a=function(a,e){function n(){i.data=e[s]}var i=this,s="IA";i.cm=[["<em>IA (a.u.)</em>",function(){s="IA",i.options.ylabel="IA (a.u.)"}],["<em>f<sub>0</sub></em>",function(){s="f0",i.options.ylabel="<em>f<sub>0</sub></em> (Hz)"}],["Quality",function(){s="Q",i.options.ylabel="Quality (a.u.)"}],["Noise Floor",function(){s="p",i.options.ylabel="Noise (a.u.)"}],["<em>&sigma;<sub>abs</sub></em>",function(){s="abs",i.options.ylabel="<em>&sigma;<sub>abs</sub></em> (Mm<sup>-1</sup>)"}],null,["Clear Data",function(){e.clear()}],["History",null,[["30",function(){e.set_history(30)}],["60",function(){e.set_history(60)}],["120",function(){e.set_history(120)}],["150",function(){e.set_history(150)}],["300",function(){e.set_history(300)}]]],["Grid",null,[["Grid X",function(){}],["Grid Y",function(){}],["Enable",function(){}],["Disable",function(){}]]]];var r=t.pas,o=["t"].concat(r.names);i.options={ylabel:"<em>IA</em> (a.u.)",labels:o,legend:"always",axes:{y:{axisLabelWidth:70,drawGrid:r.yGrid},x:{drawAxis:!0,drawGrid:r.xGrid,axisLabelFormatter:function(t){return Dygraph.zeropad(t.getHours())+":"+Dygraph.zeropad(t.getMinutes())+":"+Dygraph.zeropad(t.getSeconds())}}},series:{}};for(var l=r.color.length,c=r.pattern.length,u=r.strokeWidth.length,d=0;d<r.names.length;d++){var p=null===r.pattern[d%c]?null:Dygraph[r.pattern[d%c]];i.options.series[r.names[d]]={color:r.color[d%l],strokeWidth:r.strokeWidth[d%u],strokePattern:p,drawPoints:!0}}void 0!==i.title&&(i.options.title=i.title),i.data=[[0,0/0,0/0,0/0,0/0,0/0]],a.$on("pasDataAvaliable",n)};return a.$inject=["$rootScope","ExPasSvc"],{restrict:"E",scope:{title:"@?"},controller:a,controllerAs:"vm",bindToController:!0,template:'<context-menu menu-options="vm.cm"><dy-graph options="vm.options" data="vm.data"></dy-graph></context-menu>'}}angular.module("main").directive("exPasplot",t),t.$inject=["ExReadCfgSvc"]}(),function(){function t(t,a,e){t.Devices={},t.updateSP=function(){var t=arguments[0];a.flows.updateSP(t.ID,t.sp)},t.$on("dataAvailable",function(){t.Devices=e.data})}angular.module("main").controller("ExFlowCtl",t),t.$inject=["$scope","Data","cvt","ExFlowSvc"]}(),function(){function t(){var t=function(t,a,e){function n(){var t=["t"].concat(a.IDs);if(t!==i.options.labels){i.options.labels=t.slice();for(var e=i.options.labels.slice(1),n=r.color.length,o=r.pattern.length,l=r.strokeWidth.length,c=0;c<e.length;c++){var u=null===r.pattern[c%o]?null:Dygraph[r.pattern[c%o]];i.options.series[e[c]]={color:r.color[c%n],strokeWidth:r.strokeWidth[c%l],strokePattern:u,drawPoints:!0}}}i.data=a[s]}var i=this,s="P";i.ref={},i.cm=[["P",function(){s="P",i.options.ylabel="<em>P</em> (mb)",i.options.axes.y.valueRange=[null,null]}],["T",function(){s="T",i.options.ylabel="<em>T</em> (&deg;C)",i.options.axes.y.valueRange=[null,null]}],["Q",function(){s="Q",i.options.ylabel="<em>Q</em> (lpm)",i.options.axes.y.valueRange=[null,null]}],["Q0",function(){s="Q0",i.options.ylabel="<em>Q<sub>0</sub></em> (slpm)",i.options.axes.y.valueRange=[null,null]}],null,["Controller",null,[["Enable All",function(){console.log("Enabling all.")}],["Clear Data",function(){a.clear_data()}]]],["Autoscale",null,[["Autoscale 1x",function(){i.options.axes.y.valueRange=i.ref.yAxisRange()}],["Autoscale",function(){i.options.axes.y.valueRange=[null,null]}]]]];var r=e.flow;i.options={ylabel:"<em>P</em> (mb)",labels:["t","Alicat0"],legend:"always",axes:{y:{axisLabelWidth:70,drawGrid:r.yGrid},x:{drawAxis:!0,drawGrid:r.xGrid,axisLabelFormatter:function(t){return Dygraph.zeropad(t.getHours())+":"+Dygraph.zeropad(t.getMinutes())+":"+Dygraph.zeropad(t.getSeconds())}}},series:{},labelsUTC:!0},void 0!==i.title&&(i.options.title=i.title),i.data=[[0,0/0]],t.$on("FlowDataAvailable",n)};return t.$inject=["$rootScope","ExFlowSvc","ExReadCfgSvc"],{restrict:"E",require:"contextMenu",scope:{title:"@?"},controller:t,controllerAs:"vm",bindToController:!0,template:'<context-menu menu-options ="vm.cm"><dy-graph options="vm.options" ref="vm.ref" data="vm.data" ></dy-graph></context-menu>'}}angular.module("main").directive("exFlowplot",t)}(),function(){function t(t,s,r){function o(){for(var a in u){var r=a.id;r in s.data&&(!r in c.data?(c.data[r]=new e(s.data[r].P,s.data[r].T),0===c.IDs?c.IDs=[r]:c.IDs.push(r)):(c.data[r].P=s.data[r].P,c.data[r].T=s.data[r].T),u.forEach(l),d?(c.P.shift(),c.T.shift()):i+=1,c.P.push(p),c.T.push(f),d=i>=n,t.$broadcast("PptDataAvailable"))}}function l(t,a){a?(p.push(c.data[t.id].P),f.push(c.data[t.id].T)):(p=[s.tObj,c.data[t.id].P],f=[s.tObj,c.data[t.id].T])}var c=new a,u=r.ppt,d=!1;t.$on("deviceListRefresh",function(){u=r.ppt}),t.$on("dataAvailable",o);var p,f;return c}function a(){this.IDs=[],this.T=[],this.P=[],this.data={},this.clear_data=function(){this.P=[],this.T=[]},this.set_max=function(t){n=t}}function e(t,a){this.T=a,this.P=t}angular.module("main").factory("ExPptSvc",t);var n=300,i=0;t.$inject=["$rootScope","Data","cvt"]}(),function(){angular.module("main").controller("ExHumidityCtl",["$scope","cvt","Data",function(t,a,e){a.first_call=1,t.h=a.humidifier,t.setEnable=function(a){t.h[a].en=!t.h[a].en,t.updateHum(a)},t.updateHum=function(){var t=arguments[0];a.humidifier[t].updateParams()},t.ctlrOutData=[[0,0/0,0/0]],t.RH=[[0,0/0,0/0]],t.optCtlOut={ylabel:"Controller Output",labels:["t","med","high"],legend:"always"},t.optRH={ylabel:"RH (%)",labels:["t","med","high"],legend:"always"}}])}(),function(){angular.module("main").controller("startCal",["$scope","$http","net","cvt",function(t,a,e,n){t.cal=n.ozone,t.startCalibration=function(){t.cal=!t.cal;var i=t.cal?1:0;n.ozone=t.cal,a.get(e.address()+"General/ozone?start="+i.toString())}}])}(),function(){angular.module("main").controller("O3Table",["$scope","tableService",function(t,a){t.table_vals=[{id:"Wait",step:"Wait",descr:"Set a wait time in the ozone cal in seconds"},{id:"Filter",step:"Filter",descr:"Boolean that sets the filter state."},{id:"Speaker",step:"Speaker",descr:"Boolean that sets the speaker state."},{id:"O2-Valve",step:"O2 Valve",descr:"Boolean that sets the O2 valve position."},{id:"O3-Valve",step:"O3 Valve",descr:"Boolean that sets the O3 valve state."},{id:"O3-Generator",step:"O3 Generator",descr:"Boolean that sets the O3 generator state."},{id:"QO2",step:"QO2",descr:"Numeric to set the oxygen flow rate"}],t.clickRow=function(t){a.setTab(t.id.toString())}}])}(),function(){angular.module("main").factory("tableService",["$rootScope",function(t){var a={curTab:"",getTab:function(){return this.curTab},setTab:function(a){this.curTab=a,t.$broadcast("handleBroadcast")}};return a}])}(),function(){angular.module("main").factory("SaveData",function(){var t={data:[],setData:function(t){this.data=t},getData:function(){return this.data}};return t})}(),function(){angular.module("main").controller("Save",["$scope","SaveData","$http","net",function(t,a,e,n){t.cal_file="default",t.save=function(){var i='<?xml version="1.0" encoding="utf-8"?>\r\n<OZONE>\r\n';a.getData().forEach(function(t){i+="	<"+t.id+">"+t.val+"</"+t.id+">\r\n"}),i+="</OZONE>",e({method:"POST",url:n.address()+"Calibration/saveCalFile?file_name="+t.cal_file+".xml",data:i,headers:{"Content-Type":"application/x-www-form-urlencoded"}})}}])}(),function(){angular.module("main").controller("InputTable",["$scope","tableService","SaveData",function(t,a,e){t.data=[],t.$on("handleBroadcast",function(){var n=a.getTab(),i="";switch(n){case"O3-Valve":case"O2-Valve":case"O3-Generator":case"Filter":i="FALSE";break;case"Wait":case"Speaker":i="20";break;case"QO2":i="100"}t.data.push({id:n,val:i}),e.setData(t.data)})}])}(),function(){function t(){return{restrict:"E",scope:{},templateUrl:"sidebar/side.html"}}angular.module("main").directive("sidebar",t)}(),function(){angular.module("main").factory("navservice",["$http","net","cvt",function(t,a){var e={};return e.stop=function(){t.get(a.address()+"General/Stop")},e.save=function(e){var n=e?1:0;t.get(a.address()+"General/Save?save="+n.toString())},e}])}(),function(){function t(){return{restrict:"E",scope:{name:"=?"},templateUrl:"nav/navi.html"}}angular.module("main").directive("navi",t)}(),function(){angular.module("main").controller("navctlr",["$scope","navservice",function(t,a){t.save=!0,t.updateSave=function(){t.save=!t.save,a.save(t.save)},t.stop=function(){a.stop()}}])}();