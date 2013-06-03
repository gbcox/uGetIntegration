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

Background = {
	sg: null,

	onLoad: function() {
		/* loading the simple get plugin */
		var plugin = document.getElementById("simpleGetPluginId");

		sg = plugin.SimpleGetPlugin();

		if (sg.valid) {
			console.log("SimpleGetPlugin: loaded.");
		} else {
			console.log("SimpleGetPlugin: not loaded.");
		}

		// set the default options
		Options.setFirstTime();
	}
};

document.addEventListener("DOMContentLoaded", Background.onLoad);

