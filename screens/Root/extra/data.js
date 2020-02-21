export class Message {
  constructor(text, date, isRead, profile) {
      this.text = text;
      this.date = date;
      this.isRead = isRead;
      this.profile = profile;
  }

  get formattedText() {
    const isLong = this.text.length > 36;
    return isLong ? `${this.text.substring(0, 32)}...` : this.text;
  }

  static howAreYou() {
    return new Message(
      "Hey! How are you?",
      "4:30 PM",
      false,
      Profile.dushaneDaniel()
    );
  }

  static canYouSend() {
    return new Message(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      "4:12 PM",
      true,
      Profile.shiraiSubaru()
    );
  }

  static noProblem() {
    return new Message(
      "No problem! It's fine",
      "12:00 PM",
      true,
      Profile.kariGranleese()
    );
  }
}

export class Profile {
  constructor(firstName, lastName, photo) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.photo = photo;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  static dushaneDaniel() {
    return new Profile(
      "Dushane",
      "Daniel",
      require("../assets/image-profile-1.jpg")
    );
  }

  static shiraiSubaru() {
    return new Profile(
      "Shirai",
      "Subaru",
      require("../assets/image-profile-2.jpg")
    );
  }

  static kariGranleese() {
    return new Profile(
      "Kari",
      "Granleese",
      require("../assets/image-profile-3.jpg")
    );
  }
}
