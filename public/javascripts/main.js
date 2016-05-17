$('#habitatForm').on('submit',function(e){
  $.ajax({
      url: '/habitat',
      dataType: "json",
      method: "POST",
      success: function(data, textStatus, jqXHR){
        console.log("Success");
        console.log(data);
      }
    });
});

var contacts = [];
$('#addForm').on('submit',function(e){
  e.preventDefault();
  var o2Req = $('#o2Req').val();
  var foodReq = $('#foodReq').val();
  var wasteAmt = $('#wasteAmt').val();
  var radTol = $('#radTol').val();
  contacts.push(o2Req,foodReq,wasteAmt,radTol);
  console.log(contacts);
  $('#o2Req').val("");
  $('#foodReq').val("");
  $('#wasteAmt').val("");
  $('#radTol').val("");
  $('#modalContainer').modal('hide');
  $('#o2').prepend(o2Req);
  $('#food').prepend(foodReq);
  $('#waste').prepend(wasteAmt);
  $('#rad').prepend(radTol);
  $.ajax({
      url: '/astronaut',
      dataType: "json",
      method: "POST",
      data: {
        o2Req: o2Req,
        foodReq: foodReq,
        wasteAmt: wasteAmt,
        radTol: radTol
        },
      success: function(data, textStatus, jqXHR){
        console.log("Success");
        console.log(data);
      }
    });
});
var environment = [];
$('#envirForm').on('submit',function(e){
  e.preventDefault();
  var tempAvg = $('#tempAvg').val();
  var radLvl = $('#radLvl').val();
  var lat = $('#lat').val();
  var lon = $('#lon').val();
  var numGeo = $('#numberOfSteps').val();
  var dataObj = {tempAvg:tempAvg,radLvl:radLvl,lat:lat,lon:lon,numSteps:numGeo};
  environment.push(tempAvg,radLvl,lat,lon);
  $('numberOfSteps').val(0);
  for (var i=0;i<=numGeo;i++){
    var name = $('#name'+i).val();
    var desc = $('#desc'+i).val();
    var distFrom = $('#distFrom'+i).val();
    $('#name'+i).val(" ");
    $('#desc'+i).val(" ");
    $('#distFrom'+i).val("");
    dataObj['name'+i] = name;
    dataObj['desc'+i] = desc;
    dataObj['distFrom'+i] = distFrom;
    environment.push(name,desc,distFrom);
  }
  
  console.log(environment);
  $('#tempAvg').val("");
  $('#lat').val("");
  $('#long').val("");
  $('#radLvl').val("");
  $('#modalContainer').modal('hide');
  var tempBody = "<tr><td>"+tempAvg+" &#8451;</td><td>"+radLvl+" milliSeverts/yr</td><td>"+lat+", "+lon+"</td><td>Geologic Feature(s)</td><table>";
  for (var i=0;i<numGeo;i++){
    tempBody+="<tr><td>"+dataObj['name'+i]+"</td></tr><tr><td>"+dataObj['desc'+i]+"</td></tr><tr><td>"+dataObj['distFrom'+i]+" km from site</td></tr></table>";
  }
  tempBody+="</tr>";
  $('tbody').append(tempBody);

  $.ajax({
      url: '/environment',
      dataType: "json",
      method: "POST",
      data: dataObj,
      success: function(data, textStatus, jqXHR){
        console.log("Success");
        console.log(data);
      }
    });
});

var lab = [];
$('#labForm').on('submit',function(e){
  e.preventDefault();
  var title = $('#title').val();
  var leng = $('#leng').val();
  var wide = $('#wide').val();
  var high = $('#high').val();
  var numEquip = $('#numberOfSteps').val();
  var dataObj = {title:title,leng:leng,wide:wide,high:high,numSteps:numEquip};
  lab.push(title,leng,wide,high);
  $('numberOfSteps').val(0);
  for (var i=0;i<=numEquip;i++){
    var name = $('#name'+i).val();
    var desc = $('#desc'+i).val();
    var imageUrl = $('#imageUrl'+i).val();
    var power = $('#power'+i).prop('checked');
    $('#name'+i).val(" ");
    $('#desc'+i).val(" ");
    $('#imageUrl'+i).val("");
    $('#power'+i).prop('checked',false);
    dataObj['name'+i] = name;
    dataObj['desc'+i] = desc;
    dataObj['imageUrl'+i] = imageUrl;
    dataObj['power'+i] = power;
    lab.push(name,desc,imageUrl,power);
  }
  
  console.log(lab);
  $('#title').val("");
  $('#leng').val("");
  $('#wide').val("");
  $('#high').val("");
  $('#modalContainer').modal('hide');
  var tempBody = "<tr><td>"+title+"</td><td>"+leng+"m x "+wide+" m x "+high+" m</td><td>Equipment</td><table>";
  for (var i=0;i<numEquip;i++){
    tempBody+="<tr><td>"+dataObj['name'+i]+"</td></tr><tr><td>"+dataObj['desc'+i]+"</td></tr><tr><td><img class='equipImage' src='"+dataObj['imageUrl'+i]+"'></td><td>Power needed? "+power+"</td></tr></table>";
  }
  tempBody+="</tr>";
  $('tbody').append(tempBody);

  $.ajax({
      url: '/lab',
      dataType: "json",
      method: "POST",
      data: dataObj,
      success: function(data, textStatus, jqXHR){
        console.log("Success");
        console.log(data);
      }
    });
});

$('#deleteForm').on('submit',function(e){
  e.preventDefault();
  var name = $('#name').val();
  var index = contacts.indexOf(name);
  contacts.splice(index,1);
  console.log(contacts);
  $('#name').val(" ");
  $('#modalContainer').modal('hide');
  $('tbody').append("<tr><td>"+name+" has been deleted</td><tr>");
});
