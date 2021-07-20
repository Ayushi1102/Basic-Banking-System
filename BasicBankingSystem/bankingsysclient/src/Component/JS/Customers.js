import React, { Component } from 'react'
import '../CSS/Customer.css'
import'../CSS/AllDeviceData.css'
import 'react-table/react-table.css';
import axios from 'axios';
import ReactTable from 'react-table';
import { FaSearch} from 'react-icons/fa';
import { Modal, ModalHeader, ModalBody} from 'reactstrap';
import { getAPIHostURL } from '../../ClientConfig';

export class Customers extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            error: "",
            errCust: "",
            modal: false,
            backdrop: 'static',
            selectCustId: "",
            selectedCustName: "",
            selectedCustEmail:"",
            selectedCustBalance: "",
            selectCustIdToTransferMoney: "",
            amtToBeTransfer: "",
            arrCustToTransferMoney: [],
            arrOriginalCust: [],
            data: [
                {Transfer: <button className="btn btn-primary">Transfer</button>, CustID:1, CustName: "rama", CustEmail:"rama@gmail.com", CustBalance:"10000"}
            ],
            columns: [
                {       
                    Header:() => <div className="AlertLogTableHeader">Transfer Money</div>,
                    accessor: 'Transfer',
                    width: 280,
                    style:({
                        textAlign:"center",
                        paddingLeft: "1rem"
        
                    }),
                    getProps: (state, rowInfo, column) => {
                        return {
                            onClick: () => this.onClickTransfer(rowInfo, column),
                            style: {
                                color: "black",
                            },                   
                        }; 
                    },
                    Filter:({filter, onChange}) => {
                        return(
                            <div>
                                <input style={{ display:"none"}} />
                            </div>
                        )
                    },
                    Cell:  props => <span className='deviceNameCell' view={props.original.view}>{props.value}</span>
                }, 
                {       
                    Header:() => <div className="AlertLogTableHeader">Customer ID</div>,
                    accessor: 'CustID',
                    width: 280,
                    style:({
                        textAlign:"center",
                        paddingLeft: "1rem"
        
                    }),
                    Filter: this.createAlertLogFilter,
                }, 
                {   
                    Header:() => <div className="AlertLogTableHeader">Customer Name</div>, 
                    accessor: "CustName",
                    width: 280,
                    style:({
                        textAlign: "center",
                        verticalAlign: "middle",
                        paddingLeft: "1rem"
        
                    }),
                    Filter: this.createAlertLogFilter,
                },
                {   
                    Header:() => <div className="AlertLogTableHeader">Customer Email</div>, 
                    accessor: "CustEmail",
                    width: 280,
                    // Filter: this.createAlertLogFilter,
                    style:({
                        textAlign:"center",
                        paddingLeft: "1rem"
        
                    }),
                    Filter: this.createAlertLogFilter,
                },
                
                {   
                    Header:() => <div className="AlertLogTableHeader">Current Balance</div>, 
                    accessor: "CustBalance",
                    width: 280,
                    style:({
                        textAlign:"center",
                        paddingLeft: "1rem"
        
                    }),
                    Filter: this.createAlertLogFilter,
                },
            ]
        }
    }

    componentDidMount() {
        this.getCustomerDetails();
    }

    getCustomerDetails = (inModifiedstate = null) => {

        let modifiedState = this.state;

        if(inModifiedstate == null) {
            modifiedState = this.state
        } else {
            modifiedState = inModifiedstate;
        }
        
        modifiedState.data = [];

        axios.post(`${getAPIHostURL()}/getCustInfo`)
        .then(response =>{
            if(response.data.code == 'SUCCESS') {
                if(response.data.retrievedCustomerDataArr == null || response.data.retrievedCustomerDataArr.length <= 0) {
                    modifiedState.errCust = `No data found for customer.`;
                } else {

                    let receiveCustomerDataArr = response.data.retrievedCustomerDataArr;
                    modifiedState.arrOriginalCust = response.data.retrievedCustomerDataArr;

                    modifiedState.data = [];

                    for(let i = 0; i < receiveCustomerDataArr.length; i++) {
                        const customerDetails = receiveCustomerDataArr[i];
                        let singleCustomerDetails = {
                            Transfer: <button className = "createOrderButton">Transfer</button>,  
                            CustID: customerDetails.CustID,
                            CustName: customerDetails.CustName,
                            CustEmail:customerDetails.CustEmail,
                            CustBalance: customerDetails.CustBalance

                        }
                        modifiedState.data.push(singleCustomerDetails);
                    }
                }

            } else {
                if(response.data.code == 'SQL_ERROR') {
                    modifiedState.errCust = "Server experincing issues."
                } else {
                    console.log("Should not reach here");
                    modifiedState.errCust = "Server experincing issues."
                }
            }
            this.setState(modifiedState);

        })
        .catch(err => {
            console.log("Network error");
            console.log(err);
            if (axios.isCancel(err)) {
                console.log('Axios request cancelled beacuse of too many requests being sent to the Server.');
            } else {
                modifiedState.errCust = "Server experincing issues.";
                this.setState(modifiedState);
            }
        })
    }

    onClickBack = () => {
        let modifiedState = this.state;
        modifiedState.modal = false;
        this.setState(modifiedState);
    }

    onClickTransfer = (rowInfo, column) => {
        let modifiedState = this.state;
        modifiedState.modal = true;
        modifiedState.selectCustId = rowInfo.original.CustID;
        modifiedState.selectedCustName = rowInfo.original.CustName;
        modifiedState.selectedCustEmail = rowInfo.original.CustEmail;
        modifiedState.selectedCustBalance = rowInfo.original.CustBalance;
        modifiedState.arrCustToTransferMoney = modifiedState.data.filter((singleCustInfo)=> singleCustInfo.CustID != modifiedState.selectCustId);
        this.setState(modifiedState);
    }

    onChangeAmtToTransfer = (e) => {
        e.preventDefault();
        let modifiedState = this.state;
        modifiedState.amtToBeTransfer = e.target.value;
        modifiedState.error = "";

        if(parseInt(modifiedState.selectedCustBalance) < parseInt(modifiedState.amtToBeTransfer)) {
            modifiedState.error = "Requested more money.";
        }

        this.setState(modifiedState);
    }

    createAlertLogFilter = ({filter, onChange}) => {
        return(
            <div>
                <FaSearch style={{marginRight:"0.3rem",color:"var(--secondaryColor)"}}/>
                <input
                    onChange={event => onChange(event.target.value)}
                    value={filter ? filter.value : ''}
                    placeholder="Search"
                    style={{width: "85%"}}
                />
            </div>
        );
    }

    onChangeCustToTransferMoney = (e) => {
        let modifiedState = this.state;
        modifiedState.selectCustIdToTransferMoney = e.target.value;
        this.setState(modifiedState);
    }

    onTransferMoney = () => {
        let modifiedState = this.state;

        let jsonBody = {
            CustID: modifiedState.selectCustId,
            ReceiverID: modifiedState.selectCustIdToTransferMoney,
            AmtToTransfer: modifiedState.amtToBeTransfer
        }

        axios.post(`${getAPIHostURL()}/transferMoney`, jsonBody)
        .then(response =>{
            if(response.data.code == 'SUCCESS') {
                alert(`Amount transferred Successfully`);
                modifiedState.modal = false;
                modifiedState.selectCustId = "";
                modifiedState.amtToBeTransfer = "";
                modifiedState.selectCustIdToTransferMoney = "";
                modifiedState.selectedCustBalance = "";
                modifiedState.selectedCustEmail ="";
                modifiedState.selectedCustName ="";
                this.getCustomerDetails(modifiedState);


            } else {
                if(response.data.code == 'SQL_ERROR') {
                    modifiedState.errCust = "Server experincing issues."
                } else {
                    console.log("Should not reach here");
                    modifiedState.errCust = "Server experincing issues."
                }
                this.setState(modifiedState);
            }
        })
        .catch(err => {
            console.log("Network error");
            console.log(err);
            if (axios.isCancel(err)) {
                console.log('Axios request cancelled beacuse of too many requests being sent to the Server.');
            } else {
                modifiedState.errCust = "Server experincing issues.";
                this.setState(modifiedState);
            }
        })
    }

    filterCaseInsensitive = (filter, row) => {
        const id = filter.pivotId || filter.id;
        return (
            row[id] != undefined ?
                String(row[id].toString().toLowerCase()).includes(filter.value.toLowerCase())
                :
                false
        );
    }
    
    render() {
        return (
            <div style={{borderTop:"2px solid var(--primaryColor)", margin:"0.5rem"}}>
                <div className = "container col-lg-12" style = {{display: "flex", justifyContent: "center"}}>
                    <div className = "customerTableHeading">
                        All Customer Details
                    </div>
                </div>
                <div style={{borderStyle: "solid", borderWidth: "1px"}}>
                    <ReactTable
                        data = {this.state.data}
                        columns = {this.state.columns}
                        defaultPageSize = {10}
                        filterable
                        defaultFilterMethod = {this.filterCaseInsensitive}  
                        className = "-striped -highlight" 
                        style = {{height:'84vh', overflow:'auto'}}  
                        noDataText = "Not Customer Data Found."
                        previousText = "Previous"
                        nextText = "Next"
                        page={this.state.page}
                    />
                </div>
                <Modal size="lg" isOpen={this.state.modal} backdrop={this.state.backdrop}>
                    <ModalHeader toggle={this.toggle} style={{textAlign: "center"}}>
                        Transfer Money
                    </ModalHeader>
                    <ModalBody>  
                        <div className="container-fluid">
                            <div className="row justify-content-center">
                                <div className="container col-lg-11 col-md-12">
                                    <div className="modal-body addCustbox">
                                        <form>
                                            <div className="form-group addCustForm">
                                                <div className="input-group">
                                                    <label className="addCustFormLabelWithRequiredFiled">Sender ID:
                                                    <span className="addCustRequiredMarkStar"></span></label>
                                                    <div className="addCustInputAndError">
                                                        <input type='text' name='custID' className=" addCustInputForm"  
                                                            value={this.state.selectCustId} noValidate  readOnly = {true}
                                                            style={{color: "#505050", backgroundColor: "#F0F0F0"}}
                                                        />  
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group addCustForm">
                                                <div className="input-group">
                                                    <label className="addCustFormLabelWithRequiredFiled">Sender Name:
                                                    <span className="addCustRequiredMarkStar"></span></label>
                                                    <div className="addCustInputAndError">
                                                        <input type='text' name='custName' className=" addCustInputForm"  
                                                            value={this.state.selectedCustName} noValidate  readOnly = {true}
                                                            style={{color: "#505050", backgroundColor: "#F0F0F0"}}
                                                        />  
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group addCustForm">
                                                <div className="input-group">
                                                    <label className="addCustFormLabelWithRequiredFiled">Sender Email:
                                                    <span className="addCustRequiredMarkStar"></span></label>
                                                    <div className="addCustInputAndError">
                                                        <input type='text' name='custEmail' className=" addCustInputForm"  
                                                            value={this.state.selectedCustEmail} noValidate  readOnly = {true}
                                                            style={{color: "#505050", backgroundColor: "#F0F0F0"}}
                                                        />  
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group addCustForm">
                                                <div className="input-group">
                                                    <label className="addCustFormLabelWithRequiredFiled">Sender Balance:
                                                    <span className="addCustRequiredMarkStar"></span></label>
                                                    <div className="addCustInputAndError">
                                                        <input type='text' name='custBalance' className=" addCustInputForm"  
                                                            value={this.state.selectedCustBalance} noValidate  readOnly = {true}
                                                            style={{color: "#505050", backgroundColor: "#F0F0F0"}}
                                                        />  
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group addCustForm">
                                                <div className="input-group">
                                                    <label className="addCustFormLabelWithRequiredFiled">Select Customer To Transfer Money:</label>
                                                    <div className="addCustInputAndError">
                                                        <select className="addCustInputForm" 
                                                                type = "text"
                                                                name="country"
                                                                required
                                                                value={this.state.selectCustIdToTransferMoney}
                                                                onChange={this.onChangeCustToTransferMoney}
                                                            >
                                                                <option value="" select="true" >Select...</option> 
                                                                {(this.state.arrCustToTransferMoney).map((singleCustInfo, index) => 
                                                                <option key={index} value={singleCustInfo.CustID}>
                                                                {singleCustInfo.CustName}</option>)}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group addCustForm">
                                                <div className="input-group">
                                                    <label className="addCustFormLabelWithRequiredFiled">Amount To Be Transfered:
                                                    <span className="addCustRequiredMarkStar"></span></label>
                                                    <div className="addCustInputAndError">
                                                        <input type='number' name='amtToBeTransfer' className="addCustInputForm"  
                                                            value={this.state.amtToBeTransfer} noValidate onChange={this.onChangeAmtToTransfer}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{display: "flex", justifyContent: "space-evenly"}}>
                                                <div>
                                                    <button type="button" className="addCustSavebtn" 
                                                        onClick={this.onClickBack} name="Back" 
                                                        style={{pointerEvents: "auto"}}
                                                    > 
                                                    Back</button>
                                                </div >
                                                <div>
                                                    <button type="button" className="addCustSavebtn"  name="Save" onClick={this.onTransferMoney}>
                                                    Transfer
                                                    </button>
                                                </div>
                                            </div>
                                            <div className = "buttonErrorMessage">
                                                {this.state.error.length > 0 && 
                                                    <p  className='addCustError' style={{textAlign: "center"}}>{this.state.error}</p>}
                                                {/* {successfulRegisterMsg.length > 0 &&
                                                    <p style={{color:'green', textAlign: "center"}} className='addCustError'>{successfulRegisterMsg}</p>} */}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default Customers
