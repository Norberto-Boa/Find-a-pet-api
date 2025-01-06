export class CityNotProvided extends Error {
  constructor() {
    super("City must be provided to fetch pets");
  }
}