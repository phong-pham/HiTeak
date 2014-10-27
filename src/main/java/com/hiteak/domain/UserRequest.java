package com.hiteak.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

/**
 * Created by phongpham on 10/26/14.
 */
@Document
public class UserRequest {

    @Id
    private Long requestId;
    private String organizationName;
    private String firstName;
    private String lastName;
    private String address1;
    private String address2;
    private String city;
    private String state;
    private Long zipCode;
    private Long phoneNumber;
    private Long faxNumber;
    private String email;
    private String requestMessage;
    private String requestType;
    private String createDateTime;
    private String processDateTime;
    private List<Map<String, Object>> processLog;

    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAddress1() {
        return address1;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getAddress2() {
        return address2;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Long getZipCode() {
        return zipCode;
    }

    public void setZipCode(Long zipCode) {
        this.zipCode = zipCode;
    }

    public Long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Long getFaxNumber() {
        return faxNumber;
    }

    public void setFaxNumber(Long faxNumber) {
        this.faxNumber = faxNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRequestMessage() {
        return requestMessage;
    }

    public void setRequestMessage(String request) {
        this.requestMessage = request;
    }

    public String getRequestType() {
        return requestType;
    }

    public void setRequestType(String requestType) {
        this.requestType = requestType;
    }

    public String getCreateDateTime() {
        return createDateTime;
    }

    public void setCreateDateTime(String createDateTime) {
        this.createDateTime = createDateTime;
    }

    public String getProcessDateTime() {
        return processDateTime;
    }

    public void setProcessDateTime(String processDateTime) {
        this.processDateTime = processDateTime;
    }

    public List<Map<String, Object>> getProcessLog() {
        return processLog;
    }

    public void setProcessLog(List<Map<String, Object>> processLog) {
        this.processLog = processLog;
    }
}
