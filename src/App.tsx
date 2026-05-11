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
  const { currentTopic, participants, selectedTeam, run } = useIceBreak()

  return (
    <>
      {/* アニメーション要素が追加されるコンテナ */}
      <div className="background-animation" id="backgroundAnimation"></div>

      <h1>🎲 アイスブレイク：お題 & 順番</h1>

      <div className="controls">
        {/* チーム選択 */}
        <div className="team-selector">
          <p className="label">チームを選択：</p>
          <div className="button-group">
            <button
              className={selectedTeam === '合同' ? 'active' : ''} 
              onClick={() => run('合同')}
            >
              合同
            </button>
            <button
              className={selectedTeam === '法人チーム' ? 'active' : ''} 
              onClick={() => run('法人チーム')}
            >
              法人チーム
            </button>
            <button 
              className={selectedTeam === 'BanQチーム' ? 'active' : ''} 
              onClick={() => run('BanQチーム')}
            >
              BanQチーム
            </button>
          </div>
        </div>

        {/* シャッフルボタン（チームが選ばれている場合のみ強調） */}
        {selectedTeam && (
          <button className="shuffle-button" onClick={() => run(selectedTeam)}>
            次のお題 ＆ 順番をシャッフル！
          </button>
        )}
      </div>

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
