<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<jsp:useBean id="date" class="java.util.Date" />

<div class="alert">
    <div class="row">
        <address>
            <strong>HL DISTRIBUTION, INC.</strong><br/>
            22885 Savi Ranch Pkwy, Unit D<br/>
            Yorba Linda, CA 92887<br/>
            <abbr title="Phone">Tel:</abbr><a href="tel:+17149980088"> (+1) 714-998-0088</a><br/>
            Fax: (+1) 714-998-0087
        </address>
        <hr/>
        <center>
            <p>&copy; 2012-<fmt:formatDate value="${date}" pattern="yyyy"/> Copyright by Hiteakfurniture.com. All rights reserved.</p>
        </center>
    </div>
</div>