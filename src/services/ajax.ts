async function ajax<T>(url: string, requestMethod: string, requestBody?: unknown): Promise<T | string | undefined> {
    const fetchData: RequestInit = {
        headers: {
            "Content-Type": "application/json"
        },
        method: requestMethod
    };

    if (requestBody) {
        fetchData.body = JSON.stringify(requestBody);
    }

    const response = await fetch(url, fetchData);
    if (response.status === 200) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return response.json() as Promise<T>;
        } else {
            return response.text();
        }
    }

    return undefined;
}

export default ajax;