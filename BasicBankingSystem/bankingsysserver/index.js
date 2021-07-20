var bodyParser=require('body-parser');
var express = require("express");
var path = require('path');
const cors =require('cors');
var db = require('./dbConnect');
var pool = db.getPool();


var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/getCustInfo', function(req, res) {
    console.log("getCustInfo called");

    let strMsg = '';

    let selectAllCust = `select * from Customer`;
    pool.query(selectAllCust, function(err, result, fields) {
            
        if(err) {
            strMsg = `SQL Error while getting the customer information.`;
            res.send({code: 'SQL_ERROR', failuremessage: strMsg, sqlerrcode: err.code, errno: err.errno});
            return; // No further processing required
        } else {
            let strMsg = `Success while getting the customer information.`;
            res.send({code: 'SUCCESS', successmessage: strMsg, retrievedCustomerDataArr: result});
            return; // No further processing required
        }
    });
})

app.post('/getTransferRecords', function(req, res) {
    console.log("getTransferRecords called");

    let strMsg = '';

    let selectTransferRecords = `select TransferID, 
                        (select CustName from Customer where CustID = SenderID) as SenderName, 
                        (select CustName from Customer where CustID = ReceiverID) as ReceiverName,
                        TransferredMoney
                        from TransferRecords`;
    pool.query(selectTransferRecords, function(err, result, fields) {
        if(err) {
            strMsg = `SQL Error while getting the Transfer records.`;
            res.send({code: 'SQL_ERROR', failuremessage: strMsg, sqlerrcode: err.code, errno: err.errno});
            return; // No further processing required
        } else {
            let strMsg = `Success while getting the Transfer records.`;
            res.send({code: 'SUCCESS', successmessage: strMsg, retrievedTransferredRec: result});
            return; // No further processing required
        }
    });
})

app.post('/transferMoney', function(req, res) {
    console.log("transferMoney called");

    let strMsg = '';

    let reqBody = req.body;
    if( reqBody == null || 
        ("CustID" in reqBody) == false || 
        reqBody.CustID == null || reqBody.CustID.length <= 0 ||
        ("ReceiverID" in reqBody) == false || 
        reqBody.ReceiverID == null || reqBody.ReceiverID.length <= 0 ||
        ("AmtToTransfer" in reqBody) == false || 
        reqBody.AmtToTransfer == null || reqBody.AmtToTransfer.length <= 0
    ) {

        strMsg = `Request JSON missing or does not contain CustID, ReceiverID, AmtToTransfer`;  
        res.send({code: 'REQ_PARAMS_MISSING', failuremessage: strMsg});
        return; // No further processing required
    }

    let CustID = reqBody["CustID"];
    let ReceiverID = reqBody["ReceiverID"];
    let AmtToTransfer = reqBody["AmtToTransfer"];

    let updateSenderBalance = `insert into TransferRecords (SenderID, ReceiverID, TransferredMoney, TransferDtTm)
                                values (${CustID}, ${ReceiverID}, ${AmtToTransfer}, DATE_FORMAT(utc_timestamp(), '%Y-%m-%d %H:%i:%S'))`;

    pool.query(updateSenderBalance, function(err, result, fields) {

        if(err) {
            strMsg = `SQL Error while creating transfer record.`;
            res.send({code: 'SQL_ERROR', failuremessage: strMsg, sqlerrcode: err.code, errno: err.errno});
            return; // No further processing required
        } else {

            let updateSenderBalance = `update Customer
                                        set CustBalance = CustBalance - ${AmtToTransfer}
                                        where CustID = "${CustID}"`;
            pool.query(updateSenderBalance, function(err, result, fields) {
                    
                if(err) {
                    strMsg = `SQL Error while Updating sender's balance with ID ${CustID}.`;
                    res.send({code: 'SQL_ERROR', failuremessage: strMsg, sqlerrcode: err.code, errno: err.errno});
                    return; // No further processing required
                } else {
                    let updateReceiverBalance = `update Customer
                                                set CustBalance = CustBalance + ${AmtToTransfer}
                                                where CustID = "${ReceiverID}"
                                                `;
                    pool.query(updateReceiverBalance, function(err, result, fields) {
                            
                        if(err) {
                            strMsg = `SQL Error while Updating receivers's balance with ID ${ReceiverID}.`;
                            res.send({code: 'SQL_ERROR', failuremessage: strMsg, sqlerrcode: err.code, errno: err.errno});
                            return; // No further processing required
                        } else {
                            let strMsg = `Success while Updating sender's and receivers's balance.`;
                            res.send({code: 'SUCCESS', successmessage: strMsg, retrievedCustomerDataArr: result});
                            return; // No further processing required
                        }
                    });
                }
            });
        }
    });
})

app.use(express.static(path.join(__dirname, '../bankingsysclient/build'))); // Only for production environment
app.listen(80);


console.log("node is listning on port 80")