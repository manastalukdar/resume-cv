import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';

import pdfjsLib from 'pdfjs-dist/';
import $ from 'jquery';

// https://github.com/yurydelendik/pdfjs-react

class App extends Component {
  componentDidMount() {
    let loadingTask = pdfjsLib.getDocument(this.props.url);
    loadingTask.promise.then((doc) => {
      console.log('Document ${this.props.url} loaded ${doc.numPages} page(s)');
      renderAllPages(doc);
    }, (reason) => {
      console.error('Error during ${this.props.url} loading: ${reason}');
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
  }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header> */}
        <p className="App-intro"/>
        <div className="App-body">
        </div>
      </div>
    );
  }
}

App.propTypes = {
  url: PropTypes.string, 
};

export default App;
