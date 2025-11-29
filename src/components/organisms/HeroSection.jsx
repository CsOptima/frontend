import React, { useState, useEffect } from "react";
import { SearchInput } from "../molecules/SearchInput";
import { ResultsDashboard } from "./ResultsDashboard";
import { ImprovementSection } from "./ImprovementSection";
import { useAnalyze } from "../../hooks/useAnalyze";
import { AdvancedFeaturesSection } from "./AdvancedFeaturesSection";
import { useAnalysis } from "../../context/AnalysisContext";
import { LOADING_PHRASES } from "../../constants";
import { Header } from "./Header";

export const HeroSection = () => {
  const [url, setUrl] = useState("");
  const [validationError, setValidationError] = useState("");

  const { analyze, isLoading, metrics, error: apiError } = useAnalyze();

  const { setIsNavVisible } = useAnalysis();

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isPhraseVisible, setIsPhraseVisible] = useState(true);

  const showDashboard = !isLoading && metrics;

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setIsPhraseVisible(false);
        setTimeout(() => {
          setPhraseIndex((prev) => (prev + 1) % LOADING_PHRASES.length);
          setIsPhraseVisible(true);
        }, 500);
      }, 3000);
    } else {
      setPhraseIndex(0);
      setIsPhraseVisible(true);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      const pattern =
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      return pattern.test(string);
    }
  };

  const handleSubmit = async () => {
    setValidationError("");
    if (!url.trim()) {
      setValidationError("Пожалуйста, введите URL");
      return;
    }
    if (!isValidUrl(url)) {
      setValidationError("Некорректный формат ссылки");
      return;
    }
    await analyze(url);
    setIsNavVisible(true);
  };

  const displayError = validationError || apiError;

  return (
    <div>
      {metrics && <Header />}
      <section
        className="relative flex flex-col items-center w-full min-h-screen px-4 pt-[35vh] justify-start pb-20"
      >
        {/* Заголовок */}
        <h1 className="text-4xl md:text-5xl lg:text-[56px] font-medium text-center mb-16 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9BA1EF] via-[#FADAE0] to-[#B8BFF5] animate-gradient-x">
            Переводчик вашего сайта на LLM-язык
          </span>
        </h1>

        {/* Контейнер инпута */}
        <div className="w-full flex flex-col items-center relative z-10">
          <SearchInput
            value={url}
            onChange={(val) => {
              setUrl(val);
              if (validationError) setValidationError("");
            }}
            onSubmit={handleSubmit}
            error={displayError}
          />

          {/* Текст загрузки (визуально под инпутом, но не сдвигает верстку) */}
          {isLoading && (
            <div className="absolute top-full mt-12 w-full flex justify-center pointer-events-none">
              <p
                className={`
                text-gray-300 text-lg font-light text-center
                transition-all duration-500 ease-in-out transform
                ${
                  isPhraseVisible
                    ? "opacity-100 blur-0 translate-y-0 scale-100"
                    : "opacity-0 blur-sm -translate-y-4 scale-95"
                }
              `}
              >
                {LOADING_PHRASES[phraseIndex]}
              </p>
            </div>
          )}
          {!isLoading && !metrics && (
            <div className="absolute top-full mt-12 w-full flex justify-center pointer-events-none">
              <p
                className="
                text-gray-300 text-lg font-light text-center
                transition-all duration-500 ease-in-out transform opacity-100 blur-0 translate-y-0 scale-100
              "
              >
                Проверьте авторитет вашего сайта для ИИ
              </p>
            </div>
          )}
        </div>

        {/* 
          Блок результатов. 
          mt-32 создает отступ от инпута.
          Поскольку мы используем pt-[35vh] для верха, добавление этого блока 
          просто удлинит страницу вниз, но НЕ сдвинет верхнюю часть.
      */}
        {!isLoading && metrics && (
          <div
            id="metrics"
            className="mt-32 w-full flex justify-center animate-[fadeIn_1s_ease-out]"
          >
            <ResultsDashboard metrics={metrics} />
          </div>
        )}

        {showDashboard && <ImprovementSection initialUrl={url} />}

        {showDashboard && <AdvancedFeaturesSection />}
      </section>
    </div>
  );
};
