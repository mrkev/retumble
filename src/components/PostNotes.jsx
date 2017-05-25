import Drawer from "react-motion-drawer";
import React, { Component } from "react";
import Spur from '../Spur.js'

require('./PostNotes.css')

export default class PostNotes extends Component {
  state = {
    drawerIsOpen: false,
    width: 300,
    notesHTML: '',
  }

  openDrawer() {
    this.setState({ drawerIsOpen: !this.state.drawerIsOpen })
  }

  getPostNotes() {
    fetch(this.props.PostNotesURL)
      .then(response => response.text())
      .catch(console.error)
      .then(notes => {
        this.setState({notesHTML: notes})
        this.setState({ drawerIsOpen: !this.state.drawerIsOpen })
      })
  }


  render() {
    const { drawerIsOpen } = this.state;
    const drawerProps = {
      overlayColor: "rgba(255,255,255,0.6)",
      drawerStyle: {
        background: "#EEE",
        overflow: 'hidden',
        //boxShadow: "rgba(0, 0, 0, 0.188235) 0px 10px 20px, rgba(0, 0, 0, 0.227451) 0px 6px 6px"
      }
    };

    document.body.style.overflow = (this.state.drawerIsOpen) ? 'hidden' : 'auto'

    return (
      <span>
        <Drawer
            right={true}
            width={400}
            config={[100, 40]}
            {...drawerProps}
            open={drawerIsOpen}
            onChange={open => this.setState({ drawerIsOpen: open })}
          >

            {/* <iframe src={this.props.PostNotesURL} /> */}

            <section dangerouslySetInnerHTML={{__html: this.state.notesHTML}}>
            </section>

            {/* this.props.postNotes() */}

          </Drawer>

          <a href={"javascript:void(0);"}
            onClick={this.getPostNotes.bind(this)}>
            {Spur.lang['Notes']}</a>
      </span>
    );
  }
}
