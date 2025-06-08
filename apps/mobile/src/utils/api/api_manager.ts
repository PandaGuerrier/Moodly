import axios from "axios";
import { getData } from "~/utils/store/storage";

export class ApiManager {
  private static instance: ApiManager;
  private readonly api: any;
  private headers: any;

  private constructor() {
    this.headers = {};
    console.log("API URL", process.env.EXPO_PUBLIC_API_URL);
    this.api = axios.create({
      baseURL: process.env.EXPO_PUBLIC_API_URL,
      timeout: 500000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...this.headers,
      },
    });
  }

  public setHeaders(headers: any) {
    this.headers = headers;
    this.api.defaults.headers = {
      ...this.api.defaults.headers,
      ...headers,
    };
  }

  public addHeader(key: string, value: string) {
    this.api.defaults.headers[key] = value;
    this.headers[key] = value;
  }

  public setAuthorization(token: string) {
    this.api.defaults.headers.Authorization = `Bearer ${token}`;
    console.log("Setting Authorization header:", this.api.defaults.headers.Authorization);
  }

  public removeAuthorization() {
    delete this.api.defaults.headers.Authorization;
    delete this.headers.Authorization;
  }

  public setBaseURL(url: string) {
    this.api.defaults.baseURL = url;
  }

  public async get(url: string, params?: any) {
    try {
      return await this.api.get(url, {
        params: params,
      });
    } catch (error) {
      console.error("GET ERROR", url, error);
      throw error; // Re-throw the error for handling by the caller
    }
  }

  private async checkAuthorization(): Promise<boolean> {
    if (!this.api.defaults.headers.Authorization) {
      const storedToken = await getData("token");
      console.log("Stored token:", storedToken);
      if (storedToken) {
        this.setAuthorization(`${storedToken.token}`);
      }
    }

    return !!this.api.defaults.headers.Authorization;
  }

  public async post(url: string, data: any, headers = {}, bypassAuth: boolean = false) {
    if (bypassAuth) {
      console.log("Bypassing authorization for POST request:", url);
      return await this.api.post(url, data);
    }

    const isAuthorized = await this.checkAuthorization();
    if (!isAuthorized) {
      throw new Error("Authorization header is missing.");
    }

    try {
      return await this.api.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          ...this.headers,
          ...headers,
        },
      });
    } catch (error) {
      console.log("POST ERROR", url, error);
      return error;
    }
  }


  public async postFormData(url: string, formData: FormData, headers = {}) {
    const isAuthorized = await this.checkAuthorization();
    if (!isAuthorized) {
      throw new Error("Authorization header is missing.");
    }

    console.log("POST FORM DATA", url, formData);

    try {
      return await this.api.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...this.headers,
          ...headers,
        },
      });
    } catch (error) {
      console.error("POST FORM DATA ERROR", url, error);
      throw error; // Re-throw the error for handling by the caller
    }
  }

  public async put(url: string, data: any) {
    const isAuthorized = await this.checkAuthorization();
    if (!isAuthorized) {
      throw new Error("Authorization header is missing.");
    }

    return this.api.put(url, data);
  }

  public async delete(url: string) {
    const isAuthorized = await this.checkAuthorization();
    if (!isAuthorized) {
      throw new Error("Authorization header is missing.");
    }

    return this.api.delete(url);
  }

  public async patch(url: string, data: any) {
    const isAuthorized = await this.checkAuthorization();
    if (!isAuthorized) {
      throw new Error("Authorization header is missing.");
    }

    return this.api.patch(url, data);
  }

  public static getInstance(): ApiManager {
    if (!ApiManager.instance) {
      ApiManager.instance = new ApiManager();
    }
    return ApiManager.instance;
  }

  public getApi() {
    return this.api;
  }
}
