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

        <h2 style="text-decoration: underline;">About Us</h2>
        <p>
            Welcome to HiTeak Furniture, a premier manufacturer and distributor of upscale indoor and outdoor furniture.
            Our distribution center is located in Fullerton, California. We work together with your company to accommodate your needs.
        </p>
        <p>
            With more than 20 years of experience in the industry, Hiep Long Fine Furniture, our manufacturer headquartered in Binh Duong, Vietnam, has impacted many markets around the world, especially in Europe, North America, Japan, and Korea.
            We specialize in designing, producing, and exporting top end furniture made of plantation teak wood, and other high quality hardwoods for both indoor and outdoor enjoyments.
            In addition, we offer a wide range of products to accommodate your needs.
        </p>
        <p>To meet the needs and desires of consumers in our ever-changing market, innovation is the key to gratification and success in this trade.</p>
        <p>
            At HL Distribution, we are commited to ensure that you are above satisfied with our products and services.
            Satisfaction is not only a goal to strive for in customer approval industries, it is a way of life.
            Our furniture comes straight from the manufacturer to ensure you the best competitive edge on the market.
            Our mission is to bring that lifestyle to fulfill your everyday world.
        </p>
        <p>
            With over 20 years of experience, we guarantee that the quality our furniture is of top grade and our products that we deliver is the best in the market.
            For a closer look, please come and enjoy yourselves in our showroom to feel how high end furniture can make a difference to your life.
        </p>
        <p>
            For showroom visiting, please email us at <a style="color: #007C42; font-size: 14px;" href="mailto:info@hiteakfurniture.com?subject=Make%20an%20appointment">info@hiteakfurniture.com</a> for appointment.
        </p>
        <hr class="separator-10"/>
        <jsp:include page="footer.jsp"/>
    </div>  <!-- END MAIN CONTAINER -->

</body>
</html>