import Drawer from "react-motion-drawer";
import React, { Component } from "react";
import { Strings } from "../Retumble.js";

require("./PostNotes.css");

export default class PostNotes extends Component {
  state = {
    drawerIsOpen: false,
    width: 300,
    notesHTML: "",
  };

  openDrawer() {
    this.setState({ drawerIsOpen: !this.state.drawerIsOpen });
  }

  getPostNotes() {
    fetch(this.props.PostNotesURL)
      .then(response => response.text())
      .catch(console.error)
      .then(notes => {
        this.setState({ notesHTML: notes });
        this.setState({ drawerIsOpen: !this.state.drawerIsOpen });
      });
  }

  render() {
    const { drawerIsOpen } = this.state;
    const drawerProps = {
      overlayColor: "rgba(255,255,255,0.6)",
      drawerStyle: {
        background: "#EEE",
        overflow: "hidden",
        boxShadow:
          "rgba(0, 0, 0, 0.12) 0px 0px 20px, rgba(0, 0, 0, 0.15) 0px 6px 6px",
      },
    };

    document.body.style.overflow = this.state.drawerIsOpen ? "hidden" : "auto";

    return (
      <span>
        <Drawer
          right={true}
          width={400}
          config={{
            stiffness: 350,
            damping: 40,
          }}
          {...drawerProps}
          open={drawerIsOpen}
          onChange={open => this.setState({ drawerIsOpen: open })}
        >
          <section dangerouslySetInnerHTML={{ __html: this.state.notesHTML }} />
        </Drawer>

        <a href={"javascript:void(0);"} onClick={this.getPostNotes.bind(this)}>
          {Strings["Notes"]}
        </a>
      </span>
    );
  }
}
