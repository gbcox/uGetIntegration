// Copyright 2011 Roque Pinel.
//
// This file is part of Simple Get.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

Main = {
	downloadURL: function(url) {
		console.log("URL: " + url);

		var application = chrome.storage.local.get["download_manager_path"];
		var parameters = chrome.storage.local.get["download_manager_parameters"];
		var destination = chrome.storage.local.get["download_destination"];

		console.log("DownloadMangerPath: " + application);
		console.log("DownloadMangerParameters: " + parameters);
		console.log("DownloadDestination: " + destination);

		parameters = parameters.replace("[URL]", '"' + url + '"');
		parameters = parameters.replace("[FOLDER]", '"' + destination + '"');

		Background.sg.callApplication(application, parameters);
	},

	downloadLinkOnClick: function(info, tab) {
		console.log("DownloadLink: " + info.menuItemId + " was clicked.");

		downloadURL(info.linkUrl);
	},

	downloadAllOnClick: function(info, tab) {
		console.log("DownloadAll: " + info.menuItemId + " was clicked.");

		chrome.tabs.executeScript(null, { file: "download_all.js" });
	}
};

Menu = {
	options: [
		["uGet Link", ["link"], Main.downloadLinkOnClick],
		["uGet All Links", ["page"], Main.downloadAllOnClick]
	],
};


/* creating the context menu */

for (var i = 0; i < Menu.options.length; i++) {
	var id = chrome.contextMenus.create({
		"title": Menu.options[i][0],
		"contexts": Menu.options[i][1],
		"onclick": Menu.options[i][2]
	});

	console.log("'" + Menu.options[i][0] + "' item: " + id);
}

//var links = [];
var linksStr = "";

chrome.extension.onConnect.addListener(
	function(port) {
		port.onMessage.addListener(
			function(msg) {
				console.log("Connection type: " + msg.type);

				if (msg.type == "setLinks") {
					linksStr = msg.links;
					
					var popup = window.open(
						"donwload_all_popup.html",
						'Download All - Selection',
						'width = 725, height = 385, resizable = 0, toolbar = no, menubar = no, status = no, scrollbars = no'
					);

					// ensure that the focus was changed
					if (window.focus) {
						popup.focus();
					}
				} else if (msg.type == "getLinks") {
					port.postMessage({links: linksStr});
				} else if (msg.type == "downloadLinks") {
					links = JSON.parse(msg.links);

					console.log(links.length + " links returned");

					for (var i = 0; i < links.length; i++) {
						downloadURL(links[i]);
					}
				}
			}
		);
	}
);



