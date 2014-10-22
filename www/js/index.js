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
        myMedia.play();


       // var smsplugin = cordova.require("info.asankan.phonegap.smsplugin.smsplugin");

       /*
        smsplugin.send('29539611','Hello World',function(result){alert('SMS Send!!! result: '+result);},function(error){alert('sms failureCallback ERROR: '+error);});
        alert('alert - sms send');
        smsplugin.isSupported(function(result){alert('SMS is SUPPORT: '+result);},function(error){alert("sms NOT SUPPORT: "+error);});
    */

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