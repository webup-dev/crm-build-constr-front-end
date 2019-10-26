# Responses
## Module "Customer Account"
| Method          | Code | Description                | Tests                                  |
|:---------------:|:----:|:---------------------------|:---------------------------------------|
|                 |      |                            | setUp                                  |
|                 |      |                            | tierDown                               |
|                 |      |                            | testExample                            |
|-----------------|------|----------------------------|----------------------------------------|
|index            |200   |Correct index               | testIndex                              |
|                 |204   |Content is empty            | testIndexEmpty                         |
|                 |453   |Permission is absent        | testIndexPermissionIsAbsent            |
|-----------------|------|----------------------------|----------------------------------------|
|store            |200   |Correct creating            | testStore                              |
|                 |422   |The given data was invalid  | testStoreDataIsInvalid                 |
|                 |453   |Permission is absent        | testStorePermissionIsAbsent            |
|-----------------|------|----------------------------|----------------------------------------|
|update           |200   |Correct creating            | testUpdate                             |
|                 |422   |The given data was invalid  | testUpdateDataIsInvalid                |
|                 |453   |Permission is absent        | testUpdatePermissionIsAbsent           |
|-----------------|------|----------------------------|----------------------------------------|
|destroy          |200   |Correct destroy             | testDestroy                            |
|                 |422   |Incorrect Entity            | testDestroyIncorrectId                 |
|                 |453   |Permission is absent        | testDestroyPermissionIsAbsent          |
|-----------------|------|----------------------------|----------------------------------------|
|indexSoftDeleted |200   |Correct repair              | testIndexSoftDeleted                   | 
|                 |204   |Content is empty            | testIndexSoftDeletedEmpty              | 
|                 |453   |Permission is absent        | testIndexSoftDeletedPermissionIsAbsent | 
|-----------------|------|----------------------------|----------------------------------------|
|restore          |200   |Correct restore             | testRestore                            |
|                 |422   |Incorrect Entity            | testRestoreIncorrectId                 |
|                 |453   |Permission is absent        | testRestorePermissionIsAbsent          |
|-----------------|------|----------------------------|----------------------------------------| 
|permanentDestroy |200   |Correct destroy             | testPermanentDestroy                   |
|                 |422   |Incorrect Entity            | testPermanentDestroyIncorrectId        |
|                 |453   |Permission is absent        | testPermanentDestroyPermissionIsAbsent |
