// fetch(url)
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(response) {
//         // console.log(response);

//         for (var key in response.query.search) {
//             wikiSearchreturnValues.push({
//                 queryResultPageFullURL: "no link",
//                 queryResultPageID: response.query.search[key].pageid,
//                 queryResultPageTitle: response.query.search[key].title,
//                 queryResultPageSnippet:
//                     response.query.search[key].snippet
//             });
//         }
//     })
//     .then(function(response) {
//         for (var key2 in wikiSearchreturnValues) {
//             // console.log(wikiSearchreturnValues);
//             console.log(typeof wikiSearchreturnValues);
//             let page = wikiSearchreturnValues[key2];
//             let pageID = page.queryResultPageID;
//             let urlForRetrievingPageURLByPageID = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=info&pageids=${pageID}&inprop=url&format=json`;

//             fetch(urlForRetrievingPageURLByPageID)
//                 .then(function(response) {
//                     return response.json();
//                 })
//                 .then(function(response) {
//                     page.queryResultPageFullURL =
//                         response.query.pages[pageID].fullurl;

//                     // forceUpdate();
//                 });
//         }
//     });
// setLoading(false);
// console.log("end");
