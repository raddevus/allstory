import * as React from 'react';

export class FromObjArray extends React.Component {
  state = {};
  allHeaders = [];

  constructor(props) {
    super(props);
    let counter = 0;

    let targetArray = this.convertObjectsToValueArray(props.data, props.fields);
    console.log(`ctor -> ${this.props.headers.length}`);
    console.log(this.props.headers);
    this.state = {
      headers: this.allHeaders,
      targetData: targetArray,
      fieldNames: props.fields,
      sortBy: props.sortBy,
      descending: false,
      edit: null,
    };
    this.sort = this.sort.bind(this);
    this.clone = this.clone.bind(this);
    this.showEditor = this.showEditor.bind(this);
    this.save = this.save.bind(this);
  }

  escKeyHandler = (e) => {
    // if user taps esc key then revert back
    if (e.keyCode == 27) {
      this.setState({
        edit: null,
      });
    }
  };

  convertObjectsToValueArray(targetObject, fieldNames) {
    let allRows = [];
    let counter = 0;

    targetObject.map((x, colIdx) => {
      let row = [];
      fieldNames.map((name) => {
        // Next line insures that if property contains
        // null then it is translated into a empty string
        x[name] = x[name] == null ? `` : x[name];
        row.push(x[name].toString());
      });
      allRows.push(row);
    });
    return allRows;
  }

  render() {
    //const name = 'name' in this.state ? this.state.name : 'false-name';

    this.state.headers = [];

    for (const idx in this.props.headers) {
      let title = this.props.headers[idx];
      if (this.state.sortBy == idx) {
        title += this.state.descending ? ' \u2191' : ' \u2193';
      }
      this.state.headers.push(<th key={idx}>{title}</th>);
    }
    return (
      <div onKeyDown={this.escKeyHandler}>
        <div>
          <table>
            <thead onClick={this.sort}>
              <tr>{this.state.headers}</tr>
            </thead>
            <tbody onDoubleClick={this.showEditor}>
              {this.state.targetData.map((row, rowidx) => (
                <tr key={rowidx} data-row={rowidx}>
                  {row.map((cell, colidx) => {
                    let edit = this.state.edit;
                    if (edit && edit.row === rowidx && edit.column === colidx) {
                      cell = (
                        <form onSubmit={this.save}>
                          <input id="editor" type="text" defaultValue={cell} />
                        </form>
                      );
                    }
                    return <td key={colidx}>{cell}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  clone(o) {
    return JSON.parse(JSON.stringify(o));
  }

  showEditor(e) {
    this.setState({
      edit: {
        row: parseInt(e.target.parentNode.dataset.row, 10),
        column: e.target.cellIndex,
      },
    });
    console.log(`edit: ${this.state.edit}`);
    console.log(this.state.edit);
  }

  save(e) {
    e.preventDefault();
    let input = document.querySelector('#editor');
    const data = this.clone(this.state.targetData);
    data[this.state.edit.row][this.state.edit.column] = input.value;
    this.setState({
      edit: null,
      targetData: data,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let editor = document.querySelector('#editor');
    console.log(`componentDidUpdate... ${editor}`);
    if (editor !== null) {
      editor.focus();
    }
  }

  sort(e) {
    const column = e.target.cellIndex;
    const sortTarget = this.clone(this.state.targetData);

    console.log(sortTarget);
    const descending = this.state.sortBy === column && !this.state.descending;
    console.log(`you clicked, ${e.target.cellIndex}`);

    sortTarget.sort((a, b) => {
      if (a[column] === b[column]) {
        return 0;
      }
      return descending
        ? a[column] > b[column]
          ? 1
          : -1
        : a[column] < b[column]
        ? 1
        : -1;
    });

    this.setState({
      targetData: sortTarget,
      sortBy: column,
      descending: descending,
    });
  }
}
