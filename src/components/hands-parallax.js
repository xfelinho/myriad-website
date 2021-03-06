import React, { useCallback, useEffect, useRef, useState } from "react"
import { useSpring, animated, interpolate } from "react-spring"
import tw from "twin.macro"
import { useTranslation } from "react-i18next"
import Image from "./image"

import SvgM from "../svgs/parallax/m.inline.svg"
import SvgY from "../svgs/parallax/y.inline.svg"
import SvgR from "../svgs/parallax/r.inline.svg"
import SvgI from "../svgs/parallax/i.inline.svg"
import SvgA from "../svgs/parallax/a.inline.svg"
import SvgD from "../svgs/parallax/d.inline.svg"

import Gradient from "../svgs/parallax/gradient.inline.svg"
import GradientOverlay from "../svgs/parallax/gradient-overlay.inline.svg"

const ParallaxItem = ({
  translateY,
  eh,
  component,
  offsetY,
  offsetX,
  interpolation,
  zIndex,
}) => {
  return (
    <animated.div
      tw={"absolute w-full"}
      style={{
        transform: interpolate(
          [translateY.interpolate(interpolation), eh],
          (translateY, eh) => {
            let target = translateY + (eh * offsetY) / 2
            return `translate3d(${0}px, ${target}px, ${0}px)`
          }
        ),
        left: offsetX * 100 + "%",
        zIndex,
      }}
    >
      {component}
    </animated.div>
  )
}

const Parallax = ({ items, translateY, eh }) => {
  return (
    <div tw="absolute top-0 left-0 flex w-full h-full items-center">
      {items.map((item, index) => (
        <ParallaxItem key={index} {...item} translateY={translateY} eh={eh} />
      ))}
    </div>
  )
}

