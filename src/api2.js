const BASE_URL = "http://localhost:3000";
export async function request(path, options = {}) {
    const controller = new AbortController();
    let timerId;
    let response;
    try {
        const requestOptions = {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            },
            signal: controller.signal
        };
        timerId = setTimeout(() => {
            controller.abort();
        }, 8000);
        response = await fetch(`${BASE_URL}${path}`, requestOptions);
        if (!response.ok) {
            const erreur = {
                type: "http",
                status: response.status,
                message: "Erreur serveur"
            }
            throw erreur;
        }
        else if (response.status === 204) {
            return null;
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        if (error.name === "AbortError") {
            const erreur = {
                type: "timeout",
                status: null,
                message: "La requête a expiré"
            };
            throw erreur;
        }
        else if (error.status) {
            throw error; 
        }
        else if (error instanceof TypeError) {
            const erreur = {
                type: "network",
                status: null,
                message: "Erreur de connexion au serveur"
            }
            throw erreur; 
        }
        else if (error.name === "SyntaxError") {
            const erreur = {
                type: "parse",
                status: response.status,
                message: "Impossible de lire les données reçues du serveur."
            }
            throw erreur;
        }
        else {
            throw error;
        }
    }
    finally {
        clearTimeout(timerId);
    }
}