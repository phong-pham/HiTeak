<form id="requestCatalogForm" class="form-horizontal" role="form">
    <div class="form-group">
        <label for="companyNameInput" class="col-sm-3 control-label">Company Name
            <span class="text-danger validation-cmp" data-toggle="tooltip" field-name="Company Name" data-placement="right">*</span>
        </label>
        <div class="col-sm-7">
            <input id="companyNameInput" type="text" class="form-control input-sm required" placeholder="Company Name" dataField="organizationName" />
        </div>
    </div>
    <div class="form-group">
        <label for="firstNameInput" class="col-sm-3 control-label">First Name
            <span class="text-danger validation-cmp" data-toggle="tooltip" field-name="First Name" data-placement="right">*</span>
        </label>
        <div class="col-sm-7">
            <input id="firstNameInput" type="text" class="form-control input-sm required" placeholder="First Name" dataField="firstName" />
        </div>
    </div>
    <div class="form-group">
        <label for="lastNameInput" class="col-sm-3 control-label">Last Name
            <span class="text-danger validation-cmp" data-toggle="tooltip" field-name="Last Name" data-placement="right">*</span>
        </label>
        <div class="col-sm-7">
            <input id="lastNameInput" type="text" class="form-control input-sm required" placeholder="Last Name" dataField="lastName" />
        </div>
    </div>
    <div class="form-group">
        <label for="address1Input" class="col-sm-3 control-label">Address
            <span class="text-danger validation-cmp" data-toggle="tooltip" field-name="Address" data-placement="right">*</span>
        </label>
        <div class="col-sm-7">
            <input id="address1Input" type="text" class="form-control input-sm required" placeholder="Address 1" dataField="address1" />
        </div>
    </div>
    <div class="form-group">
        <label for="address2Input" class="col-sm-3 control-label"></label>
        <div class="col-sm-7">
            <input id="address2Input" type="text" class="form-control input-sm" placeholder="Address 2" dataField="address2" />
        </div>
    </div>
    <div class="form-group">
        <label for="cityInput" class="col-sm-3 control-label">City
            <span class="text-danger validation-cmp" data-toggle="tooltip" field-name="City" data-placement="right">*</span>
        </label>
        <div class="col-sm-7">
            <input id="cityInput" type="text" class="form-control input-sm required" placeholder="City" dataField="city" />
        </div>
    </div>
    <div class="form-group">
        <label for="stateInput" class="col-sm-3 control-label">State
            <span class="text-danger validation-cmp" data-toggle="tooltip" field-name="State" data-placement="right">*</span>
        </label>
        <div class="col-sm-7">
            <input id="stateInput" type="text" class="form-control input-sm required" placeholder="State" dataField="state" />
        </div>
    </div>
    <div class="form-group">
        <label for="zipCodeInput" class="col-sm-3 control-label">Zip code
            <span class="text-danger validation-cmp" data-toggle="tooltip" field-name="Zip Code" data-placement="right">*</span>
        </label>
        <div class="col-sm-7">
            <input id="zipCodeInput" type="text" class="form-control input-sm required" placeholder="Zip Code" dataField="zipCode"  dataType="number"/>
        </div>
    </div>
    <div class="form-group">
        <label for="emailInput" class="col-sm-3 control-label">Email
            <span class="text-danger validation-cmp" data-toggle="tooltip" field-name="Email" data-placement="right">*</span>
        </label>
        <div class="col-sm-7">
            <input id="emailInput" type="text" class="form-control input-sm required" placeholder="Email" dataField="email" dataType="email"/>
        </div>
    </div>
    <div class="form-group">
        <label for="phoneInput" class="col-sm-3 control-label">Phone Number
            <span class="text-danger validation-cmp" data-toggle="tooltip" field-name="Phone Number" data-placement="right">*</span>
        </label>
        <div class="col-sm-7">
            <input id="phoneInput" type="text" class="form-control input-sm required" placeholder="Phone Number" dataField="phoneNumber" dataType="number"/>
        </div>
    </div>
    <div class="form-group">
        <label for="faxInput" class="col-sm-3 control-label">Fax Number
            <span class="text-danger validation-cmp" data-toggle="tooltip" field-name="Fax Number" data-placement="right" style="display: none;">*</span>
        </label>
        <div class="col-sm-7">
            <input id="faxInput" type="text" class="form-control input-sm" placeholder="Fax Number" dataField="faxNumber"  dataType="number"/>
        </div>
    </div>
    <div class="form-group">
        <label for="questionInput" class="col-sm-3 control-label">Questions or Comments
            <span class="text-danger validation-cmp" data-toggle="tooltip" field-name="Questions or Comments" data-placement="right">*</span>
        </label>
        <div class="col-sm-7">
            <textarea id="questionInput" type="text" class="form-control input-sm required" placeholder="Questions or Comments" dataField="requestMessage" rows="4"></textarea>
        </div>
    </div>
</form>