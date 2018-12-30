import React from 'react';
import ReactDOM from 'react-dom';
import CreateReactClass from 'create-react-class';
import { Document, Page } from 'react-pdf/dist/entry.webpack';

// TODO: Fix alignment change after opening PDF.

// preload contains all data that is preloaded at page load.
let preload = {
  data: ''
};

var oReq = new XMLHttpRequest();
const resume_uri = "/tomhadlaw.xyz/resume_master.pdf";

oReq.open("GET", resume_uri, true);
oReq.responseType = "arraybuffer";

oReq.onload = function (oEvent) {
  document.title = "Toms Personal Website";
  var arrayBuffer = oReq.response;
  if (arrayBuffer) {
    preload.data = new Uint8Array(arrayBuffer);
    console.log("done loading '%s', length of content = '%d'", resume_uri, preload.data.length);
  }
};
oReq.send(null);

/**
 * PDF displays a rendered PDF class.
 */
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
        <Document loading="" file={preload}>
          <Page pageNumber={1} />
        </Document>
      </div>
    );
  }
});

/**
 * DisplayPicture displays a users profile image.
 */
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

/**
 * SocialLink provides a simple icon based link to a social network
 * or personal website.
 */
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

/**
 * Root class for the profile.
 */
var Profile = CreateReactClass({
  getInitialState: function() {
    return { showResume: false };
  }, 
  toggleResume: function() {
    this.setState({ showResume: !this.state.showResume });
    if (this.state.showResume) {
      console.log("Displaying resume");
    } else {
      console.log("Hiding resume");
    }
  },
  render: function() {
    return (
      <div className="profile">
        <div>
          <DisplayPicture
            profileImage={this.props.profileImage} />
        </div>
        <div className="profile-name">{this.props.profileName}</div>
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
          { this.state.showResume && <i onClick={this.toggleResume} className="far fa-times-circle resume-close"></i> }
        </div>
      </div>
    );
  }
});

/* Render the root element */
ReactDOM.render(
  <Profile 
    profileImage="https://s3-us-west-2.amazonaws.com/toms-web/avatar.JPG"
    profileName="Tom Hadlaw"/>,
  document.getElementById("container")
);
