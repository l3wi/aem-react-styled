var AemReact = AemReact || {};
/**
 * add a child to a Dnd-Zone. Usually the Dnd-Zone is hidden.
 */
AemReact.addChild = function(ctx, relPath, resourceType) {
	if (window.CQ) {
		var e = CQ.WCM.getEditable(ctx.path + relPath + "/*");
		e.createParagraph({
			resourceType : resourceType
		});
	} else{
		//var config = {"resourceType":"react-demo/components/text-field","parentPath":"/content/reactdemo/storelocator/muenchen/jcr:content/par","parentResourceType":"wcm/foundation/components/parsys","relativePosition":"before","neighborName":"*"};;
		var granite = window.parent.Granite;
		var component = null;
		for (var i=0;i<granite.author.components.length;i++) {
			var c = granite.author.components[i];
			if (c.getResourceType()===resourceType) {
				component = c;
				break;
			}
		}
		if (c) {
			var editables = granite.author.edit.findEditables();
			var editable=null;
			for (var i=0;i<editables.length;i++) {
				var e = editables[i];
				if (e.path===ctx.path + relPath + "/*") {
					editable = e;
					break;
				}
			}
			granite.author.persistence.createParagraph(c, "before", editable);
		}
	}
}
/**
 * hide or show the editable at the path.
 */
AemReact.setVisibility = function(path, visible) {
	if (typeof window.CQ !== "undefined") {
		var editable = CQ.WCM.getEditable(path);
		if (editable) {
			if (visible) {
				editable.show();
			} else {
				editable.hide();
			}
		} else {
			var cb = function() {
	            console.log("editablesready");
				AemReact.setVisibility(path, visible);
			}
			if (typeof window !== "undefined" && window.CQ) {
				// this is effective when age is initially rendered
	            CQ.WCM.on("editablesready", cb, this);
	            // this will be effective when element is dragged into parsys
			    setTimeout(cb,0);
			}
		}
	}
}

AemReact.onDelete = function(editable) {
	console.log("deleted");
}
