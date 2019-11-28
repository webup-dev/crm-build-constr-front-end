# Responses
## Module "Customer Account"
| Method              |Code | Description                            | Tests                                              |
|:-------------------:|:---:|:---------------------------------------|:---------------------------------------------------|
|                     |     |Test of the Testing System              | testExample                                        |
|                     |     |Test of the Seeding for this module     | testSeeder                                         |
|---------------------|-----|----------------------------------------|----------------------------------------------------|
|showAll              |200  |Correct index                           | testIndex                                          |
|                     |204  |Content is empty                        | testIndexEmpty                                     |
|                     |453  |Permission is absent due to Role        | testIndexWrongRole                                 |             
|                     |454  |Permission to the department is absent  | testIndexPermissionToDepartmentIsAbsent            |
|---------------------|-----|----------------------------------------|----------------------------------------------------|
|store                |200  |Correct creating                        | testStore                                          |
|                     |422  |The given data was invalid              | testStoreDataIsInvalid                             |
|                     |453  |Permission is absent due to Role        | testStoreWrongRole                                 |
|                     |454  |Permission to the department is absent  | testStorePermissionToDepartmentIsAbsent            |
|---------------------|-----|----------------------------------------|----------------------------------------------------|
|update               |200  |Correct creating                        | testUpdate                                         |
|                     |422  |The given data was invalid              | testUpdateDataIsInvalid                            |
|                     |453  |Permission is absent due to Role        | testUpdateWrongRole                                |
|                     |454  |Permission to the department is absent  | testUpdatePermissionToDepartmentIsAbsent           |
|---------------------|-----|----------------------------------------|----------------------------------------------------|
|destroy              |200  |Correct destroy                         | testDestroy                                        |
|                     |422  |Incorrect Entity                        | testDestroyIncorrectId                             |
|                     |453  |Permission is absent due to Role        | testDestroyWrongRole                               |
|                     |454  |Permission to the department is absent  | testDestroyPermissionToDepartmentIsAbsent          |
|                     |455  |There is a child comment                | testDestroyIfThereIsChildComment                   |
|---------------------|-----|----------------------------------------|----------------------------------------------------|
|showWithSoftDeleted  |200  |Correct index                           | testIndexSoftDeleted                               |
|                     |204  |Content is empty                        | testIndexSoftDeletedEmpty                          |
|                     |453  |Permission is absent due to Role        | testIndexSoftDeletedWrongRole                      |
|                     |454  |Permission to the department is absent  | testIndexSoftDeletedPermissionToDepartmentIsAbsent |
|---------------------|-----|----------------------------------------|----------------------------------------------------|
|restore              |200  |Correct restore                         | testRestore                                        |
|                     |422  |Incorrect Entity                        | testRestoreIncorrectId                             |
|                     |453  |Permission is absent due to Role        | testRestoreWrongRole                               |
|                     |454  |Permission to the department is absent  | testRestorePermissionToDepartmentIsAbsent          |
|                     |455  |There is a parent soft-deleted comment  | testRestorePermissionToDepartmentIsAbsent          |
|---------------------|-----|----------------------------------------|----------------------------------------------------| 
|permanentDestroy     |200  |Correct destroy                         | testPermanentDestroy                               |
|                     |422  |Incorrect Entity                        | testPermanentDestroyIncorrectId                    |
|                     |453  |Permission is absent due to Role        | testPermanentDestroyWrongRole                      |
|                     |454  |Permission to the department is absent  | testPermanentDestroyPermissionToDepartmentIsAbsent |
|                     |455  |There is a child soft-deleted comment   | testRestorePermissionToDepartmentIsAbsent          |
                                                                                                                               
