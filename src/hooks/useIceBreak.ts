import { useState } from 'react'
import { initialTopics, initialParticipants } from '../data/topics'

/**
 * 配列の要素をランダムに並び替える（シャッフルする）
 * @param {string[]} arr - シャッフルする元の文字列配列
 * @returns {string[]} シャッフルされた新しい配列
 */
const shuffle = (arr: string[]): string[] => {
  const array = [...arr]
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

/**
 * アイスブレイクの状態管理と抽選ロジックを提供するカスタムフック
 * @returns {{
 *   currentTopic: string,
 *   participants: string[],
 *   run: () => void
 * }} 状態と実行アクションを含むオブジェクト
 */
export const useIceBreak = () => {
  /**
   * @type {[string[], React.Dispatch<React.SetStateAction<string[]>>]} まだ選ばれていないお題のリストとその更新関数
   */
  const [availableTopics, setAvailableTopics] = useState<string[]>([...initialTopics])

  /**
   * @type {[string, React.Dispatch<React.SetStateAction<string>>]} 現在画面に表示しているお題とその更新関数
   */
  const [currentTopic, setCurrentTopic] = useState<string>('お題がここに表示されます')

  /**
   * @type {[string[], React.Dispatch<React.SetStateAction<string[]>>]} シャッフルされた参加者のリストとその更新関数
   */
  const [participants, setParticipants] = useState<string[]>([])

  /**
   * お題の抽選と、参加者の順番シャッフルを実行する
   * @returns {void}
   */
  const run = (): void => {
    let topicsPool = [...availableTopics]
    
    // まだ表示していないお題がなくなったら、リストをリセット
    if (topicsPool.length === 0) {
      topicsPool = [...initialTopics]
    }

    // ランダムにお題を選択
    const randomIndex = Math.floor(Math.random() * topicsPool.length)
    const topic = topicsPool[randomIndex]
    
    // 選択したお題をリストから削除して更新
    topicsPool.splice(randomIndex, 1)
    setAvailableTopics(topicsPool)
    setCurrentTopic(topic)

    // 参加者をシャッフルして更新
    const shuffled = shuffle([...initialParticipants])
    setParticipants(shuffled)
  }

  return {
    currentTopic,
    participants,
    run
  }
}
