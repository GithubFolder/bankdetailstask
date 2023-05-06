import React, { useState, useEffect } from "react";

import { Form, FormElement } from "@progress/kendo-react-form";

import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import { Label } from "@progress/kendo-react-labels";

import { FiTrash2, FiEdit3 } from "react-icons/fi";
import { Input, RadioGroup } from "@progress/kendo-react-inputs";

import { DropDownList } from "@progress/kendo-react-dropdowns";
import { useSelector,useDispatch } from 'react-redux';

import {GetAllBankThunkApi, GetBankBranchThunkApi,AddBankDertailsThunkApi} from './redux/reduxThunkApi/BankService';

function App() {
 const bankdetails = useSelector((state) => state.bankDetails);
 console.log(bankdetails);

 const allcustomersdata = useSelector((state) => state.allCustomers);
 console.log( allcustomersdata );

//  const banknames = useSelector((state) => state.bankNames);
 const bankNames = useSelector((state) => state.bankNames);
 console.log( bankNames);

 const branchLists = useSelector((state) => state.branchList);
 console.log(branchLists);


 const accounttypes  = useSelector((state) => state.accountTypes);
 console.log(accounttypes);

 const addbankdetails = useSelector((state) => state.addbankdetails);


 const dispatch = useDispatch();
//  console.log(dispatch);




  const [bankinfo,setBankInfo] = useState({
    customerCapacity:"",
    isPrimaryAccount:"",
    numberOfPostDatedChequeInHand:"",
    accountHolderName:"",
    bankName:"",
    // branches:"",
    branchName:"",
    openingDate:"",
    accountNo:"",
    reEnteredAccountNo:"",
    accountType:"",
    noOfChequeReturns:'',
    averagebankBalance:"",
    remarks:""
  })



  const handleChange = (e) => {
  setBankInfo({...bankinfo,[e.target.name]:e.target.value});
  }

  const radioData = [
    {
      label:"Yes",
      value:true
    },
    {
      label:"NO",
      value:false
    }
  ]


  useEffect(() => {
   dispatch(GetAllBankThunkApi({
    internalApplicationId: 102,
    userId: "Trainee",
    userRole: "SALES"
   }))
  },[]);


  const handleClick = () => {
    dispatch(AddBankDertailsThunkApi({
    "internalApplicationId": 102,
    "userId": "Trainee",
    "userRole": "SALES",
    "applicantId": 2,
    "isPrimaryAccount": bankinfo.isPrimaryAccount,
    "numberOfPostDatedChequeInHand":parseInt(bankinfo.numberOfPostDatedChequeInHand),
    "accountHolderName":bankinfo.accountHolderName,
    "bankName": bankinfo.bankName,
    "branchName": bankinfo.branchName,
    "openingDate": bankinfo.openingDate,
    "accountNo":bankinfo.accountNo,
    "reEnteredAccountNo":bankinfo.reEnteredAccountNo,
    "accountType": bankinfo.accountType,
    "noOfChequeReturns":bankinfo.noOfChequeReturns,
    "averagebankBalance":bankinfo.averagebankBalance,
    "remarks": "REMARK TEST",
    "bankCode":102,
    "branchCode": 2
    }))
  }
  console.log(bankinfo);

 



const allCustomersData = allcustomersdata.map((data1) => ({
  text: `${data1.capacityName}-${data1.firstName} `,
  value: data1.internalCustomerId
})
);
// console.log(allCustomersData);


const nameOFTheBanks =  bankNames.map((banks) => ({
  text: `${banks.bank_name}`,
  value: banks.bank_code
})
);

const bankBranches =   branchLists?.map((branches) => ({
  text: `${branches.branch_name}`,
  value: branches.branch_code
  // value: branches.internalBankdetailsId
})
);

 const  accounttypedata =  accounttypes.map((accounts) => ({
  text: `${accounts.value}`,
  value: accounts.id
  // value:accounts.internalCustomerId
})
);
console.log(accounttypedata);

  

  return (
    <div>
      <Form
        render={(formRenderProps) => (
          <FormElement>
            <div>
              <Label htmlFor = "customerCapacity">Customer Capacity</Label>
              <DropDownList style={{width:"500px"}} 
              onChange={(e) => setBankInfo({...bankinfo,[e.target.name]:e.target.value.value})}
             name = "customerCapacity"
            data = {allCustomersData}
            textField='text'
            dataItemKey='value'             
              // value = {bankinfo.customerCapacity}
              /><br/>
              <Button style={{paddinBottom:"20px",marginTop:"10px"}} onClick={handleClick}>Save</Button>
              <div>
                <Label htmlFor ="isprimaryaccount">Is Primary Account?</Label>
                <RadioGroup 
                name="isprimaryaccount"
                data = {radioData} layout={"horizontal"}
                onChange={e =>setBankInfo({...bankinfo,isPrimaryAccount:e.value})}
                value={bankinfo.isPrimaryAccount}
                />
              </div>
            </div>


            <div style={{ width: "500px", paddingTop: "20px" }}>
              <div>
                <div>
                  <Label htmlFor="numberOfPostDatedChequeInHand">
                    Security Post Dated Cheques on hand
                  </Label>
                  <Input
                    name="numberOfPostDatedChequeInHand"
                    onChange={handleChange}
                    // value={bankinfo.numberOfPostDatedChequeInHand}
                    hint={"No Of Post dated cheques in hand"}
                  />
                  <p>No of post dated cheques in hand</p>
                </div>

                <div>
                  <Label htmlFor="accountHolderName">
                    Name of the account holder
                  </Label>
                  <Input
                    name="accountHolderName"
                    onChange={handleChange}
                    // value={bankinfo.accountHolderName}
                  />
                </div>
                <div>
                  <Label htmlFor=" bankName">Name of the bank</Label>
                  <DropDownList
                    name="bankName"
                    // value={bankinfo.bankName}
                    data={nameOFTheBanks}
                    textField="text"
                    dataItemKey="value"
                    onChange={(event) => {
                      console.log(event.target.value);
                      setBankInfo({ ...bankinfo, bankName:event.target.value.text});
                      dispatch(GetBankBranchThunkApi({ 
                        // bankCode:setBankInfo(branchLists)
                        bankCode:event.target.value.value
                      }));
                    }}
                  />
                </div>
              </div>

              <div>
                <div>
                  <Label htmlFor="branchName">Branches</Label>
                  <DropDownList 
                  name="branchName"
                  data={bankBranches}
                  // data={branch}
                  textField="text"
                  dataItemKey="value"
                  // value={bankinfo.branchName}
                 onChange={(e) => setBankInfo({...bankinfo,[e.target.name]:e.target.value.text})}
                  // onChange={(e) => setBankInfo(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="openingDate">Date of Opening</Label>
                  <Input
                    name="openingDate"
                    onChange={handleChange}
                    value={bankinfo.openingDate}
                  />
                </div>

                <div>
                  <Label htmlFor="accountNo">Account Number</Label>
                  <Input
                    name="accountNo"
                    onChange={handleChange}
                    value={bankinfo.accountNo}
                  />
                </div>
              </div>

              <div>
                <div>
                  <Label htmlFor="reEnteredAccountNo">
                    Re Enter Account Number
                  </Label>
                  <Input name="reEnteredAccountNo" 
                  onChange={handleChange} 
                  value={bankinfo.reEnteredAccountNo}
                  />
                </div>

                <div>
                  <Label htmlFor="accountType">Account Type</Label>
                  <DropDownList name="accountType"
                  data={accounttypedata}
                  textField="text"
                  dataItemKey='value'
                  onChange={handleChange}
                //  onChange={(e) => setBankInfo({...bankinfo,[e.target.name]:e.target.value.text})}
                  value={bankinfo.accountType}
                  />
                </div>
                <div>
                  <Label htmlFor="noOfChequeReturns">No Of Cheques Return</Label>
                  <Input name="noOfChequeReturns" 
                  onChange={handleChange} 
                  value={bankinfo.noOfChequeReturns}
                  />
                </div>
              </div>

              <div>
                <div>
                  <Label htmlFor="averagebankBalance">
                    Average bank Balance
                  </Label>
                  <Input name="averagebankBalance" 
                  onChange={handleChange} 
                  value={bankinfo.averagebankBalance}
                  />
                </div>
                <div>
                  <Label htmlFor="remarks">Remarks</Label>
                  <Input name="remarks" 
                  onChange={handleChange} 
                  value={bankinfo.remarks}
                  />
                </div>
              </div>
            </div>

            <br />

            <Grid 
            data={bankdetails}
            >
              <GridColumn field="customerCapacity" title="Capacity" />
              <GridColumn field="accountNo" title="A/c No" />
              <GridColumn
                field="accountHolderName"
                title="Account Holder Name"
              />
              <GridColumn
                field="averagebankBalance"
                title="Average Bank Balance"
              />
              <GridColumn field="noOfChequeReturns" title="ChequeReturns" />
              <GridColumn
                field="uploadbankstatements"
                title="Upload Bank Statements"
              />
              <GridColumn title="Action" 
              cell={props => (
                <td>
                  <FiEdit3
                    className="editButton"
                    style={{ fontSize: '18px' }}
                    // onClick={() => updateData(props)}
                  />
                  &nbsp; &nbsp;
                  <FiTrash2
                    className="deleteButton"
                    style={{ fontSize: '18px' }}
                    // onClick={() => deleteData(props)}
                  />
                </td>
              )}
              />
            </Grid>
          </FormElement>
        )}
      />
    </div>
  );
}

export default App;
