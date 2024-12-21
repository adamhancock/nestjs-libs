export interface ConnectwiseLinkHeader {
  next?: string;
  last?: string;
  [key: string]: string | undefined; // For any additional relations
}
