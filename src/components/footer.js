import { Link } from "gatsby"
import React from "react"
import tw from "twin.macro"
import classNames from "classnames"
import { useTranslation } from "react-i18next"

import Bubble from "../components/bubble"
import logo from "../svgs/logo.svg"
import iconFacebook from "../svgs/icons/icon-facebook.svg"
import iconTwitter from "../svgs/icons/icon-twitter.svg"
import iconTelegram from "../svgs/icons/icon-telegram.svg"
import iconInstagram from "../svgs/icons/icon-instagram.svg"
import iconArrowBlack from "../svgs/icons/arrow-forward.svg"

import { PageContainer, BigText } from "../common/elements"

const columns = [
  [
    { text: "Myriad", link: "/", icon: logo },
    {
      text: "Instagram",
      url: "https://t.me/https://www.instagram.com/myriadcoin",
      icon: iconInstagram,
    },
    {
      text: "Telegram",
      url: "https://t.me/Myriadcoinofficial",
      icon: iconTelegram,
    },
    {
      text: "Twitter",
      url: "https://twitter.com/myriadcoin",
      icon: iconTwitter,
    },
    {
      text: "Facebook",
      url: "https://www.facebook.com/themyriadplatform",
      icon: iconFacebook,
    },
    {
      text: "Reddit",
      url: "https://www.reddit.com/r/myriadcoin/",
      icon: iconInstagram,
    },
  ],
  [
    { text: "Explore" },
    { text: "About", link: "/about" },
    { text: "Community", link: "/community" },
    { text: "Blog", link: "/blog" },
  ],
  [
    { text: "Resources" },
    { text: "Mine", link: "/mine" },
    { text: "Hold", link: "/hold" },
    { text: "Buy", link: "/buy" },
    { text: "Accept", link: "/accept" },
  ],
  [{ text: "Business" }, { text: "Contact", link: "/contact" }],
]

const FooterContainer = tw.header`container flex justify-between py-24 text-sm flex-col sm:flex-row px-6 sm:px-0`
const FooterLink = tw.a`flex items-center py-1 hover:text-purple`
const FooterLinkTitle = tw.span`flex items-center`

const Footer = () => {
  const { t } = useTranslation()
  const renderColumn = (items, key) => {
    let classes = classNames("footer__list", {
      [`footer__list--social`]: key === 0,
    })
    return (
      <ul className={classes} key={`footer-list-${key}`}>
        {items.map((item, idx) => renderItem(item, idx))}
      </ul>
    )
  }

  const renderItem = (item, key) => {
    let classes = classNames({
      [`mb-4 flex-grow mt-8 sm:mt-0`]: key === 0,
    })
    return (
      <li className={classes} key={`footer-item-${key}`}>
        {item.url || item.link ? renderLink(item) : renderTitle(item)}
      </li>
    )
  }

  const renderIcon = (svg, text) => {
    return <img src={svg} className="fill-current mr-2" alt={`Icon ${text}`} />
  }

  const renderLink = item => {
    if (item.url) {
      return (
        <FooterLink href={item.url}>
          {item.icon && renderIcon(item.icon, item.text)}
          <FooterLinkTitle>{item.text}</FooterLinkTitle>
        </FooterLink>
      )
    } else {
      return (
        <Link
          to={item.link}
          className="flex items-center py-1 hover:text-purple"
        >
          {item.icon && renderIcon(item.icon, item.text)}
          <FooterLinkTitle>{item.text}</FooterLinkTitle>
        </Link>
      )
    }
  }

  const renderTitle = item => {
    return (
      <>
        {item.icon && renderIcon(item.icon, item.text)}{" "}
        <FooterLinkTitle>{item.text}</FooterLinkTitle>
      </>
    )
  }

  return (
    <>
      <PageContainer tw="py-24 sm:py-48 px-6 sm:px-0">
        <div tw="max-w-3xl">
          <Bubble tw="mb-8 sm:mb-16" color="blue">
            {t("home.telegram.bubble")}
          </Bubble>
          <BigText tw="mb-8 sm:mb-16">{t("home.telegram.title")}</BigText>
          <span tw="inline-flex">
            <a
              href="https://t.me/Myriadcoinofficial"
              tw="underline text-4xl sm:text-7xl font-bold leading-extra-tight hover:text-black"
            >
              {t("home.telegram.join")}
            </a>
            <img src={iconArrowBlack} alt=">" tw="ml-4" />
          </span>
        </div>
      </PageContainer>
      <FooterContainer>
        {columns.map((items, key) => renderColumn(items, key))}
      </FooterContainer>
    </>
  )
}

export default Footer
