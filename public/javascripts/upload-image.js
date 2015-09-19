//console.log("Loaded");

function jsload() {

var form = document.getElementById('image-form');
var uploadbox = document.getElementById('image-select');
var submit = document.getElementById('upload-button');
var status = document.getElementById('upload-status');

console.log(status.innerHTML);

form.onsubmit = function(event) {
  event.preventDefault();
  console.log(status.innerHTML);

  // Update button text.
  status.innerHTML = 'Uploading...';
  var files = uploadbox.files;

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
    if (xmlreq.readyState >= 3) {
      if (xmlreq.response ==  "Success")
        status.innerHTML = "Upload complete.";
      else
        status.innerHTML = "Upload failed.";
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
