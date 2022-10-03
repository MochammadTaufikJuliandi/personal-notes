import { Component } from "react";

export default class Creator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
    };

    this.onCreate = this.onCreate.bind(this);
  }

  onCreate(e) {
    e.preventDefault();

    if (this.state.title.trim().length === 0 || this.state.body.trim().length === 0) return

    this.props.onCreate({
      title: this.state.title.trim(),
      body: this.state.body.trim(),
      createdAt: new Date().toISOString(),
      archived: false,
    });

    this.setState({
      title: "",
      body: "",
    });
  }

  render() {
    return (
      <div className="note-input">
        <h2>Buat Catatan</h2>
        <form onSubmit={this.onCreate}>
          <p className="note-input__title__char-limit">
            Sisa Karakter: {50 - this.state.title.length}
          </p>
          <input
            type="text"
            className="note-input__title"
            placeholder="Ini adalah judul..."
            onInput={(e) =>
              this.setState({
                title: e.target.value,
              })
            }
            value={this.state.title}
            required
          />
          <textarea
            className="note-input__body"
            type="text"
            placeholder="Tuliskan catatanmu di sini ..."
            onInput={(e) =>
              this.setState({
                body: e.target.value,
              })
            }
            value={this.state.body}
            required
          ></textarea>
          <button type="submit">Buat</button>
        </form>
      </div>
    );
  }
}