# Responses
## Module "Roles"
| Method          | Code | Description                          | Tests                                              |
|:---------------:|:----:|:-------------------------------------|:---------------------------------------------------|
|                 |      |                                      | setUp                                              |
|                 |      |                                      | tierDown                                           |
|                 |      |                                      | testExample                                        |
|-----------------|------|--------------------------------------|----------------------------------------------------|
|index            |200   | Correct index                        | testIndex                                          |
|                 |204   | Content is empty                     | testIndexEmpty                                     |
|                 |453   | Permission is absent                 | testIndexPermissionIsAbsent                        |
|-----------------|------|--------------------------------------|----------------------------------------------------|
|store            |200   | Correct creating                     | testStore                                          |
|                 |422   | The given data was invalid           | testStoreDataIsInvalid                             |
|                 |453   | Permission is absent                 | testStorePermissionIsAbsent                        |
|-----------------|------|--------------------------------------|----------------------------------------------------|
|update           |200   | Correct updating                     | testUpdate                                         |
|                 |422   | The given data was invalid           | testUpdateDataIsInvalid                            |
|                 |453   | Permission is absent by the role     | testUpdatePermissionIsAbsentByTheRole              |
|                 |454   | Permission to department is absent   | testUpdatePermissionToDepartmentIsAbsent           |
|                 |455   | ID is absent                         | testUpdateIdIsAbsent                               |
|-----------------|------|--------------------------------------|----------------------------------------------------|
|show             |200   | Correct getting                      | testShow                                           |
|                 |453   | Permission is absent by the role     | testShowPermissionIsAbsentByTheRole                |
|                 |454   | Permission to department is absent   | testShowPermissionToDepartmentIsAbsent             |
|                 |455   | ID is absent                         | testShowIdIsAbsent                                 |
|-----------------|------|--------------------------------------|----------------------------------------------------|
|destroy          |200   | Correct destroy                      | testDestroy                                        |
|                 |453   | Permission is absent by the role     | testDestroyPermissionIsAbsentByTheRole             |
|                 |454   | Permission to department is absent   | testDestroyPermissionToDepartmentIsAbsent          |
|                 |455   | ID is absent                         | testDestroyIdIsAbsent                              |
|-----------------|------|--------------------------------------|----------------------------------------------------|
|indexSoftDeleted |200   | Correct getting                      | testIndexSoftDeleted                               | 
|                 |204   | Content is empty                     | testIndexSoftDeletedEmpty                          | 
|                 |453   | Permission is absent                 | testIndexSoftDeletedPermissionIsAbsent             | 
|-----------------|------|--------------------------------------|----------------------------------------------------|
|restore          |200   | Correct restore                      | testRestore                                        |
|                 |453   | Permission is absent by the role     | testRestorePermissionIsAbsentByTheRole             |
|                 |454   | Permission to department is absent   | testRestorePermissionToDepartmentIsAbsent          |
|                 |455   | ID is absent                         | testRestoreIdIsAbsent                              |
|-----------------|------|--------------------------------------|----------------------------------------------------| 
|permanentDestroy |200   | Correct permanent destroy            | testPermanentDestroy                               |
|                 |453   | Permission is absent by the role     | testPermanentDestroyPermissionIsAbsentByTheRole    |
|                 |454   | Permission to department is absent   | testPermanentDestroyPermissionToDepartmentIsAbsent |
|                 |455   | ID is absent                         | testPermanentDestroyIdIsAbsent                     |
