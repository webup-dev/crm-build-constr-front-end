# Responses
## Module "User Profiles"
| Method          | Code | Description                |
|:---------------:|:----:|:---------------------------|
|create           |200   |Correct creating            |
|                 |422   |The given data was invalid. |
|                 |453   |Permission is absent        |
|-----------------|------|----------------------------|
|destroy          |200   |Correct destroy             |
|                 |422   |Incorrect Entity            |
|                 |453   |Permission is absent        |
|-----------------|------|----------------------------|
|indexSoftDeleted |200   |Correct repair              |
|                 |204   |Content is empty            |
|                 |453   |Permission is absent        |
|-----------------|------|----------------------------|
|restore          |200   |Correct restore             |
|                 |422   |Incorrect Entity            |
|                 |453   |Permission is absent        |
|-----------------|------|----------------------------|
|permanentDestroy |200   |Correct destroy             |
|                 |422   |Incorrect Entity            |
|                 |453   |Permission is absent        |
