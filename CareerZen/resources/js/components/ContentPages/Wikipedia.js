import React, { useState, useEffect } from "react";
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Button,
    Container,
    FormGroup,
    Input
} from "reactstrap";
import classnames from "classnames";
import RecordView from "./wikipedia/RecordView";

const Wikipedia = props => {
    const [activeTab, setActiveTab] = useState("1");

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    // Each record will be
    // 1. title
    // 2. ID
    // 3. Desc
    // 4. Link

    const [wikiSearchreturnValues, setwikiSearchreturnValues] = useState([]);
    const [wikiSearchItems, setwikiSearchItems] = useState("");
    const [loadComponent, setLoadComponent] = useState(false);

    const wikipediaSearchEngine = async e => {
        e.preventDefault();
        setLoadComponent(false);
        setwikiSearchreturnValues([]);
        console.log("on Submit");
        console.log(wikiSearchreturnValues);

        // setwikiSearchItems(e.target.value);
        // console.log(wikiSearchItems);
        // setLoading(true);
        // setLoadComponent(false);
        var url = "https://en.wikipedia.org/w/api.php";

        var params = {
            action: "query",
            list: "search",
            srsearch: wikiSearchItems,
            format: "json"
        };
        url = url + "?origin=*";
        Object.keys(params).forEach(key => {
            url += "&" + key + "=" + params[key];
        });
        try {
            const response = await fetch(url);
            const Jsonres = await response.json();
            // console.log(JSON.stringify(Jsonres, null, 3));
            Jsonres.query.search.forEach(item => {
                wikiSearchreturnValues.push({
                    queryResultPageFullURL: "no link",
                    queryResultPageID: item.pageid,
                    queryResultPageTitle: item.title,
                    queryResultPageSnippet: item.snippet
                });
            });

            wikiSearchreturnValues.forEach(record => {
                // sconsole.log(record);
                let pageID = record.queryResultPageID;
                let urlForRetrievingPageURLByPageID = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=info&pageids=${pageID}&inprop=url&format=json`;

                fetch(urlForRetrievingPageURLByPageID).then(async response => {
                    const urlres = await response.json();
                    console.log(JSON.stringify(urlres, null, 3));
                    record.queryResultPageFullURL =
                        urlres.query.pages[pageID].fullurl;
                    // console.log(record.queryResultPageFullURL);
                });
            });
            setwikiSearchItems("");
            setwikiSearchreturnValues(wikiSearchreturnValues);
            setTimeout(() => {
                setLoadComponent(true);
            }, 500);
        } catch (err) {
            console.log(err);

            setLoadComponent(false);
        }
        // console.log(wikiSearchreturnValues);
    };

    return (
        <React.Fragment>
            <div style={{ padding: "3rem", fontFamily: "Roboto" }}>
                <h1>Wikipedia Viewer</h1>
            </div>
            <Container className="themed-container" fluid="md">
                <div>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({
                                    active: activeTab === "1"
                                })}
                                onClick={() => {
                                    toggle("1");
                                }}
                            >
                                Search
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({
                                    active: activeTab === "2"
                                })}
                                onClick={() => {
                                    toggle("2");
                                }}
                            >
                                Added to favorites.
                            </NavLink>
                        </NavItem>
                    </Nav>

                    {/* Tab contents of wikipedia viewer */}
                    <TabContent activeTab={activeTab}>
                        {/* Tab Id one */}

                        <TabPane tabId="1">
                            <Container
                                className="themed-container"
                                fluid="md"
                                style={{ padding: "2rem" }}
                            >
                                <FormGroup>
                                    <Input
                                        type="search"
                                        name="search"
                                        id="exampleSearch"
                                        placeholder="search wikipedia articles"
                                        value={wikiSearchItems || ""}
                                        onChange={e => {
                                            setwikiSearchItems(e.target.value);
                                        }}
                                    />
                                    <div style={{ paddingTop: "1rem" }}>
                                        <Button
                                            type="submit"
                                            color="primary"
                                            onClick={e =>
                                                wikipediaSearchEngine(e)
                                            }
                                        >
                                            Search
                                        </Button>
                                    </div>
                                </FormGroup>
                                {loadComponent &&
                                    wikiSearchreturnValues.map(
                                        (record, index) => {
                                            return (
                                                <RecordView
                                                    key={
                                                        record.queryResultPageID
                                                    }
                                                    {...record}
                                                />
                                            );
                                        }
                                    )}
                            </Container>
                        </TabPane>

                        {/* Tab id 2 */}
                        <TabPane tabId="2">
                            <h4 style={{ fontFamily: "fantasy" }}>
                                Will be Added Soon, On progress!!
                            </h4>
                        </TabPane>
                    </TabContent>
                </div>
            </Container>
        </React.Fragment>
    );
};

export default Wikipedia;
