import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

/**
 * アプリケーションのエントリーポイント
 * React 18のcreateRootを用いて、'root'のDOMノードに<App />をマウントします。
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
