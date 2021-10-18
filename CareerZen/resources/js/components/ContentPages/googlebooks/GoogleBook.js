import React, { useState } from "react";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";

const GoogleBook = props => {
    const {
        bookTitle,
        bookPageCount,
        bookLanguage,
        bookAuthor,
        bookPublisher,
        bookDescription,
        bookPreviewLink,
        bookInfoLink,
        bookImage
    } = props;
    // UI Modals
    const { buttonLabel, className } = props;

    const [modal, setModal] = useState(false);
    const [nestedModal, setNestedModal] = useState(false);
    const [closeAll, setCloseAll] = useState(false);

    const toggle = () => setModal(!modal);
    const toggleNested = () => {
        setNestedModal(!nestedModal);
        setCloseAll(false);
    };
    const toggleAll = () => {
        setNestedModal(!nestedModal);
        setCloseAll(true);
    };
    return (
        <Card body inverse>
            <CardImg
                top
                // width=""
                style={{
                    height: "200px",
                    width: "200px"
                }}
                src={bookImage}
                alt="Image Unavailable"
            />
            <hr />
            <CardText
                tag="h4"
                style={{ color: "black", fontFamily: "cursive" }}
            >
                {bookTitle}
            </CardText>
            <hr />
            <Button color="primary" onClick={toggle}>
                More Info
            </Button>

            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle} tag="h1">
                    {bookTitle}
                </ModalHeader>
                <ModalBody>
                    <CardText
                        style={{
                            color: "black",
                            fontFamily: "cursive",
                            fontSize: "1.5rem"
                        }}
                    >
                        Description
                    </CardText>
                    <br />
                    <CardText>{bookDescription}</CardText>
                    <hr />
                    <CardText
                        style={{
                            color: "black",
                            fontFamily: "cursive",
                            fontSize: "1.5rem"
                        }}
                    >
                        Page Count : {bookPageCount}
                    </CardText>
                    <hr />
                    <CardText
                        style={{
                            color: "black",
                            fontFamily: "cursive",
                            fontSize: "1.5rem"
                        }}
                    >
                        Language : {bookLanguage}
                    </CardText>
                    <hr />
                    <CardText
                        style={{
                            color: "black",
                            fontFamily: "cursive",
                            fontSize: "1.5rem"
                        }}
                    >
                        Authors : {bookAuthor}
                    </CardText>
                    <hr />
                    <CardText
                        style={{
                            color: "black",
                            fontFamily: "cursive",
                            fontSize: "1.5rem"
                        }}
                    >
                        Publisher : {bookPublisher}
                    </CardText>
                </ModalBody>
                {/* ---------------- Nested Modal ----------- */}
                <ModalFooter>
                    <Button color="primary" onClick={toggleNested}>
                        Add to Favourites
                    </Button>
                    <Modal
                        isOpen={nestedModal}
                        toggle={toggleNested}
                        onClosed={closeAll ? toggle : undefined}
                    >
                        <ModalBody>
                            <CardText
                                tag="h3"
                                style={{
                                    color: "black",
                                    fontFamily: "cursive",
                                    fontSize: "1.5rem"
                                }}
                            >
                                Added to Favourites!!!
                            </CardText>
                            <hr />
                            <CardText
                                tag="h4"
                                style={{
                                    color: "black",
                                    fontFamily: "cursive",
                                    fontSize: "1.5rem"
                                }}
                            >
                                Please Continue
                            </CardText>
                            <div style={{ display: "flex" }}>
                                <div
                                    style={{ margin: 0, paddingRight: "1rem" }}
                                >
                                    <Button
                                        color="primary"
                                        target="_blanks"
                                        href={bookInfoLink}
                                    >
                                        Info Link
                                    </Button>
                                </div>
                                <div style={{ margin: 0 }}>
                                    <Button
                                        color="primary"
                                        target="_blanks"
                                        href={bookPreviewLink}
                                    >
                                        Preview Link
                                    </Button>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={toggleNested}>
                                Back to Description
                            </Button>
                            <Button color="secondary" onClick={toggleAll}>
                                Close all
                            </Button>
                        </ModalFooter>
                    </Modal>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </Card>
    );
};

export default GoogleBook;
