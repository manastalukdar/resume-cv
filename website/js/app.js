// https://stackoverflow.com/questions/31185785/pdf-js-render-pdf-with-scrollbar
// https://stackoverflow.com/questions/47054944/responsive-pdf-renderer-with-pdfjs
// https://stackoverflow.com/questions/33063213/pdf-js-with-text-selection
// https://www.sitepoint.com/custom-pdf-rendering/

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
    
    var scaleConstant = 1.0;
    var unscaledViewport = page.getViewport(scaleConstant);
    //var viewport = page.getViewport(scaleConstant);
    // https://stackoverflow.com/questions/13038146/pdf-js-scale-pdf-on-fixed-width
    var viewport = page.getViewport(window.screen.width / page.getViewport(scaleConstant).width);
    
    var canvasId = 'pdf-canvas-' + num;
    $('#pdf-contents').append($('<canvas/>', {'id': canvasId, 'class': 'pdf-canvas'}));

    // Prepare canvas using PDF page dimensions
    var canvas = document.getElementById(canvasId);
    var context = canvas.getContext('2d');
		//var viewport = Math.min((canvas.height / unscaledViewport.height), (canvas.width / unscaledViewport.width));
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