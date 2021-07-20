// This file contains the configurations for web client.

const APIHostURL = "http://localhost";
// const APIHostURL = "http://35.154.69.58:3010";
// const APIHostURL = "";

const SingleDeviceDataRefreshTime = 300000;
const AllDeviceDataRefreshTime = 300000;
const AlertLogDataRefreshTime = 300000;
const MappedToiletDataRefreshTime = 300000;
const DeviceActiveStatusRefreshTime = 300000; 
const DeviceActiveStatusTimeOut = 5000;  // 5 Seconds for Timout while checking device active status

const DEVC_SW_LOCATION_ON_SRVR = 'vilisoserver/devicesoftware';

function getAPIHostURL() {
    return APIHostURL;
}

function getSingleDeviceDataRefreshTime() {
    return SingleDeviceDataRefreshTime;
}

function getAllDeviceDataRefreshTime() {
    return AllDeviceDataRefreshTime;
}

function getAlertLogDataRefreshTime(){
    return AlertLogDataRefreshTime;
}

function getMappedToiletDataRefreshTime(){
    return MappedToiletDataRefreshTime;
}

function getDevcSwLocnOnSrvr(){
    return DEVC_SW_LOCATION_ON_SRVR;
}

function getDeviceActiveStatusRefreshTime() {
    return DeviceActiveStatusRefreshTime;
}

function getDeviceActiveStatusTimeOut() {
    return DeviceActiveStatusTimeOut;
}



exports.getAPIHostURL = getAPIHostURL;
exports.getDevcSwLocnOnSrvr = getDevcSwLocnOnSrvr;
exports.getSingleDeviceDataRefreshTime = getSingleDeviceDataRefreshTime;
exports.getAllDeviceDataRefreshTime = getAllDeviceDataRefreshTime;
exports.getAlertLogDataRefreshTime = getAlertLogDataRefreshTime;
exports.getMappedToiletDataRefreshTime = getMappedToiletDataRefreshTime;
exports.getDeviceActiveStatusRefreshTime = getDeviceActiveStatusRefreshTime;
exports.getDeviceActiveStatusTimeOut = getDeviceActiveStatusTimeOut;

