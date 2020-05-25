import React, { Component } from "react";
import NameDataService from "../services/name.service";

export default class Name extends Component {
  constructor(props) {
    super(props);
    this.onChangeFullname = this.onChangeFullname.bind(this);
    this.onChangeMenh = this.onChangeMenh.bind(this);
    this.onChangeVan = this.onChangeVan.bind(this);
    this.onChangeGoitinh = this.onChangeGoitinh.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeMeaning = this.onChangeMeaning.bind(this);
    this.updateName = this.updateName.bind(this);
    this.deleteName = this.deleteName.bind(this);

    this.state = {
        currentName: {
        id: null,
        fullname: "",
        menh: "", 
        van: "",
        gioitinh: "",
        lastname: "",
        meaning:""
        },
    message: ""
    };
  }

  componentDidMount() {
    this.getName(this.props.match.params.id);
  }

  onChangeFullname(e) {
    const fullname = e.target.value;

    this.setState(function(prevState) {
      return {
        currentName: {
          ...prevState.currentName,
          fullname: fullname
        }
      };
    });
  }

  onChangeMenh(e) {
    const menh = e.target.value;
    
    this.setState(prevState => ({
      currentName: {
        ...prevState.currentName,
        menh: menh
      }
    }));
  }

  onChangeVan(e) {
    const van = e.target.value;
    
    this.setState(prevState => ({
      currentName: {
        ...prevState.currentName,
        van: van
      }
    }));
  }

  onChangeGoitinh(e) {
    const gioitinh = e.target.value;
    
    this.setState(prevState => ({
      currentName: {
        ...prevState.currentName,
        gioitinh: gioitinh
      }
    }));
  }

  onChangeLastname(e) {
    const lastname = e.target.value;
    
    this.setState(prevState => ({
      currentName: {
        ...prevState.currentName,
        lastname: lastname
      }
    }));
  }
  onChangeMeaning(e) {
    const meaning = e.target.value;
    
    this.setState(prevState => ({
      currentName: {
        ...prevState.currentName,
        meaning: meaning
      }
    }));
  }
  getName(id) {
    NameDataService.get(id)
      .then(response => {
        this.setState({
          currentName: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  updateName() {
    NameDataService.update(
      this.state.currentName.id,
      this.state.currentName
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The name was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteName() {    
    NameDataService.delete(this.state.currentName.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/names')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentName } = this.state;

    return (
      <div>
        {currentName ? (
          <div className="edit-form">
            <h4>Name</h4>
            <form>
              <div className="form-group">
                <label htmlFor="fullname">Fullname</label>
                <input
                  type="text"
                  className="form-control"
                  id="fullname"
                  value={currentName.fullname}
                  onChange={this.onChangeFullname}
                />
              </div>
              <div className="form-group">
                <label htmlFor="menh">Mệnh</label>
                <input
                  type="text"
                  className="form-control"
                  id="menh"
                  value={currentName.menh}
                  onChange={this.onChangeMenh}
                />
              </div>

              <div className="form-group">
                <label htmlFor="van">Vần</label>
                <input
                  type="text"
                  className="form-control"
                  id="van"
                  value={currentName.van}
                  onChange={this.onChangeVan}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="gioitinh">Giới tính</label>
                <input
                  type="text"
                  className="form-control"
                  id="gioitinh"
                  value={currentName.gioitinh}
                  onChange={this.onChangeGoitinh}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="lastname">Lastname</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  value={currentName.lastname}
                  onChange={this.onChangeLastname}
                />
              </div>

              <div className="form-group">
                <label htmlFor="meaning">Meaning</label>
                <textarea 
                  className="form-control"
                  id="meaning"
                  rows="20"
                  value={currentName.meaning}
                  onChange={this.onChangeMeaning}
                />
              </div>
              
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteName}
            >
              Xoá
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateName}
            >
              Cập nhật
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Hãy chọn một tên...</p>
          </div>
        )}
      </div>
    );
  }
}
