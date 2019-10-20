"use strict";

var util = require('util');

class FileUser {
  constructor(jsonObject) {
    this.UserID = jsonObject.UserID;
    this.FirstLastName = jsonObject.FirstLastName;
    this.Version = jsonObject.Version;
    this.Company = jsonObject.Company;
  }
  //   set name(name) {
  //     this._name = name.charAt(0).toUpperCase() + name.slice(1);
  //   }
  //   get name() {
  //     return this._name;
  //   }
  debugObject() {
    return util.format('UserID: %s, FirstLastName: %s, Version: %d, Company: %s', this.UserID, this.FirstLastName, this.Version, this.Company);
  }


  update(anotherUser) {
    this.UserID = anotherUser.UserID;
    this.FirstLastName = anotherUser.FirstLastName;
    this.Version = anotherUser.Version;
    this.Company = anotherUser.Company;
  }

  isTheSameUserAndNewer(anotherUser) {
    return (
      anotherUser.UserID == this.UserID &&
      this.Company == anotherUser.Company &&
      this.Version < anotherUser.Version)
      ;
  }

  static CSVHeader() {
    return "UserID,FirstLastName,Version,Company\r\n";
  }

  ToCSVRow() {
    return util.format("%s,%s,%d,%s\r\n", this.UserID, this.FirstLastName, this.Version, this.Company);
  }

}

module.exports = FileUser;