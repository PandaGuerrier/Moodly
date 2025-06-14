export default class Child {
  id: number;
  birthDate: Date;
  nickname: string;
  avatar?: string;
  intelligence: number; // Optional intelligence property
  createdAt: Date;
  updatedAt: Date;

  constructor(child: Partial<Child>) {
    this.id = child.id || 0; // Default to 0 if not provided
    this.birthDate = child.birthDate ? new Date(child.birthDate) : new Date(); // Default to current date if not provided
    this.intelligence = child.intelligence || 0; // Initialize intelligence
    this.nickname = child.nickname || ''; // Default to empty string if not provided
    this.createdAt = child.createdAt ? new Date(child.createdAt) : new Date(); // Default to current date if not provided
    this.avatar = child.avatar || undefined; // Use avatarUrl if it exists, otherwise undefined
    this.updatedAt = child.updatedAt ? new Date(child.updatedAt) : new Date(); // Default to current date if not provided
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
    return new Child({
      id: json.id,
      birthDate: new Date(json.birthDate),
      age: json.age,
      nickname: json.nickname,
      avatar: json.avatar, // Assuming avatar is a string URL
      createdAt: new Date(json.createdAt),
      updatedAt: new Date(json.updatedAt),
      intelligence: json.intelligence || 0, // Default to 0 if not provided
    });
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
    return new Child({
      id: 0,
      nickname: nickname,
      birthDate: birthDate,
      avatar: avatar,
      intelligence: 0, // Default intelligence
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
