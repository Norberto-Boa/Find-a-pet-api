import { faker } from "@faker-js/faker"
import crypto from "node:crypto";

export function makeUser() {
  return {
    id: crypto.randomUUID(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    city: faker.location.city(),
    neighborhood: faker.location.streetAddress(),
    province: faker.location.country(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    role: "ADMIN",
    phone: faker.phone.number()
  }
}