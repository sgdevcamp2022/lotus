import React, { FC } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import loadable from '@loadable/component';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
const MainPage = loadable(() => import('@layouts/MainPage'));
const Login = loadable(() => import('@pages/Login'));
const Signup = loadable(() => import('@pages/Signup'));
const Board = loadable(() => import('@pages/Board'));
const PartyPage = loadable(() => import('@pages/PartyPage'));
const Home = loadable(() => import('@pages/Home'));
const Notice = loadable(() => import('@pages/Notice'));
const PostLists = loadable(() => import('@pages/PostLists'));
const PostWrite = loadable(() => import('@pages/PostWrite'));
const Auth = loadable(() => import('@pages/Auth'));
const My = loadable(() => import('@pages/My'));
const Post = loadable(() => import('@components/Post'));
const CharacterSelect = loadable(() => import('@components/CharacterSelect'));
const PostEdit = loadable(() => import('@pages/PostEdit'));
const Channels = loadable(() => import('@pages/Channels'));

TimeAgo.addDefaultLocale(en);

const App: FC = () => {
  return (
    <BrowserRouter>
      <CookiesProvider>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route element={<MainPage />}>
            <Route path={'channels'} element={<Channels />}>
              <Route path={':url'}>
                <Route path={'parties'} element={<PartyPage />} />
              </Route>
            </Route>
            <Route path={'select'} element={<CharacterSelect />} />
            <Route path={'notice'} element={<Notice />} />
            <Route path={'board'} element={<Board />}>
              <Route path={'lists'} element={<PostLists />} />
              <Route path={'write'} element={<PostWrite />} />
              <Route path={':id'} element={<Post />} />
              <Route path={'edit'}>
                <Route path={':id'} element={<PostEdit />} />
              </Route>
            </Route>
            <Route path={'auth'} element={<Auth />} />
            <Route path={'my'} element={<My />} />
            <Route path={'/'} element={<Home />} />
          </Route>
          <Route path="*" element={<Navigate to={'/'} replace />} />
        </Routes>
      </CookiesProvider>
    </BrowserRouter>
  );
};

export default App;
