import {BACKEND_IP} from "../constants";

const USE_MOCK = false;
const BASE_URL = `${BACKEND_IP}:80`;

// Вспомогательная функция для запросов
async function request(endpoint, url) {
    if (USE_MOCK) {
        return mockRequest(endpoint, url);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(url),
    });


    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Ошибка сервера: ${response.status}`);
    }

    return await response.json();
}

// --- Имитация бэкенда (Mock) ---
function mockRequest(endpoint, body) {
    console.log(`[MOCK API] POST ${endpoint}`, body);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Эндпоинт 1: Анализ
            if (endpoint === "/api/analyze") {
                resolve({
                    m1: 85,
                    m2: 70,
                    m3: 40,
                    m4: 10,
                });
            }
            // Эндпоинт 2: Обновление
            else if (endpoint === "/api/update") {
                resolve({
                    // Возвращаем строки HTML, чтобы CodeViewer мог их показать
                    head: '<meta name="description" content="Optimized for LLM">\n<title>Super Fast Site</title>',
                    body: '<main>\n  <h1>Optimized Header</h1>\n  <p>Content ready for AI indexing.</p>\n</main>',
                });
            } else {
                reject(new Error("Endpoint not found"));
            }
        }, 3000); // Задержка 3 сек
    });
}

// ==========================================
// Экспортируемые методы
// ==========================================

export const analyzeSite = (url) => request("/api/analyze", {url});

export const updateSite = (url) => request("/api/update", {url});