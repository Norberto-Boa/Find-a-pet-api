import { faker } from "@faker-js/faker";

interface overwrite {
  userId: string;
}

export function makePet({ userId }: overwrite) {
  return {
    name: faker.animal.petName,
    age: faker.helpers.arrayElement(["NEWBORN", "YOUNG", "ADULT", "OLD"]),
    size: faker.helpers.arrayElement(["SMALL", "MEDIUM", "BIG"]),
    energy_level: faker.helpers.arrayElement(["LOW", "MEDIUM", "HIGH"]),
    environment: faker.helpers.arrayElement(["OPEN_SPACE", "CLOSED", "BOTH"]),
    breed: faker.animal.dog,
    independent: faker.helpers.arrayElement(["LOW", "MEDIUM", "HIGH"]),
    user_id: userId,
    requirements: [
      faker.lorem.words(4),
      faker.lorem.words(5),
      faker.lorem.words(8)
    ]
  }
}