import { useEffect } from 'react'
import { MONTHLY_CONFIGS } from '../config/backgroundConfigs'

/**
 * 現在の月に応じた背景アニメーションを管理するカスタムフック
 * 
 * 指定されたコンテナに対して、事前定義されたBackgroundElementGroupクラスを用いて
 * 要素（絵文字等のエレメント）を配置・描画します。
 * 
 * @param {string} containerId - アニメーション用の要素を描画するコンテナのDOM ID
 * @returns {void}
 */
export const useBackgroundAnimation = (containerId: string): void => {
  useEffect(() => {
    const month = new Date().getMonth() + 1 // 1-12
    const body = document.body
    const animationContainer = document.getElementById(containerId)
    
    if (!animationContainer) return

    // コンテナ内の以前のアニメーション要素とクラスをリセット
    animationContainer.innerHTML = ''
    body.className = ''
    
    // インターバルIDの管理リスト
    const intervalIds: number[] = []
    const registerInterval = (id: number): void => {
      intervalIds.push(id)
    }

    // 月に合致する設定オブジェクトを取得
    const config = MONTHLY_CONFIGS[month]

    if (config) {
      // Bodyに対応するテーマクラスを追加
      body.classList.add(config.theme)
      
      // 各要素のグループを画面に描画・アニメーション実行
      config.elements.forEach(group => group.render(animationContainer, registerInterval))
    }

    // アンマウント時(またはコンテナや月が変わった時)にインターバルをすべてクリア
    return () => {
      intervalIds.forEach(id => window.clearInterval(id))
    }
  }, [containerId])
}
