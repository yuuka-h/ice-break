import { BackgroundElementGroup } from '../classes/BackgroundElementGroup'

/**
 * 月ごとの背景テーマと、使用する要素グループのオブジェクト定義
 * @type {Record<number, { theme: string, elements: BackgroundElementGroup[] }>}
 */
export const MONTHLY_CONFIGS: Record<number, { theme: string, elements: BackgroundElementGroup[] }> = {
  1: {
    theme: 'january',
    elements: [
      new BackgroundElementGroup('snowflake', '❄️', 20),
      new BackgroundElementGroup('snowflake', '🌅', 3)
    ]
  },
  2: {
    theme: 'february',
    elements: [
      new BackgroundElementGroup('heart', '❤️', 15),
      new BackgroundElementGroup('heart', '💕', 10)
    ]
  },
  3: {
    theme: 'march',
    elements: [
      new BackgroundElementGroup('cherry-blossom', '🌸', 25)
    ]
  },
  4: {
    theme: 'april',
    elements: [
      new BackgroundElementGroup('cherry-blossom', '🌸', 25),
      new BackgroundElementGroup('cherry-blossom', '🌿', 10)
    ]
  },
  5: {
    theme: 'may',
    elements: [
      new BackgroundElementGroup('leaf', '🍃', 20),
      new BackgroundElementGroup('leaf', '🌿', 15)
    ]
  },
  6: {
    theme: 'june',
    elements: [
      // 雨粒はインターバルを指定し、位置やアニメーション時間を短く調整
      new BackgroundElementGroup('raindrop', '', 80, { 
        positionY: 'top', minY: -30, maxY: -30, 
        minDuration: 0.4, maxDuration: 1.2, maxDelay: 1, 
        interval: 2000 
      }),
      new BackgroundElementGroup('hydrangea', '🌺', 8)
    ]
  },
  7: {
    theme: 'july',
    elements: [
      new BackgroundElementGroup('star', '⭐', 30),
      new BackgroundElementGroup('star', '✨', 20)
    ]
  },
  8: {
    theme: 'august',
    elements: [
      new BackgroundElementGroup('cloud', '☁️', 5, { minY: 5, maxY: 35, fixedLeft: '-100px', maxDelay: 5, minDuration: 15, maxDuration: 25 }),
      new BackgroundElementGroup('wave', '🌊', 8, { positionY: 'bottom', minY: 5, maxY: 25, minDuration: 3, maxDuration: 5 }),
      new BackgroundElementGroup('float-item', ['🛟', '🏖️', '🌴', '⛱️', '🐚', '🦀', '🏝️'], 12, { positionY: 'bottom', minY: 10, maxY: 50, maxDelay: 3, minDuration: 4, maxDuration: 6 }),
      new BackgroundElementGroup('beach-item', ['🌴', '🏖️', '⛱️', '🏝️'], 6, { minY: 2, maxY: 17, minDuration: 3, maxDuration: 5 })
    ]
  },
  9: {
    theme: 'september',
    elements: [
      new BackgroundElementGroup('maple-leaf', '🍁', 20),
      new BackgroundElementGroup('maple-leaf', '🌙', 3)
    ]
  },
  10: {
    theme: 'october',
    elements: [
      new BackgroundElementGroup('pumpkin', '🎃', 10),
      new BackgroundElementGroup('ghost', '👻', 8),
      new BackgroundElementGroup('star', '⭐', 5)
    ]
  },
  11: {
    theme: 'november',
    elements: [
      new BackgroundElementGroup('maple-leaf', '🍁', 25),
      new BackgroundElementGroup('maple-leaf', '🍂', 15)
    ]
  },
  12: {
    theme: 'december',
    elements: [
      new BackgroundElementGroup('snowflake', '❄️', 30),
      new BackgroundElementGroup('star', '⭐', 20),
      new BackgroundElementGroup('star', '✨', 15),
      new BackgroundElementGroup('ornament', '🎄', 3),
      new BackgroundElementGroup('ornament', '🎁', 5)
    ]
  }
}
