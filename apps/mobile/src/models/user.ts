import Child from "./child";
import { getData, storeData } from "~/utils/store/storage";
import { ApiManager } from "~/utils/api/api_manager";

export default class User {
  id: number;
  email: string;
  fullName: string;
  appleIdToken: string;
  appleAuthorizationCode: string;
  appleUser: string;
  childs: Child[];
  selectedChild?: Child | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  private static instance: User | null;

  constructor(user: Partial<User>) {
    this.id = user.id || 0; // Default to 0 if not provided
    this.email = user.email || "";
    this.fullName = user.fullName || "";
    this.appleIdToken = user.appleIdToken || "";
    this.appleAuthorizationCode = user.appleAuthorizationCode || "";
    this.appleUser = user.appleUser || "";
    this.childs = user.childs || [];
    this.selectedChild = null; // Initialize selectedChild as null
    this.createdAt = user.createdAt ? new Date(user.createdAt) : new Date(); // Default to current date if not provided
    this.updatedAt = user.updatedAt ? new Date(user.updatedAt) : new Date(); // Default to current date if not provided
    this.deletedAt = user.deletedAt || null;
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
      console.error(
        "Failed to fetch user data:",
        response.status,
        response.data,
      );
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
    console.log("Child:", child.nickname);
    const response = await ApiManager.getInstance().post("/child", {
      birthDate: child.birthDate.toISOString(),
      nickname: child.nickname,
      avatar: child.avatar || "sanglier",
    });
    console.log("Response from server:", response);

    if (response.status !== 200) {
      throw new Error("Failed to add child");
    }

    console.log("Child added successfully:", response.data);

    const realChild = Child.fromJSON(response.data.child);
    this.childs.push(realChild);

    await this.save();
  }

  static fromJSON(json: any): User {
    return new User({
      id: json.id,
      email: json.email,
      fullName: json.fullName,
      appleIdToken: json.appleIdToken,
      appleAuthorizationCode: json.appleAuthorizationCode,
      appleUser: json.appleUser,
      childs: json.childs
        ? json.childs.map((child: any) => Child.fromJSON(child))
        : [],
      createdAt: new Date(json.createdAt),
      updatedAt: new Date(json.updatedAt),
      deletedAt: json.deletedAt ? new Date(json.deletedAt) : null,
    });
  }
}
