import { extendObservable } from "mobx";

class UserData {
  constructor() {
    extendObservable(this, {
      loading: true,
      isLoggedIn: false,
      userId: null,
    });
  }
}

export default UserData;
