import React from 'react';
import ReactDOM from 'react-dom';
import CreateReactClass from 'create-react-class';

import { Document, Page } from 'react-pdf/dist/entry.webpack';

// TODO: Preload the pdf.
// TODO: Fix alignment change after opening PDF.
// TODO: Put the buffer code in its own npm module.

var https = require('http');

//const resume_url = 'https://s3-us-west-2.amazonaws.com/toms-web/resume_master.pdf';
const resume_url = 'http://localhost:8080/static/resume_master.pdf'

let preload = {
  data: ''
};

https.get(resume_url, (resp) => {
  resp.on('data', (chunk) => {
    preload.data += chunk;
    console.log(chunk);
  });
  resp.on('end', () => {
    console.log("howdy=====>", preload.data.length);
  });
});

var PDF = CreateReactClass({
  state: {
    numPages: null,
    pageNumber: 1
  },
  onDocumentLoad: ({ numPages }) => {
    this.setState({ numPages });
  },
  render: function() {
    return (
      <div>
        <Document
          file={preload}>
          <Page pageNumber={1} />
        </Document> 
      </div>
    );
  }
});

var DisplayPicture = CreateReactClass({
  click: function() {
    console.log("click clack");
  },
  render: function() {
    return (
      <img 
        className="avatar"
        onClick={this.click}
        src={this.props.profileImage}
        alt="Avatar">
      </img>
    )
  }
});

var SocialLink = CreateReactClass({
  getInitialState: function() {
    return {
      iconClass: "social-link-icon " + this.props.socialType
    };
  },
  render: function() {
    return (
      <a href={this.props.link}
        target="_blank">
        <i className={this.state.iconClass}></i>
      </a>
    );
  }
});

var Profile = CreateReactClass({
  getInitialState: function() {
    return { showResume: false };
  }, 
  toggleResume: function() {
    console.log(this.state.showResume);
    this.setState({ showResume: !this.state.showResume });
  },
  render: function() {
    return (
      <div className="profile">
        <div>
          <DisplayPicture
            profileImage={this.props.profileImage} />
        </div>
        <div>
          <SocialLink
            socialType="fab fa-github"
            link="https://github.com/tommyp1ckles" />
          <SocialLink
            socialType="fab fa-linkedin"
            link="https://linkedin.com/in/hadlaw/" />
          <i
            className="resume-link-icon fas fa-trophy"
            onClick={this.toggleResume} > </i>
          <SocialLink
            className="fab fa-instagram"
            link="https://www.instagram.com/tommyh144/" />
        </div>
        <div className="pdf-body">
          { this.state.showResume && <PDF /> }
          { this.state.showResume && <i onClick={this.toggleResume} class="far fa-times-circle resume-close"></i> }
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <Profile profileImage="https://s3-us-west-2.amazonaws.com/toms-web/avatar.JPG"/>,
  document.getElementById("container")
);