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
            <p>${category.categoryDescription}</p>
        </div>
        <c:set var="i" value="0"/>
        <c:choose>
            <c:when test="${hasSubCategory == true && hasProductList == false}">
                <table style="width: 80%">
                <c:forEach var="subCategory" items="${category.subCategories}">
                    <c:if test="${i%4 == 0}">
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
                        <div class="product_info">
                        </div>
                    </a>
                    </td>
                    <c:if test="${i%4 == 3}">
                        </tr>
                    </c:if>
                    <c:set var="i" value="${i+1}"/>
                </c:forEach>
                </table>
            </c:when>
            <c:when test="${hasProductList == true && hasSubCategory == false}">
                <table style="width: 80%">
                <c:forEach var="product" items="${category.products}">
                    <c:if test="${i%5 == 0}">
                        <tr>
                    </c:if>
                    <td class="product-td-item">
                        <a href="product?productId=${product.productId}" class="product-td-item">
                            <br/>
                            <img class="product-td-item" src="${pageContext.request.contextPath}/${product.imageSource}" alt="Outdoor Dining Chairs"/>
                            <div class="product_info">
                                <h3>${product.productName}</h3>
                                <span>${product.productCode}</span>
                                <c:if test="${showPrice == true}">
                                    <div>Retails for:
                                        <span><span class="amount">$2,095.00</span></span>
                                    </div>
                                    <span class="price"><span class="amount">$1,295.00</span></span>
                                </c:if>
                            </div>
                        </a>
                    </td>
                    <c:if test="${i%5 == 4}">
                        </tr>
                    </c:if>
                    <c:set var="i" value="${i+1}"/>
                </c:forEach>
                </table>
            </c:when>
            <c:when test="${hasSubCategory == true && hasProductList == true}">
                <c:forEach var="subCategory" items="${category.subCategories}">
                    <h3><a class="menu-item" href="productList?categoryId=${subCategory.categoryId}">${subCategory.categoryName}</a></h3>
                    <hr/>
                    <table style="width: 80%">
                    <c:set var="i" value="0"/>
                    <c:forEach var="product" items="${subCategory.products}">
                        <c:if test="${i%4 == 0}">
                            <tr>
                        </c:if>
                        <td class="product-td-item">
                            <a href="product?productId=${product.productId}" class="product-td-item">
                                <br/>
                                <img class="product-td-item" src="${pageContext.request.contextPath}/${product.imageSource}" alt="Outdoor Dining Chairs"/>
                                <div class="product_info">
                                    <h3>${product.productName}</h3>
                                    <span>${product.productCode}</span>
                                    <c:if test="${showPrice == true}">
                                        <div>Retails for:
                                            <span><span class="amount">$2,095.00</span></span>
                                        </div>
                                        <span class="price"><span class="amount">$1,295.00</span></span>
                                    </c:if>
                                </div>
                            </a>
                        </td>
                        <c:set var="i" value="${i+1}"/>
                        <c:if test="${i%4 == 0}">
                            </tr>
                        </c:if>
                    </c:forEach>
                    </table>
                </c:forEach>
            </c:when>
        </c:choose>
        <hr class="separator-10"/>
        <jsp:include page="footer.jsp"/>
    </div>  <!-- END MAIN CONTAINER -->

    <script type="text/javascript" src="${pageContext.request.contextPath}/script/jquery-1.7.2.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/script/jquery-ui-1.8.20.custom.min.js"></script>
    <script src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.js"></script>

</body>
</html>