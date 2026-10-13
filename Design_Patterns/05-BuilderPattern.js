class UserBuilder {
  constructor() {
    this.name = "";
    this.email = "";
    this.bio = "";
    this.skills = [];
    this.theme = "light";
  }

  setName(val) {
    this.name = val;
    return this;
  }
  setEmail(val) {
    this.email = val;
    return this;
  }
  setBio(val) {
    this.bio = val;
    return this;
  }
  setSkills(val) {
    this.skills.push(...val);
    return this;
  }
  setTheme(val) {
    this.theme = val;
    return this;
  }
  build(){
   return {
    name: this.name,
    email: this.email,
    bio: this.bio,
    skills: [...this.skills],
    themes: this.theme
   }
  }
}
const user = new UserBuilder()
    .setName("Ashish")
    .setEmail("ashish@example.com")
    .setBio("Frontend Developer")
    .setSkills(["React", "TypeScript"])
    .setTheme("dark")
    .build();

console.log(user);
