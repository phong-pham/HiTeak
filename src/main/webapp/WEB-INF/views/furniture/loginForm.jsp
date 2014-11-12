<form class="form-horizontal login-form" role="form">
    <div class="input-group input-group-firs-name margin-bottom-10" action="signup" style="display: none;">
        <span class="input-group-addon">First Name</span>
        <input type="text" class="form-control required" placeholder="Enter Your First Name" dataField="firstName">
    </div>
    <div class="input-group input-group-last-name margin-bottom-10" action="signup" style="display: none;">
        <span class="input-group-addon">Last Name</span>
        <input type="text" class="form-control required" placeholder="Enter Your Last Name" dataField="lastName">
    </div>
    <div class="input-group input-group-username margin-bottom-10" action="login,forgot,signup">
        <span class="input-group-addon">Username</span>
        <input id="userName" type="text" class="form-control required" placeholder="Enter Your Email Address" dataField="email" dataType="email">
    </div>
    <div class="input-group input-group-password margin-bottom-10" action="login,signup">
        <span class="input-group-addon" style="padding: 6px 13px;">Password</span>
        <input id="password" type="password" class="form-control required" placeholder="Enter Your Password" dataField="password" minLength="6">
    </div>
    <div class="input-group input-group-password margin-bottom-10" action="signup" style="display: none;">
        <span class="input-group-addon" style="padding: 6px 13px;">Re-enter Password</span>
        <input id="password" type="password" class="form-control required" placeholder="Enter Your Password" dataField="reenterPassword" minLength="6">
    </div>
    <div class="row padding-15 login-footer" style="border-top: 1px #ccc solid;">
        <div class="pull-left">
            <a id="viewLoginBtn" href="javascript:void(0)" action="login">Sign in</a>
            <span action="login">|</span>
            <a id="forgotPwdBtn" href="javascript:void(0)" action="forgot">Forgot Password</a>
            <span action="signup">|</span>
            <a id="signUpBtn" href="javascript:void(0)" action="signup">Sign up</a>
        </div>
        <div class="pull-right">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button id="loginBtn" type="button" class="btn btn-primary">Submit</button>
        </div>
    </div>
</form>