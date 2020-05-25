import React, { Component } from "react";
import NameDataService from "../services/name.service";
import { Link } from "react-router-dom";

export default class NamesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchLastname = this.onChangeSearchLastname.bind(this);
    this.retrieveNames = this.retrieveNames.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveName = this.setActiveName.bind(this);
    // this.removeAllNames = this.removeAllNames.bind(this);
    this.searchLastname = this.searchLastname.bind(this);

    this.state = {
      names: [],
      currentName: null,
      currentIndex: -1,
      searchLastname: ""
    };
  }

  componentDidMount() {
    this.retrieveNames();
  }

  onChangeSearchLastname(e) {
    const searchLastname = e.target.value;

    this.setState({
      searchLastname: searchLastname
    });
  }

  retrieveNames() {
    NameDataService.getAll()
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
  // removeAllNames() {
  //   NameDataService.deleteAll()
  //     .then(response => {
  //       console.log(response.data);
  //       this.refreshList();
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

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


  render() {
    const { searchLastname, names, currentName, currentIndex } = this.state;

    return (
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
                onClick={this.searchLastname}
              >
                Search
              </button>
            </div>
          </div>
          <div data-spy="scroll" data-target="#navbar-example2" data-offset="0">
            <ul className="list-group">
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
          {/* <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllNames}
          >
            Remove All
          </button> */}
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
    );
  }
}
