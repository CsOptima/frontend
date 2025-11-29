import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/templates/MainLayout';
import { Header } from './components/organisms/Header';
import { Footer } from './components/organisms/Footer';
import { HomePage } from './pages/HomePage';
import { AnalysisProvider } from './context/AnalysisContext'; // <--- Импорт

function App() {
  return (
    <AnalysisProvider> {/* <--- Обертка */}
      <MainLayout>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        
        {/* Добавляем ID для скролла */}
        <div id="contacts">
          <Footer />
        </div>
        
      </MainLayout>
    </AnalysisProvider>
  );
}

export default App;