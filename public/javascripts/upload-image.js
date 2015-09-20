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
  Materialize.toast('Image is uploading...', 20000);
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
        Materialize.toast('Upload is complete!', 6000);
        // status.innerHTML = "Upload complete.";
        $(receiptWrap).show();

        var json = JSON.parse(xmlreq.responseText);



        receiptImage.src = json.imageLocation;
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
