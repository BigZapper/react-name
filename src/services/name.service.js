import http from "../http-common";

class NameDataService {
  getNames(){
    return http.get("/names/viewnames");
  }
  getAll() {
    return http.get("/names");
  }

  get(id) {
    return http.get(`/names/${id}`);
  }

  create(data) {
    return http.post("/names/", data);
  }

  update(id, data) {
    return http.put(`/names/${id}`, data);
  }

  delete(id) {
    return http.delete(`/names/${id}`);
  }

  deleteAll() {
    return http.delete(`/names`);
  }

  findByLastname(lastname) {
    return http.get(`/names?lastname=${lastname}`);
  }
  findByMenh(lastname, menh, gioitinh){
    return http.get(`/names/viewnames?lastname=${lastname}&menh=${menh}&gioitinh=${gioitinh}`)
  }
  findMeaning(name){
    return http.get(`/names/meaningname?name=${name}`)
  }
}

export default new NameDataService();
