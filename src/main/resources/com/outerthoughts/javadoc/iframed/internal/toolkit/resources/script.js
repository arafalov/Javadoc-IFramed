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
    var typedTerm = "-NONE-";
    var matchCount = -1;

	$("#searchField").select2({
		minimumInputLength: 1,
		placeholder: "Search for a package, class, method or field",
		ajax: {
			url: "/lookup",
			quietMillis: 200,
			dataType: "json",
			data: function(term, page){
                typedTerm = term;
				return { query: term };
			},
			results: function(data, page){
                matchCount = data.length
                if (matchCount == 0) {
                    ga('send', 'event', 'jd-search', 'nomatch', typedTerm);
                }
				return {results: data};
			},

		},
		formatResult: function(match){
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
            ga('send', 'event', 'jd-search', e.added.urlTarget, typedTerm, matchCount);
            window.location = e.added.urlTarget;
		})
});

