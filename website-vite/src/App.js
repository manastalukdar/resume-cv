import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

import { Container, Row, } from 'reactstrap';
import { Button, ButtonGroup } from 'reactstrap';
import ReactGA from 'react-ga4';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = { rSelected: "Short",
    pdfFileRawLong: "ManasTalukdar_cv.pdf",
    pdfFileRawShort: "ManasTalukdar.pdf",
    pdfFileRaw: "ManasTalukdar.pdf" };
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    ReactGA.initialize('G-355DV58VEL');
  }

  componentDidMount() { 
  }

  onRadioBtnClick(rSelected) {
    this.setState({ rSelected:  rSelected});
    if (rSelected === "Short") {
      this.setState( {pdfFileRaw: this.state.pdfFileRawShort}, props => {
          console.log(this.state.pdfFileRaw);
      });
    } else if (rSelected === "Long") {
      this.setState( {pdfFileRaw: this.state.pdfFileRawLong}, props => {
          console.log(this.state.pdfFileRaw);
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
            <div id="resumeType">
              <ButtonGroup>
                <Button color="primary" onClick={() => this.onRadioBtnClick("Short")} active={this.state.rSelected === "Short"}>Short</Button>
                <Button color="primary" onClick={() => this.onRadioBtnClick("Long")} active={this.state.rSelected === "Long"}>Long</Button>
              </ButtonGroup>
            </div>
          </Row>
          </div>
          <Row>
            <div id="pdfjsContainer">
              <object data={process.env.PUBLIC_URL + '/pdfjs/web/viewer.html?file=' + process.env.PUBLIC_URL + '/resources/' + this.state.pdfFileRaw} width="100%" height="600">PDF resume</object>
            </div>
          </Row>
        </div>      
      </Container>
    );
  }
}

App.propTypes = {
  url: PropTypes.string, 
};

export default App;
