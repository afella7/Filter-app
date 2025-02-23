interface User {
  type: "user";
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: "admin";
  name: string;
  age: number;
  role: string;
}

type Person = User | Admin;

const persons: Person[] = [
  {
    type: "user",
    name: "Max Mustermann",
    age: 25,
    occupation: "Chimney sweep",
  },
  { type: "admin", name: "Jane Doe", age: 32, role: "Administrator" },
  { type: "user", name: "Kate Müller", age: 23, occupation: "Astronaut" },
  { type: "admin", name: "Bruce Willis", age: 64, role: "World saver" },
  { type: "user", name: "Wilson", age: 23, occupation: "Ball" },
  { type: "admin", name: "Agent Smith", age: 23, role: "Anti-virus engineer" },
];

function logPerson({ name, age, type, ...rest }: Person) {
  console.log(` - ${name}, ${age}, ${Object.values(rest)[0]}`);
}

function filterPersons<T extends Person>(
  persons: Person[],
  personType: T["type"],
  criteria: Partial<Omit<T, "type">>
): T[] {
  return persons.filter(
    (p): p is T =>
      p.type === personType &&
      Object.entries(criteria).every(
        ([key, value]) => (p as any)[key] === value
      )
  );
}

const usersOfAge23 = filterPersons(persons, "user", { age: 23 });
const adminsOfAge23 = filterPersons(persons, "admin", { age: 23 });

console.log("Users of age 23:");
usersOfAge23.forEach(logPerson);

console.log("\nAdmins of age 23:");
adminsOfAge23.forEach(logPerson);
