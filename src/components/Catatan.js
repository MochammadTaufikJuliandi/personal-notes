import { Component } from "react";
import { showFormattedDate } from "../utils";

export default class Catatan extends Component {
  render() {
    const { catatan, type } = this.props;

    return (
      <div className="note-item">
        <div className="note-item__content">
          <h3 className="note-item__title">{catatan.title}</h3>
          <p className="note-item__date">
            {showFormattedDate(catatan.createdAt)}
          </p>
          <p className="note-item__body">{catatan.body}</p>
        </div>
        <div className="note-item__action">
          <button className="note-item__delete-button" onClick={this.props.onDelete}>Delete</button>
          <button className="note-item__archive-button" onClick={this.props.onMove}>
            {type === "arsip" ? "Pindahkan" : "Arsipkan"}
          </button>
        </div>
      </div>
    );
  }
}
