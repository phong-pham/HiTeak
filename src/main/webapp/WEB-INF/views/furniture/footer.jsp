<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<jsp:useBean id="date" class="java.util.Date" />
<div class="modal fade" id="officeMap" tabindex="-1" role="dialog" aria-hidden="true" style="height:550px;width:650px;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body" style="padding-bottom:0px;">
                <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
                <div style="overflow:hidden;height:500px;width:600px;">
                    <div id="gmap_canvas" style="height:500px;width:600px;"></div>
                    <style>#gmap_canvas img{max-width:none!important;background:none!important}</style>
                    <a class="google-map-code" href="http://www.map-embed.net" id="get-map-data">www.map-embed.net</a>
                </div>
                <script type="text/javascript">
                    function init_map(){
                        var myOptions = {
                            zoom        :14,
                            center      :new google.maps.LatLng(33.8777689,-117.73865999999998),
                            mapTypeId   : google.maps.MapTypeId.ROADMAP
                        };
                        map = new google.maps.Map(document.getElementById("gmap_canvas"), myOptions);
                        marker = new google.maps.Marker({
                            map         : map,
                            position    : new google.maps.LatLng(33.8777689,-117.73865999999998)
                        });
                        infowindow = new google.maps.InfoWindow({
                            content:"<b>HiTeak Furniture</b><br/>22885 Savi Ranch Pkwy, Unit D<br/> 92887 Yorba Linda"
                        });
                        google.maps.event.addListener(marker, "click", function(){
                            infowindow.open(map,marker);
                        });
                        infowindow.open(map,marker);
                    }
                    google.maps.event.addDomListener(window, 'load', init_map);
                </script>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="sdsdsd" tabindex="-1" role="dialog" aria-hidden="true" style="height:550px;width:650px;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body" style="padding-bottom:0px;">

            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="businessShowLarge" tabindex="-1" role="dialog" aria-labelledby="loginLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header" style="display: none;">
            </div>
            <div class="modal-body" style="padding-bottom:0px;">
                <div>
                    <img id="business-show-img-lg" style="width: 100%; height: 100%;"/>
                </div>
            </div>
            <div class="modal-footer" style="padding: 10px;">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<div class="alert">
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <address>
                <strong>HL DISTRIBUTION, INC.</strong><br/>
                22885 Savi Ranch Pkwy, Unit D<br/>
                Yorba Linda, CA 92887<br/>
                <abbr title="Phone">Tel:</abbr><a href="tel:+17149980088"> (+1) 714-998-0088</a><br/>
                Fax: (+1) 714-998-0087
            </address>
        </div>
        <div class="col-md-8 col-sm-6">
            <c:forEach var="businessShow" items="${businessShowList}">
                <img class="business-show-img" style="float: right; width: 100px; height: 100px; cursor: pointer;" src="${businessShow.showLogo}"/>
            </c:forEach>
        </div>
    </div>
    <div class="row">
        <hr/>
        <center>
            <p>&copy; 2012-<fmt:formatDate value="${date}" pattern="yyyy"/> Copyright by Hiteakfurniture.com. All rights reserved.</p>
        </center>
    </div>
</div>

<script type="text/javascript" src="${pageContext.request.contextPath}/script/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/script/jquery-ui-1.8.20.custom.min.js"></script>
<script src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.js"></script>

<script src="${pageContext.request.contextPath}/script/util.js"></script>
<script src="${pageContext.request.contextPath}/script/hiteak.js"></script>