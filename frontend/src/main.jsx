import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss'
import App from './App.jsx'
// Context Providers
import { AuthProvider } from "./contexts/AuthContext";
import { PostsProvider } from "./contexts/PostsContext";
import { FriendsProvider } from "./contexts/FriendsContext";
import { SearchProvider } from "./contexts/SearchContext";
import { WebSocketProvider } from "./contexts/WebSocketContext";
import { MessageProvider } from "./contexts/MessageContext";
import { NotificationProvider } from "./contexts/NotificationContext";

createRoot(document.getElementById('root')).render(
   <StrictMode>
    <AuthProvider>           {/* Must be first - provides token */}
      <WebSocketProvider>    {/* Needs token, provides WS connection */}
        <NotificationProvider> {/* Uses WebSocket */}
          <PostsProvider>
            <FriendsProvider>  {/* Uses WebSocket */}
              <MessageProvider> {/* Uses WebSocket */}
                <SearchProvider>
                  <App />
                </SearchProvider>
              </MessageProvider>
            </FriendsProvider>
          </PostsProvider>
        </NotificationProvider>
      </WebSocketProvider>
    </AuthProvider>
  </StrictMode>,
)
