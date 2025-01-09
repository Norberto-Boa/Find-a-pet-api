import { faker } from "@faker-js/faker";

interface Overwrite {
  age?: "NEWBORN" | "YOUNG" | "ADULT" | "OLD",
  size?: "SMALL" | "MEDIUM" | "BIG",
  energy_level?: "LOW" | "MEDIUM" | "HIGH"
}

export function makePet(overwrite?: Overwrite) {
  return {
    name: faker.animal.petName(),
    age: faker.helpers.arrayElement(["NEWBORN", "YOUNG", "ADULT", "OLD"]),
    size: faker.helpers.arrayElement(["SMALL", "MEDIUM", "BIG"]),
    energy_level: faker.helpers.arrayElement(["LOW", "MEDIUM", "HIGH"]),
    environment: faker.helpers.arrayElement(["OPEN_SPACE", "CLOSED", "BOTH"]),
    breed: faker.animal.dog(),
    independent: faker.helpers.arrayElement(["LOW", "MEDIUM", "HIGH"]),
    requirements: [
      faker.lorem.words(4),
      faker.lorem.words(5),
      faker.lorem.words(8)
    ]
  }
}