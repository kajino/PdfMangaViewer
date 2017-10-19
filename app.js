PDFJS.disableWorker = true;
var pdf = document.getElementById('pdf');
$(function(){
  $("#fullscreen").on("click", function (e){
  	enterFullscreen();
  });

  $("#window").on("click", function (e){
  	exitFullscreen();
  });

  $(window).bind('drop', function(e){
    e.preventDefault();
    var files = e.originalEvent.dataTransfer.files;
    pdfLoad(files);
  }).bind('dragenter', function(){
    return false;
  }).bind('dragover', function(){
    return false;
  });

  $('#btn').click(function(e) {
    e.preventDefault();
    $('input[type="file"]').click();
  });

  $('input[type="file"]').change(function(){
    var files = this.files;
    pdfLoad(files);
  });

  var files;
  function pdfLoad(_files) {
    $("nav").css("zIndex",0);
    if(_files.length > 0){
      files = new Array( _files.length);
      for(var i = 0; i < _files.length; i++)
        files[_files.length - (i+1)] = _files[i];
      pdfAttach(0, true);
    }
  }

  function pdfAttach(bookNum, isFirstPage) {
    if(files == null && files.length == bookNum) return;
    if (file = files[bookNum]) {
      $("#filename").text(file.name);
      fileReader = new FileReader();
      fileReader.onload = function(ev) {
        PDFJS.getDocument(fileReader.result).then(function (pdf) {
          var pageNum;
          if(isFirstPage) {
            pageNum = 1;
          } else {
            if(pdf.numPages % 2 === 0)
              pageNum = pdf.numPages - 1;
            else
              pageNum = pdf.numPages;
          }
          function pageLoad(page, canvasId) {
            var scale = 1.5;
            var viewport = page.getViewport(scale);
            var canvas = document.getElementById(canvasId);
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            page.render({canvasContext: context, viewport: viewport})
          }

          function render(num) {
            pdf.getPage(num).then(function(page) {
              pageLoad(page, 'canvas-right');
            });
            if(num+1 > pdf.numPages){
              var canvas = document.getElementById('canvas-left');
              var context = canvas.getContext('2d');
              context.clearRect(0, 0, canvas.width, canvas.height);
            } else {
              pdf.getPage(num+1).then(function(page) {
                pageLoad(page, 'canvas-left');
              });
            }
          }

          $('#canvas-right').off('click').on('click', function() {
            if (pageNum <= 1) {
              if(bookNum > 0)
                pdfAttach(bookNum-1, false);
              return;
            }
            pageNum -= 2;
            render(pageNum);
          });

          $('#canvas-left').off('click').on('click', function() {
            if (pageNum+2 > pdf.numPages){
              if(bookNum < files.length-1)
                pdfAttach(bookNum+1, true);
              return;
            } 
            pageNum += 2;
            render(pageNum);
          });

          render(pageNum);
        }, function(error){
          console.log(error);
        });
      };
      fileReader.readAsArrayBuffer(file);
    }
  }
});



function enterFullscreen(){
  document.body.onclick = function() {
    if (this.webkitRequestFullScreen) {
       this.webkitRequestFullScreen();
    }
    else if (this.mozRequestFullScreen) {
      this. mozRequestFullScreen();
    }
    else if (this.msFullscreenEnabled) {
      this. msFullscreenEnabled();
    }
    else if (this.fullscreenEnabled) {
      this. fullscreenEnabled();
    }
    else {
      alert("ブラウザがフルスクリーンモードに対応していません。");
    }
  };
  return;
}
function exitFullscreen(){
  document.body.onclick = function() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    }
    else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
    else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    else {
      alert("ブラウザがフルスクリーンモードに対応していません。");
    }
  };
  return;
}
