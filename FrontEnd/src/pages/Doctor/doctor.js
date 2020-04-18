import React from "react";
import "./doctor.css";
import Instruction from "./Extras/Instructions";
import Prescription from "./Extras/DoctorPrescription";
import ShowDetails from "../../components/PatientDetails/Doctor-PatientDetails";
import GetPatientHistory from "./Extras/GetPatientHistory";
import DoctorPageStart from "./Extras/StartDoctor";
import DoctorNavigation from "./Navigation/doctorsNavigation";
import SideDrawer from "./SideDrawer/doctorSideDrawer";
import Backdrop from "../../components/Backdrop/Backdrop";
import DoctorDiagnosis from "./Extras/DoctorDiagnosis";

import firebase from './../../firebase';

class Doctor extends React.Component {
  databaseRef = firebase.firestore();
  patientsRef = this.databaseRef.collection("Everyday-Patients");

  constructor(props) {
    super(props);
    this.newPatientsList = [
      {
        name: "Rakshanda Mahajan",
        age: "50",
        weight: "50",
        phoneNo: "9876543210",
        PatientId: "1",
        Visits: [
          {
            Date: "1 January 2020",
            Diagnosis: "This is Diagnosis1",
            Doctor: "Dr.Savita",
            Prescription: "This is prescription",
            TestResport: null
          },
          {
            Date: "30 January 2020",
            Diagnosis: "This is Diagnosis2",
            Doctor: "Dr.Savita",
            Prescription: "This is prescription2",
            TestResport: null
          }
        ],
        Tests: [
          'Haemogram',
          'COVID-19',
          'Malaria'
        ]
      },
      {
        name: "Ajit Niras",
        age: "80",
        weight: "50",
        phoneNo: "9876543210",
        PatientId: "2",
        Visits: [
          {
            Date: "1 January 2020",
            Diagnosis: "This is Diagnosis1",
            Doctor: "Dr.Savita",
            Prescription: "This is prescription",
            TestResport: null
          },
          {
            Date: "30 January 2020",
            Diagnosis: "This is Diagnosis2",
            Doctor: "Dr.Savita",
            Prescription: "This is prescription2",
            TestResport: null
          }
        ]
      },
      {
        name: "Satvik Dandale",
        age: "20",
        weight: "50",
        phoneNo: "9876543210",
        PatientId: "3",
        Visits: [
          {
            Date: "1 January 2020",
            Diagnosis: "This is Diagnosis1",
            Doctor: "Dr.Savita",
            Prescription: "This is prescription",
            TestResport: null
          },
          {
            Date: "30 January 2020",
            Diagnosis: "This is Diagnosis2",
            Doctor: "Dr.Savita",
            Prescription: "This is prescription2",
            TestResport: null
          }
        ]
      },
      {
        name: "Sanjana Jaiswal",
        age: "67",
        weight: "50",
        phoneNo: "9876543210",
        PatientId: "4",
        Visits: [
          {
            Date: "1 January 2020",
            Diagnosis: "This is Diagnosis1",
            Doctor: "Dr.Savita",
            Prescription: "This is prescription",
            TestResport: null
          },
          {
            Date: "30 January 2020",
            Diagnosis: "This is Diagnosis2",
            Doctor: "Dr.Savita",
            Prescription: "This is prescription2",
            TestResport: null
          }
        ]
      }
    ];
    this.investigattedPatientsList = [
      {
        name: "Rakshanda Mahajan2",
        age: "50",
        weight: "50",
        phoneNo: "9876543210",
        PatientId: "1",
        Visits: [
          {
            Date: "1 January 2020",
            Diagnosis: "This is Diagnosis1",
            Doctor: "Dr.Savita",
            Prescription: "This is prescription",
            TestResport: null
          },
          {
            Date: "30 January 2020",
            Diagnosis: "This is Diagnosis2",
            Doctor: "Dr.Savita",
            Prescription: "This is prescription2",
            TestResport: null
          }
        ]
      },
      {
        name: "Ajit Niras",
        age: "80",
        weight: "50",
        phoneNo: "9876543210",
        PatientId: "2"
      },
      {
        name: "Satvik Dandale",
        age: "20",
        weight: "50",
        phoneNo: "9876543210",
        PatientId: "3"
      },
      {
        name: "Sanjana Jaiswal",
        age: "67",
        weight: "50",
        phoneNo: "9876543210",
        PatientId: "4"
      }
    ];
    this.state = {
      sideDrawerOpen: false,
      showDetails: false,
      showHistory: false,
      mainBody: <DoctorPageStart />,
      currentPatient: null,
      receptionQueue: []
    };
    let isUpdated = false;

  } // Contructor ends here

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backDropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  getPatientHistory = () => {
    if (this.state.currentPatient == null) {
      alert("Select a Patient First!");
      return;
    }
    if (this.state.currentPatient.Visits == null){
      alert("No History");
      return;
    }
    this.setState({
      mainBody: (
        <>
          <ShowDetails patient={this.state.currentPatient} />
          <GetPatientHistory patient={this.state.currentPatient} />
        </>
      )
    });
  };

