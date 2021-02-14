import React, { useEffect, useState } from "react"
import tw from "twin.macro"
import { useTranslation } from "react-i18next"

import LineGraph from "./line-graph"
import { useRenderValues } from "./hooks"

import { MediumBoldText, BodyText } from "../../common/elements"

import {
  GROUP_NAMES,
  THREE_HOURS,
  SIX_HOURS,
  DAY,
  WEEK,
  MONTH,
} from "../../common/graph"

function TransactionsGraph() {
  const [data, setData] = useState(null)
  const [group, setGroup] = useState(DAY)
  const [loading, setLoading] = useState(true)
  const groupName = GROUP_NAMES[group]

  const { t } = useTranslation()

  const {
    renderXAxis,
    renderXValue,
    renderYAxis,
    renderYValue,
  } = useRenderValues({
    data,
    group,
    yAxisOptions: { shorten: { precision: 0 } },
    yValueOptions: { suffix: " transactions" },
  })

  useEffect(() => {
    setLoading(true)
    fetch(
      `https://xmy-history.coinid.org/processeddata/transactions/${groupName}.json`
    )
      .then(r => r.json())
      .then(difficultyData => {
        const newData = difficultyData.map((v, i) => {
          return {
            x: i,
            y: v,
          }
        })
        setData(newData)
        setLoading(false)
      })
  }, [groupName])

  return (
    <>
      <div>
        <MediumBoldText tw="mb-10">
          {t("analytics.transactions.title")}
        </MediumBoldText>
        <BodyText tw="mb-14">
          {t("analytics.transactions.description")}
        </BodyText>

        <LineGraph
          loading={loading}
          group={group}
          data={data}
          startY={0}
          renderXAxis={renderXAxis}
          renderYAxis={renderYAxis}
          renderXValue={renderXValue}
          renderYValue={renderYValue}
          barPlotKeys={["y"]}
          barPlotColors={["#0066FF"]}
        />
        <div tw="text-right">
          <span>Grouping: </span>
          <button tw="mr-1" onClick={() => setGroup(THREE_HOURS)}>
            3 Hours
          </button>
          <button tw="mr-1" onClick={() => setGroup(SIX_HOURS)}>
            6 Hours
          </button>
          <button tw="mr-1" onClick={() => setGroup(DAY)}>
            Day
          </button>
          <button tw="mr-1" onClick={() => setGroup(WEEK)}>
            Week
          </button>
          <button onClick={() => setGroup(MONTH)}>Month</button>
        </div>
      </div>
    </>
  )
}

export default React.memo(TransactionsGraph)
