<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" >
<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>HiTeak Furniture</title>

    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/bootstrap/css/bootstrap.min.css" >
    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/style/redmond/jquery-ui-1.8.20.custom.css" />
    <!-- Custom styles for this template -->
    <link href="${pageContext.request.contextPath}/furniture/css/furniture.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <jsp:include page="header.jsp"/>

        <hr class="separator-10" style="margin-top: -40px;"/>
        <c:forEach var="category" items="${categories}">
            <center>
                <h2>${category.categoryName}</h2>
            </center>
            <hr/>
            <c:set var="i" value="0"/>
            <c:set var="count" value="0"/>
            <table class="home-page" style="width: 80%;">
                <c:forEach var="subCategory" items="${category.subCategories}">
                    <c:if test="${i%3 == 0}">
                        <tr>
                    </c:if>
                    <td class="product-td-item">
                        <a href="productList?categoryId=${subCategory.categoryId}" class="product-td-item">
                            <center>
                                <br/>
                                <h3>${subCategory.categoryName}</h3>
                                <p></p>
                            </center>
                            <br/>
                            <img class="product-td-item" src="${pageContext.request.contextPath}/${subCategory.imageSource}" alt="${subCategory.categoryId}"/>
                            <div class="product_info"><h3>Kuba Armless Lounge Chair</h3>
                                <div class="woocommerce_msrp">Retails for:
                                    <span class="woocommerce_msrp_price"><span class="amount">$2,095.00</span></span>
                                </div>
                                <span class="price"><span class="amount">$1,295.00</span></span>
                            </div>
                        </a>
                    </td>
                    <c:if test="${i%3 == 2}">
                        </tr>
                    </c:if>
                    <c:set var="i" value="${i+1}"/>
                </c:forEach>
            </table>
            <hr class="separator-5"/>
        </c:forEach>

        <hr class="separator-10"/>
        <jsp:include page="footer.jsp"/>
    </div>  <!-- END MAIN CONTAINER -->

    <script type="text/javascript" src="${pageContext.request.contextPath}/script/jquery-1.7.2.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/script/jquery-ui-1.8.20.custom.min.js"></script>
    <script src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.js"></script>


</body>
</html>