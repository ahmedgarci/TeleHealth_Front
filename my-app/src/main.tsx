import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Provider} from "react-redux";
import App from './App.tsx'
import { store } from './Store/Store.ts';
import 'leaflet/dist/leaflet.css';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { MessagesProvider } from './Hooks/useMessagesContext.tsx';
const client = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={client}>
      <MessagesProvider>
    <App />
    </MessagesProvider>
    </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
