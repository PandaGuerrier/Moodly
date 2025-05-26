import Child from "./child";
import { getData, storeData } from '~/utils/store/storage'
import { ApiManager } from '~/utils/api/api_manager'

export default class User {
  id: number;
  email: string;
  fullName: string;
  appleIdToken: string;
  appleAuthorizationCode: string;
  appleUser: string;
  childs: Child[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  private static instance: User | null;

  constructor(
    id: number,
    email: string,
    fullName: string,
    appleIdToken: string,
    appleAuthorizationCode: string,
    appleUser: string,
    childs: Child[],
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date | null,
  ) {
    this.id = id;
    this.email = email;
    this.fullName = fullName;
    this.appleIdToken = appleIdToken;
    this.appleAuthorizationCode = appleAuthorizationCode;
    this.appleUser = appleUser;
    this.childs = childs;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt || null;
    User.instance = this; // Set the singleton instance
  }

  /// Returns the current user instance from local storage or fetches it from the server
  static async getCurrentUser(force: boolean = false): Promise<User | null> {
    console.log("Fetching current user...");
    if (force && User.instance) {
      User.instance = null; // Reset the instance if forced
    }

    if (User.instance) {
      return User.instance;
    }

    const token = await getData("token");

    if (!token) {
      console.log("No token found, user is not authenticated");
      return null;
    }

    console.log("Token found:", token);

    ApiManager.getInstance().setAuthorization(`${token.token}`);
    const response = await ApiManager.getInstance().get("/auth/me");
    console.log("Response from /auth/me:", response);

    if (response.status !== 200) {
      console.error("Failed to fetch user data:", response.status, response.data);
      return null;
    }
    console.log("User data1:", response.data);
    const { user } = response.data;
    await storeData("user", user);

    User.instance = User.fromJSON(user);
    return User.instance;
  }



  async logout(): Promise<void> {
    try {
      console.log("Logging out user", this.id);
      await storeData("user", null);
      await storeData("token", null);
      ApiManager.getInstance().removeAuthorization();
      User.instance = null; // Reset the singleton instance
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }

  }

  /// Updates the user data from the server and saves it to local storage
  async update() {
    const user = await User.getCurrentUser(true);
    if (!user) {
      throw new Error("User not found");
    }

    this.id = user.id;
    this.email = user.email;
    this.fullName = user.fullName;
    this.appleIdToken = user.appleIdToken;
    this.appleAuthorizationCode = user.appleAuthorizationCode;
    this.appleUser = user.appleUser;
    this.childs = user.childs.map((child: any) => Child.fromJSON(child));
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.deletedAt = user.deletedAt || null;

    await this.save();
    return this;
  }

  /// Saves the user data to local storage
  async save(): Promise<void> {
    await storeData("user", this);
  }

  async addChild(child: Child): Promise<void> {
    console.log("Adding child:", child);
    const response = await ApiManager.getInstance().post("/child",  {
      firstName: child.firstName,
      lastName: child.lastName,
      birthDate: child.birthDate.toISOString(),
      nickname: child.nickname || undefined,
    });
    console.log("Response from server:", response);

    if (response.status !== 200) {
      throw new Error("Failed to add child");
    }

    console.log("Child added successfully:", response.data);

    const realChild = Child.fromJSON(response.data.child);
    this.childs.push(realChild);

    await this.save()
  }

  static fromJSON(json: any): User {
    return new User(
      json.id,
      json.email,
      json.fullName,
      json.appleIdToken,
      json.appleAuthorizationCode,
      json.appleUser,
      json.childs.map((child: any) => Child.fromJSON(child)),
      new Date(json.createdAt),
      new Date(json.updatedAt),
      json.deletedAt ? new Date(json.deletedAt) : null,
    );
  }
}
