import React, { Component } from 'react'
import {FaUser, FaMoneyBill, FaTable} from 'react-icons/fa';
import { Redirect } from 'react-router-dom';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import bankLogo from '../IMAGES/BankIcon.png';

export class BankingHome extends Component {

    ViewCustDetailsAndTransfer = () => {
        window.open("/customers", "_self");
    }

    ViewRecords = () => {
        window.open("/transfer", "_self");
    }

    render() {
        return (
            <div style={{border:"1px solid var(--primaryColor)", margin:"0.5rem"}}>
                <SplitterLayout percentage={true} customClassName="VcSplitter" secondaryInitialSize={50}>
                    <div>

                        <div className="col-xs-12 col-sm-12 col-md-12"
                            style={{height:"80vh", display:"flex", justifyContent:"center", alignItems:"center",width:'45vw'}}
                        >
                            <div className="col-xs-12 col-sm-6 col-md-10 offset-md-1 offset-xs-3 offset-sm-3">
                                <img src={bankLogo} style={{width:"30rem", height:"20rem"}}/>
                            </div>
                        </div>
                    </div>
                    <div> 
                        <div className = "container col-lg-12" style = {{display: "flex", justifyContent: "center"}}>
                            <div className = "customerTableHeading">
                                Welcome to the Bank Of India
                            </div>
                        </div> 
                        <div className="col-xs-12 col-sm-12 col-md-12"
                            style={{height:"70vh", display:"flex", justifyContent:"center", alignItems:"center",width:'66vw'}}
                        >
                            <div className="col-xs-12 col-sm-6 col-md-10 offset-md-1 offset-xs-3 offset-sm-3">
                                <div className="modal-body addCustbox" style={{height:"20rem", paddingTop:"5rem"}}>
                                    <div>
                                        <button type="button" className="addCustSavebtn" onClick={this.ViewCustDetailsAndTransfer}>
                                        &nbsp; <FaUser/> View Customer List&nbsp; 
                                        </button>
                                    </div>
                                    <div>
                                        <button type="button" className="addCustSavebtn"  name="Save" onClick={this.ViewCustDetailsAndTransfer}>
                                        &nbsp; &nbsp; <FaMoneyBill/> &nbsp; Transfer Money &nbsp; &nbsp; &nbsp; 
                                        </button>
                                    </div>
                                    <div>
                                        <button type="button" className="addCustSavebtn"  name="Save" onClick={this.ViewRecords}>
                                        <FaTable/> See Transfer Records
                                        </button>
                                    </div>
                                </div> 
                            </div>
                        </div> 

                    </div>
                </SplitterLayout>
                
            </div>
        )
    }
}

export default BankingHome
