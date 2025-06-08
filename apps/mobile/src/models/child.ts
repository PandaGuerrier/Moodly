export default class Child {
  id: number;
  birthDate: Date;
  nickname?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    birthDate: Date,
    nickname: string,
    avatar: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.birthDate = birthDate;
    this.nickname = nickname;
    this.createdAt = createdAt;
    this.avatar = avatar;
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
      new Date(json.birthDate),
      json.nickname,
      json.avatar, // Use avatarUrl if it exists, otherwise undefined
      new Date(json.createdAt),
      new Date(json.updatedAt),
    );
  }

  toJSON(): any {
    return {
      id: this.id,
      birthDate: this.birthDate.toISOString(),
      age: this.age,
      nickname: this.nickname,
      createdAt: this.createdAt.toISOString() || null,
      updatedAt: this.updatedAt.toISOString() || null,
    };
  }

  static getEmpty(
    nickname: string,
    birthDate: Date,
    avatar: string
  ): Child {
    return new Child(
      -1, // -1 indicates a new child that hasn't been saved yet
      birthDate,
      nickname,
      avatar,
      new Date(),
      new Date(),
    );
  }
}
