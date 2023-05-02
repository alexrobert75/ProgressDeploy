import axios from "axios";
import { UserInfo, AuthInfo, Evaluation } from "../types/type";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

function errorHandler(error: any) {
  if (error.response.date) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

const apiHandler = {
  service,

  signin(authInfo: AuthInfo) {
    return service
      .post("api/auth/signin", authInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signup(userInfo: UserInfo) {
    return service
      .post("api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },
  
  getEvals() {
    return service
      .get("api/evaluation/allevaluation")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getAllEvalsForTeacher() {
    return service
      .get("api/evaluation/allevaluations")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getAllEvalsForTeacherAllDetails() {
    return service
      .get("api/evaluation/allevaluationsfulldetails")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  fetchQuestionsForEval() {
    return service
    .get("api/question/questionsforeval")
    .then((res) => res.data).catch(errorHandler)
  },

  submitEval(evaluation:Evaluation) {
    return service
      .post("api/evaluation/newevaluation", evaluation)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getOneEval(id:string) {
    console.log("get eval with id ", id)
    return service
    .get(`api/evaluation/${id}`)
    .then((res) => res.data).catch(errorHandler);
  },

  updateEval(id:string, evaluation:any){
    return service
      .post("api/evaluation/updateevaluation", {id, evaluation})
      .then((res) => res.data)
      .catch(errorHandler);
  },

  deleteEval(id:string){
    return service
    .post("api/evaluation/deleteevaluation", {id})
    .then((res) => res.data)
    .catch(errorHandler);
  },

  getallusers(id:string){
    return service
    .get("api/users/allusers")
    .then((res) => res.data)
    .catch(errorHandler);
  },

  openCloseEval(updatedClasse : string, isOpen : boolean, titreEval : string){
    return service
    .post("api/users/opencloseeval", {updatedClasse, isOpen, titreEval})
    .then((res) => res.data)
    .catch(errorHandler);
  }

};

export default apiHandler;
