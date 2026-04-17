import './App.css'
import { useBackgroundAnimation } from './hooks/useBackgroundAnimation'
import { useIceBreak } from './hooks/useIceBreak'

/**
 * アイスブレイクお題メーカーのメインビューコンポーネント
 * 
 * 全体のレイアウト（背景、タイトル、ボタン、お題、リスト）を描画します。
 * 月ごとの背景アニメーションのロジックや、お題の抽選ロジックは
 * カスタムフックによって分離されています。
 * 
 * @returns {JSX.Element} アプリケーションのメインJSX要素
 */
import React from 'react'

function App(): React.JSX.Element {
  // 背景アニメーションの初期化・管理を外部化
  useBackgroundAnimation('backgroundAnimation')

  // アイスブレイクの抽選・状態管理を外部化
  const { currentTopic, participants, run } = useIceBreak()

  return (
    <>
      {/* アニメーション要素が追加されるコンテナ */}
      <div className="background-animation" id="backgroundAnimation"></div>
      
      <h1>🎲 アイスブレイク：お題 & 順番</h1>
      
      {/* お題と順番を更新するボタン */}
      <button onClick={run}>スタート！</button>
      
      {/* 選ばれたお題の表示エリア */}
      <p id="topic">🎤 お題：「{currentTopic}」</p>
      
      {/* 参加者のシャッフルされた順番リスト */}
      <ul id="order">
        {participants.map((name, idx) => (
          <li key={idx}>#{idx + 1}：{name}</li>
        ))}
      </ul>
    </>
  )
}

export default App
