import React, { Component } from 'react';
import NameDataService from "../services/name.service";

export default class Meaning extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.searchName = this.nameMeaning.bind(this);
        this.state = {
            name: "",
            tongQuan: "",
            congViec: "",
            tinhCach: "",
            tinhDuyen: "",
            searchName: ""
        };
    }

    onChangeSearchName(e) {
        const searchName = e.target.value;
    
        this.setState({
          searchName: searchName
        });
      }
    nameMeaning() {
        NameDataService.findMeaning(this.state.searchName)
            .then(response => {
                this.setState({
                    name: response.data
                });
                console.log(this.state.name);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchName, } = this.state;
        return (
            <div>
                <p>Bói Tên được xuất hiện từ năm 600 trước Công Nguyên. Môn khoa học huyền bí này được phát triển bởi nhà toán học nổi tiếng Hy Lạp Pythagorax. Người Hy Lạp gọi nó là Định Luật Của Chúa. Đây chính là một môn khoa học huyền bí được gọi là Thần Số Nhờ Thần Số mà người ta đoán được nhân cách, tính tình, công việc, năng khiếu, tình duyên... của một đời người. Hãy cùng xem bói tên của bạn nhé</p>
                
                <div className="input-group mb-3 timYNghia">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập tên của bạn"
                        value={searchName}
                        onChange={this.onChangeSearchName}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => this.nameMeaning()}
                        >
                            Search
              </button>
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{__html: this.state.name}}/>

                {/* <p className="ynghia">{this.state.name[0]}</p>
                
                <p className="ynghia">{this.state.name[1]}</p>
                
                <p className="tongquan">{this.state.name[2]}</p>
                <p className="tq">{this.state.name[3]}</p>
                
                <p className="congviec">{this.state.name[4]}</p>
                <p className="cv">{this.state.name[5]}</p>
                
                <p className="tinhcach">{this.state.name[6]}</p>
                <p className="tc">{this.state.name[7]}</p>
                
                <p className="tinhduyen">{this.state.name[8]}</p>
                <p className="td">{this.state.name[9]}</p>
                <p className="tinhduyen">{this.state.name[10]}</p>
                <p className="td">{this.state.name[11]}</p>
                <p className="tinhduyen">{this.state.name[12]}</p>
                <p className="td">{this.state.name[13]}</p>
                <p className="tinhduyen">{this.state.name[10]}</p>
                <p className="td">{this.state.name[14]}</p>
                <p className="tinhduyen">{this.state.name[8]}</p>
                <p className="td">{this.state.name[15]}</p>
                <p className="tinhduyen">{this.state.name[16]}</p>
                <p className="td">{this.state.name[17]}</p>
                <p className="td">{this.state.name[18]}</p>
                <p className="tinhduyen">{this.state.name[19]}</p>
                <p className="td">{this.state.name[20]}</p> */}

            </div>
        );
    }
}
