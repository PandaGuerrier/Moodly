export default class Child {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  nickname?: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    birthDate: Date,
    nickname: string | undefined,
    avatarUrl: string | undefined,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.nickname = nickname;
    this.createdAt = createdAt;
    this.avatarUrl = avatarUrl; // Initialize avatarUrl as undefined
    this.updatedAt = updatedAt;
  }

  get age(): number {
    const today = new Date();
    const birthDate = new Date(this.birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();

    // Vérifie si l'anniversaire de cette année est passé
    if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDay() < birthDate.getDay())) {
      age--;
    }

    if (age < 0) {
      age = 0; // Assure that age is not negative
    }

    return age;
  }

  static fromJSON(json: any): Child {
    return new Child(
      json.id,
      json.firstName,
      json.lastName,
      new Date(json.birthDate),
      json.nickname,
      json.avatarUrl || undefined, // Use avatarUrl if it exists, otherwise undefined
      new Date(json.createdAt),
      new Date(json.updatedAt),
    );
  }

  toJSON(): any {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate.toISOString(),
      age: this.age,
      nickname: this.nickname,
      createdAt: this.createdAt.toISOString() || null,
      updatedAt: this.updatedAt.toISOString() || null,
    };
  }

  static getEmpty(
    firstName: string,
    lastName: string,
    nickName: string,
    birthDate: Date,
  ): Child {
    return new Child(
      -1, // -1 indicates a new child that hasn't been saved yet
      firstName || "",
      lastName || "",
      birthDate || new Date(),
      nickName || undefined,
      undefined, // avatarUrl is not set for new children
      new Date(),
      new Date(),
    );
  }
}
