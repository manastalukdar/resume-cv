import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

import pdfjsLib from 'pdfjs-dist/';
import $ from 'jquery';
import { Container, Row, Col } from 'reactstrap';
import { Button, ButtonGroup } from 'reactstrap';

import { PDFLinkService } from 'pdfjs-dist/lib/web/pdf_link_service';
import { PDFViewer } from 'pdfjs-dist/lib/web/pdf_viewer';
import { PDFFindController } from 'pdfjs-dist/lib/web/pdf_find_controller';
//import { PDFPrintService } from 'pdfjs-dist/lib/web/pdf_print_service';
//import { PDFRenderingQueue } from 'pdfjs-dist/lib/web/pdf_rendering_queue';
import 'pdfjs-dist/web/pdf_viewer.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = { rSelected: "Long",
    pdfFileRawLong: "https://raw.githubusercontent.com/manastalukdar/resume-cv/gh-pages/resources/ManasTalukdar_CV.pdf",
    pdfFileRawShort: "https://raw.githubusercontent.com/manastalukdar/resume-cv/gh-pages/resources/ManasTalukdar_vNext.pdf",
    pdfFileRaw: "https://raw.githubusercontent.com/manastalukdar/resume-cv/gh-pages/resources/ManasTalukdar_CV.pdf",
    pdfFileGitHubLong: "https://github.com/manastalukdar/resume-cv/blob/gh-pages/resources/ManasTalukdar_CV.pdf",
    pdfFileGitHubShort: "https://github.com/manastalukdar/resume-cv/blob/gh-pages/resources/ManasTalukdar_vNext.pdf",
    pdfFileGitHub: "https://github.com/manastalukdar/resume-cv/blob/gh-pages/resources/ManasTalukdar_CV.pdf",
    pdfViewer: "" };
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js';
  }

  componentDidMount() {
    //this.loadPdf(this.props.url);   
    this.loadPdfUsingViewer(this.props.url);   
  }

  loadPdfUsingViewer(pdfDoc) {
    var CMAP_URL = '../node_modules/pdfjs-dist/cmaps/';
    var CMAP_PACKED = true;
    var SEARCH_FOR = ''; // try 'Mozilla';
    
    var container = document.getElementById('viewerContainer');
    var pdfLinkService = new PDFLinkService();

    var pdfViewer = new PDFViewer({
      container: container,
      linkService: pdfLinkService
    });

    pdfLinkService.setViewer(pdfViewer);

    // (Optionally) enable find controller.
    var pdfFindController = new PDFFindController({
      pdfViewer: pdfViewer,
    });
    pdfViewer.setFindController(pdfFindController);

    container.addEventListener('pagesinit', function () {
      // We can use pdfViewer now, e.g. let's change default scale.
      pdfViewer.currentScaleValue = 'page-width';

      if (SEARCH_FOR) { // We can try search for things
        pdfFindController.executeCommand('find', {query: SEARCH_FOR});
      }
    });

    pdfjsLib.getDocument({
      url: pdfDoc,
      cMapUrl: CMAP_URL,
      cMapPacked: CMAP_PACKED,
    }).then(function(pdfDocument) {
      // Document loaded, specifying document for the viewer and
      // the (optional) linkService.
      pdfViewer.setDocument(pdfDocument);
    
      pdfLinkService.setDocument(pdfDocument, null);
    });

    this.setState({pdfViewer: pdfViewer});
  }

  loadPdf(pdfDoc) {
    let loadingTask = pdfjsLib.getDocument(pdfDoc);
    loadingTask.promise.then((doc) => {
      console.log("Document " + pdfDoc + " loaded " + doc.numPages + " page(s)");
      this.renderAllPages(doc);
    }, (reason) => {
      console.error("Error during " + pdfDoc + " loading: " + reason);
    });
  }

  renderAllPages(pdf) {
    $('#pdf-contents').empty();
    for (var i = 1; i <= pdf.numPages; i++) {
      this.renderPage(pdf, i);
    }
   }
  
   renderPage(pdf, num) {
    var pageNumber = num;
    pdf.getPage(pageNumber).then(function(page) {
      console.log('Page loaded');    
      
      var scaleConstant = 2.0;
      // var unscaledViewport = page.getViewport(scaleConstant);
      var viewport = page.getViewport(scaleConstant);
      // https://stackoverflow.com/questions/13038146/pdf-js-scale-pdf-on-fixed-width
      // var viewport = page.getViewport(window.screen.width / page.getViewport(scaleConstant).width);
      
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

  onRadioBtnClick(rSelected) {
    this.setState({ rSelected:  rSelected});
    if (rSelected === "Long") {
      this.setState( {pdfFileRaw: this.state.pdfFileRawLong}, props => {
        this.setState( {pdfFileGitHub: this.state.pdfFileGitHubLong}, props => {
          this.loadPdfUsingViewer(this.state.pdfFileRaw);
        });
      });
    }
    else if (rSelected === "Short") {
      this.setState( {pdfFileRaw: this.state.pdfFileRawShort}, props => {
        this.setState( {pdfFileGitHub: this.state.pdfFileGitHubShort}, props => {
          this.loadPdfUsingViewer(this.state.pdfFileRaw);
        });
      });
    }
  }

  onPrintBtnClick() {
    alert("Work in progress. Download pdf and print for now. Or, scale window to desired page resolution, refresh page, then print.");
    // let loadingTask = pdfjsLib.getDocument(this.state.pdfFileRaw);
    // loadingTask.promise.then((doc) => {
    //   let pagesOverview = this.state.pdfViewer.getPagesOverview();
    //   let printContainer = document.getElementById('printContainer');
    //   var pdfPrintService = new PDFPrintService(doc, pagesOverview, printContainer, null);
    //   let pdfRenderingQueue = new PDFRenderingQueue();
    //   pdfRenderingQueue.setViewer(this.state.pdfViewer);  
    //   pdfRenderingQueue.printing = pdfPrintService;
    //   pdfRenderingQueue.renderHighestPriority();
    //   pdfPrintService.layout();
    // }, (reason) => {
    //   console.error("Error during " + this.state.pdfFileRaw + " loading: " + reason);
    // });    
  }

  onPdfFileBtnClick() {
    window.open(this.state.pdfFileRaw);
  }

  render() {
    return (
      <Container>
        <div className="App">
          <p className="App-intro"/>
          <div className="App-body">
          <Row>
            <Col id="resume-type" sm="4">
              <ButtonGroup>
                <Button color="primary" onClick={() => this.onRadioBtnClick("Long")} active={this.state.rSelected === "Long"}>Long</Button>
                <Button color="primary" onClick={() => this.onRadioBtnClick("Short")} active={this.state.rSelected === "Short"}>Short</Button>
              </ButtonGroup>  
              {/* <p>Selected: {this.state.rSelected}</p> */}
            </Col>
            <Col id="pdf-file" sm="auto">
              <a href={this.state.pdfFileGitHub} target="_blank" className="btn btn-primary"> {/*onClick={this.onRadioBtnClick}*/}
                PDF File
              </a> 
            </Col>          
            <Col id="pdf-file" sm="auto">
              <Button color="primary" onClick={() => this.onPrintBtnClick()}>Print</Button>
            </Col>          
          </Row>
          </div>
          <Row>
            <div id="viewerContainer">
              <div id="viewer" className="pdfViewer"></div>
            </div>
          </Row>
          {/* <div id="printServiceOverlay" class="container hidden">
            <div class="dialog">
              <div class="row">
                <span>Preparing document for printing…</span>
              </div>
              <div class="row">
                <progress value="0" max="100"></progress>
                <span class="relative-progress">0%</span>
              </div>
              <div class="buttonRow">
                <button id="printCancel" class="overlayButton"><span>Cancel</span></button>
              </div>
            </div>            
          </div> */}
          <div id="printContainer"></div>
        </div>      
      </Container>
    );
  }
}

App.propTypes = {
  url: PropTypes.string, 
};

export default App;
