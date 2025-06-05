import { Button1, Button2, ButtonGlow } from "../../components/ui/Buttons";
import { UserWebsiteContent } from "../../constants/content/UserWebsiteContent";
import about1 from "../../assets/website/3dImg4.png";
import about2 from "../../assets/website/3dImg3.png";
import { Heading1, SubHeading1 } from "../../components/ui/Headings";
import Footer from "../../components/website/Footer";
import { useNavigate } from "react-router-dom";
import { AuthenticatedRoutes, AuthRoutes } from "../../constants/Routes";
import bgImg from "../../assets/website/bgImg.jpg";
import ProcessSteps from "./ProcessSteps";
import { MainContent } from "../../constants/content/MainContent";
import { useState } from "react";
import { Accordion } from "react-bootstrap";
import parterImg1 from "../../assets/partner/img1.png";
import parterImg2 from "../../assets/partner/img2.png";
import parterImg3 from "../../assets/partner/img3.png";
import parterImg4 from "../../assets/partner/img4.png";
import parterImg5 from "../../assets/partner/img5.png";
import parterImg6 from "../../assets/partner/img6.png";
import parterImg7 from "../../assets/partner/img7.png";
import parterImg8 from "../../assets/partner/img8.png";
import parterImg10 from "../../assets/partner/img10.png";
import parterImg11 from "../../assets/partner/img11.png";
import parterImg12 from "../../assets/partner/img12.png";
import parterImg13 from "../../assets/partner/img13.png";
import parterImg14 from "../../assets/partner/img14.png";
import parterImg15 from "../../assets/partner/img15.png";
import parterImg16 from "../../assets/partner/img16.png";
import parterImg17 from "../../assets/partner/img17.png";
import parterImg18 from "../../assets/partner/img18.png";
import parterImg19 from "../../assets/partner/img19.png";
import parterImg20 from "../../assets/partner/img20.png";
import parterImg21 from "../../assets/partner/img21.png";
import parterImg22 from "../../assets/partner/img22.png";
import parterImg23 from "../../assets/partner/img23.png";
import parterImg24 from "../../assets/partner/img24.png";
import parterImg25 from "../../assets/partner/img25.png";
import parterImg26 from "../../assets/partner/img26.png";
import parterImg27 from "../../assets/partner/img27.png";
import parterImg28 from "../../assets/partner/img28.png";
import parterImg29 from "../../assets/partner/img29.png";
import parterImg30 from "../../assets/partner/img30.png";
import parterImg31 from "../../assets/partner/img31.png";
import parterImg32 from "../../assets/partner/img32.png";
import parterImg33 from "../../assets/partner/img33.png";
import parterImg34 from "../../assets/partner/img34.png";
import exchangeImg1 from "../../assets/exchange/exImg1.png";
import exchangeImg2 from "../../assets/exchange/exImg2.png";
import exchangeImg3 from "../../assets/exchange/exImg3.png";
import exchangeImg4 from "../../assets/exchange/exImg4.png";
import exchangeImg5 from "../../assets/exchange/exImg5.png";
import exchangeImg6 from "../../assets/exchange/exImg6.png";
import exchangeImg7 from "../../assets/exchange/exImg7.png";
import exchangeImg8 from "../../assets/exchange/exImg8.png";
import exchangeImg9 from "../../assets/exchange/exImg9.png";
import trainImg1 from "../../assets/trainImg1.jpg";
import trainImg2 from "../../assets/trainImg2.jpg";
import trainImg3 from "../../assets/trainImg3.jpg";
import trainGif from "../../assets/gif/trainGif.gif";
import trainGif2 from "../../assets/gif/trainGif3.gif";
import userManualPdf from "../../assets/docs/future-trade-pdf_compressed.pdf";

import meetGif from "../../assets/gif/meetGif.gif";
import CountUp from "react-countup";
import { AllPlansContent } from "../../constants/content/dummy/AllPlanContent";
import GenerateDynamicData from "./GenerateDynamicData";

