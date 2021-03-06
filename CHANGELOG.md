# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]
## [0.31.0] - 2020-05-01
### Added
- Page 'Leads'
    - Routes
    - Menus
    - API endpoints
    - Page.

## [0.30.5] - 2020-04-28
### Changed
- Bugs are fixed
    - Work Flow -> workflow in the Create/Update forms of Workflow module,
    - Requesters. Forms Create, Update: Extension -> “Work Extension”,
    - Requesters. Forms Create, Update: Descriptions for input fields must
    be deleted.

## [0.30.4] - 2020-04-28
### Added
- Page 'Update Requester'. Function "Soft Delete" is added
- Developer Dashboard. Soft Deleted Requesters are added
- Page 'Index of Soft Deleted Requesters'
- Page 'Index of Soft Deleted Requesters'. Function 'Restore' is added
- Page 'Index of Soft Deleted Requesters'. Function 'Delete Permanently' is added.

## [0.30.3] - 2020-04-28
### Added
- Page 'Update Requester'
    
## [0.30.2] - 2020-04-27
### Changed
- Page 'Create New Requester'
    - select "prefix" -> input"prefix". 

## [0.30.1] - 2020-04-27
### Added 
- Page 'Create New Requester'
    - Validation rules
    - Page. 

## [0.30.0] - 2020-04-24
### Added 
- Page 'Requesters'
    - Routes
    - Menus
    - API endpoints
    - Page.

## [0.29.4] - 2020-04-23
### Changed
- Change pages "Create Workflow", "Update Workflow"
    - Included stages -> Work Flow Stages    
    - Not Included stages → Available Stages
    - Remove Instructions
    - Move Available stages to the left side
    - Change colX to col6
    - Index has to start from 1
    - Capitalize the first letter in the name of the workflow types.

## [0.29.3] - 2020-04-21
### Added 
- Page 'Update Workflow'. Function 'Soft Delete'.
- Page 'Index of Soft Deleted Workflows'.
- Page 'Index of Soft Deleted Workflows'. Function 'Restore' is added.
- Page 'Index of Soft Deleted Workflows'. Function 'Delete Permanently' is added.

### Changed
- Developer Dashboard. Soft Deleted Workflows are added. 

## [0.29.2] - 2020-04-21
### Added 
- Page 'Update Workflow'

## [0.29.1] - 2020-04-20
### Added 
- Page 'Create New Workflow'

## [0.29.0] - 2020-04-16
### Added 
- Page 'Workflows'
    - Routes
    - Menus
    - API endpoints
    - Page.

## [0.28.2] - 2020-04-13
### Added 
- Page 'Update Stage'
- Function "Soft Delete" in the page "Stages"
- Page "Index of Soft Deleted Stages"
- Function "Restore Soft Deleted Stage" in the page "Stages"
- Function "Permanent Deleting of a Stage" in the page "Stages"

### Changed
- Developer Dashboard
    - Soft-deleted Stages count is added  

## [0.28.1] - 2020-04-13
### Added 
- Page 'Create Stage'
    - Validation
    - constant WORKFLOW_TYPES.

## [0.28.0] - 2020-04-13
### Added 
- Page 'Stages'
    - Routes
    - Menus
    - API endpoints
    - Page.

## [0.27.6] - 2020-04-09
### Added 
- Page 'Update Lead Status'. Function 'Soft Delete'
- Page 'Soft Deleted Lead Statuses'
- Function 'Restore Soft Deleted Lead Status' is added
- Function 'Permanent Delete Soft Deleted Lead Status' is added

### Changed
- Developer Dashboard
    - Soft-deleted Lead Statuses count is added  

## [0.27.5] - 2020-04-08
### Added 
- Page 'Update Lead Status'.

## [0.27.4] - 2020-04-07
### Added 
- Page 'Create New Lead Status' 
    - Validation rules
    - Routes
    - API endpoints
    - Page.  

## [0.27.3] - 2020-04-07
### Added    
- Function 'Soft Delete Trade' is created
- Page 'Soft Deleted Trades' is created
- Function 'Restore Soft Deleted Trade' is created
- Function 'Permanently Delete Trade' is created

### Changed
- Page 'Developer Dashboard' is created

## [0.27.2] - 2020-04-07
### Added    
- Function 'Update Trade' is created

## [0.27.1] - 2020-04-07
### Added    
- Function 'Add Trade' is created

## [0.27.0] - 2020-04-06
### Added    
- Page "Lead Statuses"
    - Routes
    - Menus
    - API endpoints
    - page.  

## [0.26.0] - 2020-04-03
### Added    
- Page Trades
    - Routes
    - Menus
    - API endpoints
    - page.  

## [0.25.0] - 2020-04-01
### Changed
- Bugs fixing
    - Buttons Save&New are implemented,
    - FlashMessaging: added timeout 3000 ms,
    - Validation rules for Lead Sources are changed,
    - Validation rules for Lead Source Categories are changed
    - Lead Source Categories are sorted in alphabetical order.

## [0.24.5] - 2020-03-31
### Added    
- Lead Sources. Methods "restore", "deletePermanently".  

## [0.24.4] - 2020-03-31
### Changed
- Dashboard of Developer
    - Lead Sources Soft-Deleted are added.
    
### Added    
- Page "Lead Sources" Soft-Deleted.  

## [0.24.3] - 2020-03-27
### Added
- Page "Lead Sources". Method softDelete is created.  

## [0.24.2] - 2020-03-26
### Changed
- Page "Create New Lead Source". Buttons are configured
    - Button "Cancel" is configured,
    - Button "Close form" is configured.

