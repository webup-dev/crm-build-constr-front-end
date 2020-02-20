# Responses
## Module "Account of Individual Customers"
| Method          | Code | Description                         | Tests                                     |
|-----------------|------|-------------------------------------|-------------------------------------------|
|                 |      |                                     | setUp                                     |
|                 |      |                                     | tierDown                                  |
|                 |      |                                     | testExample                               |
|-----------------|------|-------------------------------------|-------------------------------------------|
|update           |200   | Correct updating                    | testUpdate                                |
|                 |422   | The given data was invalid          | testUpdateDataIsInvalid                   |
|                 |453   | Permission is absent by the role    | testUpdatePermissionIsAbsentByTheRole     |
|                 |454   | Permission to department is absent  | testUpdatePermissionToDepartmentIsAbsent  |           |
|                 |455   | ID is absent                        | testUpdateIdIsAbsent                      |
|-----------------|------|-------------------------------------|-------------------------------------------|
|show             |200   | Correct getting                     | testShow                                  |
|                 |455   | ID is absent                        | testShowIdIsAbsent                        |
|                 |453   | Permission is absent by the role    | testShowPermissionIsAbsentByTheRole       |
|                 |454   | Permission to department is absent  | testShowPermissionToDepartmentIsAbsent    |