const UserHome = () => {
  const navigate = useNavigate();
  const [faqTab, setFaqTab] = useState(1);
  const parters = [
    parterImg1,
    parterImg2,
    parterImg3,
    parterImg4,
    parterImg5,
    parterImg6,
    parterImg7,
    parterImg8,
    parterImg10,
    parterImg11,
    parterImg12,
    parterImg13,
    parterImg14,
    parterImg15,
    parterImg16,
    parterImg17,
    parterImg18,
    parterImg19,
    parterImg20,
    parterImg21,
    parterImg22,
    parterImg23,
    parterImg24,
    parterImg25,
    parterImg26,
    parterImg27,
    parterImg28,
    parterImg29,
    parterImg30,
    parterImg31,
    parterImg32,
    parterImg33,
    parterImg34,
  ];
  const handleNavigate = () => {
    if (localStorage.getItem("token")) {
      navigate(AuthenticatedRoutes.USER_DASHBOARD);
    } else {
      navigate(AuthRoutes.LOGIN);
    }
  };

  const faqData = {
    general: [
      {
        id: 1,
        question: "What is Bullioncoin?",
        answer:
          "Bullioncoin is a decentralized platform that allows users to trade cryptocurrencies with ease and security.",
      },
      {
        id: 2,
        question: "How to use Bullioncoin?",
        answer:
          "To use Bullioncoin, users need to create an account, deposit funds, and choose a trading pair. They can then place orders to buy, sell, or trade cryptocurrencies.",
      },
      {
        id: 3,
        question: "Is Bullioncoin safe?",
        answer:
          "Yes, Bullioncoin is a safe and secure platform that uses advanced security measures to protect users' funds and data.",
      },
      {
        id: 4,
        question: "What are the fees on Bullioncoin?",
        answer:
          "Bullioncoin charges a small transaction fee for each trade, which is typically around 0.1% of the trade value.",
      },
    ],

    preSale: [
      {
        id: 1,
        question: "What is BULLIONCOIN LBEC BEP20?",
        answer:
          "BULLIONCOIN LBEC BEP20 is a DEFI coin designed and developed to provide the Crypto community a utility coin that can pair well with major coins and stake exceptionally well.",
      },
      {
        id: 2,
        question:
          "Which are the recommended Crypto that can pair well with LBEC while staking?",
        answer: "ETH ERC20 and BNB BEP20.",
      },
      {
        id: 3,
        question: "What is the best Plan?",
        answer:
          "All Plans can usually generate 2 times the profit in a reasonable time.",
      },
      {
        id: 4,
        question: "What is the Min. and Max. amount that I can withdraw?",
        answer:
          "Min amount allowed is 10$ and Max amount allowed is 100٪ of your trade profit.",
      },
      {
        id: 5,
        question: "Can I reinvest or repeat Stake?",
        answer:
          "Your available profit amount is shown in your User Panel. You can choose to withdraw or reinvest to any available PLAN as a Registered User.",
      },
      {
        id: 6,
        question: "Are there any charges?",
        answer:
          "We are glad to support you in your efforts to be a Crypto enthusiast. Kindly share the project with others.",
      },
      {
        id: 7,
        question: "Are there Taxes to pay on my Profit?",
        answer:
          "Kindly check your countries tax norms and pay your taxes promptly and remain a good citizen.",
      },
    ],
  };

  const exchangeImg = [
    exchangeImg1,
    exchangeImg2,
    exchangeImg3,
    exchangeImg4,
    exchangeImg5,
    exchangeImg6,
    exchangeImg7,
    exchangeImg8,
    exchangeImg9,
  ];

  return (
    <>
      <div className="UserHome" id="home">
        {/* ======= hero section start ======= */}
        <div
          className="hero-section"
          style={{ backgroundImage: `url(${bgImg})` }}
        >
          <div className="inner">
            <div className="left">
              <h1
                data-aos="fade-right"
                className="title textBg"
                style={{ backgroundImage: `url(${trainGif2})` }}
              >
                {UserWebsiteContent?.heroSection?.title}
              </h1>
              <h1
                data-aos="fade-right"
                className="title textBg"
                style={{ backgroundImage: `url(${trainGif})` }}
              >
                {UserWebsiteContent?.heroSection?.subTitle}
              </h1>
              {/* <p data-aos="fade-right" className="para">
                {UserWebsiteContent?.heroSection?.desc}
              </p> */}
              <div className="btns">
                <Button1
                  onClick={handleNavigate}
                  dataAos={"fade-right"}
                  name="Login"
                  className={"login"}
                />
              </div>
            </div>
            {/* <div className="right">
              <div className="bg-img">
                <img src={heroBg} alt="" />
              </div>
            </div> */}
          </div>

          <div className="inner">
            <span className="btn-title">POWER TRADE PLATFORM </span>
          </div>
          <div className="inner">
            <div className="count-numbers">
              <div
                className="ss-card"
                style={{ backgroundImage: `url(${trainImg2})` }}
              >
                <div className="content">
                  <h2 className="name">Total Referral</h2>
                  <span className="count">
                    <CountUp end={442} start={0} />
                  </span>
                  <ButtonGlow name={"Buy Now"} />
                </div>
              </div>
              <div
                className="ss-card"
                style={{ backgroundImage: `url(${trainImg1})` }}
              >
                <div className="content">
                  <h2 className="name">Total Investment</h2>
                  <span className="count">
                    <CountUp end={985752} start={0} />
                  </span>
                  <ButtonGlow name={"Buy Now"} />
                </div>
              </div>
              <div
                className="ss-card"
                style={{ backgroundImage: `url(${trainImg3})` }}
              >
                <div className="content">
                  <h2 className="name">Total User</h2>
                  <span className="count">
                    <CountUp end={6252} start={0} />
                  </span>
                  <ButtonGlow name={"Buy Now"} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ======= hero section end ======= */}
        {/* ======= about section start ======= */}
        <div className="about-section" id="about">
          <div className="section-inner">
            <div className="left">
              <div data-aos="fade-down" className="img-box">
                <img className="img-drop-shadow " src={about1} alt="" />
              </div>
            </div>
            <div className="right">
              <div className="content">
                <SubHeading1
                  name={UserWebsiteContent?.aboutSection?.subTitle}
                />
                <Heading1 name={UserWebsiteContent?.aboutSection?.title} />
                <p className="para" data-aos="fade-up">
                  {UserWebsiteContent?.aboutSection?.desc}
                </p>
              </div>
              <div data-aos="fade-up" className="img-box">
                <img className="img-drop-shadow " src={about2} alt="" />
              </div>
            </div>
          </div>
        </div>
        {/* ======= about section end ======= */}
        {/* ======= services section start ======= */}
        {/* <div className="service-section" id="services">
          <div className="section-inner">
            <Heading1 name={UserWebsiteContent?.servicesSection?.title} />
            <p className="para top" data-aos="fade-up">
              {UserWebsiteContent?.servicesSection?.desc}
            </p>

            <div className="card-box-wrapper">
              {UserWebsiteContent?.servicesSection?.lists?.map((item, i) => (
                <div key={`service-${i}`} className="card1" data-aos="fade-up">
                  <div className="img-box">
                    <img className="img-drop-shadow " src={item?.icon} alt="" />
                  </div>
                  <div className="content">
                    <h3>{item?.name}</h3>
                    <p className="para">{item?.para}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
        {/* ======= services section end ======= */}
        {/* <div className="best-product-section">
          <div className="section-inner">
            <Heading1 name={UserWebsiteContent?.bestProductSection?.title} />
            <div className="card-lists">
              {UserWebsiteContent?.bestProductSection?.lists?.map((item, i) => (
                <div key={`product-${i}`} className="card" data-aos="fade-up">
                  <div className="top">
                    <div className="img-box">
                      <img
                        className="img-drop-shadow "
                        src={item?.icon}
                        alt=""
                      />
                    </div>
                    <h3>{item?.name}</h3>
                  </div>
                  <div className="content">
                    <p className="para">{item?.para}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        <div className="section-inner">
          <GenerateDynamicData />
        </div>

        {/* ======= process step section start ======= */}
        <div className="process-section-main section-inner">
          <Heading1 name={"Staking Process"} />
          <ProcessSteps />
        </div>
        {/* ======= process step section end ======= */}
        {/* ======= revenue cards section start ======= */}
        <div className="revenue-section">
          <div className="section-inner">
            <Heading1
              name={
                "Digitize the value and revenues of any real estate property."
              }
            />

            <div className="card-lists">
              <div className="card-box">
                <div className="img-box">
                  <img src={meetGif} alt="" />
                </div>
                <div className="content">
                  <span className="tag">Reliable Transcription ✨ </span>
                  <h2 className="title">
                    Smart Contracts Real-Estate is Getting Real
                  </h2>
                  <p className="para1">
                    When most people think of NFTs, they imagine a funky avatar
                    or a colourful piece of digital art. But non-fungible tokens
                    are much more than a whacked-out profile picture. Today,
                    NFTs are being used to trade real-world assets. Take your
                    home, for example. Yes, smart contracts real estate is
                    becoming a thing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ======= revenue cards section end ======= */}

        {/* ======= price card section start ======= */}
        <div className="price-card-section" id="plans">
          <div className="section-inner">
            <Heading1 name={UserWebsiteContent?.priceCardSection?.title} />
            <p className="para top" data-aos="fade-up">
              {UserWebsiteContent?.priceCardSection?.desc}
            </p>
            <div className="card-lists">
              {AllPlansContent?.map((item, i) => (
                <div key={`price-${i}`} className="card" data-aos="fade-up">
                  {item?.discount && (
                    <div className="tag">{item?.discount}</div>
                  )}
                  <h5>${item?.sellingPrice}</h5>
                  <h6>{item?.planName}</h6>
                  <button onClick={handleNavigate}>Invest</button>
                </div>
              ))}
            </div>
            <div className="btns martop">
              <Button2
                onClick={() => {
                  const fileUrl = userManualPdf;
                  window.open(fileUrl, "_blank");
                }}
                className={"Button2 connectWalletBTN martop"}
                name="Download Plans"
              />
            </div>
          </div>
        </div>
        {/* ======= price card section end ======= */}
        {/* ======= faq section start ======= */}
        <div className="faq-section">
          <div className="section-inner">
            <Heading1 name={"Have Any Questions?"} />
            <p className="para top" data-aos="fade-up">
              Here we tried to clear all your doubts regarding{" "}
              {MainContent.appName} pre sale, tokenomics, buying, selling and
              what is our future plan.
            </p>

            <div className="faq-tab">
              <div className="section-inner">
                <div className="tab-panel">
                  <button
                    className={faqTab === 1 ? "active" : ""}
                    onClick={() => setFaqTab(1)}
                  >
                    User
                  </button>
                  <button
                    className={faqTab === 2 ? "active" : ""}
                    onClick={() => setFaqTab(2)}
                  >
                    Investor
                  </button>
                </div>
                <div className="tab-content">
                  <Accordion>
                    {faqTab === 1
                      ? faqData?.general?.map((item, i) => (
                          <Accordion.Item
                            key={`general-${i}`}
                            eventKey={`general-${i}`}
                          >
                            <Accordion.Header>
                              {item?.question}
                            </Accordion.Header>
                            <Accordion.Body>{item?.answer}</Accordion.Body>
                          </Accordion.Item>
                        ))
                      : faqData?.preSale?.map((item, i) => (
                          <Accordion.Item
                            key={`preSale-${i}`}
                            eventKey={`preSale-${i}`}
                          >
                            <Accordion.Header>
                              {item?.question}
                            </Accordion.Header>
                            <Accordion.Body>{item?.answer}</Accordion.Body>
                          </Accordion.Item>
                        ))}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ======= faq section end ======= */}
        {/* ======= our project section start ======= */}
        <div className="our-project martop">
          <div className="section-inner">
            <Heading1 name={"Our Project has been Audited By"} />
            <div className="partner-inner">
              {parters?.map((item, i) => (
                <div
                  data-aos="fade"
                  key={`partner-${i}`}
                  className="partnerCard"
                >
                  <img src={item} alt="" />
                </div>
              ))}
            </div>
          </div>
          {/* <div
            style={{ backgroundImage: `url(${walletBg})` }}
            className="section-inner walletmask martop"
          >
            <Heading1 name={"Decentralized Wallets"} />
            <div className="wallet-inner">
              <div data-aos="fade" className="walletCard">
                <div className="img-card">
                  <img src={trustWalletIcon} alt="" />
                </div>
                <span>Trust Wallet</span>
              </div>
              <div data-aos="fade" className="walletCard">
                <div className="img-card">
                  <img src={metamaskWalletIcon} alt="" />
                </div>
                <span>Metamask Wallet</span>
              </div>
            </div>
          </div> */}
          <div className="section-inner exchange-section">
            <Heading1 name={"Upcoming Exchanges"} />
            <div className="exchange-inner">
              {exchangeImg?.map((item, i) => (
                <div
                  data-aos="fade"
                  key={`exchange-${i}`}
                  className="exchangeCard"
                >
                  <img src={item} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* ======= our project section end ======= */}
        {/* ======= footer section start ======= */}
        <Footer />
        {/* ======= footer section end ======= */}
      </div>
    </>
  );
};

export default UserHome;
