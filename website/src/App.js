import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

import pdfjsLib from 'pdfjs-dist/';
import $ from 'jquery';
import { Container, Row, Col } from 'reactstrap';
import { Button, ButtonGroup } from 'reactstrap';

// https://github.com/mozilla/pdf.js/tree/master/examples/components

class App extends Component {
  constructor (props) {
    super(props);
    this.state = { rSelected: "Long",
    pdfFileRawLong: "https://raw.githubusercontent.com/manastalukdar/resume-cv/gh-pages/resources/ManasTalukdar_CV.pdf",
    pdfFileRawShort: "https://raw.githubusercontent.com/manastalukdar/resume-cv/gh-pages/resources/ManasTalukdar_vNext.pdf",
    pdfFileRaw: "https://raw.githubusercontent.com/manastalukdar/resume-cv/gh-pages/resources/ManasTalukdar_CV.pdf",
    pdfFileGitHubLong: "https://github.com/manastalukdar/resume-cv/blob/gh-pages/resources/ManasTalukdar_CV.pdf",
    pdfFileGitHubShort: "https://github.com/manastalukdar/resume-cv/blob/gh-pages/resources/ManasTalukdar_vNext.pdf",
    pdfFileGitHub: "https://github.com/manastalukdar/resume-cv/blob/gh-pages/resources/ManasTalukdar_CV.pdf" };
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }

  componentDidMount() {
    this.loadPdf(this.props.url);   
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
          this.loadPdf(this.state.pdfFileRaw);
        });
      });
    }
    else if (rSelected === "Short") {
      this.setState( {pdfFileRaw: this.state.pdfFileRawShort}, props => {
        this.setState( {pdfFileGitHub: this.state.pdfFileGitHubShort}, props => {
          this.loadPdf(this.state.pdfFileRaw);
        });
      });
    }
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
            <Col id="pdf-file" sm="8">
              <a href={this.state.pdfFileGitHub} target="_blank"> {/*onClick={this.onRadioBtnClick}*/}
                PDF File
              </a>          
            </Col>          
          </Row>
          <p></p>
          </div>
        </div>      
      </Container>
    );
  }
}

App.propTypes = {
  url: PropTypes.string, 
};

export default App;
