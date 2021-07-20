import React, { Component } from 'react'
import 'react-table/react-table.css';
import axios from 'axios';
import ReactTable from 'react-table';
import { getAPIHostURL } from '../../ClientConfig';
import { FaSearch} from 'react-icons/fa';

export class TransferRecords extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            data: [],
            columns: [
                {       
                    Header:() => <div className="AlertLogTableHeader">Transfer ID</div>,
                    accessor: 'TransferID',
                    width: 280,
                    style:({
                        textAlign:"center",
                        paddingLeft: "1rem"
        
                    }),
                    Filter: this.createAlertLogFilter,
                },
                {       
                    Header:() => <div className="AlertLogTableHeader">Sender Name</div>,
                    accessor: 'SenderName',
                    width: 280,
                    style:({
                        textAlign:"center",
                        paddingLeft: "1rem"
        
                    }),
                    Filter: this.createAlertLogFilter,
                }, 
                {   
                    Header:() => <div className="AlertLogTableHeader">Receiver Name</div>, 
                    accessor: "ReceiverName",
                    width: 280,
                    style:({
                        textAlign: "center",
                        verticalAlign: "middle",
                        paddingLeft: "1rem"
        
                    }),
                    Filter: this.createAlertLogFilter,
                },
                {   
                    Header:() => <div className="AlertLogTableHeader">Transferred Amount</div>, 
                    accessor: "TransferredMoney",
                    width: 280,
                    // Filter: this.createAlertLogFilter,
                    style:({
                        textAlign:"center",
                        paddingLeft: "1rem"
        
                    }),
                    Filter: this.createAlertLogFilter,
                },
            ]
        }
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

    componentDidMount() {
        this.getTransferRecords();
    }

    getTransferRecords = () => {

        let modifiedState = this.state;
        
        modifiedState.data = [];

        axios.post(`${getAPIHostURL()}/getTransferRecords`)
        .then(response =>{
            console.log(response);
            if(response.data.code == 'SUCCESS') {
                if(response.data.retrievedTransferredRec == null || response.data.retrievedTransferredRec.length <= 0) {
                    modifiedState.errCust = `No Transfer Records found.`;
                } else {

                    modifiedState.data = response.data.retrievedTransferredRec;

                    console.log(modifiedState.data);
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
                        Transfer Records
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
                
            </div>
        )
    }
}

export default TransferRecords
