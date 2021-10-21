import * as INDICATORS from '../constants/table'

export const getAppropriatedColor = (headerName) => ({
  DIAMOND: 'rgb(223, 243, 255)',
  GOLD: 'rgb(255, 245, 208)',
  SILVER: 'rgb(240, 242, 244)',
  BRONZE: 'rgb(249, 226, 205)'
}[headerName])

export const getColor = (data) => {
  if (!data?.parent) return getAppropriatedColor(data?.originalId)
  return getAppropriatedColor(data?.parent.id)
}

export const mapperIndicatorToColums = (indicators) => {
  if (!indicators) return null
  return (
    [
      {
        DIAMOND_ID: indicators.DIAMOND.id,
        [INDICATORS.DESCRIPTION]: indicators.DIAMOND.GROWTH.description,

        DIAMOND_GROWTH_ID: indicators.DIAMOND.GROWTH.id,
        [INDICATORS.DIAMOND_SYMBOL]: indicators.DIAMOND.GROWTH.symbol,
        [INDICATORS.DIAMOND_GOAL]: indicators.DIAMOND.GROWTH.goal,
        [INDICATORS.DIAMOND_WEIGHT]: indicators.DIAMOND.GROWTH.weight,

        GOLD_GROWTH_ID: indicators.GOLD.GROWTH.id,
        [INDICATORS.GOLD_SYMBOL]: indicators.GOLD.GROWTH.symbol,
        [INDICATORS.GOLD_GOAL]: indicators.GOLD.GROWTH.goal,
        [INDICATORS.GOLD_WEIGHT]: indicators.GOLD.GROWTH.weight,

        SILVER_GROWTH_ID: indicators.SILVER.GROWTH.id,
        [INDICATORS.SILVER_SYMBOL]: indicators.SILVER.GROWTH.symbol,
        [INDICATORS.SILVER_GOAL]: indicators.SILVER.GROWTH.goal,
        [INDICATORS.SILVER_WEIGHT]: indicators.SILVER.GROWTH.weight,

        BRONZE_GROWTH_ID: indicators.BRONZE.GROWTH.id,
        [INDICATORS.BRONZE_SYMBOL]: indicators.BRONZE.GROWTH.symbol,
        [INDICATORS.BRONZE_GOAL]: indicators.BRONZE.GROWTH.goal,
        [INDICATORS.BRONZE_WEIGHT]: indicators.BRONZE.GROWTH.weight
      },
      {
        GOLD_ID: indicators.GOLD.id,
        description: indicators.DIAMOND.DEVOLUTION.description,

        DIAMOND_DEVOLUTION_ID: indicators.DIAMOND.DEVOLUTION.id,
        [INDICATORS.DIAMOND_SYMBOL]: indicators.DIAMOND.DEVOLUTION.symbol,
        [INDICATORS.DIAMOND_GOAL]: indicators.DIAMOND.DEVOLUTION.goal,
        [INDICATORS.DIAMOND_WEIGHT]: indicators.DIAMOND.DEVOLUTION.weight,

        GOLD_DEVOLUTION_ID: indicators.GOLD.DEVOLUTION.id,
        [INDICATORS.GOLD_SYMBOL]: indicators.GOLD.DEVOLUTION.symbol,
        [INDICATORS.GOLD_GOAL]: indicators.GOLD.DEVOLUTION.goal,
        [INDICATORS.GOLD_WEIGHT]: indicators.GOLD.DEVOLUTION.weight,

        SILVER_DEVOLUTION_ID: indicators.SILVER.DEVOLUTION.id,
        [INDICATORS.SILVER_SYMBOL]: indicators.SILVER.DEVOLUTION.symbol,
        [INDICATORS.SILVER_GOAL]: indicators.SILVER.DEVOLUTION.goal,
        [INDICATORS.SILVER_WEIGHT]: indicators.SILVER.DEVOLUTION.weight,

        BRONZE_DEVOLUTION_ID: indicators.BRONZE.DEVOLUTION.id,
        [INDICATORS.BRONZE_SYMBOL]: indicators.BRONZE.DEVOLUTION.symbol,
        [INDICATORS.BRONZE_GOAL]: indicators.BRONZE.DEVOLUTION.goal,
        [INDICATORS.BRONZE_WEIGHT]: indicators.BRONZE.DEVOLUTION.weight
      },
      {
        SILVER_ID: indicators.SILVER.id,
        description: indicators.DIAMOND.PRODUCT_INTRODUCTION.description,

        DIAMOND_PRODUCT_INTRODUCTION_ID: indicators.DIAMOND.PRODUCT_INTRODUCTION.id,
        [INDICATORS.DIAMOND_SYMBOL]: indicators.DIAMOND.PRODUCT_INTRODUCTION.symbol,
        [INDICATORS.DIAMOND_GOAL]: indicators.DIAMOND.PRODUCT_INTRODUCTION.goal,
        [INDICATORS.DIAMOND_WEIGHT]: indicators.DIAMOND.PRODUCT_INTRODUCTION.weight,

        GOLD_PRODUCT_INTRODUCTION_ID: indicators.GOLD.PRODUCT_INTRODUCTION.id,
        [INDICATORS.GOLD_SYMBOL]: indicators.GOLD.PRODUCT_INTRODUCTION.symbol,
        [INDICATORS.GOLD_GOAL]: indicators.GOLD.PRODUCT_INTRODUCTION.goal,
        [INDICATORS.GOLD_WEIGHT]: indicators.GOLD.PRODUCT_INTRODUCTION.weight,

        SILVER_PRODUCT_INTRODUCTION_ID: indicators.SILVER.PRODUCT_INTRODUCTION.id,
        [INDICATORS.SILVER_SYMBOL]: indicators.SILVER.PRODUCT_INTRODUCTION.symbol,
        [INDICATORS.SILVER_GOAL]: indicators.SILVER.PRODUCT_INTRODUCTION.goal,
        [INDICATORS.SILVER_WEIGHT]: indicators.SILVER.PRODUCT_INTRODUCTION.weight,

        BRONZE_PRODUCT_INTRODUCTION_ID: indicators.BRONZE.PRODUCT_INTRODUCTION.id,
        [INDICATORS.BRONZE_SYMBOL]: indicators.BRONZE.PRODUCT_INTRODUCTION.symbol,
        [INDICATORS.BRONZE_GOAL]: indicators.BRONZE.PRODUCT_INTRODUCTION.goal,
        [INDICATORS.BRONZE_WEIGHT]: indicators.BRONZE.PRODUCT_INTRODUCTION.weight
      },
      {
        BRONZE_ID: indicators.BRONZE.id,
        description: indicators.DIAMOND.PAYMENT_TERMS.description,

        DIAMOND_PAYMENT_TERMS_ID: indicators.DIAMOND.PAYMENT_TERMS.id,
        [INDICATORS.DIAMOND_SYMBOL]: indicators.DIAMOND.PAYMENT_TERMS.symbol,
        [INDICATORS.DIAMOND_GOAL]: indicators.DIAMOND.PAYMENT_TERMS.goal,
        [INDICATORS.DIAMOND_WEIGHT]: indicators.DIAMOND.PAYMENT_TERMS.weight,

        GOLD_PAYMENT_TERMS_ID: indicators.GOLD.PAYMENT_TERMS.id,
        [INDICATORS.GOLD_SYMBOL]: indicators.GOLD.PAYMENT_TERMS.symbol,
        [INDICATORS.GOLD_GOAL]: indicators.GOLD.PAYMENT_TERMS.goal,
        [INDICATORS.GOLD_WEIGHT]: indicators.GOLD.PAYMENT_TERMS.weight,

        SILVER_PAYMENT_TERMS_ID: indicators.SILVER.PAYMENT_TERMS.id,
        [INDICATORS.SILVER_SYMBOL]: indicators.SILVER.PAYMENT_TERMS.symbol,
        [INDICATORS.SILVER_GOAL]: indicators.SILVER.PAYMENT_TERMS.goal,
        [INDICATORS.SILVER_WEIGHT]: indicators.SILVER.PAYMENT_TERMS.weight,

        BRONZE_PAYMENT_TERMS_ID: indicators.BRONZE.PAYMENT_TERMS.id,
        [INDICATORS.BRONZE_SYMBOL]: indicators.BRONZE.PAYMENT_TERMS.symbol,
        [INDICATORS.BRONZE_GOAL]: indicators.BRONZE.PAYMENT_TERMS.goal,
        [INDICATORS.BRONZE_WEIGHT]: indicators.BRONZE.PAYMENT_TERMS.weight
      }
    ]
  )
}

