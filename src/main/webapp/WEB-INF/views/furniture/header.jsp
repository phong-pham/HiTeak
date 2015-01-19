<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>
<div class="modal fade" id="loginView" tabindex="-1" role="dialog" aria-labelledby="loginLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="loginLabel">Login</h4>
            </div>
            <div class="modal-body" style="padding-bottom:0px;">
                <jsp:include page="loginForm.jsp"/>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="editSlideView" tabindex="-1" role="dialog" aria-labelledby="editSlideLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 80%;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="editSlideLabel">Edit Slides</h4>
            </div>
            <div class="modal-body" style="padding-bottom:0px;">
                <div class="row">
                    <div class="col-md-3 slide-list">
                    </div>
                    <div class="col-md-9 preview-div">
                        <img class="slide-preview" style="width: 100%; height: 100%;"/>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="progress upload-image-progress" style="width: 50%; float: left; display: none;">
                    <div class="progress-bar progress-bar-striped active"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
                        <span class="progress-message">Please wait while saving images...</span>
                    </div>
                </div>
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button id="saveImgSlideBtn" type="button" class="btn btn-primary">Save</button>
            </div>
        </div>
    </div>
</div>

<div class="alert">
    <div class="row">
        <a class="col-md-6 col-sm-10" href="${pageContext.request.contextPath}/home">
            <img src="${pageContext.request.contextPath}/furniture/images/m_logo.gif"/>
            <img src="${pageContext.request.contextPath}/furniture/images/hiteak_furniture.gif"/>
        </a>
        <div class="col-md-4 col-sm2 pull-right">
            <div class="pull-right">
                <c:choose>
                    <c:when test="${userName != null}">
                        <a class="login-link pointer" style="display: none;">Login</a>
                        <div class="login-info">
                            <span class="login-name">Hello ${userName}</span> |
                            <a class="logout-link pointer">Logout</a>
                        </div>
                    </c:when>
                    <c:otherwise>
                        <a class="login-link pointer">Login</a>
                        <div class="login-info" style="display: none;">
                            <span class="login-name"></span> |
                            <a class="logout-link pointer">Logout</a>
                        </div>
                    </c:otherwise>
                </c:choose>
            </div>
            <div class="input-group pull-right">
                <input type="text" class="form-control input-sm col-md-4" placeholder="Search for products"/>
                <span class="input-group-addon glyphicon glyphicon-search pointer" style="top: 0;"/>
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
                    <li><a class="menu-item" href="about">About Us</a></li>
                    <li><a class="menu-item" href="aboutTeak">About Our Teak</a></li>
                    <li><a class="menu-item" href="customerService">Customer Service</a></li>
                    <li><a class="menu-item" href="requestCatalog">Request Catalog</a></li>
                    <li><a class="menu-item">Customer Review</a></li>
                </ul>
            </li>
        </ul>
    </div>

    <div id="myCarousel" class="carousel slide" data-ride="carousel" style="height: ${carouselHeight}px;" carouselType="${carouselType}">
        <!-- Indicators -->
        <ol class="carousel-indicators">
            <c:if test="${carouselImagesCnt > 0}">
                <c:forEach var="i" begin="0" end="${carouselImagesCnt-1}">
                    <li data-target="#myCarousel" data-slide-to="${i}"<c:if test="${i==0}">class="active"</c:if>></li>
                </c:forEach>
            </c:if>
        </ol>
        <div class="carousel-inner" >
            <c:if test="${carouselImagesCnt > 0}">
                <c:set var="i" value="0"/>
                <c:forEach var="img" items="${carouselImages}">
                    <c:choose>
                        <c:when test="${i==0}"><div class="item active" style="height: ${carouselHeight}px;"></c:when>
                        <c:otherwise><div class="item" style="height: ${carouselHeight}px;"></c:otherwise>
                    </c:choose>
                        <div class="container">
                            <div class="carousel-caption">
                                <img src="${img.imageData}" style="width: 100%; height: 100%;" imageId="${img.imageId}"/>
                            </div>
                        </div>
                    </div>
                    <c:set var="i" value="${i+1}"/>
                </c:forEach>
            </c:if>
        </div>
        <c:if test="${carouselImagesCnt > 0}">
            <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev" style="margin-left: 20px;"><span class="glyphicon glyphicon-chevron-left"></span></a>
            <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next" style="margin-right: 20px;"><span class="glyphicon glyphicon-chevron-right"></span></a>
        </c:if>
        <span class="glyphicon glyphicon-edit pointer edit-entity" style="position: absolute; top: 0; right: -20px;" edit-entity="slides"/>
    </div>

</div>