define(function(require,exports,module){function updateDDNSStatus(){var obj=arguments[0];showConnectStatus(obj.ddns.ddnsStatus)}function PortMapModule(){function createPortTable(arry){var listArry=arry,len=listArry.length,i=0,str="";for($("#portTbody").html(""),i=0;len>i;i++)str+="<tr>",str+="<td>"+listArry[i].portListIntranetIP+"</td>",str+="<td>"+listArry[i].portListIntranetPort+"</td>",str+="<td>"+listArry[i].portListExtranetPort+"</td>",str+="<td data-val='"+listArry[i].portListProtocol+"'>"+$("#protocol [value='"+listArry[i].portListProtocol+"']").html()+"</td>",str+="<td><div class='ico icon-minus-circled text-primary' titile='"+_("Delete")+"'></div></td>",str+="</tr>";$("#portTbody").html(str)}function checkAddListValidate(){var inIp=$("#internalIP").val(),inPort=$("#internalPort")[0].val(),outPort=$("#externalPort").val(),lanIP=pageModule.data.lanIP,lanMask=pageModule.data.lanMask,i=0,k=0,portArry=$("#portTbody").children(),length=portArry.length,existExternalPort="";for(k=0;length>k;k++)if(existExternalPort=portArry.eq(k).children().eq("2").html(),outPort==existExternalPort)return _("The external port %s already exists.",[outPort]);if(!/^([1-9]|[1-9]\d|1\d\d|2[0-1]\d|22[0-3])\.(([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){2}([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/.test(inIp))return $("#internalIP").focus(),_("Please input a valid IP address.");if(!checkIpInSameSegment(inIp,lanMask,lanIP,lanMask))return $("#internalIP").focus(),_("%s and %s must be in the same network segment.",[_("Internal IP"),_("LAN IP")]);var msg=checkIsVoildIpMask(inIp,lanMask,_("Internal IP"));if(msg)return $("#internalIP").focus(),msg;if(inIp==lanIP)return _("Internal IP should not be the same with the login IP(%s)",[lanIP]);if(""==inPort||parseInt(inPort,10)>65535||parseInt(inPort,10)<1)return $("#internalPort").find(".input-box").focus(),_("Internal Port Range: 1-65535");if(""==outPort||parseInt(outPort,10)>65535||parseInt(outPort,10)<1)return $("#externalPort").focus(),_("External Port Range: 1-65535");for(i=0;length>i;i++)if(portArry.eq(i).children().eq(3).html()==outPort)return $("#externalPort").focus(),_("External port repeat! One external port can only be used for one mapping.");return $("#portTbody").children().length>=16?_("Up to %s entries can be added.",[16]):void 0}function addPortList(){var str="",inIp=$("#internalIP").val(),inPort=$("#internalPort")[0].val(),outPort=$("#externalPort").val(),protocol=$("#protocol").val(),msg=checkAddListValidate();return msg?void mainLogic.showModuleMsg(msg):(str+="<tr>",str+="<td>"+inIp+"</td>",str+="<td>"+inPort+"</td>",str+="<td>"+outPort+"</td>",str+="<td data-val='"+protocol+"'>"+$("#protocol option:selected").html()+"</td>",str+="<td><div class='ico icon-minus-circled text-primary'></div></td>",str+="</tr>",$("#portTbody").append(str),$("#internalIP").val(""),void top.mainLogic.initModuleHeight())}function getPortListValue(){var str="",i=0,$portArry=$("#portTbody").children(),length=$portArry.length,inIp=$("#internalIP").val(),inPort=$("#internalPort")[0].val(),outPort=$("#externalPort").val(),protocol=$("#protocol").val();for(i=0;length>i;i++)str+=$portArry.eq(i).children().eq(0).html()+";",str+=$portArry.eq(i).children().eq(1).html()+";",str+=$portArry.eq(i).children().eq(2).html()+";",str+=$portArry.eq(i).children().eq(3).attr("data-val"),str+="~";str=str.replace(/[~]$/,"");var msg=checkAddListValidate();return msg?($("#internalIP")[0].blur(),$("#externalPort")[0].blur(),$("#internalPort").find(".input-box")[0].blur()):(str+=""!=str?"~"+inIp+";"+inPort+";"+outPort+";"+protocol:inIp+";"+inPort+";"+outPort+";"+protocol,$("#internalIP").val("")),str}function delPortList(){$(this).parent().parent().remove(),top.mainLogic.initModuleHeight()}this.init=function(){this.initHtml(),this.initEvent()},this.initHtml=function(){var selectObj={initVal:"21",editable:"1",size:"small",seeAsTrans:!0,options:[{21:"21 (FTP)",23:"23 (TELNET)",25:"25 (SMTP)",53:"53 (DNS)",80:"80 (HTTP)",3389:_("3389 (Remote Desktop)"),9000:"9000",".divider":".divider",".hand-set":_("Manual")}]};$("#internalPort").toSelect(selectObj),$("#externalPort").val("21")},this.initEvent=function(){$.validate.valid.ddns=function(str){var ret;return(ret=$.validate.valid.ascii(str))?ret:(ret=$.validate.valid.remarkTxt(str,";"),ret?ret:void 0)},$("#portHead").delegate(".icon-plus-circled","click",addPortList),$("#portTbody").delegate(".icon-minus-circled","click",delPortList),$("#internalPort .input-box, #externalPort").on("keyup",function(){this.value=parseInt(this.value,10)||""}),$("#internalPort .input-box, #externalPort").on("blur",function(){this.value=parseInt(this.value,10)||""}),$("#internalPort.input-append ul li").on("click",function(){$("#externalPort")[0].value=".hand-set"==$(this).attr("data-val")?$("#externalPort").val():$(this).attr("data-val")})},this.initValue=function(){createPortTable(pageModule.data.portList)},this.checkData=function(){},this.getSubmitData=function(){var data={portList:getPortListValue()};return objToString(data)}}function StaticModule(){function createStaticIpList(arry){var i=0,len=arry.length;for($("#staticTbody").html(""),i=0;len>i;i++)listStr="",listStr+="<tr>",listStr+='<td class="span-fixed">'+arry[i].staticIP+"</td>",listStr+='<td class="span-fixed">'+arry[i].staticMac.toUpperCase()+"</td>",listStr+='<td class="span-fixed remark"></td>',listStr+="<td><div class='ico icon-minus-circled text-primary'></div></td>",listStr+="</tr>",$("#staticTbody").append(listStr),$("#staticTbody").find(".remark").text(arry[i].staticRemark),$("#staticTbody").find(".remark").removeClass("remark")}function checkAddStaticValidate(){var staticIp=$("#staticIp").val(),mac=$("#staticMac").val(),startIP=pageModule.data.lanStartIP,endIP=pageModule.data.lanEndIP,lanIP=pageModule.data.lanIP,lanMask=pageModule.data.lanMask;if(!/^([1-9]|[1-9]\d|1\d\d|2[0-1]\d|22[0-3])\.(([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){2}([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/.test(staticIp))return $("#staticIp").focus(),_("Please input a valid IP address.");if(!checkIpInSameSegment(staticIp,lanMask,lanIP,lanMask))return $("#staticIp").focus(),_("%s and %s must be in the same network segment.",[_("Static IP"),_("LAN IP")]);var msg=checkIsVoildIpMask(staticIp,lanMask,_("Static IP"));if(msg)return $("#staticIp").focus(),msg;if(staticIp==lanIP)return $("#staticIp").focus(),_("%s should not be the same with the %s(%s)",[_("Static IP"),_("LAN IP"),lanIP]);var ipNumber,sipNumber,eipNumber,ipArry=staticIp.split("."),sipArry=startIP.split("."),eipArry=endIP.split(".");if(ipNumber=256*parseInt(ipArry[0],10)*256*256+256*parseInt(ipArry[1],10)*256+256*parseInt(ipArry[2],10)+parseInt(ipArry[3],10),sipNumber=256*parseInt(sipArry[0],10)*256*256+256*parseInt(sipArry[1],10)*256+256*parseInt(sipArry[2],10)+parseInt(sipArry[3],10),eipNumber=256*parseInt(eipArry[0],10)*256*256+256*parseInt(eipArry[1],10)*256+256*parseInt(eipArry[2],10)+parseInt(eipArry[3],10),sipNumber>ipNumber||ipNumber>eipNumber)return $("#staticIp").focus(),_("IP address must be included in the address pool of DHCP");if(!/^([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}$/.test(mac)&&!/^([0-9a-fA-F]{2}-){5}[0-9a-fA-F]{2}$/.test(mac))return $("#staticMac").focus(),_("Please input a valid MAC address.");mac=mac.replace(/[-]/g,":");var subMac1=mac.split(":")[0];if(subMac1.charAt(1)&&parseInt(subMac1.charAt(1),16)%2!==0)return $("#staticMac").focus(),_("The second character must be even number.");if("00:00:00:00:00:00"===mac)return $("#staticMac").focus(),_("MAC can not be 00:00:00:00:00:00.");var listMac,listIp,$listArry=$("#staticTbody").children(),len=$listArry.length,i=0;for(i=0;len>i;i++){if(listIp=$listArry.eq(i).children().eq(0).html(),listMac=$listArry.eq(i).children().eq(1).html(),staticIp==listIp)return $("#staticIp").focus(),_("This IP address is used. Please try another.");if(listMac.toUpperCase()==mac.toUpperCase())return $("#staticMac").focus(),_("This MAC address is used. Please try another.")}return $("#staticTbody").children().length>=20?_("Up to %s entries can be added.",[20]):void 0}function delStaticList(){$(this).parent().parent().remove(),top.mainLogic.initModuleHeight()}function addStaticList(){var str,msg=checkAddStaticValidate();return msg?void mainLogic.showModuleMsg(msg):(str="<tr>",str+='<td class="span-fixed">'+$("#staticIp").val()+"</td>",str+='<td class="span-fixed">'+$("#staticMac").val().replace(/[-]/g,":").toUpperCase()+"</td>",str+='<td class="span-fixed">'+toHtmlCode($("#staticRemark").val())+"</td>",str+="<td><div class='ico icon-minus-circled text-primary'></div></td>",str+="</tr>",$("#staticTbody").append(str),$("#staticIp").val(""),$("#staticMac").val(""),$("#staticRemark").val(""),void top.mainLogic.initModuleHeight())}function getStaticValue(){var str="",i=0,$staticArry=$("#staticTbody").children(),length=$staticArry.length;for(i=0;length>i;i++)str+=$staticArry.eq(i).children().eq(0).html()+"	",str+=$staticArry.eq(i).children().eq(1).html().toUpperCase()+"	",str+=$staticArry.eq(i).children().eq(2).text()+"	",str+="\n";str=str.replace(/[\n]$/,"");var msg=checkAddStaticValidate();return msg?($("#staticIp")[0].blur(),$("#staticMac")[0].blur()):(str+=""!=str?"\n"+$("#staticIp").val()+"	":$("#staticIp").val()+"	",str+=$("#staticMac").val().replace(/[-]/g,":")+"	",str+=$("#staticRemark").val(),$("#staticIp").val(""),$("#staticMac").val(""),$("#staticRemark").val("")),str}this.init=function(){this.initEvent()},this.initEvent=function(){$("#staticHead").delegate(".icon-plus-circled","click",addStaticList),$("#staticTbody").delegate(".icon-minus-circled","click",delStaticList)},this.initValue=function(){createStaticIpList(pageModule.data.staticList)},this.checkData=function(){},this.getSubmitData=function(){var data={staticList:getStaticValue()};return objToString(data)}}function DmzModule(){function changeDmzEn(){var dmzEn=$("input[name='dmzEn']:checked").val();"true"==dmzEn?$("#dmzWrap").removeClass("none"):$("#dmzWrap").addClass("none"),top.mainLogic.initModuleHeight()}this.init=function(){this.initEvent()},this.initEvent=function(){$("input[name='dmzEn']").on("click",changeDmzEn)},this.initValue=function(){$("input[name='dmzEn'][value='"+pageModule.data.dmz.dmzEn+"']")[0].checked=!0,$("#dmzHostIP").val(pageModule.data.dmz.dmzHostIP||""),changeDmzEn()},this.checkData=function(){var dmzIP=$("#dmzHostIP").val(),lanIP=pageModule.data.lanIP,lanMask=pageModule.data.lanMask;if($("input[name='dmzEn']")[0].checked){if(!checkIpInSameSegment(dmzIP,lanMask,lanIP,lanMask))return $("#dmzHostIP").focus(),_("%s and %s must be in the same network segment.",[_("Host IP"),_("LAN IP")]);var msg=checkIsVoildIpMask(dmzIP,lanMask,_("Host IP"));if(msg)return $("#dmzHostIP").focus(),msg;if(dmzIP==lanIP)return _("DMZ host IP should not be the same with the login IP(%s)",[lanIP])}},this.getSubmitData=function(){var data={dmzEn:$("input[name='dmzEn']:checked").val(),dmzHostIP:$("#dmzHostIP").val()};return objToString(data)}}function DdnsModule(){function changeDdnsEn(){var ddnsEn=$("input[name='ddnsEn']:checked").val();"true"==ddnsEn?$("#ddnsWrap").removeClass("none"):$("#ddnsWrap").addClass("none"),top.mainLogic.initModuleHeight()}function changeDdnsServiceName(){var domainName=$("#ddnsServiceName").val();$("#ddnsUser, #ddnsPwd, #ddnsServer").removeValidateTipError(!0),domainName==pageModule.data.ddns.ddnsServiceName?($("#ddnsUser").val(pageModule.data.ddns.ddnsUser),$("#ddnsPwd").val(pageModule.data.ddns.ddnsPwd),$("#ddnsServer").val(pageModule.data.ddns.ddnsServer)):($("#ddnsUser").val(""),$("#ddnsPwd").val("")),"3322.org"==domainName?$("#ddnsDomain").removeClass("none"):$("#ddnsDomain").addClass("none"),top.mainLogic.initModuleHeight()}this.init=function(){this.initEvent()},this.initEvent=function(){$("input[name='ddnsEn']").on("click",changeDdnsEn),$("#ddnsServiceName").on("change",changeDdnsServiceName),$("#register").on("click",function(){var url=$("#ddnsServiceName").val();window.open("http://"+url)}),this.addInputEvent=!1},this.initValue=function(){$("html").hasClass("lang-cn")&&$("#ddnsConnectionStatusInfo").html("连接状态"),this.addInputEvent||($("#ddnsPwd").initPassword(),this.addInputEvent=!0),inputValue(pageModule.data.ddns),showConnectStatus(pageModule.data.ddns.ddnsStatus),changeDdnsEn(),"3322.org"!=$("#ddnsServiceName").val()?$("#ddnsDomain").addClass("none"):$("#ddnsDomain").removeClass("none")},this.checkData=function(){},this.getSubmitData=function(){var data={ddnsEn:$("input[name='ddnsEn']:checked").val(),ddnsServiceName:$("#ddnsServiceName").val(),ddnsServer:$("#ddnsServer").val(),ddnsUser:$("#ddnsUser").val(),ddnsPwd:$("#ddnsPwd").val()};return objToString(data)}}function showConnectStatus(status){var str="";stArr=$("html").hasClass("lang-cn")?{Disconnected:"未连接",Connectting:"连接中",Connected:"已连接"}:{Disconnected:_("Disconnected"),Connectting:_("Connecting"),Connected:_("Connected")},str="Connected"==status?"text-success":"Connectting"==status?"text-primary":"text-danger",$("#ddnsStatus").attr("class",str).html(stArr[status])}function UpnpModule(){this.init=function(){this.initEvent()},this.initEvent=function(){},this.initValue=function(){inputValue(pageModule.data)},this.checkData=function(){},this.getSubmitData=function(){var data={upnpEn:$("input[name='upnpEn']:checked").val()};return objToString(data)}}function toHtmlCode(str){if(typeof str!="string"){return str;}else{return str?str.replace(/[<>\"]/g,function(char){switch(char){case'<':return'&lt;';case'>':return'&gt;';case'"':return'&quot;';}}):'';}}var pageModule=new PageLogic("goform/getNAT","goform/setNAT");pageModule.initEvent=function(){pageModule.update(2e3,updateDDNSStatus)},pageModule.modules=[],module.exports=pageModule;var portMap=new PortMapModule;pageModule.modules.push(portMap);var staticModule=new StaticModule;pageModule.modules.push(staticModule);var dmzModule=new DmzModule;pageModule.modules.push(dmzModule);var ddnsModule=new DdnsModule;pageModule.modules.push(ddnsModule);var upnpModule=new UpnpModule;pageModule.modules.push(upnpModule)});