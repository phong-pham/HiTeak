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

        <h2 style="text-decoration: underline;">About Our Teak</h2>
        <p>
            Our Teak furniture is made from 100% Solid Teak Wood, which was made from "kiln dried" lumber.
            Our "kiln dried" lumber is from 100% genuine plantation teak forests that are well managed, credibly certified from Brazil, Costa Rica, South America and Burma.
            We choose the timber that has older age (above 30 years old) to ensure the wood is more durable and give the beautiful yellow color.
            We also carefully select the wood well to get the uniform color for each of the furniture.
            Through the production process, our teak is resistant to expansion caused by environmental factors.
            With more than 20 years of experience in manufacturing teak wood, we know how to make the furniture to be smooth with the most finely sanded finish in the market.
            For a closer look, please come and enjoy yourselves in our showrooms to experience the quality teak that makes a difference to your life.
        </p>
        <p>
            Our factory, Hiep Long Fine Furniture Co, is one of the first manufactures has the FSC (Forest Stewardship Council) chain of custody (CoC).
            According to Forest Stewardship Council, "FSC chain of custody (CoC) tracks FSC certified material through the production process - from the forest to the consumer, including all successive stages of processing, transformation, manufacturing and distribution."
            Therefore, we are proud to say that our teak wood is from genuine plantation teak forests.
        </p>
        <hr class="separator-10"/>
        <jsp:include page="footer.jsp"/>
    </div>  <!-- END MAIN CONTAINER -->

</body>
</html>