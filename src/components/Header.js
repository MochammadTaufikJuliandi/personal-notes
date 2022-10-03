import { Component } from "react";

export default class Header extends Component {
    render() {
        return (
            <div className="note-app__header">
                <h1>Notes</h1>
                <div className="note-search">
                    <input type="text" placeholder="Cari Catatan..." onInput={this.props.onSearch} search={this.props.search} />
                </div>
            </div>
        );
    }
}