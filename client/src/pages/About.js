import React from "react";

import useInputState from "../hooks/UseInputState";

import Page from "./Page";

import HeadingPrimarySlim from "../components/headings/HeadingPrimarySlim";
import HeadingPrimary from "../components/headings/HeadingPrimary";
import Link from "../components/Link";
import FormContainer from "../components/FormContainer";
import FormField from "../components/FormField";
import FormTextArea from "../components/FormTextArea";
import ButtonStatic from "../components/buttons/ButtonStatic";

import useStyles from "../styles/pages/AboutStyles";

import coverImage from "../img/about_cover.jpg";
import sprites from "../img/svg/sprites.svg";

const About = () => {
  // JSS style hook
  const classes = useStyles({ img: coverImage });

  // Input field state
  const [name, updateName, resetName] = useInputState("");
  const [email, updateEmail, resetEmail] = useInputState("");
  const [message, updateMessage, resetMessage] = useInputState("");

  return (
    <Page>
      <div className={classes.AboutPage}>
        <div className={classes.AboutPage_ProjectAbout}>
          <div className={classes.ProjectAbout_Image_cover}></div>
          <div className={classes.ProjectAbout_Details}>
            <HeadingPrimarySlim styles={{ marginBottom: "5rem" }}>
              Winter Fashion Ltd.
            </HeadingPrimarySlim>
            <p className={classes.Details_paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              blandit sem nec blandit venenatis. Nullam sagittis nec urna et
              pretium. Sed gravida volutpat lacus non aliquam. Sed eget diam
              finibus, volutpat massa eget, ultrices eros. Donec elit massa,
              lobortis vel nulla at, lobortis pretium libero. Ut aliquam augue
              nec metus faucibus, molestie sagittis dui interdum. Orci varius
              natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus. Interdum et malesuada fames ac ante ipsum primis in
              faucibus. Etiam efficitur egestas venenatis.{" "}
              <Link href="#">Suspendisse</Link> ut dui at eros ullamcorper
              dignissim in et magna. Mauris scelerisque quam non elit placerat,
              ac mollis urna sagittis. Suspendisse sed sem nec massa rhoncus
              dignissim et et mauris.<br></br>
              <br></br> Curabitur sit amet scelerisque neque. Duis finibus odio
              id risus dapibus, et egestas libero auctor. In dapibus nisi a
              turpis convallis, quis viverra velit sagittis. Integer placerat,
              lacus in gravida hendrerit, nulla odio aliquam nunc, vitae iaculis
              justo augue ac urna. <Link href="#">Pellentesque</Link> habitant
              morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Donec vehicula efficitur eros, vitae ullamcorper tortor
              rhoncus sit amet. Nam at lectus rhoncus, accumsan lorem eu,
              vestibulum sem.
            </p>
          </div>
        </div>
        <div className={classes.AboutPage_Contact}>
          <HeadingPrimary styles={{ gridColumn: "1 / -1" }}>
            Contact Us
          </HeadingPrimary>
          <div className={classes.Contact_Details}>
            <div className={classes.Details_group}>
              <div className={classes.Details_item}>
                <svg className={classes.Details_icon}>
                  <use xlinkHref={`${sprites}#icon-map`}></use>
                </svg>
                <p className={classes.Details_data}>Smiljan, Croatia</p>
              </div>
              <div className={classes.Details_item}>
                <svg className={classes.Details_icon}>
                  <use xlinkHref={`${sprites}#icon-phone`}></use>
                </svg>
                <p className={classes.Details_data}>+1 718-236-2611</p>
              </div>
              <div className={classes.Details_item}>
                <svg className={classes.Details_icon}>
                  <use xlinkHref={`${sprites}#icon-mail`}></use>
                </svg>
                <p className={classes.Details_data}>info@winter.com</p>
              </div>
              <div className={classes.Details_item}>
                <svg className={classes.Details_icon}>
                  <use xlinkHref={`${sprites}#icon-facebook`}></use>
                </svg>
                <p className={classes.Details_data}>
                  <a
                    href="https://www.facebook.com/madushan.sooriyarathne"
                    target="_blank"
                    rel="nonref nonopener"
                  >
                    Winter Fashion Ltd.
                  </a>
                </p>
              </div>
              <div className={classes.Details_item}>
                <svg className={classes.Details_icon}>
                  <use xlinkHref={`${sprites}#icon-instagram`}></use>
                </svg>
                <p className={classes.Details_data}>
                  <a
                    href="https://www.instagram.com/iammadushan"
                    target="_blank"
                    rel="nonref nonopener"
                  >
                    Winter
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className={classes.Contact_Form}>
            <FormContainer>
              <FormField
                type="text"
                value={name}
                onChange={updateName}
                isRequired={true}
                id="NameField"
                label="Name"
              />
              <FormField
                type="email"
                value={email}
                onChange={updateEmail}
                isRequired={true}
                id="EmailField"
                label="Email"
              />
              <FormTextArea
                type="text"
                value={message}
                onChange={updateMessage}
                isRequired={true}
                id="MessageField"
                label="Message"
              />
              <ButtonStatic isSmall={true} type="submit">
                Inquire
              </ButtonStatic>
            </FormContainer>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default About;
