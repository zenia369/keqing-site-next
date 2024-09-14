export class ResponseError extends Error {}

class ApiClient {
  async get<ResponseType extends unknown>(url: string): Promise<ResponseType> {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new ResponseError(`Response error for url: ${url}`, {
          cause: {
            status: response.status,
            text: response.statusText,
            json: await response.json(),
          },
        });
      }

      const data: ResponseType = await response.json();

      return data;
    } catch (error) {
      throw new ResponseError(`Unknown response error for url: ${url}`, { cause: error });
    }
  }

  async patch<ResponseType extends unknown, RequestData extends object | string>(
    url: string,
    requestData: RequestData
  ): Promise<ResponseType> {
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new ResponseError(`Response error for url: ${url}`, {
          cause: {
            status: response.status,
            text: response.statusText,
            json: await response.json(),
          },
        });
      }

      const data: ResponseType = await response.json();

      return data;
    } catch (error) {
      throw new ResponseError(`Unknown response error for url: ${url}`, { cause: error });
    }
  }

  async post<ResponseType extends unknown, RequestData extends object | string>(
    url: string,
    requestData: RequestData
  ): Promise<ResponseType> {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new ResponseError(`Response error for url: ${url}`, {
          cause: {
            status: response.status,
            text: response.statusText,
            json: await response.json(),
          },
        });
      }

      const data: ResponseType = await response.json();

      return data;
    } catch (error) {
      throw new ResponseError(`Unknown response error for url: ${url}`, { cause: error });
    }
  }
}

export const apiClient = new ApiClient();