  diagnosis = () => {
    if (this.state.currentPatient == null) {
      alert("Select a Patient First!");
      return;
    }
    this.setState({
      mainBody: (
        <>
          <ShowDetails patient={this.state.currentPatient} />
          <DoctorDiagnosis></DoctorDiagnosis>
        </>
      )
    });
  };

  currentIssues = () => {
    if (this.state.currentPatient == null) {
      alert("Select a Patient First!");
      return;
    }
    this.setState({
      mainBody: (
        <>
          {/* <ShowDetails patient={this.state.currentPatient} /> */}
          <Prescription patient={this.state.currentPatient} />
        </>
      )
    });
  };

  getToday = () => {
    var today = new Date();
    return today.toDateString();
  }

  render() {
    let backDrop;
    if (this.state.sideDrawerOpen) {
      backDrop = <Backdrop click={this.backDropClickHandler}></Backdrop>;
    }

    // FIREBASE STUFF
    var today = this.getToday();

    // New patient list comes from reception queue
    var query = this.patientsRef.doc(today).collection("Reception");
    // Update only once
    if (!(this.isUpdated)){
      query.onSnapshot((querySnapshot) => {
        var tempList = [];
        querySnapshot.forEach((patientDoc) => {
          tempList.push(patientDoc.data())
        })
        this.setState({
          receptionQueue: tempList
        })
      })
      this.isUpdated = true;
    }


    return (
      <>
        {/* {this.props.navBar} */}
        <DoctorNavigation
          drawerClickHandler={this.drawerToggleClickHandler}
          diagnosis={this.diagnosis}
          prescription={this.currentIssues}
          history={this.getPatientHistory}
        />
        <SideDrawer
          drawerClickHandler={this.props.drawerToggleClickHandler}
          diagnosis={this.diagnosis}
          prescription={this.currentIssues}
          history={this.getPatientHistory}
          show={this.state.sideDrawerOpen}
        ></SideDrawer>
        {backDrop}
        <div className="row">
          <div className="col-sm-3 listOuter">
            <div className="patient_list">
              <Instruction
                patientsList={this.state.receptionQueue}
                oldPatientsList={this.investigattedPatientsList}
                updatePatient={patient => {
                  this.setState({
                    mainBody: <ShowDetails patient={patient} />,
                    currentPatient: patient
                  }, () => {
                    console.log(this.state.currentPatient);
                  });
                  
                }}
              />
            </div>
          </div>
          <div className="border backgroundstyle">{this.state.mainBody}</div>
          {/* <div className="imageDiv">
            <img src={DocImg} alt="Doctor_img" />
          </div> */}
        </div>
      </>
    );
  }
}
export default Doctor;
