/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */



var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        alert('start OK!');
        //window.plugins.socialsharing.share('Message only');
        alert('DEVICE: '+device.model);



        var src = 'http://larocca.lv:8000/studio69';
        var myMedia = new Media(src, function(){alert('Media ok');}, function(error){alert('Media ERROR: '+error);});
        myMedia.play({ playAudioWhenScreenIsLocked : false });


       // var smsplugin = cordova.require("info.asankan.phonegap.smsplugin.smsplugin");

      // /*
        smsplugin.send('29539611','Hello World',function(result){alert('SMS Send!!! result: '+result);},function(error){alert('sms failureCallback ERROR: '+error);});
        alert('alert - sms send');
        smsplugin.isSupported(function(result){alert('SMS is SUPPORT: '+result);},function(error){alert("sms NOT SUPPORT: "+error);});
    //*/

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};



$(document).ready(function(){
    alert('ready');

    $("#btnParseXML").click(function(){

        var xmlUrl = 'http://larocca.lv:8000/studio69.xspf';
         xmlUrl = 'http://task.lv/app/xmlParser.php';
        var nowTitle;


        $.ajax({
            type: "GET",
            url: xmlUrl,
            cache: false,
            async: false,
            dataType: "xml",
            success: function (xml){
                //alert('XML Success');
                nowTitle = $(xml).find("title").text();
                //alert('now play: '+nowTitle);
                $('#nowPlay').text(nowTitle);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown){
                alert("RADIO XML "+XMLHttpRequest.responseText + "<br />TextStatus: " + textStatus + "<br />ErrorThrown: " + errorThrown);
            }
        });
        var lasFMUrl = 'http://ws.audioscrobbler.com/2.0/?method=album.search&album=LET%20THE%20BASS%20KICK&artist=CHUCKIE&api_key=f230c6df7a4d7d26a215ce051d0ed621';
         lasFMUrl = 'http://ws.audioscrobbler.com/2.0/';
        var albumImage;


        $.ajax({
            type: "GET",
            url: lasFMUrl,
            cache: false,
            async: false,
            //data: { method: "album.search", album: "LET THE BASS KICK", artist: 'CHUCKIE', api_key: 'f230c6df7a4d7d26a215ce051d0ed621'},
            //data: { method: "album.search", album: nowTitle, api_key: 'f230c6df7a4d7d26a215ce051d0ed621'},
            data: { method: "track.search", track: nowTitle, api_key: 'f230c6df7a4d7d26a215ce051d0ed621'},
            dataType: "xml",
            success: function (xml){
                albumImage = $(xml).find("image[size='extralarge']").first().text();
                //alert($(xml).find("id").first().text());
                //alert('AlbumImage: '+albumImage);
                $('#albumImage').attr("src", albumImage);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown){
                alert('LASTFM '+XMLHttpRequest.responseText + "<br />TextStatus: " + textStatus + "<br />ErrorThrown: " + errorThrown);
            }
        });

    });
    $("#btnBarcode").click(function(){
        cordova.plugins.barcodeScanner.scan(
           function (result) {
               alert("We got a barcode\n" +
                     "Result: " + result.text + "\n" +
                     "Format: " + result.format + "\n" +
                     "Cancelled: " + result.cancelled);
           },
           function (error) {
               alert("Scanning failed: " + error);
           }
        );

    });
    $("#btnDefaultSMS").click(function(){
               alert("click");
               var number = $("#numberTxt").val();
               var message = $("#messageTxt").val();
               var intent = "INTENT"; //leave empty for sending sms using default intent
               var success = function () { alert('Message sent successfully'); };
               var error = function (e) { alert('Message Failed:' + e); };
               sms.send(number, message, intent, success, error);
           });
});