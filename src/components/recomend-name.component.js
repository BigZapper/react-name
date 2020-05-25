import React, { Component } from "react";
import NameDataService from "../services/name.service";
import { Link } from "react-router-dom";

export default class ViewNames extends Component {
    constructor(props) {
        super(props);
        window.onload = function () {
            document.getElementById("menhtbo").style.visibility = "hidden";
            document.getElementById("menhtme").style.visibility = "hidden";
        }
        this.onChangeSearchLastname = this.onChangeSearchLastname.bind(this);
        this.onChangeGioiTinh = this.onChangeGioiTinh.bind(this);
        this.onChangeDateBo = this.onChangeDateBo.bind(this);
        this.onChangeDateMe = this.onChangeDateMe.bind(this);
        this.onChangeDateCon = this.onChangeDateCon.bind(this);
        this.retrieveNames = this.retrieveNames.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveName = this.setActiveName.bind(this);
        this.searchLastname = this.searchLastname.bind(this);

        this.state = {
            names: [],
            currentName: null,
            currentIndex: -1,
            searchLastname: "",

            nsBo: "",
            nsMe: "",
            nsCon: "",
            gtCon: "",
            menhBo: "",
            menhMe: "",
            menhCon: "",
            luanBo1: "",
            luanBo2: "",
            luanMe1: "",
            luanMe2: "",
            menhTheoBo: "",
            menhTheoMe: "",
            Luan: "",
            Menh: ""
        };
    }

    // componentDidMount() {
    //     this.retrieveNames();
    // }

    onChangeGioiTinh(e) {
        const gtCon = e.target.value;
        this.setState({
            gtCon: gtCon
        }, () => { this.searchNames(this.state.Menh) });

    }
    onChangeDateBo(e) {
        const nsBo = e.target.value;
        this.setState({
            nsBo: nsBo
        }, () => this.XuLyXemMenh());
    }
    onChangeDateMe(e) {
        const nsMe = e.target.value;
        this.setState({
            nsMe: nsMe
        }, () => this.XuLyXemMenh());
    }
    onChangeDateCon(e) {
        const nsCon = e.target.value;
        this.setState({
            nsCon: nsCon
        }, () => this.XuLyXemMenh());

    }
    onChangeSearchLastname(e) {
        const searchLastname = e.target.value;

        this.setState({
            searchLastname: searchLastname,
            currentIndex: 0,
            currentName: ""
        }, () => { this.searchNames(this.state.Menh); this.xuLyTinhSinhKhac() });

    }

