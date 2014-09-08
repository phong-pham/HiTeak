<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>

<div class="alert">
    <div class="row">
        <a class="col-md-6 col-sm-10" href="${pageContext.request.contextPath}/home">
            <img src="${pageContext.request.contextPath}/furniture/images/m_logo.gif"/>
            <img src="${pageContext.request.contextPath}/furniture/images/hiteak_furniture.gif"/>
        </a>
        <div class="col-md-4 col-sm2 pull-right">
            <div class="input-group">
                <input type="text" class="form-control input-sm col-md-4" placeholder="Search for products"/>
                <span class="input-group-addon glyphicon glyphicon-search"/>
            </div>
            <strong class="navbar-brand pull-right">Call Us Today
                <a style="color: #B0CE25; font-size: 20px; padding-left: 10px; cursor: pointer;" href="tel:+17149980088">(+1) 714-998-0088</a>
            </strong>
        </div>
    </div>
    <hr/>
    <div class="row">
        <ul class="col-md-12 list-inline pointer main-menu">
            <c:forEach var="category" items="${categoriesForMenu}">
                <li>
                    <a class="menu-item pointer" href="productList?categoryId=${category.categoryId}">${category.categoryName}</a>
                    <ul class="sub-menu">
                        <c:forEach var="subCategory" items="${category.subCategories}">
                            <li><a class="menu-item" href="productList?categoryId=${subCategory.categoryId}">${subCategory.categoryName}</a></li>
                        </c:forEach>
                    </ul>
                </li>
            </c:forEach>
            <li>
                <a class="menu-item pointer" href="about">About</a>
                <ul class="sub-menu">
                    <li><a class="menu-item" href="/about">About Us</a></li>
                    <li><a class="menu-item" href="/aboutTeak">About Our Teak</a></li>
                    <li><a class="menu-item" href="/customerService">Customer Service</a></li>
                    <li><a class="menu-item">Request Catalogue</a></li>
                    <li><a class="menu-item">Customer Review</a></li>
                </ul>
            </li>
        </ul>
    </div>
    <div id="myCarousel" class="carousel slide" data-ride="carousel" style="height: ${carouselHeight}px;">
        <!-- Indicators -->
        <ol class="carousel-indicators">
            <c:forEach var="i" begin="0" end="4">
                <li data-target="#myCarousel" data-slide-to="${i}"<c:if test="${i==0}">class="active"</c:if>></li>
            </c:forEach>
        </ol>
        <div class="carousel-inner" >
            <c:set var="i" value="0"/>
            <c:forEach var="img" items="${carouselImages}">
                <c:choose>
                    <c:when test="${i==0}"><div class="item active" style="height: ${carouselHeight}px;"></c:when>
                    <c:otherwise><div class="item" style="height: ${carouselHeight}px;"></c:otherwise>
                </c:choose>
                    <div class="container">
                        <div class="carousel-caption">
                            <img src="${pageContext.request.contextPath}/furniture/images/${img}.jpg"/>
                        </div>
                    </div>
                </div>
                <c:set var="i" value="${i+1}"/>
            </c:forEach>
        </div>
        <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span></a>
        <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span></a>
    </div>
</div>