//console.log("Loaded");

function jsload() {

var form = document.getElementById('image-form');
var uploadbox = document.getElementById('image-select');
var submit = document.getElementById('upload-button');
var status = document.getElementById('upload-status');
var receiptWrap = document.getElementById('receipt-block')
var receiptImage = document.getElementById('receipt');
//receiptImage.hide();

console.log(status.innerHTML);

form.onsubmit = function(event) {
  event.preventDefault();
  console.log(status.innerHTML);

  // Update button text.
  var files = uploadbox.files;
  if (files.length === 0)
    return;
  Materialize.toast('Image is uploading...', 10000);
  // status.innerHTML = 'Uploading...';

  var formData = new FormData();

  for (var i=0; i< files.length; ++i) {
    var file = files[i];
    if (!file.type.match('image.*')) {
      continue;
    }

    formData.append('image', file, file.name);

  }

  console.log(formData);
  // request
  var xmlreq = new XMLHttpRequest();

  xmlreq.open('POST', '/image', true);
  xmlreq.onreadystatechange = function() {
    if (xmlreq.readyState === 4) {
      if (xmlreq.responseText && xmlreq.responseText[0]==='{') { // got JSON
        Materialize.toast('Upload is complete!', 10000);
        // status.innerHTML = "Upload complete.";
        $(receiptWrap).show();

        var json = JSON.parse(xmlreq.responseText);

        receiptImage.src = json.imageLocation;
        document.getElementById("receipt-preview").innerHTML = json.full_text.replace(/\r\n/g, "<br>");

        var businessName = document.getElementById("businessName");
        if (json.business_name != "None found.")
          $(businessName).val(json.business_name).change();
        else
          $(businessName).attr("placeholder", json.business_name).change();

        var phoneNumber = document.getElementById("phoneNumber");
        if (json.phone_number != "None found.")
          $(phoneNumber).val(json.phone_number).change();
        else
          $(phoneNumber).attr("placeholder", json.phone_number).change();

        var address = document.getElementById("address");
        if (json.address != "None found.")
          $(address).val(json.address).change();
        else
          $(address).attr("placeholder", json.address).change();

        // Create Line Items
        var lineItemHeader = '<p class="line-items">Line Items</p>';
        $('#line-items-container').before(lineItemHeader);

        for(var i=0; i<json.line_items.length; i++) {
            var item = '<div class="row">'+
              '<div class="input-field col s8">'+
                '<input id="lineItem' + i + 'Description" type="text" class="validate" value="' + json.line_items[i].name + '">'+
                '<label for="lineItem' + i + 'Description">Description</label>'+
              '</div>'+
              '<div class="input-field col s4">'+
                '<input id="lineItem' + i + 'Price" type="text" class="validate" value="' + json.line_items[i].price + '">'+
                '<label for="lineItem' + i + 'Price">Price</label>'+
              '</div>'+
            '</div>';

            $('#line-items-container').before(item);
            $('#lineItem' + i + 'Description').change();
            $('#lineItem' + i + 'Price').change();
        }

        var totalPrice = document.getElementById("totalPrice");
        if (json.total_price != "None found.")
          $(totalPrice).val(json.total_price).change();
        else
          $(totalPrice).attr("placeholder", json.total_price).change();
      }
      else
        Materialize.toast('Upload has failed.', 4000);
        // status.innerHTML = "Upload failed.";
    }
    console.log(xmlreq.readyState);
    console.log(xmlreq.responseText);
  };
  /*
  xmlreq.onload = function (e) {
    console.log(xmlreq.status);
    if (xmlreq.status === 200) {
      // File(s) uploaded.
      uploadButton.innerHTML = 'Upload';
    } else {
      alert('File not uploaded due to error');
      uploadButton.innerHTML = 'Upload';
      console.log(e);
    }

  };*/
  xmlreq.send(formData);

}



};
