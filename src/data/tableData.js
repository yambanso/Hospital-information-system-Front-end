
export const userColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
  },
  {
    field: 'Role',
    headerName: 'Role',
    width: 110,
  },
];

export const userRows = [
  { id: 1, name: 'Jon Snow', email : 'Jon@gmail.com', Role: "Admin" },
  { id: 2, name: 'Cersei Lannister', email : 'Cersei@yahoo.com', Role: "Pharmacists" },
  { id: 3, name: 'Daenerys Targaryen', email: 'Daenerys@gmail.com', Role: "Doctor" },
  { id: 4, name: 'Jaime Lannister', email : 'Jaime@gmail.com', Role: "Receptionist" },
  { id: 5, name: 'Arya Stark', email: 'Arya@gmail.com', Role: "Lab Technician" },
  { id: 6, name: 'Daenerys Targaryen', email: 'Daenerys@gmail.com', Role: "Doctor" },
  { id: 7, name: 'Hana Melisandre', email: 'Hana@gmail.com', Role: "Doctor" },
  { id: 8, name: 'Ferrara Clifford', email: 'Ferrara@gmail.com', Role: "Lab Technician"},
  { id: 9, name: 'RossiniFrances', email: 'Rossini@gmail.com', Role: "Pharmacists" },
  { id: 10, name: 'Daenerys Targaryen', email: 'Daenerys@gmail.com', Role: "Doctor" },
  { id: 11, name: 'Harvey Roxie', email: 'Harvey@gmail.com', Role: "Admin" },
];

export const patientsColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    
  },
    {
    field: 'Dob',
    headerName: 'Date of Birth',
    width: 110,
  },
  {
    field: 'Phonenumber',
    headerName: 'Contact',
    width: 150,
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 130,
  },
];

export const patientsRows = [
  { id: 1, name: 'Jon Snow',Dob:"22-May-2000",next_of_kin_contact: '+265888989965', Phonenumber : '+265 881 024 444',Medical_scheme: "unimed", address: "Blantyre | Malawi" },
  { id: 2, name: 'Cersei Lannister',Dob: "22-May-2000",next_of_kin_contact: '+265888989965', Phonenumber : '+265 881 024 444',Medical_scheme: "unimed", address: "Blantyre | Malawi" },
  { id: 3, name: 'Jaime Lannister',Dob: "22-May-2000",next_of_kin_contact: '+265888989965', Phonenumber : '+265 881 024 444',Medical_scheme: "unimed", address: "Blantyre | Malawi" },
  { id: 4, name: 'Arya Stark',Dob: "22-May-2000",next_of_kin_contact: '+265888989965', Phonenumber: '+265 881 024 444',Medical_scheme: "unimed", address: "Blantyre | Malawi" },
  { id: 5, name: 'Daenerys Targaryen',Dob: "22-May-2000",next_of_kin_contact: '+265888989965', Phonenumber: '+265 881 024 444',Medical_scheme: "unimed", address: "Blantyre | Malawi" },
  { id: 6, name: 'Hana Melisandre',Dob: "22-May-2000",next_of_kin_contact: '+265888989965', Phonenumber: '+265 881 024 444',Medical_scheme: "unimed", address: "Blantyre | Malawi" },
  { id: 7, name: 'Ferrara Clifford',Dob: "22-May-2000",next_of_kin_contact: '+265888989965', Phonenumber: '+265 881 024 444',Medical_scheme: "unimed", address: "Blantyre | Malawi" },
  { id: 8, name: 'RossiniFrances',Dob: "22-May-2000",next_of_kin_contact: '+265888989965', Phonenumber: '+265 881 024 444',Medical_scheme: "unimed", address: "Blantyre | Malawi" },
  { id: 9, name: 'Harvey Roxie',Dob: "22-May-2000",next_of_kin_contact: '+265888989965', Phonenumber: '+265 881 024 444',Medical_scheme: "unimed", address: "Blantyre | Malawi" },
];

export const medicineRows =[
{id : 1, name : "Panado", Price: "K20000"},
{id : 2, name : "Aspirin", Price: "K24684"},
{id : 3, name : "Lofnac", Price: "K70000"},
{id : 4, name : "Dacold", Price: "K67022"},
{id : 5, name : "Cough Syrup", Price: "K65000"},
{id : 6, name : "Panado", Price: "K20000"},
{id : 7, name : "Aspirin", Price: "K24684"},
{id : 8, name : "Lofnac", Price: "K70000"},
{id : 9, name : "Dacold", Price: "K67022"},
{id : 10, name : "Cough Syrup", Price: "K65000"},

]

export const servicesRows =[
  {id : 1, name : "Labolatory", Price: "K20000"},
  {id : 2, name : "Consultation", Price: "K24684"},
  {id : 3, name : "Dental", Price: "K70000"},
  {id : 4, name : "Operation ", Price: "K67022"},
  {id : 5, name : "X ray", Price: "K65000"},
  {id : 6, name : "Gynacologist", Price: "K20000"},
  {id : 7, name : "Labolatory", Price: "K20000"},
  {id : 8, name : "Consultation", Price: "K24684"},
  {id : 9, name : "Dental", Price: "K70000"},
  {id : 10, name : "Operation ", Price: "K67022"},
  {id : 11, name : "X ray", Price: "K65000"},
  {id : 12, name : "Gynacologist", Price: "K20000"},
  
  
  ]
export const consultationHistory = [
  {id : 1, patient_id : 4, Description : 'headache sore throat back pains',lab_results: 'Malaria = positive',visit_day: '31-01-2022'},
  {id : 2, patient_id : 3, Description : 'headache',lab_results: null,visit_day: '14-01-2022'},
  {id : 3, patient_id : 1, Description : 'coughing', lab_results: null,visit_day: '10-01-2022'},
  {id : 4, patient_id : 6, Description : 'headache, coughin',lab_results: "TB : Positive",visit_day: '14-12-2021'},
  {id : 5, patient_id : 26, Description : 'headache sore throat back pains',lab_results: 'Malaria = positive',visit_day: '31-10-2021'},
  {id : 6, patient_id : 783, Description : 'headache',lab_results: null,visit_day: '08-06-2021'},
  {id : 7, patient_id : 46, Description : 'coughing', lab_results: null,visit_day: '10-04-2021'},
  {id : 8, patient_id : 74, Description : 'headache, coughin',lab_results: "TB : Positive",visit_day: '14-01-2021'}

]
            