const HandsParallax = () => {
  const { t } = useTranslation()
  const [{ height, width }, setDimensions] = useState({})

  const el = useRef(null)
  const el2 = useRef(null)

  const [{ st, wh, eh }, set] = useSpring(() => ({
    st: 1000,
    wh: 0,
    eh: 0,
  }))

  const onScroll = useCallback(() => {
    if (!el2.current) {
      return
    }

    const { y } = el2.current.getBoundingClientRect()

    set({ st: y })
  }, [set])

  const onLayout = useCallback(() => {
    if (!el.current) {
      return
    }

    const { height, width } = el.current.getBoundingClientRect()
    setDimensions({ height, width })
    set({ eh: height, wh: window && window.innerHeight })

    onScroll()
  }, [onScroll, set])

  useEffect(() => {
    if (!el.current) {
      return
    }

    onLayout()
  }, [onLayout])

  useEffect(() => {
    window.addEventListener("scroll", onScroll)
    window.addEventListener("resize", onLayout)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onLayout)
    }
  }, [onLayout, onScroll])

  const stickyTop = interpolate([wh, eh], (wh, eh) => (wh - eh) / 2)
  const stickyMultiplier = 2.5
  const stickyLength = eh.interpolate(h => h * stickyMultiplier)

  const progressMax = height * (stickyMultiplier - 1)

  const translateY = interpolate(
    [st, wh, eh],
    (st, wh, eh) =>
      st -
      (wh - (eh * stickyMultiplier) / 2) / 2 +
      (eh * stickyMultiplier) / 2 / 2
  )

  const easingRange = 1000
  const letterInput = () =>
    [...new Array(easingRange * 2)].map((_, i) => i - easingRange)
  const letterOutput = speed =>
    letterInput().map(v => {
      let val = (v + easingRange) / (easingRange * 2)
      val -= 0.5
      val *= 2

      if (val > 0) {
        // val = easings.easeQuadIn(val)
      } else {
        // val = easings.easeQuadIn(-1 * val)
        // val *= -1
      }

      val *= easingRange * speed

      return val
    })

  const getHandDimensions = () => {
    const handAspect = 3848 / 1760
    const targetHandWidth = width * 0.5
    const targetHandHeight = targetHandWidth * handAspect

    let handScale = (200 + height) / targetHandHeight
    if (handScale < 1) {
      handScale = 1 - (1 - handScale) / 3
    }

    const handWidth = targetHandWidth * handScale
    const handHeight = targetHandHeight * handScale

    return { handScale, handHeight, handWidth }
  }

  const { handScale, handHeight } = getHandDimensions()

  const getHandComponent = () => {
    return (
      <div
        tw="m-auto w-6/12"
        style={{
          transform: "translate3d(0px, 0px, 0px) scale(" + handScale + ")",
          opacity: wide ? 1 : 0.3,
        }}
      >
        <Image filename="parallax/hands.png" alt="Hands" />
      </div>
    )
  }

  const wide = width > 640

  const letterOffsetX = i => {
    const spread = wide ? 6 : 5

    const space = 47
    let placement = i

    if (wide && i >= 3) {
      placement += 1
    }

    const multiplier = placement - spread / 2

    return (0.01 * multiplier * space) / (spread / 2)
  }

  const letterWidth = wide ? "13%" : "16%"

  const items = [
    {
      component: <SvgM tw="m-auto" width={letterWidth} />,
      offsetY: 0,
      offsetX: letterOffsetX(0),
      interpolation: {
        range: letterInput(),
        output: letterOutput(1),
      },
      zIndex: wide ? 0 : 1,
    },
    {
      component: <SvgY tw="m-auto" width={letterWidth} />,
      offsetY: 0,
      offsetX: letterOffsetX(1),
      interpolation: {
        range: letterInput(),
        output: letterOutput(-1),
      },
      zIndex: wide ? 0 : 1,
    },
    {
      component: <SvgR tw="m-auto" width={letterWidth} />,
      offsetY: 0,
      offsetX: letterOffsetX(2),
      interpolation: {
        range: letterInput(),
        output: letterOutput(0.7),
      },
      zIndex: wide ? 0 : 1,
    },
    {
      component: <SvgI tw="m-auto" width={letterWidth} />,
      offsetY: 0,
      offsetX: letterOffsetX(3),
      interpolation: {
        range: letterInput(),
        output: letterOutput(-0.5),
      },
      zIndex: wide ? 0 : 1,
    },
    {
      component: <SvgA tw="m-auto" width={letterWidth} />,
      offsetY: 0,
      offsetX: letterOffsetX(4),
      interpolation: {
        range: letterInput(),
        output: letterOutput(1),
      },
      zIndex: wide ? 0 : 1,
    },
    {
      component: <SvgD tw="m-auto" width={letterWidth} />,
      offsetY: 0,
      offsetX: letterOffsetX(5),
      interpolation: {
        range: letterInput(),
        output: letterOutput(-0.4),
      },
      zIndex: wide ? 0 : 1,
    },
    {
      component: (
        <p
          tw="relative font-normal text-white m-auto text-xxs sm:text-sm sm:max-w-sm w-6/12 sm:w-4/12"
          dangerouslySetInnerHTML={{ __html: t("home.parallax.first") }}
        />
      ),
      offsetY: -1.1,
      offsetX: wide ? -0.3 : -0.15,
      interpolation: {
        range: [0, 1],
        output: [0, 1.15],
      },
      zIndex: wide ? 0 : 1,
    },
    {
      component: (
        <p
          tw="relative text-sm font-normal text-white m-auto text-xxs sm:text-sm sm:max-w-sm w-6/12 sm:w-4/12"
          dangerouslySetInnerHTML={{ __html: t("home.parallax.second") }}
        />
      ),
      offsetY: 1.1,
      offsetX: wide ? 0.3 : 0.15,
      interpolation: {
        range: [0, 1],
        output: [0, 1.15],
      },
      zIndex: wide ? 0 : 1,
    },
    {
      component: getHandComponent(),
      offsetY: 0,
      offsetX: 0,
      interpolation: {
        range: [-progressMax / 2, progressMax / 2],
        output: [-(handHeight - height) / 2, (handHeight - height) / 2],
        extrapolate: "clamp",
      },
      zIndex: 0,
    },
  ]

  return (
    <animated.div style={{ height: stickyLength }} ref={el2}>
      <animated.div
        tw="sticky overflow-hidden h-screen"
        style={{ top: stickyTop }}
        ref={el}
      >
        <Gradient
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        />

        {height && <Parallax items={items} translateY={translateY} eh={eh} />}
        <GradientOverlay
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}
        />
      </animated.div>
    </animated.div>
  )
}

export default HandsParallax
