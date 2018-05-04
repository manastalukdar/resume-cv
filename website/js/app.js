// https://stackoverflow.com/questions/31185785/pdf-js-render-pdf-with-scrollbar

// URL of PDF document
var url = 'https://raw.githubusercontent.com/manastalukdar/resume-cv/gh-pages/resources/ManasTalukdar_CV.pdf';

// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

// Asynchronous download of PDF
var loadingTask = pdfjsLib.getDocument(url);
loadingTask.promise.then(function(pdf) {
  console.log('PDF loaded');
  renderAllPages(pdf);
}, function (reason) {
  // PDF loading error
  console.error(reason);
});

function renderAllPages(pdf) {
  for (var i = 1; i <= pdf.numPages; i++) {
   renderPage(pdf, i);
  }
 }

function renderPage(pdf, num) {
  var pageNumber = num;
  pdf.getPage(pageNumber).then(function(page) {
    console.log('Page loaded');
    
    var scale = 1.0;
    var viewport = page.getViewport(scale);
    
    var canvasId = 'pdf-viewer-' + num;
    $('#pdf-viewer').append($('<canvas/>', {'id': canvasId}));

    // Prepare canvas using PDF page dimensions
    var canvas = document.getElementById(canvasId);
    var context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    var renderTask = page.render(renderContext);
    renderTask.then(function () {
      console.log('Page rendered');
    });
  });
}