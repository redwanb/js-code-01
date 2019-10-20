"use strict";

const Papa = require("papaparse");
const fs = require('fs');
const util = require('util');
const csvFileContent = fs.readFileSync('input/sample-file.csv', 'utf8');
const FileUser = require("./FileUser");


var papaConfig =
{
    delimiter: '\t',	// auto-detect
    newline: "",	// auto-detect
    quoteChar: '"',
    escapeChar: '"',
    header: true,
    skipEmptyLines: true,
}

var csvContent = Papa.parse(csvFileContent, papaConfig);
var previousInlineFileUsers = [];
var outputFiles = [];


for (let index = 0; index < csvContent.data.length; index++) {

    var currentInlineFileUser = new FileUser(csvContent.data[index]);
    var keyCompany = currentInlineFileUser.Company;
    var keyUserID = currentInlineFileUser.UserID;
    var keyFirstLastName = currentInlineFileUser.FirstLastName;
    var bUpdateRequired = false;

    if (previousInlineFileUsers[keyCompany] != null && previousInlineFileUsers[keyCompany][keyUserID] != null) {
        var pu = previousInlineFileUsers[keyCompany][keyUserID];

        bUpdateRequired = pu.isTheSameUserAndNewer(currentInlineFileUser);

        if (bUpdateRequired) {
            outputFiles[keyCompany][keyFirstLastName] = currentInlineFileUser;
        }
    }

    if (previousInlineFileUsers[keyCompany] == null) {
        previousInlineFileUsers[keyCompany] = [];
    }

    if (outputFiles[keyCompany] == null) {
        outputFiles[keyCompany] = [{}];
        fs.appendFileSync(util.format('output/%s.csv', keyCompany), FileUser.CSVHeader());
    }

    previousInlineFileUsers[keyCompany][keyUserID] = currentInlineFileUser;

    if (!bUpdateRequired && outputFiles[keyCompany][keyFirstLastName] == null) {
        outputFiles[keyCompany][keyFirstLastName] = currentInlineFileUser;
    }
}

for (var vCompanyName in outputFiles) {

    var sorted = [];
    for (var key in outputFiles[vCompanyName]) {
        if (key != 0) {
            sorted[sorted.length] = key;
        }
    }

    sorted.sort();

    for (let index = 0; index < sorted.length; index++) {
        const element = outputFiles[vCompanyName][sorted[index]];

        fs.appendFileSync(util.format('output/%s.csv', vCompanyName), element.ToCSVRow());
    }
}