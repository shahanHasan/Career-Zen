import React from "react";
import { Element } from "react-scroll";
import { Container } from "reactstrap";
// import "/css/about.css";
import "../../../css/about.css";

const About = () => {
    return (
        <Element id="about" name="about">
            <Container className="themed-container" fluid="md">
                <section className="content">
                    <h1>About Us</h1>
                    <div className="container">
                        <div className="lefthalf">
                            <div
                                style={{
                                    backgroundImage:
                                        "url(/Images/Aboutus.jpeg)",
                                    height: "100%",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    minHeight: 250
                                }}
                            ></div>
                        </div>
                        <div className="righthalf">
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quisquam fuga odio accusamus
                                eaque alias corporis est enim harum error
                                similique inventore illum suscipit et provident
                                dolorum mollitia ut, explicabo accusantium.
                                Eaque saepe distinctio accusamus, provident
                                laudantium, deserunt asperiores itaque sit
                                minima rem quod blanditiis nostrum recusandae
                                quam ipsa, ratione pariatur veritatis
                                repudiandae quasi tenetur tempore impedit?
                                Laboriosam debitis quae quaerat. Nisi ea dolor,
                                obcaecati illum soluta quis id harum aspernatur
                                eius iusto alias vero, facilis suscipit ad aut
                                fugiat, libero doloremque voluptate? Commodi,
                                iusto excepturi omnis id ullam debitis
                                consequuntur? Veritatis dolorem obcaecati
                                impedit. Accusamus vel provident iure animi
                                iste, modi odit id nesciunt? Cumque distinctio,
                                perspiciatis veniam nihil tenetur nisi nesciunt
                                dolorum magnam excepturi dignissimos, vitae
                                velit, cum nam?
                            </p>
                        </div>
                    </div>
                </section>
            </Container>
        </Element>
    );
};

export default About;
