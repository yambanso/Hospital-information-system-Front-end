
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
  
];

export const patientsColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    valueGetter: (params)=>  params.row.firstname + " " + params.row.surname,
    
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
  ];

export const medicineRows =[
]

export const servicesRows =[
  ]
export const consultationHistory = [
 
]
            