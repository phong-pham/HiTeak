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