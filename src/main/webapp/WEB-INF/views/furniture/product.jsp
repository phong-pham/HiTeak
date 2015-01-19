<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" >
<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>HiTeak Furniture</title>

    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/bootstrap/css/bootstrap.css" >
    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/style/redmond/jquery-ui-1.8.20.custom.css" />
    <!-- Custom styles for this template -->
    <link href="${pageContext.request.contextPath}/furniture/css/furniture.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <jsp:include page="header.jsp"/>
        <hr class="separator-10"/>
        <div class="row">
            <h2><a class="menu-item" href="productList?categoryId=${category.parentCategoryId}"><strong>${category.parentCategoryName}</strong></a></h2>
            <c:if test="${hasBreadcrumb}">
                <h3 style="color: #853036;">
                    <span>.:</span>
                    <c:set var="i" value="0"/>
                    <c:forEach var="crumb" items="${breadcrumb}">
                        <c:if test="${i==0}"><a class="menu-item hiteak-breadcrumb" href="productList?categoryId=${crumb.categoryId}">${crumb.categoryName}</a></c:if>
                        <c:if test="${i>0}">:: <a class="menu-item hiteak-breadcrumb" href="productList?categoryId=${crumb.categoryId}">${crumb.categoryName}</a> </c:if>
                        <c:set var="i" value="${i+1}"/>
                     </c:forEach>
                    <span>:.</span>
                </h3>
            </c:if>
        </div>
        <div class="row">
            <div class="col-md-4 col-sm-10">
                <div class="row">
                    <img src="${pageContext.request.contextPath}/furniture/images/outdoor/chairs/out_rec_1_l.jpg"/>
                </div>
                <div class="row">
                    <div class="col-xs-6 col-md-3">
                        <a href="javascript:void(0);" class="thumbnail">
                            <img src="${pageContext.request.contextPath}/furniture/images/outdoor/chairs/out_rec_1.jpg" alt="...">
                        </a>
                    </div>
                    <div class="col-xs-6 col-md-3">
                        <a href="javascript:void(0);" class="thumbnail">
                            <img src="${pageContext.request.contextPath}/furniture/images/outdoor/chairs/out_rec_2.jpg" alt="...">
                        </a>
                    </div>
                    <div class="col-xs-6 col-md-3">
                        <a href="javascript:void(0);" class="thumbnail">
                            <img src="${pageContext.request.contextPath}/furniture/images/outdoor/chairs/out_rec_3.jpg" alt="...">
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-md-8 col-sm-10 product-info">
                <div class="row">
                    <h4>${product.productName} <small>(Code: ${product.productCode})</small></h4>
                </div>
                <nav class="navbar navbar-default navbar-static-top product-info-tab" role="navigation">
                    <ul class="nav navbar-nav">
                        <li class="active tab-li"><a data="info" href="javascript:void(0);">More Info</a></li>
                        <li class="tab-li"><a data="material" href="javascript:void(0);">Material</a></li>
                        <li class="tab-li"><a data="care"href="javascript:void(0);">Care</a></li>
                    </ul>
                </nav>
                <div class="row product-detail">
                    <div class="detail info">
                        Show description ${product.productDescription}
                    </div>
                    <div class="detail material" style="display: none;">
                        Show material for ${product.productName}
                    </div>
                    <div class="detail care" style="display: none;">
                        Show care for ${product.productName}
                    </div>
                </div>
            </div>
        </div>

        <hr class="separator-10"/>
        <jsp:include page="footer.jsp"/>
    </div>  <!-- END MAIN CONTAINER -->

</body>
</html>