export const mountPutPayload = (data) => {
  const [growthColumn, devolutionColumn, productIntroductionColumn, paymentTermsColumn] = data
  const { DIAMOND_ID } = growthColumn
  const { GOLD_ID } = devolutionColumn
  const { SILVER_ID } = productIntroductionColumn
  const { BRONZE_ID } = paymentTermsColumn

  return {
    indicators: {
      DIAMOND: {
        id: DIAMOND_ID,
        GROWTH: {
          id: growthColumn.DIAMOND_GROWTH_ID,
          symbol: growthColumn.DIAMOND_SYMBOL,
          goal: growthColumn.DIAMOND_GOAL,
          weight: growthColumn.DIAMOND_WEIGHT
        },
        DEVOLUTION: {
          id: devolutionColumn.DIAMOND_DEVOLUTION_ID,
          symbol: devolutionColumn.DIAMOND_SYMBOL,
          goal: devolutionColumn.DIAMOND_GOAL,
          weight: devolutionColumn.DIAMOND_WEIGHT
        },
        PRODUCT_INTRODUCTION: {
          id: productIntroductionColumn.DIAMOND_PRODUCT_INTRODUCTION_ID,
          symbol: productIntroductionColumn.DIAMOND_SYMBOL,
          goal: productIntroductionColumn.DIAMOND_GOAL,
          weight: productIntroductionColumn.DIAMOND_WEIGHT
        },
        PAYMENT_TERMS: {
          id: paymentTermsColumn.DIAMOND_PAYMENT_TERMS_ID,
          symbol: paymentTermsColumn.DIAMOND_SYMBOL,
          goal: paymentTermsColumn.DIAMOND_GOAL,
          weight: paymentTermsColumn.DIAMOND_WEIGHT
        }
      },
      GOLD: {
        id: GOLD_ID,
        GROWTH: {
          id: growthColumn.GOLD_GROWTH_ID,
          symbol: growthColumn.GOLD_SYMBOL,
          goal: growthColumn.GOLD_GOAL,
          weight: growthColumn.GOLD_WEIGHT
        },
        DEVOLUTION: {
          id: devolutionColumn.GOLD_DEVOLUTION_ID,
          symbol: devolutionColumn.GOLD_SYMBOL,
          goal: devolutionColumn.GOLD_GOAL,
          weight: devolutionColumn.GOLD_WEIGHT
        },
        PRODUCT_INTRODUCTION: {
          id: productIntroductionColumn.GOLD_PRODUCT_INTRODUCTION_ID,
          symbol: productIntroductionColumn.GOLD_SYMBOL,
          goal: productIntroductionColumn.GOLD_GOAL,
          weight: productIntroductionColumn.GOLD_WEIGHT
        },
        PAYMENT_TERMS: {
          id: paymentTermsColumn.GOLD_PAYMENT_TERMS_ID,
          symbol: paymentTermsColumn.GOLD_SYMBOL,
          goal: paymentTermsColumn.GOLD_GOAL,
          weight: paymentTermsColumn.GOLD_WEIGHT
        }
      },
      SILVER: {
        id: SILVER_ID,
        GROWTH: {
          id: growthColumn.SILVER_GROWTH_ID,
          symbol: growthColumn.SILVER_SYMBOL,
          goal: growthColumn.SILVER_GOAL,
          weight: growthColumn.SILVER_WEIGHT
        },
        DEVOLUTION: {
          id: devolutionColumn.SILVER_DEVOLUTION_ID,
          symbol: devolutionColumn.SILVER_SYMBOL,
          goal: devolutionColumn.SILVER_GOAL,
          weight: devolutionColumn.SILVER_WEIGHT
        },
        PRODUCT_INTRODUCTION: {
          id: productIntroductionColumn.SILVER_PRODUCT_INTRODUCTION_ID,
          symbol: productIntroductionColumn.SILVER_SYMBOL,
          goal: productIntroductionColumn.SILVER_GOAL,
          weight: productIntroductionColumn.SILVER_WEIGHT
        },
        PAYMENT_TERMS: {
          id: paymentTermsColumn.SILVER_PAYMENT_TERMS_ID,
          symbol: paymentTermsColumn.SILVER_SYMBOL,
          goal: paymentTermsColumn.SILVER_GOAL,
          weight: paymentTermsColumn.SILVER_WEIGHT
        }
      },
      BRONZE: {
        id: BRONZE_ID,
        GROWTH: {
          id: growthColumn.BRONZE_GROWTH_ID,
          symbol: growthColumn.BRONZE_SYMBOL,
          goal: growthColumn.BRONZE_GOAL,
          weight: growthColumn.BRONZE_WEIGHT
        },
        DEVOLUTION: {
          id: devolutionColumn.BRONZE_DEVOLUTION_ID,
          symbol: devolutionColumn.BRONZE_SYMBOL,
          goal: devolutionColumn.BRONZE_GOAL,
          weight: devolutionColumn.BRONZE_WEIGHT
        },
        PRODUCT_INTRODUCTION: {
          id: productIntroductionColumn.BRONZE_PRODUCT_INTRODUCTION_ID,
          symbol: productIntroductionColumn.BRONZE_SYMBOL,
          goal: productIntroductionColumn.BRONZE_GOAL,
          weight: productIntroductionColumn.BRONZE_WEIGHT
        },
        PAYMENT_TERMS: {
          id: paymentTermsColumn.BRONZE_PAYMENT_TERMS_ID,
          symbol: paymentTermsColumn.BRONZE_SYMBOL,
          goal: paymentTermsColumn.BRONZE_GOAL,
          weight: paymentTermsColumn.BRONZE_WEIGHT
        }
      }
    }
  }
}

export const isAllowedValue = (value) => value >= 0 && value <= 100
