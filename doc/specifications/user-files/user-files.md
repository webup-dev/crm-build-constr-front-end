# User Files
## Components Structure
├── UserFilesIndex
      ├── UserFilesCreate
      └── UserFilesEdit
  
## Props (passed-in data) / Output data
### UserFilesIndex
#### Props
customer
files
#### Output
-

### UserFilesCreate
#### Props
customer

#### Output
* file (real file)
* file info (for DB)
  * customer ID
  * owner_user_id
  * description
  * filename
  
### UserFilesEdit
#### Props
customer
file description

#### Output
* customer ID
* description


