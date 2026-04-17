/**
 * 背景アニメーションの要素の配置や動きを定義するためのオプション
 */
export interface ElementOptions {
  /** Y軸の基準位置（デフォルトは 'top'） */
  positionY?: 'top' | 'bottom'
  /** Y軸の最小位置（% または px で指定、固定値の場合はminYとmaxYを同じにする） */
  minY?: number
  /** Y軸の最大位置 */
  maxY?: number
  /** アニメーション時間の最小値（秒） */
  minDuration?: number
  /** アニメーション時間の最大値（秒） */
  maxDuration?: number
  /** 遅延時間の最大値（秒） */
  maxDelay?: number
  /** X位置を固定する場合の値（例：'-100px'） */
  fixedLeft?: string
  /** 定期的に要素を再生成する場合のインターバル（ミリ秒） */
  interval?: number
}

/**
 * 背景の1要素グループの生成とライフサイクルを管理するクラス
 */
export class BackgroundElementGroup {
  className: string
  content: string | string[]
  count: number
  options: ElementOptions

  /**
   * @param {string} className - 付与するCSSクラス名
   * @param {string | string[]} content - 表示するテキストや絵文字（配列の場合はランダムに選択）
   * @param {number} count - 生成する要素の数
   * @param {ElementOptions} options - 配置やアニメーションのカスタムオプション
   */
  constructor(
    className: string,
    content: string | string[],
    count: number,
    options: ElementOptions = {}
  ) {
    this.className = className
    this.content = content
    this.count = count
    this.options = options
  }

  /**
   * 指定したコンテナに要素を描画し、必要に応じてインターバルを登録する
   * 
   * @param {HTMLElement} container - 追加先の親コンテナ
   * @param {(id: number) => void} registerInterval - クリーンアップ用にインターバルIDを登録する関数
   * @returns {void}
   */
  render(container: HTMLElement, registerInterval: (id: number) => void): void {
    const {
      positionY = 'top',
      minY = 0,
      maxY = 20,
      minDuration = 2,
      maxDuration = 5,
      maxDelay = 2,
      fixedLeft,
      interval
    } = this.options

    const createNodes = (): void => {
      for (let i = 0; i < this.count; i++) {
        // 通常の要素は200ms間連、雨のような大量の連続要素は30ms間隔で描画をスタートする
        const spawnDelay = interval ? i * 30 : i * 200

        setTimeout(() => {
          const element = document.createElement('div')
          element.className = this.className
          
          // コンテンツが配列の場合はランダムに抽出し、文字列の場合はそのまま使用する
          element.textContent = Array.isArray(this.content) 
            ? this.content[Math.floor(Math.random() * this.content.length)] 
            : this.content

          // X位置の決定
          if (fixedLeft !== undefined) {
            element.style.left = fixedLeft
          } else {
            element.style.left = Math.random() * 100 + '%'
          }
          
          // Y位置の決定（minとmaxが同じ場合はその値を使用、それ以外はランダム）
          const yValue = minY === maxY ? minY : Math.random() * (maxY - minY) + minY
          // マイナス値の場合はpxとして扱い、それ以外は%として扱う（雨粒などの画面外配置用）
          element.style[positionY] = yValue < 0 ? `${yValue}px` : `${yValue}%`
          
          element.style.animationDelay = Math.random() * maxDelay + 's'
          element.style.animationDuration = (Math.random() * (maxDuration - minDuration) + minDuration) + 's'
          
          container.appendChild(element)

          // インターバルで繰り返し生成される要素（例：雨粒）の場合、アニメーション終了後に要素を破棄する
          if (interval) {
            setTimeout(() => {
              if (element.parentNode) {
                element.parentNode.removeChild(element)
              }
            }, (parseFloat(element.style.animationDuration) * 1000) + 100)
          }

        }, spawnDelay)
      }
    }

    createNodes()

    // インターバル指定がある場合、定期的にcreateNodesを実行する
    if (interval) {
      const id = window.setInterval(createNodes, interval)
      registerInterval(id)
    }
  }
}
