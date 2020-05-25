import React, { Component } from "react";
import NameDataService from "../services/name.service";

export default class AddName extends Component {
  constructor(props) {
    super(props);
    this.onChangeFullname = this.onChangeFullname.bind(this);
    this.onChangeMenh = this.onChangeMenh.bind(this);
    this.onChangeVan = this.onChangeVan.bind(this);
    this.onChangeGoitinh = this.onChangeGoitinh.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeMeaning = this.onChangeMeaning.bind(this);
    this.saveName = this.saveName.bind(this);
    this.newName = this.newName.bind(this);

    this.state = {
      id: null,
      fullname: "",
      menh: "", 
      van: "",
      gioitinh: "",
      lastname: "",
      meaning:"",

      submitted: false
    };
  }

  onChangeFullname(e) {
    this.setState({
      fullname: e.target.value
    });
  }

  onChangeMenh(e) {
    this.setState({
      menh: e.target.value
    });
  }

  onChangeVan(e) {
    this.setState({
      van: e.target.value
    });
  }
  
  onChangeGoitinh(e) {
    this.setState({
      gioitinh: e.target.value
    });
  }
  
  onChangeLastname(e) {
    this.setState({
      lastname: e.target.value
    });
  }
  onChangeMeaning(e) {
    this.setState({
      meaning: e.target.value
    });
  }
  saveName() {
    var data = {
      fullname: this.state.fullname,
      menh: this.state.menh,
      van: this.state.van,
      gioitinh: this.state.gioitinh,
      lastname: this.state.lastname,
      meaning: this.state.meaning
    };

    NameDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          fullname: response.data.fullname,
          menh: response.data.menh,
          van: response.data.van,
          gioitinh: response.data.gioitinh,
          lastname: response.data.lastname,
          meaning: response.data.meaning,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newName() {
    this.setState({
      id: null,
      fullname: "",
      menh: "", 
      van: "",
      gioitinh: "",
      lastname: "",
      meaning:"",

      submitted: false
    });
  }

  // ...

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Đã thêm tên thành công!</h4>
            <button className="btn btn-success" onClick={this.newName}>
              Thêm tiếp
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="fullname">Fullname</label>
              <input
                type="text"
                className="form-control"
                id="fullname"
                required
                value={this.state.fullname}
                onChange={this.onChangeFullname}
                name="fullname"
              />
            </div>

            <div className="form-group">
              <label htmlFor="menh">Menh</label>
              <input
                type="text"
                className="form-control"
                id="menh"
                required
                value={this.state.menh}
                onChange={this.onChangeMenh}
                name="menh"
              />
            </div>

            <div className="form-group">
              <label htmlFor="van">Vần</label>
              <input
                type="text"
                className="form-control"
                id="van"
                required
                value={this.state.van}
                onChange={this.onChangeVan}
                name="van"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="gioitinh">Giới tính</label>
              <input
                type="text"
                className="form-control"
                id="gioitinh"
                required
                value={this.state.gioitinh}
                onChange={this.onChangeGoitinh}
                name="gioitinh"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="lastname">Lastname</label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                required
                value={this.state.lastname}
                onChange={this.onChangeLastname}
                name="lastname"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastname">Meaning</label>
              <textarea
                className="form-control"
                id="meaning"
                rows="20"
                required
                value={this.state.meaning}
                onChange={this.onChangeMeaning}
                name="meaning"
              />
            </div>
            <button onClick={this.saveName} className="btn btn-success">
              Gửi
            </button>
          </div>
        )}
      </div>
    );
  }
}
