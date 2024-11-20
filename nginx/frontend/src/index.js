import HomeView from "./views/HomeView.js";
import FirstView from "./views/FirstView.js";
import SecondView from "./views/SecondView.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: HomeView },
        { path: "/view1", view: FirstView },
        { path: "/view1/:id", view: FirstView },
        { path: "/view2", view: SecondView }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });
	console.log("potential matches",potentialMatches);
    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
		console.log("no matches found");
        match = {
			route: routes[0],
            result: [location.pathname]
        };
    }
	console.log("match: ", match);
    const view = new match.route.view(getParams(match));

    document.querySelector(".container").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});