    retrieveNames() {
        NameDataService.getNames()
            .then(response => {
                this.setState({
                    names: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveNames();
        this.setState({
            currentName: null,
            currentIndex: -1
        });
    }

    setActiveName(name, index) {
        this.setState({
            currentName: name,
            currentIndex: index
        });
    }

    searchLastname() {
        NameDataService.findByLastname(this.state.searchLastname)
            .then(response => {
                this.setState({
                    names: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchNames(menh) {
        NameDataService.findByMenh(this.state.searchLastname, menh, this.state.gtCon)
            .then(response => {
                this.setState({
                    names: response.data,
                    currentIndex: 0,
                    currentName: ""
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    TinhMenh = (namSinh) => {
        var iThienCan = namSinh % 10;
        var iThienCanMenh = 0;
        var iDiaChiMenh = 0;
        switch ((iThienCan)) {
            case 0:
            case 1:
                iThienCanMenh = 4;
                break;
            case 2:
            case 3:
                iThienCanMenh = 5;
                break;
            case 4:
            case 5:
                iThienCanMenh = 1;
                break;
            case 6:
            case 7:
                iThienCanMenh = 2;
                break;
            case 8:
            case 9:
                iThienCanMenh = 3;
                break;
            default:
        }
        var iDiaChi = 0;
        if (namSinh > 1999) {
            namSinh = namSinh - 1960;
            iDiaChi = namSinh % 12;
        }
        else
            iDiaChi = (namSinh % 100) % 12;
        switch ((iDiaChi)) {
            case 0:
            case 1:
                iDiaChiMenh = 0;
                break;
            case 2:
            case 3:
                iDiaChiMenh = 1;
                break;
            case 4:
            case 5:
                iDiaChiMenh = 2;
                break;
            case 6:
            case 7:
                iDiaChiMenh = 0;
                break;
            case 8:
            case 9:
                iDiaChiMenh = 1;
                break;
            case 10:
            case 11:
                iDiaChiMenh = 2;
                break;
            default:
        }
        var iMenh = iDiaChiMenh + iThienCanMenh;
        if (iMenh > 5)
            iMenh = iMenh - 5;
        var sMenh = "";
        switch ((iMenh)) {
            case 1:
                sMenh = "Kim";
                break;
            case 2:
                sMenh = "Thuỷ";
                break;
            case 3:
                sMenh = "Hoả";
                break;
            case 4:
                sMenh = "Thổ";
                break;
            case 5:
                sMenh = "Mộc";
                break;
            default:
        }
        console.log(sMenh);
        return sMenh;
    }

    TinhTuongSinh = (hanh1, hanh2) => {
        switch ((hanh1)) {
            case "Kim":
                if (hanh2 === "Thuỷ")
                    return true;
                else
                    break;
            case "Mộc":
                if (hanh2 === "Hoả")
                    return true;
                else
                    break;
            case "Thuỷ":
                if (hanh2 === "Mộc")
                    return true;
                else
                    break;
            case "Hoả":
                if (hanh2 === "Thuỷ")
                    return true;
                else
                    break;
            case "Thổ":
                if (hanh2 === "Kim")
                    return true;
                else
                    break;
            default:
        }
        return false;
    }

    TinhTuongKhac = (hanh1, hanh2) => {
        switch ((hanh1)) {
            case "Kim":
                if (hanh2 === "Mộc")
                    return true;
                else
                    break;
            case "Mộc":
                if (hanh2 === "Thổ")
                    return true;
                else
                    break;
            case "Thuỷ":
                if (hanh2 === "Hoả")
                    return true;
                else
                    break;
            case "Hoả":
                if (hanh2 === "Kim")
                    return true;
                else
                    break;
            case "Thổ":
                if (hanh2 === "Thuỷ")
                    return true;
                else
                    break;
            default:
        }
        return false;
    }

    TuongSinh = function (hanh) {
        switch ((hanh)) {
            case "Kim":
                return "Thuỷ";
            case "Mộc":
                return "Hoả";
            case "Thuỷ":
                return "Mộc";
            case "Hoả":
                return "Thổ";
            case "Thổ":
                return "Kim";
            default:
        }
        return "";
    }
    XuLyXemMenh = () => {
        this.setState({
            nsBo: document.getElementById("birthDateBo").value,
            nsMe: document.getElementById("birthDateMe").value,
            nsCon: document.getElementById("birthDateCon").value,
            menhBo: this.TinhMenh(parseInt(document.getElementById("birthDateBo").value)),
            menhMe: this.TinhMenh(parseInt(document.getElementById("birthDateMe").value)),
            menhCon: this.TinhMenh(parseInt(document.getElementById("birthDateCon").value)),
        }, () => { this.xuLyTinhSinhKhac() });
        var radios = document.getElementsByName('gioitinh');

        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                this.setState({
                    gtCon: radios[i].value
                });
                break;
            }
        }




    }
    xuLyTinhSinhKhac = () => {
        if (this.TinhTuongSinh(this.state.menhBo, this.state.menhCon)) {
            this.setState({
                luanBo1: "tương sinh",
                menhTheoBo: this.state.menhCon,
                luanBo2: "hỗ trợ"
            }, () => { this.xuLyTinhLuan() });
        }
        else if (this.TinhTuongKhac(this.state.menhBo, this.state.menhCon)) {
            this.setState({
                luanBo1: "tương khắc",
                menhTheoBo: this.TuongSinh(this.state.menhBo),
                luanBo2: "bớt xung"
            }, () => { this.xuLyTinhLuan() });
        }
        else {
            this.setState({
                luanBo1: "bình",
                menhTheoBo: this.state.menhCon,
                luanBo2: "tự cường"
            }, () => { this.xuLyTinhLuan() });
        }

        if (this.TinhTuongSinh(this.state.menhMe, this.state.menhCon)) {
            this.setState({
                luanMe1: "tương sinh",
                menhTheoMe: this.state.menhCon,
                luanMe2: "hỗ trợ"
            }, () => { this.xuLyTinhLuan() });
        }
        else if (this.TinhTuongKhac(this.state.menhMe, this.state.menhCon)) {
            this.setState({
                luanMe1: "tương khắc",
                menhTheoMe: this.TuongSinh(this.state.menhMe),
                luanMe2: "bớt xung"
            }, () => { this.xuLyTinhLuan() });
        }
        else {
            this.setState({
                luanMe1: "bình",
                menhTheoMe: this.state.menhCon,
                luanMe2: "tự cường"
            }, () => { this.xuLyTinhLuan() });
        }
    }
    xuLyTinhLuan = () => {
        if (this.state.luanBo1 === "bình" && this.state.luanMe1 === "bình") {
            this.setState({
                Luan: "Mệnh cha và mẹ bình với con nên đặt tên con có mệnh " + this.state.menhCon + " để tự cường cho con"
            });
        }
        else {
            this.setState({
                Luan: ["Mệnh cha " + this.state.luanBo1 + " với mệnh con, nên đặt tên con có mệnh " + this.state.menhTheoBo + " để " + this.state.luanBo2 + " cho con", <br />, "Mệnh mẹ " + this.state.luanMe1 + " với mệnh con, nên đặt tên con có mệnh " + this.state.menhTheoMe + " để " + this.state.luanMe2 + " cho con"]
            });
        }
        document.getElementById("menhtbo").style.visibility = "hidden";
        document.getElementById("menhtme").style.visibility = "hidden";
        if (this.state.menhTheoMe === this.state.menhTheoBo) {
            document.getElementById("menhtbo").style.visibility = "visible";
        }
        else {
            document.getElementById("menhtbo").style.visibility = "visible";
            document.getElementById("menhtme").style.visibility = "visible";
        }
    }
    findMeaningMenh(menh) {
        switch ((menh)) {
          case "Kim":
            return "Mệnh Kim đại diện cho thể rắn, cứng cỏi. Mặc khác, Kim còn là vật dẫn, truyền đạt thông tin, ý tưởng sắc sảo và sự công minh. Người thuộc mệnh Kim thường rất tự tin, quyết đoán, không dễ mủi lòng, làm việc nghiêm tú với khả năng tập trung cao và rất kiên trì. Khi họ đã quyết định một điều gì đó, thì rất khó để thay đổi được họ. \n Những phẩm chất này có vai trò quan trọng trong việc hình thành bản tính đầy tham vọng của người mệnh Kim, cùng khả năng lãnh đạo tiềm ẩn, thu hút mọi người, giúp họ tiến đến nấc thang cuối cùng trong việc thực hiện ước mơ của mình."
          case "Mộc":
            return "Những người mệnh Mộc rất có phong thái của người làm quan lớn. Nếu là nam giới thì rất hiên ngang, khí phách và cực kỳ can đảm. Còn nếu như là phụ nữ thì thường có dáng vẻ pha một chút của nam tính. Thường thì những người mệnh Mộc có da đẹp. Gương mặt của người mệnh Mộc khá nghiêm nghị, lưng và ngực họ cũng thường lớn, răng sáng, nướu đỏ và mắt thường sáng ngời."
          case "Thuỷ":
            return "Người mạng Thủy thường là những người có khả năng giao tiếp tốt, họ rất có tài ngoại giao và thuyết phục người khác. Họ cũng là người khá nhạy cảm với tâm trạng của người khác nên họ sẵn sàng trở thành người lắng nghe tâm tư của mọi người. Họ uyển chuyển và dễ thích nghi với môi trường mới, họ nhìn sự vật theo hướng tổng thể nên sự đánh giá của họ về một chuyện gì đó khá chính xác"
          case "Hoả":
            return "Người mệnh Hỏa có tính cách cởi mở, ấm áp, họ hướng ngoại, có tính cách khá nhiệt tình trong mọi hoạt động cũng như khi được người khác nhờ giúp đỡ nên họ thường rất tốt bụng. Trong nhiều quyết định của mình, họ cũng cực kỳ dứt khoát và nhanh nhẹn nên hay chớp lấy được thời cơ tốt. Người mệnh Hỏa cũng luôn sẵn lòng chấp nhận những thử thách dành cho họ. Vì thế mà họ cũng rất thích sự mạo hiểm, có sự chủ động trong công việc, sự nghiệp nên gặt hái nhiều thành công. Những người thuộc mệnh Hỏa thường có tính cách mạnh mẽ, chúng ta không nhìn thấy vẻ ủy mị của họ nên khi tiếp xúc với những người này có cảm giác như chúng ta được che chở."
          case "Thổ":
            return "Người mệnh Thổ có tính cách của sự bao dung, tha thứ và rất đáng để tin cậy. Họ cũng là một người trung thành và rất dễ được người khác yêu mến vì luôn biết giữ đúng cam kết của mình nếu như họ đã hứa với ai đó. Người mệnh Thổ thậm chí khi hứa với ai còn lên kế hoạch để thực hiện điều đó. Họ biết rõ về lợi thế của mình, biết rõ về sức mạnh của bản thân mình và biết cách để phát huy được điều đó. Những người mệnh Thổ cũng có tính cách trầm, bình tĩnh và luôn có sự cẩn trọng trong khi làm việc và họ cũng có khả năng để tổ chức"
          default:
        }
      }
    render() {
        const { searchLastname, names, currentName, currentIndex } = this.state;

        return (
            <div>
                <div className="list row">
                    <div className="col-md-6">
                        <form className="form-horizontal" role="form">
                            <h2>Xem tên theo mệnh</h2>

                            <div className="form-group">
                                <label htmlFor="birthDateBo" className="col-sm-6 control-label">Ngày sinh cha</label>
                                <div className="col-sm-12">
                                    <input type="date" id="birthDateBo" className="form-control" onChange={this.onChangeDateBo} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="birthDateMe" className="col-sm-6 control-label">Ngày sinh mẹ</label>
                                <div className="col-sm-12">
                                    <input type="date" id="birthDateMe" className="form-control" onChange={this.onChangeDateMe} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="birthDateCon" className="col-sm-6 control-label">Ngày sinh con</label>
                                <div className="col-sm-12">
                                    <input type="date" id="birthDateCon" className="form-control" onChange={this.onChangeDateCon} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label col-sm-6">Giới tính</label>
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <label className="radio-inline">
                                                <input name="gioitinh" type="radio" id="nuRadio" value="Nữ" onChange={this.onChangeGioiTinh} />Nữ
                                </label>
                                        </div>
                                        <div className="col-sm-4">
                                            <label className="radio-inline">
                                                <input name="gioitinh" type="radio" id="namRadio" value="Nam" onChange={this.onChangeGioiTinh} />Nam
                                </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link to="/view" onClick={() => { this.xuLyTinhLuan(); console.log(this.state.Luan) }} type="submit" className="btn btn-primary btn-block">Xem mệnh</Link>
                        </form>
                    </div>
                    <div className="card bg-light mb-6" style={{ maxWidth: '20rem' }}>
                        <div className="card-header"><h1>Thông tin mệnh tuổi</h1></div>
                        <div className="card-body">

                                <p className="card-text">Mệnh bố: {this.state.menhBo}</p>
                                <p className="card-text">Mệnh mẹ: {this.state.menhMe}</p>
                                <p className="card-text">Mệnh con: {this.state.menhCon}</p>

                            <h3>Luận:</h3>
                            <p className="card-text" id="Luan">{this.state.Luan}</p>

                            <button id="menhtbo" className="btn btn-block btn-lg btn-danger" onClick={() => { this.searchNames(this.state.menhTheoBo); this.setState({ Menh: this.state.menhTheoBo, currentIndex: 0 }) }}>Tên mệnh {this.state.menhTheoBo}</button>
                            <button id="menhtme" className="btn btn-block btn-lg btn-danger" onClick={() => { this.searchNames(this.state.menhTheoMe); this.setState({ Menh: this.state.menhTheoMe, currentIndex: 0 }) }}>Tên mệnh {this.state.menhTheoMe}</button>
                        </div>
                    </div>

                </div>
                <div className="list row">
                    <div className="col-md-6">
                        <h4>Names List</h4>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by lastname"
                                value={searchLastname}
                                onChange={this.onChangeSearchLastname}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => this.searchNames(this.state.Menh)}
                                >
                                    Search
                            </button>
                            </div>
                        </div>
                        <div data-spy="scroll" data-target="#list-name" data-offset="0">
                            <ul className="list-group" id="list-name">
                                {names &&
                                    names.map((name, index) => (
                                        <li
                                            className={
                                                "list-group-item " +
                                                (index === currentIndex ? "active" : "")
                                            }
                                            onClick={() => this.setActiveName(name, index)}
                                            key={index}
                                        >
                                            {name.fullname}
                                        </li>
                                    ))}
                            </ul>
                        </div>

                    </div>
                    <div className="col-md-6">
                        {currentName ? (
                            <div>
                                <h4>Name</h4>
                                <div>
                                    <label>
                                        <strong>Tên:</strong>
                                    </label>{" "}
                                    {currentName.fullname}
                                </div>
                                <div>
                                    <label>
                                        <strong>Mệnh:</strong>
                                    </label>{" "}
                                    {currentName.menh}
                                </div>

                                <div>
                                    <label>
                                        <strong>Giới tính:</strong>
                                    </label>{" "}
                                    {currentName.gioitinh}
                                </div>

                                <div>
                                    <label>
                                        <strong>Ý nghĩa mệnh:</strong>
                                    </label>{" "}
                                    <p>{this.findMeaningMenh(currentName.menh)}</p>
                                </div>
                                <div>
                                    <label>
                                        <strong>Ý nghĩa tên:</strong>
                                    </label>{" "}
                                    <p>{currentName.meaning}</p>
                                </div>

                                <Link
                                    to={"/names/" + currentName.id}
                                    className="badge badge-warning"
                                >
                                    Chỉnh sửa
              </Link>
                            </div>
                        ) : (
                                <div>
                                    <br />
                                    <p>Hãy chọn một tên để xem...</p>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        );
    }
}
