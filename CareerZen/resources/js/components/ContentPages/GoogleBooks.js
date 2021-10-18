import React, { useState, useEffect } from "react";
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Card,
    Button,
    CardTitle,
    CardText,
    Row,
    Col,
    Container,
    Form,
    FormGroup,
    Label,
    Input,
    FormText
} from "reactstrap";
import classnames from "classnames";
import Image from "../../../Images/books.jpg";
import NAI from "../../../Images/NotAvailable.jpg";
import GoogleBook from "./googlebooks/GoogleBook";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// import axios from "axios";

// Styles Material UI
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        height: 140,
        width: 100
    },
    control: {
        padding: theme.spacing(2)
    }
}));

const GoogleBooks = props => {
    const [activeTab, setActiveTab] = useState("1");

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    // Material UI Functions
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();

    const handleChange = event => {
        setSpacing(Number(event.target.value));
    };

    // Each record will be
    // 1. title
    // 2. ID
    // 3. Desc
    // 4. Link
    // 5. Image
    const [maxResults, setMaxResults] = useState(12);
    const [startIndex, setStartIndex] = useState(1);
    const [booksearchItems, setBookSearchItems] = useState("");
    const [bookSearchreturnValues, setbookSearchreturnValues] = useState([]);
    const [thumbnail, setthumbnail] = useState([]);
    const [loadComponent, setLoadComponent] = useState(false);

    const setgoogleBooksSearchEngine = async e => {
        e.preventDefault();
        setLoadComponent(false);

        setbookSearchreturnValues([]);
        setthumbnail([]);
        console.log(bookSearchreturnValues);

        const url = `https://www.googleapis.com/books/v1/volumes?q=${booksearchItems}&maxResults=${maxResults}&startIndex=${startIndex}`;
        // console.log(booksearchItems);
        try {
            const response = await fetch(url);
            // console.log(response);
            const jsonres = await response.json();
            // console.log(jsonres, null, 3);
            // console.log(typeof jsonres);
            // console.log(jsonres.items);

            jsonres.items.forEach(item => {
                // console.log(item.volumeInfo.imageLinks.thumbnail);

                bookSearchreturnValues.push({
                    bookTitle: item.volumeInfo.title,
                    bookPageCount: item.volumeInfo.pageCount,
                    bookLanguage: item.volumeInfo.language,
                    bookAuthor: item.volumeInfo.authors,
                    bookPublisher: item.volumeInfo.publisher,
                    bookDescription: item.volumeInfo.description,
                    bookPreviewLink: item.volumeInfo.previewLink,
                    bookInfoLink: item.volumeInfo.infoLink
                });
            });

            jsonres.items.map(item => {
                if (item.volumeInfo.imageLinks === undefined) {
                    thumbnail.push({
                        bookImage: NAI
                    });
                } else {
                    thumbnail.push({
                        bookImage: item.volumeInfo.imageLinks.thumbnail
                    });
                }
            });

            setbookSearchreturnValues(bookSearchreturnValues);
            setthumbnail(thumbnail);
            // console.log("books");
            // console.log(bookSearchreturnValues);
            // console.log(thumbnail);
            setLoadComponent(true);
            setBookSearchItems("");
        } catch (e) {
            setLoadComponent(false);
            console.log(e);
        }
    };

    return (
        <React.Fragment>
            <div
                style={{
                    padding: "3rem",
                    fontFamily: "Roboto"
                }}
            >
                <h1>Google Books Viewer</h1>
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
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <Container
                                className="themed-container"
                                fluid="md"
                                style={{
                                    padding: "2rem",
                                    backgroundImage: `url(${Image})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat"
                                }}
                            >
                                <FormGroup>
                                    <Input
                                        type="search"
                                        name="search"
                                        id="exampleSearch"
                                        placeholder="search Google Books"
                                        value={booksearchItems || ""}
                                        onChange={e => {
                                            setBookSearchItems(e.target.value);
                                        }}
                                    />
                                    <div
                                        style={{
                                            paddingTop: "1rem"
                                        }}
                                    >
                                        <Button
                                            type="submit"
                                            color="primary"
                                            onClick={e =>
                                                setgoogleBooksSearchEngine(e)
                                            }
                                        >
                                            Search
                                        </Button>
                                    </div>
                                </FormGroup>
                            </Container>
                            <Container
                                className="themed-container"
                                fluid="md"
                                style={{
                                    paddingTop: "2rem"
                                }}
                            >
                                <Grid
                                    container
                                    className={classes.root}
                                    spacing={2}
                                >
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            justify="center"
                                            spacing={2}
                                        >
                                            {loadComponent &&
                                                bookSearchreturnValues.map(
                                                    (record, index) => {
                                                        return (
                                                            <Grid
                                                                key={index}
                                                                item
                                                            >
                                                                <GoogleBook
                                                                    {...record}
                                                                    {...thumbnail[
                                                                        index
                                                                    ]}
                                                                />
                                                            </Grid>
                                                        );
                                                    }
                                                )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Container>
                        </TabPane>

                        <TabPane tabId="2">
                            <h4
                                style={{
                                    fontFamily: "fantasy"
                                }}
                            >
                                Will be Added Soon, On progress!!
                            </h4>
                        </TabPane>
                    </TabContent>
                </div>
            </Container>
        </React.Fragment>
    );
};

export default GoogleBooks;
