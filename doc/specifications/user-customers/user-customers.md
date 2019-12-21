# User Files
## Components Structure
├── UserCustomersIndex
|     ├── UserCustomersCreate
|     └── UserCustomersEdit
└── UserCustomersIndexSoftDeleted
  
## Props (passed-in data) / Output data
### UserCustomersIndex
#### Props
userCustomers
#### Output
Absent

### UserCustomersCreate
#### Props
customers

#### Output
user-customer info (for DB)
  * customer ID
  * user_id
  
### UserCustomersEdit
#### Props
user-customer
customers

#### Output
user-customer info (for DB)
  * customer ID
  * user_id

### UserCustomersIndexSoftDeleted
#### Props
userCustomers

#### Output
Absent
