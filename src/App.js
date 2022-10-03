import { Component, Fragment } from "react";
import Catatan from "./components/Catatan";
import Creator from "./components/Creator";
import Header from "./components/Header";
import { getInitialData } from "./utils";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      catatans: getInitialData(),
    };

    this.onSearch = this.onSearch.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  onSearch(e) {
    this.setState({
      search: e.target.value,
    });
  }

  search(list) {
    return list.filter((e) =>
      this.state.search.length > 0
        ? e.title.toLowerCase().startsWith(this.state.search.toLowerCase())
        : true
    );
  }

  onCreate(catatan) {
    const c = [...this.state.catatans].sort((a, b) => a.id > b.id);

    catatan.id = (c[c.length - 1]?.id || 0) + 1;

    this.state.catatans.push(catatan);
    this.setState({});
  }

  render() {
    const catatanEmpty = (
      <p className="notes-list__empty-message">Tidak ada catatan</p>
    );

    return (
      <Fragment>
        <Header onSearch={this.onSearch} search={this.state.search} />

        <div className="note-app__body">
          <Creator onCreate={this.onCreate} />
          <h2>Catatan Aktif</h2>
          {this.search(this.state.catatans).filter(e => !e.archived).length === 0 ? (
            catatanEmpty
          ) : (
            <div className="notes-list">
              {this.search(this.state.catatans).filter(e => !e.archived).map((catatan) => (
                <Catatan
                  catatan={catatan}
                  key={catatan.id}
                  onDelete={() => {
                    this.state.catatans.pop(
                      this.state.catatans.find((e) => e.id === catatan.id)
                    );
                    this.setState({});
                  }}
                  onMove={() => {
                    const selectedCatatan = this.state.catatans.find(
                      (e) => e.id === catatan.id
                    );

                    catatan.archived = true

                    this.setState({})
                  }}
                />
              ))}
            </div>
          )}
          <h2>Arsip</h2>
          {this.search(this.state.catatans).filter(e => e.archived).length === 0 ? (
            catatanEmpty
          ) : (
            <div className="notes-list">
              {this.search(this.state.catatans).filter(e => e.archived).map((catatan) => (
                <Catatan
                  catatan={catatan}
                  key={catatan.id}
                  type="arsip"
                  onDelete={() => {
                    this.state.catatans.pop(
                      this.state.catatans.find((e) => e.id === catatan.id)
                    );
                    this.setState({});
                  }}
                  onMove={() => {
                    const selectedCatatan = this.state.catatans.find(
                      (e) => e.id === catatan.id
                    );

                    selectedCatatan.archived = false;

                    this.setState({
                      catatans: [...this.state.catatans],
                    });
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}
