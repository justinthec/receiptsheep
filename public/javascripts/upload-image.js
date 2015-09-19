//console.log("Loaded");

var form = document.getElementById('image-form');
var uploadbox = document.getElementById('image-select');
var submit = document.getElementById('upload-button');


form.onsubmit = function(event) {
  event.preventDefault();

  // Update button text.
  submit.innerHTML = 'Uploading...';
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

  xmlreq.open('POST', 'image', true);

  xmlreq.onload = function (e) {
  if (xmlreq.status === 200) {
    // File(s) uploaded.
    uploadButton.innerHTML = 'Upload';
  } else {
    alert('File not uploaded due to error');
    uploadButton.innerHTML = 'Upload';
    console.log(e);
  }
  xmlreq.send(formData);
};


}