### Added
- Page "Update Lead Source" is created.    

## [0.24.1] - 2020-03-26
### Added
- Page "Create New Lead Source" is created
    
## [0.24.0] - 2020-03-25
### Added
- Page "Lead Sources" is created
    - API endpoints are created for all components of the block.

## [0.23.0] - 2020-03-18
### Changed
- Components LeadSources... are renamed to LsCategories...
    - Router is changed,
	- API endpoints are changed,
	- Components LeadSources... are renamed to LsCategories...,
	- Component LsCategories is updated,
	- Component LsCategoryCreate is updated,
	- Component LsCategoryEdit is updated,
	- Component LsCategoriesSoftDeleted is updated,
	- Component dashboard/Developer is updated,
	- CHANGELOG is updated.
	    
## [0.22.0] - 2020-03-17
### Added
- Block of LeadSourcesSoftDeleted related features
    - API endpoints are created,
    - Routers are created,
    - Dashboard menu for developer is updated,
    - Page with the index of LeadSourcesSoftDeleted is created,
    - Restore function is created,
    - Permanently Deleted function is created.
    
## [0.21.2] - 2020-03-16
### Added
- Created method "Delete Lead Sources"
    - API endpoint is created,
    - Created method "Delete Lead Sources".
    
### Changed    
- The button'Delete' in the index page 'Lead Sources' is updated.
    
## [0.21.1] - 2020-03-16
### Added
- Created page "Update Lead Sources"
    - API endpoint is created,
    - validations is updates as universal,
    the route is created,
    - page 'Update Lead Source' is created.
    
### Changed    
- the button 'Update Lead Source' is updated,
- page 'Create Lead Source' is updated.
    
## [0.21.0] - 2020-03-16
### Added
- Created page "Index of Lead Sources"
- Created page "Create New Lead Sources"
    Page is created,
    the button 'Create New Lead Source' in the index page is
    edited,
    the route is created,
    validations is created and implemented,
    API endpoint is created and implemented.
    
### Changed    
-   CustomerUserAdd.vue is cleared.

## [0.20.1] - 2020-03-09
### Added
- Created functionality "Download File".

### Changed
- Component "Create New File". File extension is changed to the extension from
  the source file.

## [0.20.0] - 2020-03-02
### Added
- Created Page "Customer Files".
- Component "Customer Info" is added to the Page "Customer Files".
- Created Component "Index of Customer Files".
- Component 'Index of Customer Files' is added to the Page 'Customer Files'.
- Created Component "Create New File".
- Component 'Create New File' is added to the Page 'Customer Files'.
- Created Component "Update File".
- Component 'Update File' is added to the Page 'Customer Files'.
- Created Component "Delete File".
- Component 'Delete File' is added to the Page 'Customer Files'.

## [0.19.0] - 2020-01-21
### Added
- Component "Customer Page".
- Component "Customer Info".
- Component "Customer's Users".
- Component "Contact".
- Component "UserDetails Adding".
- Component "UserDetails Editing".
### Changed
- Customers. Rows "City" in forms are moved to the place after address lines.

## [0.18.0] - 2019-12-13
### Changed
- Customers. Create, Edit. Add "&" in the available signs in the field Customer Account Name.
- Customers. Create, Edit. Field "City" is implemented. Fields "City", "Line 1" are required.
- Customers. Create, Edit. Placeholders are deleted.
### Added
- Module "Customer Comments".

## [0.17.0] - 2019-11-21
### Changed
- Module "Customers".

## [0.16.0] - 2019-11-15
### Changed
- Organizations structure (Platform is "owner" of all organizations).
- Roles.
- Soft-deleted menu.
### Added
- Dashboard for developer. 

## [0.15.0] - 2019-10-31
### Added
- Module Customers. 

## [0.14.0] - 2019-10-27
### Added
- Module UserProfiles. 

## [0.13.3] - 2019-10-23
### Added
- Module Organizations. Item ordering is added.

## [0.13.2] - 2019-10-19
### Changed
- Company structure. UserProfile Update Page is styled. Bugs fixed.

## [0.13.1] - 2019-10-17
### Fixed
- Bug (refresh page leads to menu hiding) fixed.

## [0.13] - 2019-10-17
### Added
- Module User Profiles.

## [0.12] - 2019-10-04
### Added
- Module Organizational Structure.

## [0.11] - 2019-10-02
### Added
- Module History/Activities.

## [0.10] - 2019-09-23
### Added
- Module Method-Roles is added.

## [0.9] - 2019-09-18
### Added
- Module Methods is added.

## [0.8] - 2019-09-17
### Added
- Module Controllers is added.

## [0.7] - 2019-09-03
### Added
- Roles are added.

## [0.6] - 2019-08-15
### Added
- Flesh-messages are added.

## [0.5] - 2019-08-15
### Added
- Demo module Books. Delete book with specific ID (for authenticated user).

## [0.4] - 2019-08-14
### Added
- Demo module Books. Edit book with specific ID (for authenticated user).

## [0.3] - 2019-08-14
### Added
- Demo module Books. Show book with specific ID (for authenticated user).

## [0.2] - 2019-08-12
### Added
- .env.
- Deployment configuration.
- Demo module Books. Create new book (for authenticated user).

## [0.1.1] - 2019-08-07
### Changed
- CHANGELOG.md is renamed in CoreUIChangelog.md.
- changelog.md is renamed in CHANGELOG.md.

## [0.1] - 2019-08-07
### Added
- changelog.md.
- Login is added.
- Demo module Books. Index of books. Public.

## [0.0] - 2019-08-05
### Added
- Template Core-UI-pro.
