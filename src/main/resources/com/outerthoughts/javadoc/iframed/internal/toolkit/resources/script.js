function show(type)
{
    count = 0;
    for (var key in methods) {
        var row = document.getElementById(key);
        if ((methods[key] &  type) != 0) {
            row.style.display = '';
            row.className = (count++ % 2) ? rowColor : altColor;
        }
        else
            row.style.display = 'none';
    }
    updateTabs(type);
}

function updateTabs(type)
{
    for (var value in tabs) {
        var sNode = document.getElementById(tabs[value][0]);
        var spanNode = sNode.firstChild;
        if (value == type) {
            sNode.className = activeTableTab;
            spanNode.innerHTML = tabs[value][1];
        }
        else {
            sNode.className = tableTab;
            spanNode.innerHTML = "<a href=\"javascript:show("+ value + ");\">" + tabs[value][1] + "</a>";
        }
    }
}



$(document).ready(function() {
	$("#searchField").select2({
		minimumInputLength: 1,
		placeholder: "Search for a class or method",
		ajax: {
			url: "/lookup",
			quietMillis: 300,
			dataType: "json",
			data: function(term, page){
				return { query: term };
			},
			results: function(data, page){
				return {results: data};
			},

		},
		formatResult: function(match){
			//console.log("Match", match);
			if (match.comment) {
				return "<dl><dt>"+match.htmlDescription + "</dt><dd><em>" + match.comment +"</em></dd></dl>";
			} else {
				return match.htmlDescription;
			}

		},
		formatSelection: function(s){
			return s.htmlDescription;
		},

	});

	//Events
	$("#searchField")
		.on("change", function(e) {
			console.log("change "+JSON.stringify({val:e.val, added:e.added, removed:e.removed}));
            window.location = e.added.urlTarget;
		})
});

